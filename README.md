# Juan Pablo Orihuela — Portafolio

Portafolio de frontend y UI/UX en React + Vite. Una selección de proyectos reales, capturas locales, fichas de proyecto, experimentos de interacción y contacto directo.

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

`check` ejecuta ESLint, el build de producción, el presupuesto de carga inicial y pruebas de navegador en escritorio y móvil. Playwright cubre filtros, galerías, Escape y restauración del foco, enlaces directos, historial, menú móvil, carga de capturas, descarga del CV, portapapeles, temas, preferencias de movimiento, scroll 3D y reproducción real de los videos. Cubre además la paleta de comandos, el formulario de contacto, la transición compartida al abrir una ficha y el marcado generado para buscadores. Las auditorías automáticas con axe revisan la página, el diálogo, la paleta y el formulario con sus errores visibles, en ambos temas.

`.github/workflows/ci.yml` repite esa verificación en cada push y pull request. `npm run size` mide en gzip lo que el navegador descarga para la primera pintura —los archivos que `dist/index.html` referencia— y falla si supera el presupuesto de `scripts/check-bundle-size.mjs`. Los chunks que llegan por `import()`, como Three.js y la ficha de proyecto, quedan fuera de esa cuenta porque no bloquean la portada.

```sh
npm run build
npm run preview
```

El resultado estático se genera en `dist/`. `vercel.json` conserva los accesos anteriores (`/web`, `/apps`, `/games`, `/about`) mediante el fallback de la SPA. La aplicación dirige esos accesos a la sección y filtro correspondientes.

## Contenido

- `src/data/portfolio.js`: perfil, proyectos, capturas, enlaces y descripciones.
- `public/projects/`: capturas reales optimizadas a WebP, sin dependencia de servicios externos en tiempo de ejecución.
- `public/videos/`: tráiler y gameplay de We Can Fix This aportados por el autor, con posters extraídos de los videos.
- `public/JuanPabloOrihuela_CV.pdf`: CV original; sustituir este archivo para actualizar la descarga.
- `docs/content-sources.md`: procedencia y límites del contenido.

Para añadir un proyecto, completa su entrada en `portfolio.js` y agrega las capturas locales. Los proyectos móviles usan al menos dos capturas. Los botones de demo y código se muestran solo cuando existe un enlace. Cada ficha admite un enlace directo, por ejemplo `/?project=romi`.

## Buscadores y enlaces compartidos

`src/data/site.js` es el único lugar donde vive el dominio. A partir de él, `plugins/vite-plugin-seo.js` genera durante el build el `title`, la descripción, las etiquetas OpenGraph, el enlace canónico, `robots.txt` y `sitemap.xml`, más un JSON-LD con el perfil y los seis proyectos leído del mismo `portfolio.js` que dibuja las fichas: el marcado estructurado no puede describir proyectos que ya no existen. Cambiar de dominio es cambiar una línea.

`scripts/generate-og-image.mjs` dibuja `public/og-image.png` a 1200 × 630 con el Chromium que ya instala Playwright, incrustando las fuentes desde `node_modules`. No añade dependencias y el resultado es idéntico en cada ejecución.

## Interfaz y arquitectura

- `src/components/portfolio/`: secciones y componentes de presentación.
- `src/components/ProjectDetail.jsx`: ficha con galería, cargada bajo demanda.
- `src/components/three/`: escultura procedural Three.js, cargada al acercarse a la sección de proceso.
- `src/components/AppearanceProvider.jsx`: tema claro/oscuro y pausa de movimiento con persistencia opcional en el navegador.
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

El contacto ofrece tres caminos: el enlace de correo, el botón de copiar la dirección y un formulario que valida en el navegador y arma el mensaje. El formulario no envía nada por la red: al validarse abre el cliente de correo con el asunto y el cuerpo ya escritos, y deja el mismo texto en pantalla por si no hay cliente configurado. La validación es propia, sin librería de formularios, y marca los campos solo después del primer intento de envío, con `aria-invalid`, mensajes enlazados por `aria-describedby` y el foco puesto en el primer campo con problema. No hay envíos simulados, analytics ni llamadas a GitHub desde el navegador.

## Recursos externos

- [shadcn/ui](https://ui.shadcn.com/docs/installation/vite), componentes incorporados desde su registro oficial (MIT).
- [Radix Primitives](https://www.radix-ui.com/primitives), comportamiento de diálogos, tabs y tooltips (MIT).
- [Motion for React](https://motion.dev/docs/react), animación y preferencias de movimiento (MIT).
- [Three.js](https://threejs.org/), geometría, materiales e interacción 3D procedural (MIT).
- [Lucide](https://lucide.dev/), iconos de interfaz (ISC), y Feather a través de [React Icons](https://react-icons.github.io/react-icons/) (MIT).
- [Manrope](https://fontsource.org/fonts/manrope), [DM Sans](https://fontsource.org/fonts/dm-sans) y [DM Mono](https://fontsource.org/fonts/dm-mono), mediante Fontsource (SIL Open Font License).
- [Playwright](https://playwright.dev/) y [axe-core](https://github.com/dequelabs/axe-core), verificación del navegador y accesibilidad.

Una auditoría automática sin incidencias no equivale a una certificación de accesibilidad ni a pruebas físicas en iPhone. Las capturas de otros proyectos documentan su apariencia; las pruebas de este repositorio cubren el portafolio.
