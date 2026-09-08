# Personalización pública de Input y Textarea — 2026-09-08

## Resultado

La observación del propietario cambia el criterio de revisión: la coherencia de
los valores no basta. Las decisiones visuales que una persona deba personalizar
necesitan una API pública de tokens, controles y documentación conectados. El
criterio global está registrado en ADR 0293 y en AGENTS.md.

Esta ampliación incorpora seis decisiones de fuente para Input, compartidas
por Textarea. Conserva las capas existentes, los modos y los nombres públicos
anteriores. Los valores por defecto siguen siendo los del piloto aprobado.

| Control | Fuente | Valor inicial | Alias público |
| --- | --- | --- | --- |
| Label gap | `component.input.labelGap` | 4 px | `--space-input-label-gap` |
| Message gap | `component.input.messageGap` | 4 px | `--space-input-message-gap` |
| Border width | `component.input.borderWidth` | 1 px | `--border-input-width` |
| Focus width | `component.input.focusRingWidth` | 4 px | `--border-input-focus-ring-width` |
| Focus offset | `component.input.focusRingOffset` | 0 px | `--border-input-focus-ring-offset` |
| Label weight | `component.input.labelFontWeight` | 500 | `--typo-input-label-weight` |

Los tokens ya existentes de Bottom margin, Font family y Disabled opacity ahora
también tienen controles en Studio. Radius sigue usando `--radius-md`; modificarlo
en Studio se limita al ámbito del preview. Se conservan los controles de Fill,
Border y demás colores por variante/estado, padding, iconos, tamaños de texto y
líneas. No se duplicaron esos tokens ni se cambiaron sus nombres.

Las separaciones ahora pertenecen al label y al mensaje mediante márgenes que
consumen sus tokens. El piloto no repite un número para reconstruir el espaciado.
Se añadió `display: block` al campo para eliminar el espacio de línea base que
el navegador dejaba bajo Textarea: el contenedor medía 127 px para un campo de
120 px, añadiendo 7 px a la distancia visible al mensaje.

## Exhibit y Studio

Exhibit incluye una referencia desplegable de controles visuales, derivada del
contrato y de la misma metadata que configura Studio. La referencia se muestra
para los componentes con renderer y controles de tokens disponibles; enumera la
superficie existente, sin afirmar que ya esté completa para todos ellos.

Input y Textarea comparten el resolver de selección de tokens con esta referencia.
Las vistas siguen renderizando el CSS canónico del adaptador web. Studio permite
probar valores localmente; no guarda esas modificaciones en la fuente del repo.
Para cambiar los defaults oficiales se editan los tokens fuente y se regeneran
las salidas; un consumidor puede sobrescribir la API pública en su propio tema.

## Evidencia

- Fuente y build: 348 rutas canónicas; 2.784 comparaciones del catálogo con las
  ocho matrices del compilador. La paridad legacy conserva 1.608 comparaciones.
- Compatibilidad CSS: 219 referencias públicas definidas en la salida web.
- Registro, contratos, metadata Studio, decisiones y documentación: validaciones
  correctas. TypeScript y build Vite correctos; `site/dist` no se modificó.
- Adaptadores web y Shopify regenerados y validados. Se actualizó la copia CSS
  de primitivas en Webflow, sin migrar su pipeline heredado de tokens.
- Chromium, Input y Textarea, Light/Dark: se cambiaron Label gap a 8 px, Message
  gap a 12 px, Border width a 3 px, Radius a 16 px, Label weight a 700, Focus width
  a 6 px y Focus offset a 2 px. Las mediciones del componente reflejaron esos
  valores. Reset restauró los valores iniciales en ambos componentes y temas.
- Exhibit de Input/Textarea muestra los controles de separación, borde, radio,
  colores, peso y foco desde su metadata.
- Piloto: 8 casos × 2 temas × 4 anchos (390/800/1200/1600), con 4 px en ambas
  separaciones, campos y botones de 46 px y alineación horizontal cuando aplica.
- Sobrescritura directa de tokens públicos en el contenedor del piloto: los ocho
  casos reflejaron separaciones de 8/12 px, borde de 3 px y radio de 16 px.
  El fondo del Input por defecto respondió al token público de Fill.
- El navegador y servidor de evidencia se cerraron; el control de limpieza pasó.

Capturas locales: `output/playwright/input-public-customization.png` y
`output/playwright/input-exhibit-customization.png`.

## Alcance pendiente

Esta es la primera ampliación de cobertura; no significa que los 182 componentes
ya expongan todas sus decisiones visuales. Continuar con Button y los demás
campos, después formularios compuestos y composiciones comerciales. Cada uno
necesita inventario, trazabilidad, prueba con valores distintos y revisión.

Input todavía conserva decisiones de presentación internas documentadas, entre
ellas el estilo de borde continuo, las mezclas de contraste y la geometría global
del marcador requerido. Deben revisarse si se requiere personalizarlas. Display,
posicionamiento de iconos, wrapping y el cero que desactiva el antiguo gap
compartido son mecanismos de composición, no nuevos controles visuales.

Modificar borde o padding puede cambiar la altura. Modificar colores o foco
requiere comprobar legibilidad y visibilidad en la composición resultante. Estas
pruebas no certifican accesibilidad completa, otros navegadores, todas las
composiciones consumidoras ni Figma/Shopify remoto. No se promovió madurez de
componentes, no se hizo publicación ni se migraron copias de consumidores.
