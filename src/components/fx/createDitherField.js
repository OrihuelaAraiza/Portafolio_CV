import { Mesh, Program, Renderer, Triangle } from "ogl";

// Campo de ruido tramado. Un fBm que fluye despacio se compara, celda a celda,
// contra una matriz de Bayer 8×8: el resultado son píxeles encendidos o
// apagados, la misma técnica con la que la imprenta y las consolas antiguas
// fingían medios tonos. Es el punto donde se cruzan las dos mitades del
// portafolio —lo editorial y el videojuego—, por eso es el fondo.
//
// El patrón parte de la idea de `Dither`, de React Bits; aquí va sobre OGL, con
// un solo pase, colores tomados de los tokens del tema y un puntero que
// enciende la tinta de acento a su paso.

const vertex = /* glsl */ `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = /* glsl */ `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uCell;
uniform float uDot;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform float uAlpha;
uniform float uDensity;
uniform float uScale;
uniform vec2 uPointer;
uniform float uHover;
uniform float uGlow;
uniform float uIntro;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

// Ruido símplex 2D (Ian McEwan, Ashima Arts — MIT).
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p);
    p = p * 2.03 + vec2(13.7, -7.1);
    amplitude *= 0.5;
  }
  return value;
}

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 inside = fract(gl_FragCoord.xy / uCell);
  // Cada celda evalúa el ruido en su centro: el campo se mueve en bloques.
  vec2 uv = (cell + 0.5) * uCell / uResolution.y;

  float t = uTime * 0.045;
  vec2 q = uv * uScale;
  float warp = fbm(q + vec2(t, -t * 0.7));
  float field = fbm(q * 1.35 + warp * 0.85 + vec2(-t * 0.6, t * 0.45));
  float value = smoothstep(-0.38, 0.62, field) * uDensity;

  // El puntero deja un halo que sube la densidad y cambia la tinta.
  vec2 pointer = uPointer / uResolution.y;
  float distanceToPointer = distance(uv, pointer);
  float glow = exp(-distanceToPointer * distanceToPointer / 0.018) * uHover;
  float ring = exp(-pow((distanceToPointer - 0.2) / 0.05, 2.0)) * uHover * 0.35;
  value += glow * 0.6 + ring;

  // Entrada: el campo se revela desde la esquina superior derecha.
  vec2 normalized = gl_FragCoord.xy / uResolution;
  float reach = distance(normalized, vec2(1.0, 1.0)) / 1.42;
  value *= smoothstep(reach - 0.25, reach + 0.05, uIntro * 1.3);

  float lit = step(bayer8(cell) + 0.004, value);
  float square = step(inside.x, uDot) * step(inside.y, uDot);
  float accent = smoothstep(0.08, 0.5, glow + ring);
  vec3 color = mix(uInk, uAccent, accent);
  float alpha = lit * square * uAlpha * mix(1.0, uGlow, accent);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

function toRgb(value, fallback) {
  const hex = /^#([0-9a-f]{6})/i.exec(value.trim());
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const rgb = /rgba?\(([^)]+)\)/.exec(value);
  if (rgb) {
    const [r, g, b] = rgb[1].split(/[\s,/]+/).map(Number);
    return [r / 255, g / 255, b / 255];
  }
  return fallback;
}

export function createDitherField(canvas, { reduced = false } = {}) {
  const host = canvas.parentElement;
  const renderer = new Renderer({
    canvas,
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const uniforms = {
    uResolution: { value: [1, 1] },
    uTime: { value: 0 },
    uCell: { value: 6 },
    uDot: { value: 0.5 },
    uInk: { value: [0.1, 0.1, 0.1] },
    uAccent: { value: [0.85, 0.27, 0.1] },
    uAlpha: { value: 0.2 },
    uDensity: { value: 0.9 },
    uScale: { value: 1.2 },
    uPointer: { value: [-9999, -9999] },
    uHover: { value: 0 },
    uGlow: { value: 2.4 },
    uIntro: { value: reduced ? 1 : 0 },
  };
  const mesh = new Mesh(gl, {
    geometry: new Triangle(gl),
    program: new Program(gl, {
      vertex,
      fragment,
      uniforms,
      transparent: true,
      depthTest: false,
    }),
  });
  // Con alfa premultiplicado la mezcla correcta es ONE, ONE_MINUS_SRC_ALPHA.
  mesh.program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let ratio = 1;
  let visible = false;
  let frame = 0;
  let disposed = false;
  let isReduced = reduced;
  let last = 0;
  let clock = 14; // Empieza con el ruido ya formado, no en su origen.
  let hoverTarget = 0;
  const pointerTarget = [-9999, -9999];

  function readTokens() {
    const style = getComputedStyle(host);
    const number = (name, fallback) => {
      const parsed = parseFloat(style.getPropertyValue(name));
      return Number.isFinite(parsed) ? parsed : fallback;
    };
    uniforms.uInk.value = toRgb(style.getPropertyValue("--field-ink"), [0.1, 0.1, 0.1]);
    uniforms.uAccent.value = toRgb(
      style.getPropertyValue("--field-accent"),
      [0.85, 0.27, 0.1],
    );
    uniforms.uAlpha.value = number("--field-alpha", 0.2);
    uniforms.uDensity.value = number("--field-density", 0.9);
    uniforms.uScale.value = number("--field-scale", 1.2);
    uniforms.uCell.value = number("--field-cell", 6) * ratio;
    uniforms.uDot.value = number("--field-dot", 0.5);
    uniforms.uGlow.value = number("--field-glow", 2.4);
  }

  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    // El tramado no gana nada con más densidad de píxeles: se limita la
    // resolución y el total de fragmentos para que el coste sea plano.
    ratio = Math.min(
      window.devicePixelRatio || 1,
      1.5,
      Math.sqrt(2_400_000 / (width * height)),
    );
    renderer.dpr = ratio;
    renderer.setSize(width, height);
    uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    readTokens();
    draw();
  }

  function draw() {
    if (disposed) return;
    uniforms.uTime.value = clock;
    renderer.render({ scene: mesh });
    canvas.dataset.rendered = "true";
  }

  function tick(now) {
    frame = 0;
    if (disposed || !visible || isReduced || document.hidden) return;
    frame = requestAnimationFrame(tick);
    // El campo se mueve despacio: treinta fotogramas por segundo le sobran.
    if (now - last < 32) return;
    const delta = Math.min((now - last) / 1000, 0.1);
    last = now;
    clock += delta;
    uniforms.uIntro.value = Math.min(1, uniforms.uIntro.value + delta / 1.6);
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.09;
    const pointer = uniforms.uPointer.value;
    pointer[0] += (pointerTarget[0] - pointer[0]) * 0.16;
    pointer[1] += (pointerTarget[1] - pointer[1]) * 0.16;
    draw();
  }

  function start() {
    if (frame || disposed || !visible || isReduced || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }

  function onPointerMove(event) {
    if (event.pointerType !== "mouse" || isReduced) return;
    const box = canvas.getBoundingClientRect();
    const x = (event.clientX - box.left) * ratio;
    const y = (box.height - (event.clientY - box.top)) * ratio;
    if (hoverTarget === 0 && uniforms.uHover.value < 0.02) {
      uniforms.uPointer.value[0] = x;
      uniforms.uPointer.value[1] = y;
    }
    pointerTarget[0] = x;
    pointerTarget[1] = y;
    const inside =
      event.clientY >= box.top - 80 && event.clientY <= box.bottom + 80;
    hoverTarget = inside ? 1 : 0;
  }
  const onPointerLeave = () => {
    hoverTarget = 0;
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const viewObserver = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) start();
  });
  viewObserver.observe(host);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("visibilitychange", start);
  resize();

  return {
    setTheme() {
      // Los tokens cambian con el tema en el siguiente fotograma de estilo.
      requestAnimationFrame(() => {
        if (disposed) return;
        readTokens();
        draw();
      });
    },
    setReduced(next) {
      isReduced = next;
      if (next) {
        uniforms.uIntro.value = 1;
        uniforms.uHover.value = 0;
        draw();
      } else start();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", start);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
