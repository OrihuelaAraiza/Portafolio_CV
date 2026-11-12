// Presupuesto de carga inicial del portafolio.
//
// Mide lo que el navegador descarga realmente para la primera pintura: los
// archivos que `dist/index.html` referencia con <script>, <link rel=stylesheet>
// y <link rel=modulepreload>. Los chunks que llegan por import() —Three.js y la
// ficha de proyecto— quedan fuera a propósito: no bloquean la portada.
import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const DIST = resolve(process.cwd(), "dist");

// Gzip nivel 9, la misma compresión que sirve un CDN estático.
// ES/EN adds a complete local translation catalog (about 8 kB gzip).
// Both languages are bundled so switching also works offline and never resets
// the form or gallery while waiting for another language download.
//
// Noviembre de 2026: la capa visual (prólogo, cinta, titulares por líneas,
// inclinación de tarjetas, banda de videojuegos) sube el límite de JS de 175 a
// 181 kB y el de CSS de 20 a 24 kB. Lo pesado de esa capa no entra en esta
// cuenta porque llega por import(): OGL y el shader del fondo (~16 kB) y Lenis
// con el cursor y el riel de capítulos (~7 kB).
const BUDGET = { js: 181 * 1024, css: 24 * 1024 };

const html = readFileSync(join(DIST, "index.html"), "utf8");
const referenced = new Set(
  [...html.matchAll(/(?:src|href)="\/([^"]+\.(?:js|css))"/g)].map((m) => m[1]),
);

if (referenced.size === 0) {
  console.error("No se encontró ningún recurso en dist/index.html.");
  process.exit(1);
}

const totals = { js: 0, css: 0 };
const rows = [];
for (const file of [...referenced].sort()) {
  const bytes = readFileSync(join(DIST, file));
  const gzip = gzipSync(bytes, { level: 9 }).length;
  const kind = file.endsWith(".css") ? "css" : "js";
  totals[kind] += gzip;
  rows.push({ file, raw: bytes.length, gzip, kind });
}

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;

console.log("Carga inicial (gzip):\n");
for (const row of rows) {
  console.log(`  ${row.file.padEnd(46)} ${kb(row.raw).padStart(9)} → ${kb(row.gzip).padStart(9)}`);
}

let failed = false;
console.log("");
for (const kind of ["js", "css"]) {
  const used = totals[kind];
  const budget = BUDGET[kind];
  const pct = ((used / budget) * 100).toFixed(0);
  const over = used > budget;
  failed ||= over;
  console.log(
    `  ${kind.toUpperCase().padEnd(4)} ${kb(used).padStart(9)} / ${kb(budget).padStart(9)}  (${pct}% del presupuesto)${over ? "  ✗ EXCEDIDO" : ""}`,
  );
}

if (failed) {
  console.error(
    "\nLa carga inicial superó el presupuesto. Reduce el peso o ajusta BUDGET\n" +
      "en scripts/check-bundle-size.mjs de forma deliberada, no por inercia.",
  );
  process.exit(1);
}
console.log("\nDentro del presupuesto.");
