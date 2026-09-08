// Genera la tarjeta social del portafolio.
//
// Reutiliza el Chromium que Playwright ya instala para las pruebas, así que no
// añade dependencias. Las fuentes se incrustan desde node_modules en base64
// para que el resultado no dependa de la red y sea idéntico en cada ejecución.
//
//   node scripts/generate-og-image.mjs
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const OUT = resolve(ROOT, "public/og-image.png");

const font = (path) =>
  readFileSync(resolve(ROOT, "node_modules", path)).toString("base64");

const manrope = font("@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2");
const dmSans = font("@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2");
const dmMono = font("@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff2");

// Los colores replican los tokens de :root en src/index.css.
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><style>
  @font-face { font-family: "Manrope"; src: url(data:font/woff2;base64,${manrope}) format("woff2"); font-weight: 200 800; }
  @font-face { font-family: "DM Sans"; src: url(data:font/woff2;base64,${dmSans}) format("woff2"); font-weight: 100 1000; }
  @font-face { font-family: "DM Mono"; src: url(data:font/woff2;base64,${dmMono}) format("woff2"); font-weight: 400; }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; display: flex; flex-direction: column;
    justify-content: space-between; padding: 72px 80px;
    background: #f8f7f4; color: #20211f; font-family: "DM Sans", sans-serif;
    position: relative; overflow: hidden;
  }
  .grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(#ddded6 1px, transparent 1px), linear-gradient(90deg, #ddded6 1px, transparent 1px);
    background-size: 60px 60px; opacity: .55;
    mask-image: radial-gradient(120% 90% at 82% 18%, #000 10%, transparent 72%);
  }
  .row { position: relative; display: flex; align-items: center; justify-content: space-between; }
  .mark { font-family: "Manrope", sans-serif; font-weight: 800; font-size: 30px; letter-spacing: -.03em; display: flex; align-items: center; gap: 8px; }
  .mark svg { width: .69em; height: .69em; color: #d84619; }
  .eyebrow { font-family: "DM Mono", monospace; font-size: 15px; letter-spacing: .18em; color: #62655c; }
  h1 {
    position: relative; font-family: "Manrope", sans-serif; font-weight: 800;
    font-size: 118px; line-height: .94; letter-spacing: -.045em; max-width: 15ch;
  }
  h1 span { color: #d84619; }
  .meta { position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; }
  .meta p { font-size: 24px; line-height: 1.5; color: #3d3f3a; white-space: nowrap; }
  .meta p strong { font-weight: 600; color: #20211f; }
  .stack { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; max-width: 380px; }
  .stack span {
    font-family: "DM Mono", monospace; font-size: 15px; letter-spacing: .04em;
    border: 1px solid #cfd0c6; border-radius: 999px; padding: 8px 16px; color: #4a4c45; background: #ffffffb0;
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #d84619; display: inline-block; margin-right: 9px; vertical-align: 1px; }
</style></head><body>
  <div class="grid"></div>
  <div class="row">
    <div class="mark">jp<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.28"><path d="M12 0v24M0 12h24M3.51 3.51 20.49 20.49M20.49 3.51 3.51 20.49"/></svg></div>
    <div class="eyebrow">PORTAFOLIO / 2026</div>
  </div>
  <h1>Interfaces con <span>intención.</span></h1>
  <div class="meta">
    <p><strong>Juan Pablo Orihuela</strong><br><span class="dot"></span>Frontend Developer &amp; UI/UX<br><span style="padding-left:18px">Ciudad de México</span></p>
    <div class="stack">
      <span>React</span><span>Next.js</span><span>TypeScript</span><span>SwiftUI</span><span>Three.js</span>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await browser.close();

writeFileSync(OUT, png);
console.log(`public/og-image.png · 1200×630 · ${(png.length / 1024).toFixed(1)} kB`);
