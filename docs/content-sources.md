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
