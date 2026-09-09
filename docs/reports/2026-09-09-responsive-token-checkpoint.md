# Salida responsive de tokens — 2026-09-09

## Resultado

ADR 0311 aplica la optimización autorizada. Se mantienen las media queries y las
ocho matrices del sistema, con una base completa por ámbito de tema y sólo las
declaraciones que cambian en cada breakpoint. No se modificaron valores fuente,
nombres públicos, alias, componentes ni controles de marca.

El respaldo anterior era `dbac7f8`, ya subido y sin cambios locales al comenzar.
El generador reproduce de forma determinista las nuevas salidas Web y Shopify.
El tema alojado no se subió ni se publicó en este checkpoint.

| Salida | Antes, bytes crudos | Después, bytes crudos | Antes, gzip | Después, gzip |
| --- | ---: | ---: | ---: | ---: |
| Web | 731 093 | 191 987 | 89 489 | 24 066 |
| Shopify | 731 253 | 192 147 | 89 537 | 24 115 |

Gzip local con `gzip -9 -n -c`: reducción aproximada del **73,1 %**. Esto no mide
la transferencia final del CDN, la carga completa de una página ni su velocidad.
El inventario por target conserva las advertencias configurables de Shopify:
el CSS sigue por encima de su referencia cruda y el JS no cambió.

## Qué cambió

Antes se emitían 911 declaraciones en cada uno de doce bloques. Ahora cada
ámbito de tema conserva 911 en la base y emite 15 a 768px, 38 a 1024px y 14 a
1440px. El total baja de 10 932 a 2 934 declaraciones, con las mismas 911 variables.

El espacio label–Input de 4 px y su alias aparecen tres veces, una por ámbito de
tema, en lugar de doce. Se conservan los límites de tema porque su declaración
local también controla la herencia. H1 y los espacios semánticos que cambian
siguen recibiendo sus valores responsive.

El helper compara expresiones originales y rechaza inventarios diferentes entre
viewports. Preserva referencias distintas aunque hoy resuelvan al mismo número,
y emite un retorno al valor inicial cuando cambia respecto del viewport anterior.
No se introdujeron container queries ni se reorganizó la arquitectura de tokens.

## Evidencia de equivalencia

Se conservaron las dos salidas originales de `dbac7f8` y se compararon con las
nuevas en el mismo documento y navegador, alternando únicamente la hoja de tokens.
La fixture usa CSS canónico y contiene Input, Button, Card y tres niveles de
temas Light/Dark anidados en ambas direcciones.

- **1 008 casos, cero diferencias**, en 56 combinaciones de viewport/preferencias.
- 911 variables comprobadas en 23 elementos, además de estilos calculados,
  variables privadas, geometría y propiedades del pseudo-elemento del label.
  Se realizaron 32 351 760 comparaciones de propiedades/medidas; no son benchmarks
  ni 32 millones de pruebas independientes.
- Anchos: 360, 767, 768, 769, 1023, 1024, 1025, 1439, 1440 y 1441 px.
- Preferencia del sistema Light/Dark, raíz automática/Light/Dark explícita,
  descendientes que heredan y temas anidados con límites locales.
- Seis escenarios: defaults, primitivas personalizadas, API pública personalizada,
  estilos anteriores al target, marca Shopify representativa y overrides inline
  de raíz/componente/tema anidado. La marca utiliza los selectores y bindings del
  snippet actual con valores de muestra; no es una ejecución de Liquid.
- Actualizaciones sucesivas de viewport, tema, estilos de marca y foco; variantes
  de validación del Input alternadas durante la matriz.
- En 360 y 1440px: movimiento reducido, colores forzados, impresión y RTL. Se
  compararon valores/estilos en esas condiciones; no se certifican todas las
  animaciones o interacciones de los componentes.

Se comprobó además el sitio real:

- Input Studio: label gap **4 → 12 → 4 px** mediante Customize, message gap 4 px
  y altura de campo 46 px durante la personalización.
- Composición Contact: Input y Button mantienen **46 px**, tipografía de 16 px y
  separación del label 4 px, en 360/1440px y Light/Dark. Sin overflow horizontal
  de la página en esas cuatro combinaciones.

La evidencia local se conserva en `output/playwright/token-responsive/`: fixtures,
copias previas, drivers de comparación, `browser-results.txt`, `results.json` y
capturas de Studio/Contact. Es evidencia ignorada por Git; el baseline original
es recuperable desde `dbac7f8`. La captura de Studio muestra los controles durante
la edición; las medidas del preview provienen del DOM.

## Validaciones

- `npm run validate:tokens:responsive`: ocho casos pasan.
- `npm run build:tokens:shopify`: construcción Web/Shopify y validaciones de
  fuente, paridad legacy, salida Web, movimiento, referencias públicas y wrapper.
- `npm run validate:tokens:catalogue`: 518 rutas y 4 144 comparaciones en ocho matrices.
- `npm run validate:shopify:brand`: 10 bindings de color, 40 comparaciones de
  defaults, dos font pickers, tres layouts y dos locales.
- `npm run validate:adapter:web` y `npm run validate:adapter:shopify`: pasan;
  Shopify conserva sus advertencias previas de madurez.
- `npm run validate:cli`: instalación con dependencias y 20 escenarios de
  protección copy-and-own pasan.
- `npm run validate:docs`: pasa; conserva avisos anteriores de fixtures externos
  y estilos inline.
- `git diff --check`, reconstrucción determinista e inventario de rendimiento:
  pasan. `evidence:cleanup` y `evidence:assert-clean` se verificaron con el mismo
  ejecutable Playwright utilizado en la sesión.

## Límites y continuidad

La comparación en navegador se ejecutó en Chromium. No se verificaron Firefox,
WebKit, lectores de pantalla, CDN ni el Shopify alojado. Se conserva el resultado
visual de los escenarios medidos; no se afirma una certificación completa de los
182 componentes. La fixture desactiva transiciones para capturar estilos estables.

La sesión propia de Playwright quedó cerrada, el archivo temporal servido se
retiró y el servidor preexistente se preservó. No se reconstruyó `site/dist`, no
hubo instalaciones, cambios de estados stable ni modificaciones en Figma.

Los consumidores existentes conservan sus copias. Esta actualización de salida
se adopta con el flujo normal de protección de archivos locales; no elimina ni
migra automáticamente sus personalizaciones. Los batches de componentes pueden
continuar con la política de evidencia por target de ADR 0310.
