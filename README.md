# Juan Pablo Orihuela — Portafolio

Portafolio de desarrollo iOS y frontend, con videojuegos como diferenciador, en React + Vite. Loop encabeza la selección con un recorrido de capturas reales, demos e implementación Swift; convive con proyectos web, experimentos de interacción y contacto directo.

## Desarrollo

Requiere Node.js 22.12 o posterior y npm.

```sh
npm ci
npm run dev
```

## Verificación

```sh
npx playwright install chromium
npm run check
```

`check` ejecuta ESLint, el build de producción, el presupuesto de carga inicial y pruebas de navegador en escritorio y móvil. Playwright cubre filtros, galerías, Escape y restauración del foco, enlaces directos, historial, menú móvil, carga de capturas, descarga del CV, portapapeles, temas, preferencias de movimiento, scroll 3D y reproducción real de los videos. Cubre además la paleta de comandos, el formulario de contacto, la transición compartida al abrir una ficha, el marcado generado para buscadores y la capa visual: prólogo, cinta de herramientas, fondo tramado con y sin WebGL, riel de capítulos, scroll suave por anclas y cambio de tema. Las auditorías automáticas con axe revisan la página, el diálogo, la paleta y el formulario con sus errores visibles, en ambos temas.

`.github/workflows/ci.yml` repite esa verificación en cada push y pull request. `npm run size` mide en gzip lo que el navegador descarga para la primera pintura —los archivos que `dist/index.html` referencia— y falla si supera el presupuesto de `scripts/check-bundle-size.mjs`. Los chunks que llegan por `import()`, como Three.js, el visor iOS y la ficha de proyecto, quedan fuera de esa cuenta porque no bloquean la portada.

```sh
npm run build
npm run preview
```

El resultado estático se genera en `dist/`. `vercel.json` conserva los accesos anteriores (`/web`, `/apps`, `/games`, `/about`) mediante el fallback de la SPA. La aplicación dirige esos accesos a la sección y filtro correspondientes.

## Contenido

- `src/data/portfolio.js`: perfil, proyectos, capturas, enlaces y descripciones.
- `src/data/en.json`: traducciones al inglés; las claves son los textos originales en español.
- `src/data/ios.js`: capítulos, decisiones técnicas y laboratorio de Loop, con textos ES/EN en el chunk diferido.
- `public/projects/`: capturas reales optimizadas a WebP, sin dependencia de servicios externos en tiempo de ejecución.
- `public/videos/`: tráiler y gameplay de We Can Fix This y clips de simulador de Loop. Descarga de video bajo demanda.
- `public/JuanPabloOrihuela_CV.pdf`: CV original; sustituir este archivo para actualizar la descarga.
- `docs/content-sources.md`: procedencia y límites del contenido.
- `docs/ios-media-sources.json`: correspondencia entre las capturas iOS optimizadas y sus originales en el historial de Loop.

Para añadir un proyecto, completa su entrada en `portfolio.js` y agrega las capturas locales. Los proyectos móviles usan al menos dos capturas. Los botones de demo y código se muestran solo cuando existe un enlace. Cada ficha admite un enlace directo, por ejemplo `/?project=romi`.

## Español e inglés

El selector ES/EN está en la cabecera, el menú móvil y las fichas. Cambia el contenido sin recargar ni perder el filtro activo, la captura abierta o los datos del formulario. Traduce también etiquetas accesibles, errores, búsquedas y asuntos del correo preparado; el mensaje escrito por el visitante conserva su texto.

El idioma de entrada es español. La elección se guarda en `jp-language` cuando el navegador permite almacenamiento. Un enlace con `?lang=en` o `?lang=es` tiene prioridad sobre esa preferencia y puede combinarse con una ficha, por ejemplo `/?lang=en&project=romi`. Cambiar de idioma conserva el proyecto y el ancla en la URL. Si el almacenamiento está bloqueado, el selector sigue funcionando y la URL mantiene la elección al recargar.

`LanguageProvider` comparte la selección y las fichas traducidas; `useLanguage` expone `t(texto, variables)`. Al editar contenido español o añadir proyectos, actualiza también sus claves en `en.json`, incluidas las etiquetas de capturas y los textos de estado. Los nombres propios, tecnologías y capturas originales se conservan. El CV sigue siendo el PDF original en español, identificado con `hreflang` y el título del enlace.

Ambos idiomas se incluyen localmente para que cambiar de idioma no dependa de otra descarga. El presupuesto de JavaScript inicial pasó de 165 a 175 kB gzip para incorporar el catálogo completo de traducciones; con la capa visual de noviembre de 2026 queda en 181 kB de JS y 24 kB de CSS (ver «Movimiento y narrativa»). `tests/language.spec.js` comprueba persistencia, almacenamiento bloqueado, enlaces directos, conservación de formularios y galerías, búsqueda en inglés, navegación móvil, accesibilidad en ambos temas y anchos de 320 a 1440 px.

El idioma de `<html>` y las descripciones de metadata se actualizan durante la visita. El HTML estático, el sitemap, el JSON-LD y la imagen social que reciben los rastreadores sin JavaScript siguen usando la versión española.

## Buscadores y enlaces compartidos

`src/data/site.js` es el único lugar donde vive el dominio. A partir de él, `plugins/vite-plugin-seo.js` genera durante el build el `title`, la descripción, las etiquetas OpenGraph, el enlace canónico, `robots.txt` y `sitemap.xml`, más un JSON-LD con el perfil y los once proyectos leído del mismo `portfolio.js` que dibuja las fichas: el marcado estructurado no puede describir proyectos que ya no existen. Cambiar de dominio es cambiar una línea.

`scripts/generate-og-image.mjs` dibuja `public/og-image.png` a 1200 × 630 con el Chromium que ya instala Playwright, incrustando las fuentes desde `node_modules`. No añade dependencias y el resultado es idéntico en cada ejecución.

## Interfaz y arquitectura

- `src/components/portfolio/`: secciones y componentes de presentación.
- `src/components/ProjectDetail.jsx`: ficha con galería, cargada bajo demanda.
- `src/components/three/`: escultura del proceso y órbitas de Loop. Comparten el chunk de Three.js y se cargan al acercarse a cada sección.
- `src/components/portfolio/ProjectBackdrop.jsx`: fondos de cards en CSS, animados solo mientras están visibles.
- `src/components/portfolio/SimulatorPreview.jsx`: pantallas de video sin controles de navegador, con pausa externa y respeto a preferencias de movimiento.
- `src/components/fx/`: fondo tramado en WebGL (`DitherField` + `createDitherField`, sobre OGL) y la capa diferida `Effects` con scroll suave (Lenis), cursor y riel de capítulos.
- `src/components/portfolio/Prologue.jsx`, `Marquee.jsx`, `Line.jsx`, `Magnetic.jsx`: prólogo narrativo, cinta continua, titulares por líneas y atracción al puntero.
- `src/styles/enhancements.css`: estilos de la capa visual; `index.css` conserva tokens y composición.
- `src/components/AppearanceProvider.jsx`: tema claro/oscuro y pausa de movimiento con persistencia opcional en el navegador.
- `src/components/LanguageProvider.jsx`: idioma, traducciones y contenido localizado sin reiniciar los componentes.
- `src/components/portfolio/Asterisk.jsx`: el asterisco de la marca, dibujado en SVG.
- `src/components/CommandPalette.jsx`: paleta de comandos con ⌘K sobre proyectos, secciones y acciones.
- `src/components/portfolio/ContactForm.jsx`: formulario con validación y errores accesibles, sin servidor.
- `src/components/ui/`: componentes de shadcn/ui sobre Radix (Button, Dialog, Tabs, Tooltip, Command).
- `src/App.jsx`: composición, progreso de lectura y navegación de las fichas.
- `src/index.css`: tokens, composición editorial, estados y ajustes responsive.

El asterisco del logotipo era el carácter ✳ (U+2733). Manrope no lo incluye, así que cada sistema lo resolvía por sustitución de fuentes: en escritorio la cadena llegaba a una fuente de símbolos monocroma, pero en iOS y Android llegaba antes a la de emoji de color y la marca cambiaba de forma según el teléfono. Ahora se dibuja en SVG con la geometría medida sobre aquel glifo —ocho radios iguales, 0.69em de lado, el centro a 0.3483em de la línea base—, hereda el color con `currentColor` y el tamaño en `em`, de modo que las reglas que ya existían siguen mandando y el resultado no depende de las fuentes del sistema. La flecha ↗ (U+2197) de «CDMX, MÉXICO» y «THREE.JS» tenía el mismo problema —tampoco está en ninguna de las tres fuentes— y pasó a ser el icono `ArrowUpRight` de Lucide que el resto del sitio ya usaba.

La paleta de comandos se abre con ⌘K, con Ctrl K fuera de Apple o desde el botón del encabezado, y busca proyectos, secciones y acciones. Su filtro es propio: el difuso que trae cmdk colocaba proyectos por encima del comando exacto al escribir «copiar», así que se sustituyó por coincidencia de subcadena que además ignora acentos, de modo que «sobre mi» encuentra «Sobre mí».

Al abrir una ficha, la portada de la tarjeta y la captura de la ficha comparten un nombre de transición y el navegador interpola entre ambas con la View Transitions API. La ficha se precarga en tiempo ocioso para que se monte en el mismo fotograma. Sin soporte en el navegador, o con el movimiento reducido, la ficha se abre igual sin animar.

Motion gestiona las transiciones, el parallax de la portada y el relato de tres momentos del proceso. El título rota con escritura y borrado entre iOS Developer, Frontend Developer & UI/UX, CTO y desarrollo creativo con Unity. Empieza por iOS, deja un texto estable para lectores de pantalla y muestra un rol completo cuando se pausa el movimiento. Lenis suaviza el scroll en escritorio cuando el movimiento está habilitado; la navegación mantiene su alternativa nativa.

Three.js renderiza una escultura que pasa de estructura a material y movimiento con el scroll y responde al puntero. El motor se importa bajo demanda; limita la resolución y la frecuencia de renderizado, se detiene fuera de pantalla o con la pestaña oculta y libera sus recursos al desmontarse. Si WebGL no está disponible, queda una composición estática y todo el contenido sigue accesible. El chunk independiente de Three.js supera el umbral orientativo de 500 kB de Vite; no forma parte de la carga inicial de la portada.

El tema sigue al sistema hasta elegir uno con el control de la cabecera; la preferencia se aplica antes del primer render y se conserva al recargar. El botón de pausa y `prefers-reduced-motion` desactivan el parallax y el movimiento continuo del 3D. El almacenamiento local es opcional: si está bloqueado, los controles siguen funcionando durante la visita.

El reel de videojuegos conserva sus controles nativos y arranque explícito. Las pantallas de Loop se reproducen en bucle, silenciadas y sin barras de reproductor, solo al entrar en pantalla. Su botón discreto permite pausar o reproducir; con movimiento reducido esperan una acción explícita. Salir de pantalla o cambiar de pestaña pausa los videos. Las fuentes se distribuyen localmente a través de Fontsource.

El contacto ofrece tres caminos: el enlace de correo, el botón de copiar la dirección y un formulario que valida en el navegador y arma el mensaje. El formulario no envía nada por la red: al validarse abre el cliente de correo con el asunto y el cuerpo ya escritos, y deja el mismo texto en pantalla por si no hay cliente configurado. La validación es propia, sin librería de formularios, y marca los campos solo después del primer intento de envío, con `aria-invalid`, mensajes enlazados por `aria-describedby` y el foco puesto en el primer campo con problema. No hay envíos simulados ni llamadas a GitHub desde el navegador. `src/main.jsx` integra Vercel Analytics; el formulario no transmite su contenido a un servidor propio.

## Movimiento y narrativa

La página se lee como capítulos: portada, prólogo, proyectos, videojuegos, proceso, perfil y contacto. Un recurso visual los une —el **tramado**, la técnica con la que la imprenta y las consolas antiguas fingían medios tonos— porque es donde se cruzan lo editorial y el videojuego.

- **Fondo tramado.** `createDitherField.js` dibuja con [OGL](https://github.com/oframe/ogl) un fBm de ruido símplex comparado contra una matriz de Bayer 8×8. Los colores salen de variables CSS (`--field-ink`, `--field-accent`, `--field-alpha`…), así que el mismo shader sirve a la portada y al contacto en ambos temas. El puntero enciende la tinta de acento. Corre a ~30 fps con la resolución acotada, se detiene fuera de pantalla o con la pestaña oculta, y con el movimiento pausado pinta un único fotograma. Sin WebGL la sección conserva su fondo plano.
- **Prólogo.** Cuatro frases que se encienden palabra a palabra con el scroll y tres cifras con conteo. Los asteriscos del texto fuente marcan el acento y se conservan en la traducción; no llegan a pantalla.
- **Cinta de herramientas y de contacto.** `Marquee` avanza sola, acelera con la velocidad del scroll y cambia de sentido al subir; descansa fuera de pantalla. Solo la primera copia se anuncia a lectores de pantalla.
- **Titulares por líneas, botones magnéticos, tarjetas que se inclinan.** Motion mueve las líneas desde su máscara; la inclinación y el foco de luz de las tarjetas van por variables CSS sin volver a renderizar.
- **Capítulo de videojuegos.** La sección redefine los tokens con la paleta oscura, de modo que todo su contenido cambia sin reglas propias, y entra y sale por un borde tramado. El reel lleva líneas de barrido y marcas de HUD que se retiran al reproducir.
- **Capa diferida** (`Effects`, cargada en tiempo ocioso): scroll suave con [Lenis](https://lenis.darkroom.engineering/), un cursor que se vuelve etiqueta sobre lo que se puede abrir y un riel de capítulos al margen. El riel repite la navegación de cabecera, por eso queda fuera del árbol de accesibilidad y del orden de tabulación.
- **Cambio de tema.** El tema nuevo se abre en círculo desde su control con la View Transitions API.

El scroll suave solo interpola la rueda: la posición sigue siendo la del documento, así que anclas, teclado, `scrollIntoView` y lectores funcionan igual. Las anclas se resuelven en `Effects.jsx` para que el hash llegue a la URL y, desde el teclado, el foco viaje con el scroll. Se desactiva mientras hay un diálogo abierto y con el movimiento pausado. Todo lo anterior respeta `prefers-reduced-motion` y el botón de pausa: sin movimiento la cinta es una lista quieta, el prólogo se muestra completo y no hay cursor ni interpolación.

**Presupuesto.** La carga inicial queda en 179.3 kB de JS y 22.2 kB de CSS (gzip), con límites de 181 y 24 kB. Lo pesado de la capa llega por `import()` y no entra en esa cuenta: OGL con el shader (~16 kB) y Lenis con el cursor y el riel (~7 kB).

## Recursos externos

- [OGL](https://github.com/oframe/ogl), WebGL mínimo para el fondo tramado (Unlicense).
- [Lenis](https://lenis.darkroom.engineering/), scroll suave (MIT).
- [React Bits](https://reactbits.dev/), referencia de patrones: el tramado parte de la idea de su fondo `Dither` y la cinta de `ScrollVelocity`. Ambos están reescritos para este proyecto —sobre OGL y sobre los motion values ya cargados—, no copiados (MIT + Commons Clause).
- Ruido símplex 2D de Ian McEwan, Ashima Arts, dentro del shader (MIT).

- [shadcn/ui](https://ui.shadcn.com/docs/installation/vite), componentes incorporados desde su registro oficial (MIT).
- [Radix Primitives](https://www.radix-ui.com/primitives), comportamiento de diálogos, tabs y tooltips (MIT).
- [Motion for React](https://motion.dev/docs/react), animación y preferencias de movimiento (MIT).
- [Three.js](https://threejs.org/), geometría, materiales e interacción 3D procedural (MIT).
- [Lucide](https://lucide.dev/), iconos de interfaz (ISC), y Feather a través de [React Icons](https://react-icons.github.io/react-icons/) (MIT).
- [Manrope](https://fontsource.org/fonts/manrope), [DM Sans](https://fontsource.org/fonts/dm-sans) y [DM Mono](https://fontsource.org/fonts/dm-mono), mediante Fontsource (SIL Open Font License).
- [Playwright](https://playwright.dev/) y [axe-core](https://github.com/dequelabs/axe-core), verificación del navegador y accesibilidad.

Una auditoría automática sin incidencias no equivale a una certificación de accesibilidad ni a pruebas físicas en iPhone. Las capturas de otros proyectos documentan su apariencia; las pruebas de este repositorio cubren el portafolio.

## Exploraciones

«Otras exploraciones», al final del capítulo de videojuegos, enlaza cuatro repositorios públicos: SoundVision, Visuaid, B-lance y AR Labs. Viven en `experiments`, en `src/data/portfolio.js`; cada entrada necesita su descripción en `en.json`. Procedencia y límites en [docs/content-sources.md](docs/content-sources.md#actualización-del-12-de-noviembre-de-2026).

## Selección actual · noviembre de 2026

La selección presenta Loop, Nexo CRM, Brassbound, ROMI y We Can Fix This, en ese orden. El filtro Todos abre el catálogo de once proyectos, incluido ROMImente. Los filtros Web, Videojuegos e iOS & Mobile conservan las rutas anteriores. Las fichas y la paleta siguen disponibles aunque un proyecto no esté en la selección inicial.

`featured` controla la selección; `proof` resume lo que demuestra una tarjeta; `verification` y `scope` conservan la procedencia como datos de referencia y no se renderizan en las fichas. `video` es un objeto con `src`, `poster`, `label` y `caption`: cada proyecto muestra su propio medio; Loop usa la pantalla integrada y el gameplay conserva el reproductor estándar. Una ficha web puede tener solo código, sin URL de demo.

## Recorrido iOS

`#ios` carga `IOSShowcase` al acercarse a la sección. Ofrece tres capítulos, capturas ES/EN, apariencia claro/oscuro y texto normal/grande independientes del tema del sitio. Los controles muestran capturas del simulador: no ejecutan la app en el navegador. Las decisiones de persistencia, accesibilidad y movimiento permiten descargar fragmentos Swift de un commit local específico, con su procedencia en la cabecera. El repositorio público enlazado conserva una versión anterior.

La demo dura 20 segundos y concatena bienvenida y recorrido. El laboratorio incluye la celebración de Loopy, una comparación con texto grande y el trazo del recorrido. Las pantallas comienzan al entrar en vista cuando el movimiento está habilitado; se pausan al salir, esconder la pestaña o mediante su control externo. Una pausa manual se conserva al volver a la sección. Un error de carga muestra un enlace de descarga.

`tests/ios.spec.js` cubre el enlace directo, controles, idioma, foco, reproducción real, carga diferida, errores de medios y accesibilidad de los tres capítulos en ambos temas. La procedencia del material y sus límites están documentados al final de `docs/content-sources.md`.

La investigación, procedencia de capturas, diagnóstico y siguientes prioridades están en [docs/content-sources.md](docs/content-sources.md#actualización-del-9-de-noviembre-de-2026). `tests/project-refresh.spec.js` cubre selección, archivo, proyectos sin demo, texto traducido, medios, foco y accesibilidad de las nuevas fichas.

`tests/visual-polish.spec.js` comprueba reproducción integrada, pausa manual/global, fondos que descansan fuera de pantalla, fallback del nuevo 3D y ausencia de notas editoriales visibles en ES/EN. Las órbitas limitan resolución a 1.4× y render a 30 fps, sin modelos ni texturas externas.
