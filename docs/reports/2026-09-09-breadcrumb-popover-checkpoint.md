# Checkpoint: Breadcrumb y Popover

Fecha: 2026-09-09. ADR 0331. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Dieciséis tokens nuevos y pesos compartidos completan 19 roles públicos en
Breadcrumb y 26 en Popover. Se editan geometría, padding, límites, flecha y foco
sin cambiar CSS. Factores responsive conservan la base compartida. El grosor
`auto` del subrayado Breadcrumb sigue dependiendo de la fuente; no se inventó
un valor numérico. Colocación, destinos, contenido y comportamiento permanecen
separados de las decisiones visuales.

Popover tenía dos divergencias comprobadas. En RTL, su flecha conservaba la
rotación pero cambiaba los bordes físicos y parecía apuntar hacia un lado;
ahora conserva los trazos superiores y su posición sigue la dirección. Studio
imponía ancho y campos de 32px que imitaban Input. Ahora muestra los límites de
Popover, compone InputArtwork y reserva la altura real. Exhibit y el ejemplo de
migración de Popup usan anatomía Input completa y el mismo criterio de espacio
local. El contrato Popover sigue permitiendo contenido arbitrario.

## Evidencia local

- Chromium: 168 mediciones de elementos en ocho matrices de tema/viewport
  comparan CSS canónico anterior y actual con geometría, tipografía y colores
  iguales en LTR. La corrección RTL y el cambio de fixture se reconocen aparte.
- Breadcrumb: padding 8px, gaps de fila/segmento 10/12px, peso 700 y mínimo de
  enlace 60px; subrayado relativo 0.4em y foco 3px/offset 5px. Destino nativo
  funciona. Texto largo RTL a 280px conserva la jerarquía, un aria-current y
  separadores ocultos a AT; no desborda horizontalmente en la muestra.
- Popover: padding 10/20px, mínimo/máximo 288/416px, borde 3px, flecha 16px,
  posición vertical -11px e inline 30px, título gap 12px/peso 700. El ancho
  intrínseco observado 326.55px está entre límites: no se confunde máximo con
  ancho fijo. El desplazamiento cerrado de 12px no modifica colocación abierta.
- Flecha RTL anterior reproduce bordes top/right; la actual top/left. Capturas
  antes/después revisadas visualmente confirman la orientación; sus distintos
  tamaños corresponden a defaults antiguos frente a tokens personalizados,
  no se presentan como una comparación de paridad de tamaños.
- Viewport 320px con texto largo RTL respeta 260px disponibles tras un gutter
  total de 60px. Colores forzados conservan geometría y eliminan sombra;
  movimiento reducido elimina transiciones en ambos componentes.
- Studio: controles de geometría afectan el resultado; Popover alcanza 416px
  mediante sus tokens, sin el viejo tope de 320px. Los cuatro campos completos
  se editan y sobreviven al cierre. Reset restaura valores y tokens. Tab entra
  al primer Input y sale del último, Escape devuelve foco al trigger, cierre
  exterior y Show arrow funcionan independientemente.
- La composición predeterminada mantiene Button e Input a 46px de altura.
  Cambiar el token Input label-gap produce margen de 12px en los campos de
  Popover. La prueba mide margin-block-end, no confunde ese espaciado con gap.
- Exhibit Popover y la migración Popup a 390px reservan la altura de sus cuatro
  campos y mantienen ancho 263px dentro de 326px. Studio RTL estrecho tampoco
  desborda. Exhibit enumera las nuevas referencias.
- Fuente/paridad legacy, catálogo 758 rutas/6064 comparaciones, contratos,
  Studio, docs, TypeScript, adapters y consumidor CLI pasan. Auditorías mantienen
  madurez; los dos avisos de rendimiento Shopify siguen siendo advisory.

Evidencia ignorada en `output/playwright/trail-popover-values/`: mediciones,
resultados de Studio/composición y capturas. La fixture fue retirada y el gate
confirmó navegador cerrado. Servidor preexistente preservado.

## Límites y continuidad

No hay certificación de Safari/Firefox, lectores de pantalla, escritura vertical,
colisión/flip/portales o popover nativo en top layer. Tokens de flecha muy grandes,
bounds contradictorios y contenido arbitrario requieren revisión contextual;
CSS mantiene su comportamiento nativo de mínimo sobre máximo. El cambio de
fixture es una composición real de Input, no una nueva apariencia aprobada del
contenido de todos los Popover.

Ambos permanecen pilot. Web y Shopify se regeneran para adopción copy-and-own;
sin subida remota, site/dist ni Figma. Continúan Dropdown Menu y Context Menu.
