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

`check` ejecuta ESLint, el build de producción y pruebas de navegador en escritorio y móvil. Playwright cubre filtros, galerías, Escape y restauración del foco, enlaces directos, historial, menú móvil, carga de capturas, descarga del CV, portapapeles y auditorías automáticas de accesibilidad con axe.

```sh
npm run build
npm run preview
```

El resultado estático se genera en `dist/`. `vercel.json` conserva los accesos anteriores (`/web`, `/apps`, `/games`, `/about`) mediante el fallback de la SPA. La aplicación dirige esos accesos a la sección y filtro correspondientes.

## Contenido

- `src/data/portfolio.js`: perfil, proyectos, capturas, enlaces y descripciones.
- `public/projects/`: capturas reales optimizadas a WebP, sin dependencia de servicios externos en tiempo de ejecución.
- `public/JuanPabloOrihuela_CV.pdf`: CV original; sustituir este archivo para actualizar la descarga.
- `docs/content-sources.md`: procedencia y límites del contenido.

Para añadir un proyecto, completa su entrada en `portfolio.js` y agrega las capturas locales. Los proyectos móviles usan al menos dos capturas. Los botones de demo y código se muestran solo cuando existe un enlace. Cada ficha admite un enlace directo, por ejemplo `/?project=romi`.

## Interfaz y arquitectura

- `src/components/portfolio/`: secciones y componentes de presentación.
- `src/components/ProjectDetail.jsx`: ficha con galería, cargada bajo demanda.
- `src/components/ui/`: componentes de shadcn/ui sobre Radix (Button, Dialog, Tabs, Tooltip).
- `src/App.jsx`: composición, progreso de lectura y navegación de las fichas.
- `src/index.css`: tokens, composición editorial, estados y ajustes responsive.

Motion gestiona las transiciones, la aparición de contenido y la respuesta de la portada al puntero. `prefers-reduced-motion` desactiva desplazamientos animados y el efecto de perspectiva. La navegación conserva el scroll nativo. Las fuentes se distribuyen localmente a través de Fontsource.

El contacto abre el cliente de correo o copia la dirección. No hay formularios con envíos simulados, analytics ni llamadas a GitHub desde el navegador.

## Recursos externos

- [shadcn/ui](https://ui.shadcn.com/docs/installation/vite), componentes incorporados desde su registro oficial (MIT).
- [Radix Primitives](https://www.radix-ui.com/primitives), comportamiento de diálogos, tabs y tooltips (MIT).
- [Motion for React](https://motion.dev/docs/react), animación y preferencias de movimiento (MIT).
- [Lucide](https://lucide.dev/), iconos de interfaz (ISC), y Feather a través de [React Icons](https://react-icons.github.io/react-icons/) (MIT).
- [Manrope](https://fontsource.org/fonts/manrope), [DM Sans](https://fontsource.org/fonts/dm-sans) y [DM Mono](https://fontsource.org/fonts/dm-mono), mediante Fontsource (SIL Open Font License).
- [Playwright](https://playwright.dev/) y [axe-core](https://github.com/dequelabs/axe-core), verificación del navegador y accesibilidad.

Una auditoría automática sin incidencias no equivale a una certificación de accesibilidad ni a pruebas físicas en iPhone. Las capturas de otros proyectos documentan su apariencia; las pruebas de este repositorio cubren el portafolio.
