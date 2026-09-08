// El asterisco del logotipo era el carácter ✳ (U+2733). Manrope no lo incluye,
// así que cada sistema lo resolvía por sustitución de fuentes: en escritorio la
// cadena llega a una fuente de símbolos monocroma, pero en iOS y Android llega
// antes a la fuente de emoji de color, y el logotipo cambiaba de forma según el
// teléfono. El selector de variación U+FE0E no corrige eso de forma fiable, así
// que la marca se dibuja aquí y deja de depender de las fuentes del sistema.
//
// La geometría se midió sobre el glifo de texto que se ve en escritorio: ocho
// radios iguales que llegan al borde de una caja cuadrada, con un trazo del
// 5,3 % de esa caja. Hereda el color por currentColor y el tamaño por em, así
// que las reglas de tamaño que ya existían siguen mandando.
export default function Asterisk({ className, ...props }) {
  return (
    <svg
      className={["asterisk", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.28"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 0v24M0 12h24M3.51 3.51 20.49 20.49M20.49 3.51 3.51 20.49" />
    </svg>
  );
}
