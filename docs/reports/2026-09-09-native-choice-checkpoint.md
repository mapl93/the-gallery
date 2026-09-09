# Checkpoint: Color Picker y Segmented Control

Fecha: 2026-09-09. Respaldo previo: `75f215e`, ya subido y sin cambios locales al
iniciar. Alcance: punto 5 de la auditoría, con comprobación de estados y
consumidores. Ambos contratos conservan `pilot`; no hay promoción de madurez.

## Resultado y evidencia de fuente

- `tokens/source/components/color-picker.tokens.json:1` añade 16 decisiones:
  separación y peso de leyenda, gaps de filas/columnas/nombres, tres tamaños de
  relleno, objetivo mínimo, borde, anillo seleccionado, check, foco y ancho del
  nombre. `segmented-control.tokens.json:1` añade siete decisiones de superficie,
  espaciado, peso de opción y foco interior. Defaults conservados; ADR 0312.
- `components/css/forms.css:1060` y `forms.css:1685` consumen estos tokens y roles
  compartidos. Los 43 tokens públicos de cada componente tienen control visible
  en Studio y referencia derivada en Exhibit. Los rellenos de muestras siguen
  siendo datos de las opciones; las mezclas de contraste se documentan como
  transformaciones de los colores editados.
- `site/src/components/studio/AdvancedControlStudio.tsx:964` separa cambios del
  inspector de la selección nativa. Antes, seleccionar la tercera/cuarta opción
  desde la primera podía activar el efecto de `checked=false` y seleccionar la
  segunda. Ahora conserva el valor exacto. Certeza alta: flujo reproducido y
  verificado con ratón y teclado.
- La leyenda de Segmented Control usa el gap compartido de Input: antes el `gap`
  del fieldset no separaba su leyenda; ahora el margen produce 4px medidos y
  editables. Hover conserva la familia de validación. El swatch seleccionado usa
  un contorno real en colores forzados, donde el navegador puede suprimir sombras,
  según la [documentación de Mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors).

## Comprobaciones ejecutadas

- **96 comparaciones antes/después**: cuatro anchuras (320/390/768/1440), Light/Dark,
  cuatro variantes y tres tamaños de swatch. Se compararon propiedades y geometría
  de 12 elementos, con transiciones desactivadas para esta comparación estática.
  Cero diferencias inesperadas: únicamente el cambio de gap/margen y los 4px de
  altura resultantes en Segmented Control. Colores forzados y hover se comprobaron
  aparte, pues contienen correcciones intencionales.
- **58 mediciones de Studio**, en 1440px/Light y 390px/Dark: todas las decisiones
  nuevas, tipografía y foco compartidos, overrides y reset. La unidad `ch` se
  conserva; radios de segmentos se derivan de la superficie y se limitan a cero;
  el objetivo mínimo de 44px de los contratos se conserva al reducir su token.
  También se comprobaron selección tercera/cuarta, renombrado del primer valor,
  toggle del inspector, salto de opción deshabilitada y variantes independientes.
- **Consumidor HTML instalado por el CLI**: solo reset, foundations, utilities,
  forms y tokens; cero módulos JS. Verificados Arrow/Space, eventos input/change,
  selección única, FormData, required, exclusión disabled y reset a defaults.
  32 combinaciones de anchura/tema/variante sin desbordamiento, más texto largo RTL,
  movimiento reducido y colores forzados. Nombres de swatch y texto seleccionado
  midieron como mínimo **5,355:1** sobre sus superficies; se compararon colores
  calculados contra [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Ocho comprobaciones de composición**: View Toggle y Filter Bar en dos anchuras
  y dos temas, con selección, teclado, override de padding y contención. Dos
  inventarios de Exhibit visibles y cinco controles adicionales de color/efectos
  verificados (marcador, nombre, duración, superficie y sombra).
- Capturas de Studio, consumidores RTL/colores forzados y composiciones revisadas.
  Navegador propio cerrado, fixture servido eliminado y `evidence:assert-clean`
  aprobado. Se conservó el servidor local preexistente.

Validaciones: fuente y ocho matrices, 1.608 comparaciones de migración legacy,
catálogo canónico (541 paths / 4.328 comparaciones), ocho pruebas de deltas
responsive, 434 referencias CSS públicas, contratos/Studio/registro/MDX,
adaptadores Web/Shopify, marca Shopify y 20 escenarios de protección copy-and-own.
La auditoría estructural registra 182/182 sin gaps ni drift, manteniendo cinco
contratos estables ya existentes. Persisten los avisos previos de assets en docs
y madurez Shopify; no se confunden con certificación del catálogo.

El inventario de rendimiento registra 24 superficies, cero errores y los dos
avisos orientativos Shopify ya existentes. Tokens Web: 202.576 bytes raw / 25.278
gzip; Shopify: 202.736 / 25.325. Se mantiene la generación de deltas responsive
y la política por target de ADR 0310; estos tamaños no miden latencia real.

Evidencia local no versionada: `output/playwright/choice-customization/`, con
scripts, resultados JSON, CSS anterior, consumidor instalado y capturas.
Los primeros intentos del harness se corrigieron para activar etiquetas de
inputs visualmente ocultos, esperar transiciones y abrir el desplegable de
Exhibit; los resultados anteriores son los pases completos posteriores.

## Adopción, límites y siguiente paso

Las salidas Web y Shopify se regeneraron desde fuente. Las copias consumidoras
deben adoptar CSS y tokens juntos; no reciben actualizaciones automáticas. El
gap compartido de Input permite personalizar localmente la nueva separación de
la leyenda. Radio interior, foco y selección se derivan de sus controles públicos.

No se subió el tema Shopify, no se reconstruyó `site/dist`, no se trabajó en Figma
ni se añadieron paquetes, modos o runtime. La evidencia usa Chromium; no incluye
Safari, Firefox, lector de pantalla, todos los colores/overrides posibles ni todas
las composiciones del catálogo. El check opcional debe revisarse frente al color
de cada producto y nunca es la única indicación de selección.

Este batch amplía el punto 5; no reabre como pendientes las correcciones ya
registradas en los otros ocho puntos. Slider sigue como próximo batch, y la
integración Shopify completa corresponde al punto 2 después de la base Web.
