import * as THREE from "three";

// A procedural sculpture: no external models, textures, HDR downloads, or trackers.
export function createSculpture(canvas, { theme, reduced, progress, onLost }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 0.15, 8.5);
  const root = new THREE.Group();
  scene.add(root);
  const resources = new Set();
  const own = (value) => {
    resources.add(value);
    return value;
  };
  const geometry = own(new THREE.TorusKnotGeometry(0.86, 0.27, 128, 20, 2, 3));
  const shell = own(
    new THREE.MeshPhysicalMaterial({
      color: 0xf56835,
      roughness: 0.25,
      metalness: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.16,
      transparent: true,
    }),
  );
  const mesh = new THREE.Mesh(geometry, shell);
  root.add(mesh);
  const wireMaterial = own(
    new THREE.LineBasicMaterial({
      color: 0xd64b25,
      transparent: true,
      opacity: 0.5,
    }),
  );
  const wire = new THREE.LineSegments(
    own(
      new THREE.WireframeGeometry(
        own(new THREE.TorusKnotGeometry(0.86, 0.27, 64, 8, 2, 3)),
      ),
    ),
    wireMaterial,
  );
  root.add(wire);
  const ringMaterial = own(
    new THREE.MeshStandardMaterial({
      color: 0xc8c8c0,
      metalness: 0.85,
      roughness: 0.3,
    }),
  );
  const ring = new THREE.Mesh(
    own(new THREE.TorusGeometry(1.78, 0.019, 8, 100)),
    ringMaterial,
  );
  ring.rotation.set(0.6, 0.65, 0.4);
  root.add(ring);
  const ringTwo = new THREE.Mesh(
    own(new THREE.TorusGeometry(2.08, 0.007, 6, 100)),
    ringMaterial,
  );
  ringTwo.rotation.set(1.1, -0.6, 0);
  root.add(ringTwo);
  const satellites = [];
  const satelliteGeometries = [
    own(new THREE.IcosahedronGeometry(0.23, 0)),
    own(new THREE.BoxGeometry(0.32, 0.32, 0.32)),
    own(new THREE.TorusGeometry(0.22, 0.07, 12, 32)),
  ];
  const satelliteMaterials = [
    own(
      new THREE.MeshStandardMaterial({
        color: 0xdddccb,
        metalness: 0.75,
        roughness: 0.2,
      }),
    ),
    own(
      new THREE.MeshStandardMaterial({
        color: 0xf46334,
        metalness: 0.2,
        roughness: 0.35,
      }),
    ),
    own(
      new THREE.MeshStandardMaterial({
        color: 0x8b9580,
        metalness: 0.5,
        roughness: 0.25,
      }),
    ),
  ];
  satelliteGeometries.forEach((geo, index) => {
    const satellite = new THREE.Mesh(geo, satelliteMaterials[index]);
    root.add(satellite);
    satellites.push(satellite);
  });
  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x796c5e, 2.8);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xffeee2, 4.5);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbacbff, 3.3);
  rim.position.set(3, 1, -2);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 1.7);
  fill.position.set(1, -3, 4);
  scene.add(fill);

  let frame = 0;
  let visible = false;
  let destroyed = false;
  let lost = false;
  let lastFrame = 0;
  let phase = 0;
  let rotation = 0;
  const pointer = { x: 0, y: 0 };
  const smoothed = { x: 0, y: 0 };
  let isReduced = reduced;
  let currentTheme = theme;

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      width < 600 ? 1.35 : 1.65,
    );
    renderer.setSize(
      Math.round(width * ratio),
      Math.round(height * ratio),
      false,
    );
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.9 ? 10 : 8.5;
    camera.updateProjectionMatrix();
    draw(0);
  }
  function draw(delta) {
    if (destroyed || lost) return;
    const p = isReduced ? 0.6 : THREE.MathUtils.clamp(progress.get(), 0, 1);
    if (!isReduced) {
      phase += delta;
      rotation += delta * 0.14;
      smoothed.x += (pointer.x - smoothed.x) * 0.045;
      smoothed.y += (pointer.y - smoothed.y) * 0.045;
    } else {
      smoothed.x = 0;
      smoothed.y = 0;
    }
    root.rotation.set(
      0.2 + p * 0.7 + smoothed.y * 0.15,
      -0.45 + p * 1.35 + rotation + smoothed.x * 0.2,
      -0.15 + p * 0.15,
    );
    root.position.y = isReduced ? 0 : Math.sin(phase * 0.6) * 0.06;
    const surface = THREE.MathUtils.smoothstep(p, 0.05, 0.55);
    shell.opacity = 0.1 + surface * 0.9;
    shell.depthWrite = surface > 0.6;
    wireMaterial.opacity = (1 - surface) * 0.32;
    wire.visible = wireMaterial.opacity > 0.015;
    wire.rotation.copy(mesh.rotation);
    const expansion = 1 + Math.sin(p * Math.PI) * 0.25;
    satellites.forEach((satellite, index) => {
      const angle = (index * Math.PI * 2) / 3 + (isReduced ? 0 : phase * 0.12);
      satellite.position.set(
        Math.cos(angle) * 1.9 * expansion,
        Math.sin(angle) * 1.55 * expansion,
        Math.sin(angle * 2) * 0.4,
      );
      satellite.rotation.set(p + index, angle, p * 2);
    });
    ring.rotation.z = p * 0.8;
    ringTwo.rotation.y = -0.6 + p * 0.7;
    renderer.render(scene, camera);
    canvas.dataset.rendered = "true";
    canvas.dataset.stage =
      p < 0.33 ? "wireframe" : p < 0.66 ? "material" : "motion";
  }
  function loop(time) {
    frame = 0;
    if (destroyed || lost || !visible || document.hidden || isReduced) return;
    // 40fps is enough for this slow sculpture and avoids a 120Hz render loop on mobile.
    if (time - lastFrame >= 25) {
      draw(lastFrame ? Math.min((time - lastFrame) / 1000, 0.05) : 0);
      lastFrame = time;
    }
    frame = requestAnimationFrame(loop);
  }
  function syncLoop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    if (visible && !document.hidden && !lost) {
      draw(0);
      if (!isReduced) frame = requestAnimationFrame(loop);
    }
  }
  function setTheme(value) {
    currentTheme = value;
    const dark = value === "dark";
    hemisphere.intensity = dark ? 2.15 : 2.8;
    ringMaterial.color.set(dark ? 0x8d958c : 0x737d70);
    wireMaterial.color.set(dark ? 0xffa076 : 0xb84422);
    renderer.toneMappingExposure = dark ? 1.15 : 1.25;
    draw(0);
  }
  function setReduced(value) {
    isReduced = value;
    syncLoop();
  }
  function move(event) {
    if (isReduced || event.pointerType !== "mouse") return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
    pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
  }
  function leave() {
    pointer.x = 0;
    pointer.y = 0;
  }
  function contextLost(event) {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
    onLost(true);
  }
  function contextRestored() {
    lost = false;
    setTheme(currentTheme);
    resize();
    onLost(false);
    syncLoop();
  }
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      syncLoop();
    },
    { threshold: 0.01 },
  );
  const resizeObserver = new ResizeObserver(resize);
  observer.observe(canvas);
  resizeObserver.observe(canvas);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  document.addEventListener("visibilitychange", syncLoop);
  setTheme(theme);
  resize();
  return {
    setTheme,
    setReduced,
    dispose() {
      destroyed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      document.removeEventListener("visibilitychange", syncLoop);
      resources.forEach((resource) => resource.dispose());
      renderer.dispose();
      delete canvas.dataset.rendered;
    },
  };
}
