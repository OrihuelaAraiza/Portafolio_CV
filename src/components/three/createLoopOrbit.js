import * as THREE from "three";

// Two fine paths and three beads: a quiet echo of Loop's journey, without assets
// or postprocessing. The existing sculpture and this scene share Three's chunk.
export function createLoopOrbit(canvas, { reduced, onLost }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-3.4, 3.4, 4, -4, 0.1, 30);
  camera.position.z = 10;
  const root = new THREE.Group();
  scene.add(root);
  const resources = [];
  const own = (value) => {
    resources.push(value);
    return value;
  };
  const path = new THREE.CatmullRomCurve3(
    Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * 3,
        Math.sin(angle) * 2.6,
        Math.sin(angle * 2) * 0.4,
      );
    }),
    true,
  );
  const line = own(
    new THREE.MeshBasicMaterial({
      color: 0x968566,
      transparent: true,
      opacity: 0.42,
    }),
  );
  const geometry = own(new THREE.TubeGeometry(path, 100, 0.009, 5, true));
  const first = new THREE.Mesh(geometry, line);
  root.add(first);
  const second = new THREE.Mesh(geometry, line);
  second.rotation.set(0.85, 0.45, -0.4);
  second.scale.setScalar(1.12);
  root.add(second);
  const beadGeometry = own(new THREE.SphereGeometry(0.055, 12, 8));
  const beads = [0xc46e4f, 0x8f9b74, 0xb1a078].map((color) => {
    const bead = new THREE.Mesh(
      beadGeometry,
      own(new THREE.MeshBasicMaterial({ color })),
    );
    root.add(bead);
    return bead;
  });
  let frame = 0,
    visible = false,
    disposed = false,
    lost = false,
    elapsed = 0,
    last = 0;
  const target = new THREE.Vector2();
  const pointer = new THREE.Vector2();
  function draw() {
    pointer.lerp(target, 0.04);
    root.rotation.set(
      0.45 + pointer.y * 0.06,
      -0.15 + pointer.x * 0.08,
      -0.45 + Math.sin(elapsed * 0.12) * 0.08,
    );
    beads.forEach((bead, index) =>
      bead.position.copy(path.getPointAt((elapsed * 0.012 + index / 3) % 1)),
    );
    renderer.render(scene, camera);
  }
  function tick(now) {
    frame = 0;
    if (disposed || lost || reduced || !visible || document.hidden) return;
    if (now - last >= 1000 / 30) {
      elapsed += Math.min((now - last) / 1000, 0.06);
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    const active =
      !disposed && !lost && !reduced && visible && !document.hidden;
    canvas.dataset.motion = active ? "running" : "paused";
    if (active) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    } else if (!disposed && !lost && visible) draw();
  }
  const host = canvas.parentElement.parentElement;
  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height || disposed || lost) return;
    renderer.setSize(width, height, false);
    const halfHeight = (3.5 * height) / width;
    camera.left = -3.5;
    camera.right = 3.5;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    draw();
  }
  function move(event) {
    if (reduced || event.pointerType !== "mouse") return;
    const box = host.getBoundingClientRect();
    target.set(
      (event.clientX - box.left) / box.width - 0.5,
      (event.clientY - box.top) / box.height - 0.5,
    );
  }
  const leave = () => target.set(0, 0);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  intersection.observe(canvas);
  const sizing = new ResizeObserver(resize);
  sizing.observe(host);
  function contextLost(event) {
    event.preventDefault();
    lost = true;
    sync();
    onLost();
  }
  canvas.addEventListener("webglcontextlost", contextLost);
  host.addEventListener("pointermove", move, { passive: true });
  host.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", sync);
  resize();
  return {
    setReduced(value) {
      reduced = value;
      sync();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      sizing.disconnect();
      canvas.removeEventListener("webglcontextlost", contextLost);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      resources.forEach((resource) => resource.dispose());
      renderer.dispose();
    },
  };
}
