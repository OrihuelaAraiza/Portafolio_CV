import { flushSync } from "react-dom";

let activeTransition;

// Keep interactions usable without the API, with motion paused, or if a
// visitor makes another selection before the previous reveal has finished.
export function revealChange(
  update,
  { target, origin, kind = "content", key, disabled = false } = {},
) {
  const root = document.documentElement;
  // Radix may request the same tab from both pointer-down and focus before
  // the browser has run the transition's asynchronous update callback.
  if (key && activeTransition?.selectionKey === key) return;
  activeTransition?.skipTransition();
  activeTransition?.cleanup();
  activeTransition = undefined;
  if (
    disabled ||
    root.dataset.motion === "reduced" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !document.startViewTransition
  ) {
    update();
    return;
  }

  const bounds = target?.getBoundingClientRect();
  const anchor = origin?.getBoundingClientRect?.();
  const width = bounds?.width ?? window.innerWidth;
  const height = bounds?.height ?? window.innerHeight;
  const x = anchor
    ? Math.max(
        0,
        Math.min(width, anchor.left + anchor.width / 2 - (bounds?.left ?? 0)),
      )
    : width / 2;
  const y = anchor
    ? Math.max(
        0,
        Math.min(height, anchor.top + anchor.height / 2 - (bounds?.top ?? 0)),
      )
    : Math.min(height / 2, 120);
  root.style.setProperty("--vt-x", `${x}px`);
  root.style.setProperty("--vt-y", `${y}px`);
  root.style.setProperty(
    "--vt-radius",
    `${Math.hypot(Math.max(x, width - x), Math.max(y, height - y))}px`,
  );
  root.dataset.vt = kind;
  const previousName = target?.style.viewTransitionName;
  if (target) target.style.viewTransitionName = "content-reveal";

  const cleanup = () => {
    if (target) target.style.viewTransitionName = previousName;
    delete root.dataset.vt;
  };
  let transition;
  try {
    transition = document.startViewTransition(async () => {
      flushSync(update);
      // Give a newly selected screenshot time to decode before capturing it.
      // Lazy project thumbnails retain their normal loading behavior.
      const images =
        target?.querySelectorAll('img:not([loading="lazy"])') ?? [];
      if (images.length)
        await Promise.race([
          Promise.all(
            [...images].map((image) => image.decode().catch(() => {})),
          ),
          new Promise((resolve) => setTimeout(resolve, 180)),
        ]);
    });
  } catch {
    cleanup();
    update();
    return;
  }
  transition.cleanup = cleanup;
  transition.selectionKey = key;
  activeTransition = transition;
  transition.ready.catch(() => {});
  const finish = () => {
    if (activeTransition !== transition) return;
    cleanup();
    activeTransition = undefined;
  };
  transition.finished.then(finish, finish);
}
