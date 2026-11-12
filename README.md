# Juan Pablo Orihuela — Portafolio

Portafolio de frontend y UI/UX con videojuegos como diferenciador, en React + Vite. Una selección de proyectos reales, capturas locales, fichas de proyecto, experimentos de interacción y contacto directo.

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

`.github/workflows/ci.yml` repite esa verificación en cada push y pull request. `npm run size` mide en gzip lo que el navegador descarga para la primera pintura —los archivos que `dist/index.html` referencia— y falla si supera el presupuesto de `scripts/check-bundle-size.mjs`. Los chunks que llegan por `import()`, como Three.js y la ficha de proyecto, quedan fuera de esa cuenta porque no bloquean la portada.

```sh
npm run build
npm run preview
```

El resultado estático se genera en `dist/`. `vercel.json` conserva los accesos anteriores (`/web`, `/apps`, `/games`, `/about`) mediante el fallback de la SPA. La aplicación dirige esos accesos a la sección y filtro correspondientes.

## Contenido

- `src/data/portfolio.js`: perfil, proyectos, capturas, enlaces y descripciones.
- `src/data/en.json`: traducciones al inglés; las claves son los textos originales en español.
- `public/projects/`: capturas reales optimizadas a WebP, sin dependencia de servicios externos en tiempo de ejecución.
- `public/videos/`: tráiler y gameplay de We Can Fix This aportados por el autor, con posters extraídos de los videos.
- `public/JuanPabloOrihuela_CV.pdf`: CV original; sustituir este archivo para actualizar la descarga.
- `docs/content-sources.md`: procedencia y límites del contenido.

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
- `src/components/three/`: escultura procedural Three.js, cargada al acercarse a la sección de proceso.
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

Motion gestiona las transiciones, el parallax de la portada y el relato de tres momentos del proceso. El texto de roles usa un efecto de escritura con cursor. El scroll sigue siendo nativo, sin secuestrar la rueda ni el gesto táctil.

Three.js renderiza una escultura que pasa de estructura a material y movimiento con el scroll y responde al puntero. El motor se importa bajo demanda; limita la resolución y la frecuencia de renderizado, se detiene fuera de pantalla o con la pestaña oculta y libera sus recursos al desmontarse. Si WebGL no está disponible, queda una composición estática y todo el contenido sigue accesible. El chunk independiente de Three.js supera el umbral orientativo de 500 kB de Vite; no forma parte de la carga inicial de la portada.

El tema sigue al sistema hasta elegir uno con el control de la cabecera; la preferencia se aplica antes del primer render y se conserva al recargar. El botón de pausa y `prefers-reduced-motion` desactivan la escritura animada, el parallax y el movimiento continuo del 3D. El almacenamiento local es opcional: si está bloqueado, los controles siguen funcionando durante la visita.

Los videos tienen controles nativos y se descargan únicamente después de pulsar reproducir. Cambiar entre tráiler y gameplay detiene el anterior; salir de pantalla o cambiar de pestaña pausa el video. Las fuentes se distribuyen localmente a través de Fontsource.

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

La portada presenta Nexo CRM, Brassbound, ROMI y We Can Fix This. El filtro Todos abre el catálogo de once proyectos, incluidos Loop y ROMImente. Los filtros Web, Videojuegos e iOS & Mobile conservan las rutas anteriores. Las fichas y la paleta siguen disponibles aunque un proyecto no esté en la selección inicial.

`featured` controla la selección; `proof` resume lo que demuestra una tarjeta; `verification` y `scope` añaden evidencia y límites a las fichas. `video` permite incluir gameplay sin descarga ni reproducción automática. Una ficha web puede tener solo código, sin URL de demo.

La investigación, procedencia de capturas, diagnóstico y siguientes prioridades están en [docs/content-sources.md](docs/content-sources.md#actualización-del-9-de-noviembre-de-2026). `tests/project-refresh.spec.js` cubre selección, archivo, proyectos sin demo, evidencia traducida, medios, foco y accesibilidad de las nuevas fichas.
