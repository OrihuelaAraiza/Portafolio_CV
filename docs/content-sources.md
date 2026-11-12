# Fuentes del contenido

Revisión realizada el 7 de septiembre de 2026. Se consultaron los repositorios públicos de `OrihuelaAraiza`, sus README/package.json, los sitios asociados y los materiales ya presentes en este repositorio. No se consultaron repositorios privados ni se incorporaron credenciales.

## Perfil

- Nombre, correo, Ciudad de México, formación, trabajo con SwiftUI y reconocimientos: `public/JuanPabloOrihuela_CV.pdf` existente.
- Roles actuales: el autor confirmó el 7 de septiembre de 2026 que es **CTO de ROMI** e **iOS Developer en la consultora e-tribe**, con **Grupo Salinas** como cliente. Esta actualización prevalece sobre los cargos anteriores del perfil público y del CV. No se inventan fechas de incorporación.
- Stack web: [README del perfil público](https://github.com/OrihuelaAraiza/OrihuelaAraiza) y código de los proyectos.
- LinkedIn: enlace existente en el portafolio original.
- El PDF del CV se conserva como documento aportado; su contenido y sus enlaces pueden requerir una actualización editorial independiente.
- Se evitaron métricas de impacto, años de experiencia y resultados comerciales que no estuvieran documentados.

## Proyectos y capturas

| Proyecto     | Evidencia                                                                                                           | Capturas incluidas                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ROMI         | [Repositorio](https://github.com/OrihuelaAraiza/ROMI_Web), [sitio](https://romiweb.vercel.app/es), perfil del autor | Inicio y sección de ecosistema del sitio publicado, 1440 × 1000                                                                                       |
| One Pharmacy | [README y código](https://github.com/OrihuelaAraiza/One_Pharmacy), [demo](https://one-pharmacy-liard.vercel.app)    | Inicio y catálogo capturados en el sitio publicado, 1440 × 1000                                                                                       |
| BreveMente   | [README](https://github.com/OrihuelaAraiza/Brevemente), [demo](https://brevemente-blond.vercel.app)                 | Panel de inicio usando el perfil profesional de demostración del propio sitio, 1440 × 1000. Los nombres que aparecen son datos de ejemplo del demo    |
| Book Digital | [Repositorio](https://github.com/OrihuelaAraiza/Book-Digital), [sitio](https://book-digital.vercel.app)             | `web1.png` y `web3.png`, originales aportados en el repositorio (ver nota de originales)                                                                           |
| Mi Campo     | [Repositorio y créditos del equipo](https://github.com/OrihuelaAraiza/Mi_Campo), vistas SwiftUI del proyecto        | `IMG_5933.PNG`, `IMG_5934.PNG`, `IMG_5935.PNG` del repositorio original, donde la colección se llamaba Smart Cultivos (ver nota de originales)                                 |
| UPocket      | Datos originales en `src/pages/Apps.jsx` del historial de Git y CV                                                  | `IMG_5931.PNG` y `IMG_5930.PNG` originales (ver nota de originales). Sin fecha de proyecto comprobada: se muestra “Prototipo” y no se inventa un año ni un enlace a una tienda |

**Nota de originales.** Los PNG de origen (`src/assets/web/`, `src/assets/apps/`) se retiraron del árbol de trabajo porque ningún componente los importaba y no formaban parte del build. Siguen versionados en el historial de git y se recuperan con `git show c6aa0ad:src/assets/web/web1.png > web1.png`. Las capturas WebP publicadas en `public/projects/` son las derivadas de esos originales.

Las capturas se convirtieron a WebP sin alterar el contenido de las interfaces. Los marcos y la perspectiva son presentación CSS del portafolio. Las imágenes de Book Digital y las aplicaciones móviles documentan versiones anteriores; no se presentan como capturas nuevas de una aplicación instalada.

Las fechas de los proyectos web identifican la versión documentada en el repositorio, no el inicio de una relación laboral. Los textos de las fichas describen la interfaz y la implementación observables; no atribuyen resultados comerciales ni propiedad exclusiva de trabajos colaborativos.

## Exploraciones

- [SoundVision](https://github.com/OrihuelaAraiza/SoundVision): prototipo nativo visionOS, grafo 3D y audio espacial, documentados en su README. Se enlaza el código y no se inventa una captura del dispositivo.
- [We Can Fix This](https://github.com/OrihuelaAraiza/We_Can_Fix_This_): prototipo cooperativo Unity, documentado en el perfil público. Se enlaza el repositorio y se muestran los dos videos proporcionados por el autor en la carpeta `Assets` del workspace:
  - `WhatsApp Video 2026-05-18 at 23.07.13.mp4`: tráiler, aproximadamente 43 segundos, 832 × 464, con audio.
  - `WhatsApp Video 2026-05-19 at 15.50.26.mp4`: demo de gameplay, aproximadamente 2 minutos 21 segundos, 736 × 480, sin pista de audio.
  - Las copias de `public/videos/` conservan el contenido, duración y resolución. Se recodificaron a H.264 con metadatos al inicio del archivo para reproducción progresiva; los posters WebP son fotogramas de esos videos. Los originales permanecen intactos.
- La escultura de la sección de proceso se genera con Three.js mediante geometría y materiales procedurales. Es una pieza interactiva del portafolio, no un modelo extraído del videojuego ni una captura de otro proyecto.

Los cuatro enlaces de demo web respondieron con HTTP 200 en la fecha de revisión. El funcionamiento interno, las APIs o los pagos de esos proyectos no forman parte de la validación de este portafolio. BreveMente usa una demo con datos de ejemplo y almacenamiento local según su README; se identifica como prototipo.

## Actualización del 9 de noviembre de 2026

Prioridad indicada por el autor: **frontend con videojuegos como diferenciador**. Se revisaron composición React, providers, datos y traducciones, fichas, navegación y foco, formulario, carga del motor 3D, estilos, metadata, scripts de build y suite Playwright. El análisis del portafolio no equivale a auditar o ejecutar las pruebas de todos los proyectos presentados.

### Decisiones aplicadas

- Cuatro casos al entrar: Nexo CRM, Brassbound, ROMI y We Can Fix This. El filtro Todos conserva el archivo completo de once proyectos. Web, Videojuegos e iOS & Mobile permiten profundizar sin hacer interminable la portada.
- Frontend aparece primero en los roles y en la presentación. Las ventanas de la portada muestran Nexo y Brassbound, con capturas reales; el reel tiene acceso directo desde la portada y la navegación.
- Videojuegos pasa antes de la sección de proceso. El puente entre ambas disciplinas se explica mediante estados, feedback y movimiento; no se inventan experiencia profesional en estudios ni títulos publicados.
- Las fichas nuevas explican reto, interfaz, implementación, evidencia disponible y límites. Los roles y estados aparecen también en las tarjetas. Los enlaces a demos o código solo se muestran cuando se conoce un destino.
- Las traducciones ES/EN, búsqueda de comandos, enlaces directos, JSON-LD e imagen social acompañan el nuevo catálogo. El presupuesto de carga inicial se conserva.

### Procedencia de las incorporaciones

| Proyecto | Evidencia revisada | Capturas y límites |
| --- | --- | --- |
| Nexo CRM | README, `public/agent-visual-data.mjs`, `public/agent-visuals.mjs`, `server/agent.mjs` y pruebas del checkout `nexo-crm`; [sitio público](https://nexo-electrodomesticos-crm.jp-orihuela.chatgpt.site) confirmado mediante Sites | Resumen y Clientes capturados el 9 de noviembre a 1440 × 1000. Datos de ejercicio y correos example.com. Las cifras son del dataset, no resultados comerciales atribuibles al autor. Sin repositorio público verificado: se ofrece la demo. |
| Brassbound | [README y código público](https://github.com/OrihuelaAraiza/brassbound-atm10), módulos `tutorial-*`, `ponder-*` y estilos del checkout; [sitio público](https://brassbound-atm10-jp.jp-orihuela.chatgpt.site) confirmado mediante Sites | Inicio y Tutoriales capturados a 1440 × 1000, sin sesión personal. Progreso manual, sin conexión a Minecraft. Las escenas CSS 3D son ilustrativas. |
| Loop | README y manifiesto de capturas del checkout `loop_app`; [repositorio público](https://github.com/OrihuelaAraiza/loop) | `docs/desarrollo/capturas/bloque-i/ios26.5/i-detalle-3-es-claro-normal.png` e `i-recorrido-3-es-claro-normal.png`, convertidas a WebP y reducidas a 600 px de ancho sin alterar el contenido. Datos sintéticos visibles. El README vigente mantiene requisitos de lanzamiento pendientes; no se ofrece un enlace a App Store. El código público puede no contener el mismo corte local de las capturas. |
| ROMImente | [Repositorio público](https://github.com/OrihuelaAraiza/romimente-amparo-demo), README y persistencia en `public/assets/core.js` y `workflows.js` del checkout `RomiMente` | Dashboard capturado en localhost, 1440 × 1000, entrando al perfil ficticio Elena Ríos. No se incorporaron datos clínicos reales. No se verificó una URL pública de esta versión; se ofrece el código. |
| We Can Fix This | [README público vigente](https://github.com/OrihuelaAraiza/We_Can_Fix_This_/blob/main/README.md), Unity 2022.3.62f3, URP e Input System, escenas, roles y pruebas documentadas | Reutiliza los videos y posters originales de mayo. Se aclara que el juego es cooperativo local para 1–4 jugadores. El README posterior no convierte el video anterior en evidencia de todas las funciones actuales. Proyecto colaborativo; no se atribuye propiedad exclusiva de cada sistema. |

Las imágenes nuevas son capturas de interfaces y conversiones de formato. No se generaron pantallas ficticias. No se modificó el código de los otros proyectos para actualizar este portafolio.

### Investigación y siguientes mejoras propuestas

Fuentes consultadas el 9 de noviembre de 2026:

- [GitHub Docs — Using your GitHub profile to enhance your resume](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume): destacar 3–5 proyectos relevantes y facilitar su evaluación con una descripción, demo, instrucciones y pruebas. La selección de cuatro casos aplica ese criterio al sitio.
- [Epic Games — Career Paths](https://www.epicgames.com/site/earlycareers/career-paths?lang=en-US): acceso directo a las mejores muestras, aportación individual explícita en trabajo colaborativo y documentación técnica. Se adelantan los enlaces de demo/código en las fichas y se propone completar créditos específicos antes de atribuir sistemas del juego.
- [Riot Games — Portfolio and Reel Suggestions](https://www.riotgames.com/en/portfolio-and-reel-suggestions): selección de las mejores piezas, acceso sencillo y proceso de resolución. Sus indicaciones por disciplina están dirigidas principalmente a portafolios artísticos; se usa el criterio general de selección, no como requisito específico de contratación frontend. El tráiler existente dura 43 segundos.
- [web.dev — Web Vitals](https://web.dev/articles/vitals): evaluar carga, respuesta y estabilidad. Sus objetivos de campo son LCP ≤ 2.5 s, INP ≤ 200 ms y CLS ≤ 0.1 en el percentil 75. El peso de bundles y las pruebas locales de este repositorio **no prueban** esos resultados de campo.

Prioridades siguientes, sujetas a evidencia o materiales que aún faltan:

1. **Aportación personal en We Can Fix This:** documentar módulos y decisiones del autor con commits o créditos, y un pequeño antes/después técnico. La ficha actual explica el proyecto sin atribuir todos sus sistemas a una persona.
2. **Build jugable:** publicar una versión descargable o WebGL solo cuando exista una build probada y se haya definido distribución y créditos. Por ahora, reel y código permiten evaluar el trabajo.
3. **CV consistente:** actualizar el PDF con la selección reciente y el enfoque frontend, conservando solo fechas, roles y logros confirmados. El PDF aportado sigue intacto.
4. **Resultados medidos:** incorporar un resultado verificable por caso (usabilidad, rendimiento o reducción de pasos), con método, versión y límites. No usar cifras de un dataset como si fueran impacto comercial propio.
5. **Compartir casos:** si las fichas atraen tráfico de búsqueda, generar páginas HTML independientes por proyecto e idioma con metadata propia. La SPA conserva los enlaces `?project=`; los bots sin JavaScript reciben la portada y el catálogo JSON-LD.
6. **Perfil de GitHub:** alinear el README de perfil y los repositorios fijados con los casos del portafolio, comprobando instrucciones de arranque y créditos. No se modificó el perfil externo en esta tarea.
7. **Rendimiento real:** medir el despliegue final en móvil y recopilar Core Web Vitals con consentimiento y una muestra útil. La escultura sigue fuera de la carga inicial; el presupuesto actual controla JS/CSS, no fuentes, imágenes, red ni rendimiento de usuarios reales.

Hermes se revisó como posible incorporación, pero no se añadió a la selección: su documentación disponible describe navegación de un prototipo y aporta menos evidencia que Loop para el objetivo frontend. SoundVision conserva su lugar como exploración espacial. El archivo de proyectos anteriores permanece accesible.

### Validación de esta actualización

`npm run check` completado: ESLint, build, presupuesto y **116 pruebas aprobadas**, con dos casos de menú móvil omitidos deliberadamente en el proyecto de escritorio. La suite cubre filtros, archivo completo, fichas nuevas en ES/EN, medios, navegación por teclado, foco, videos, formularios, SEO y comprobaciones axe.

Revisión visual a 320, 390, 1024 y 1440 px, sin desbordamiento horizontal observado. Seis URLs de demo respondieron HTTP 200; eso no certifica sus servicios internos. Carga inicial de JS/CSS: **174.6 / 19.1 kB gzip**, dentro de los límites existentes de 175 / 20 kB. El chunk 3D conserva el aviso orientativo de Vite por superar 500 kB sin comprimir, y sigue cargándose bajo demanda. No se realizó una auditoría manual completa de accesibilidad ni medición de Core Web Vitals de campo.

La verificación anterior corresponde al checkout local previo a la publicación. El despliegue debe cotejarse con el commit publicado en `main`. El CV PDF se conserva sin cambios.

## Actualización del 12 de noviembre de 2026

Petición del autor: mejoras visuales sin rediseño —fondos animados, efectos y narrativa— usando librerías y recursos de terceros, con libertad para tomar material de sus otros repositorios.

### Material incorporado de otros repositorios

Se leyeron los README públicos de `OrihuelaAraiza`. No se consultaron repositorios privados ni se modificó ninguno.

| Entrada | Evidencia revisada | Texto y límites |
| --- | --- | --- |
| Visuaid | [README de VisualAid](https://github.com/OrihuelaAraiza/VisualAid): app SwiftUI con detección de color dominante, OCR con lectura por voz, filtros de daltonismo y detección de formas | Se describe lo que el README documenta. Proyecto académico; no se afirma publicación ni uso por terceros. Sin capturas: se enlaza el código. |
| B-lance | [README de B-Lance](https://github.com/OrihuelaAraiza/B-Lance) y `package.json` (React 19, TypeScript, Motion, Vite): check-in de unos dos minutos, rutas de autorregulación y pausa sensorial guiada | Se conserva el límite que el propio README declara: es una maqueta, no diagnostica ni sustituye atención profesional. |
| AR Labs | [README de VR](https://github.com/OrihuelaAraiza/VR): laboratorios Unity con AR Foundation y ARKit, seguimiento de una y de dos imágenes | Laboratorios de curso. Se nombra «AR Labs» en el portafolio; el repositorio se llama `VR`. |
| Prólogo | Formación en Ingeniería en Animación y Videojuegos (CV) y enfoque declarado en el [README de perfil](https://github.com/OrihuelaAraiza/OrihuelaAraiza): interfaces «that feel alive», motion y scrollytelling | Las tres cifras son comprobables en el propio sitio: proyectos del catálogo (se calcula de `projects.length`), plataformas con trabajo enlazado (web, iOS, visionOS, Unity) y los dos reconocimientos que ya figuraban en el perfil. |

El README de perfil describe el rol en ROMI como Frontend Developer; el portafolio mantiene **CTO de ROMI**, confirmado por el autor el 7 de septiembre de 2026. Conviene alinear ese README. Vida Líquida y MySafeBox aparecen ahí como trabajo destacado pero no se incorporaron: no se revisó evidencia suficiente para redactar una ficha.

### Recursos y librerías

- [React Bits](https://reactbits.dev/) (código en [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits), MIT + Commons Clause): se revisaron `Dither`, `ScrollVelocity`, `ScrollReveal`, `Magnet` y `SpotlightCard` como referencia de patrones. El repositorio ya apuntaba a este registro en `jsrepo.json`. Los componentes del portafolio están escritos para sus tokens, su control de movimiento y su presupuesto; no son copias.
- [OGL](https://github.com/oframe/ogl) para el shader del fondo y [Lenis](https://lenis.darkroom.engineering/) para el scroll suave, ambos cargados bajo demanda.
- Se descartaron GSAP (duplicaría a Motion, que ya está en la carga inicial) y los fondos basados en three.js + postprocesado (el tramado cabe en un solo pase).

### Validación

`npm run check` completado: ESLint, build, presupuesto (179.3 / 22.2 kB gzip, límites 181 / 24) y la suite de Playwright en escritorio y móvil, que suma `tests/enhancements.spec.js` para la capa nueva. Revisión visual a 390 y 1440 px en ambos temas, con movimiento completo. Las capturas se hicieron con WebGL por software; no se midió rendimiento en dispositivos reales ni Core Web Vitals de campo.
