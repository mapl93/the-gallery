# Button, Select y composición de contacto — 2026-09-08

## Resultado y checkpoint

El bloque anterior se validó y se guardó en `0ce4881`, publicado en
`codex/v1-component-refinement`. Este bloque continúa ADR 0293: opciones visuales
conectadas desde la fuente hasta el editor y sus consumidores. Añade siete
decisiones de Button y once de Select, conservando capas, modos y defaults.

## Inventario de cobertura

Las rutas nuevas viven bajo `component.button` o `component.select` en
`tokens/source/components/`. `scripts/build-web-tokens.js` genera sus alias;
contratos y `registry.json` los declaran, Studio ofrece controles y Exhibit deriva
la referencia de esa metadata. `components/css/primitives.css` los consume.
Web y Shopify se regeneran desde esas fuentes.

| Button: decisión nueva | Alias público | Valor inicial |
| --- | --- | --- |
| `lineHeight` | `--typo-button-line-height` | 1.5, sin unidad |
| `borderWidth` | `--border-button-width` | 1 px |
| `focusRingWidth` | `--border-button-focus-ring-width` | 2 px |
| `focusRingOffset` | `--border-button-focus-ring-offset` | 2 px |
| `spinnerWidth` | `--border-button-spinner-width` | 2 px |
| `spinnerDuration` | `--transition-button-spinner-duration` | 600 ms |
| `underlineOffset` | `--space-button-underline-offset` | 2 px |

Button conserva padding, gap, altura mínima, icono, radio, tipografía, colores
por variante/estado y transición. El editor añade los controles existentes de
icono, familia tipográfica, opacidad disabled y color de foco. El interlineado
sin unidad escala con el tamaño de texto; editarlo ya no añade `px` por inferencia.

| Select: decisión nueva | Alias público | Valor inicial |
| --- | --- | --- |
| `indicatorSize` | `--space-select-indicator-size` | 16 px |
| `indicatorGap` | `--space-select-indicator-gap` | 8 px |
| `panelGap` | `--space-select-panel-gap` | 8 px |
| `panelPadding` | `--space-select-panel-padding` | 4 px |
| `panelBorderWidth` | `--border-select-panel-width` | 1 px |
| `panelMaxWidth` | `--space-select-panel-max-width` | 360 px |
| `panelMaxHeight` | `--space-select-panel-max-height` | 240 px |
| `optionPadding.x` | `--space-select-option-padding-x` | alias a Input X, 12 px |
| `optionPadding.y` | `--space-select-option-padding-y` | alias a Input Y, 10 px |
| `optionMinHeight` | `--space-select-option-min-height` | 44 px |
| `optionSelectedWeight` | `--typo-select-option-selected-weight` | 600 |

Select comparte los alias de Input para separaciones, borde/foco, peso del label,
margen inferior, padding y tipografía. También se expone la sombra existente del
panel. Cambiar un alias compartido en un contenedor afecta a sus consumidores;
Studio limita los cambios a su preview.

## Decisiones que permanecen en CSS

| Decisión | Motivo y límite |
| --- | --- |
| Button pequeño/grande: padding ×0.75/1.25, mínimo ±8 px, texto ×0.875/1.125 | Densidades existentes; los controles base afectan a las tres. Controles independientes por tamaño quedan pendientes si se necesitan. |
| Link sin padding y altura intrínseca | Tratamiento de la variante; los controles generales no sustituyen esa regla en el tamaño por defecto. |
| Carga circular, giro constante, color del texto | Relación visual del estado; tamaño, grosor y duración públicos. Movimiento reducido elimina la animación. |
| Bordes continuos; Button sin elevación | Apariencia conservada. Otros estilos de borde o elevación requieren una decisión visual. |
| Mezclas de contraste | Select mezcla borde normal al 60% con texto primario; validación usa 80% en borde/indicador y 60% en texto. El token es una entrada, no siempre el color final. |
| Reserva de espacio para indicador/check | Derivada de tamaño, gap y padding públicos. La posición se limita a cero si panel padding supera option padding. |
| Seguridad del popup: 16 px por lado y alineación alternativa | Política conjunta CSS/runtime; un control aislado descoordinaría ambos. El trigger fija el ancho mínimo. |
| Flecha de fallback nativo | SVG fijo: no recibe el color del indicador mejorado. El popup nativo pertenece al navegador. |
| Display, anclaje, clipping, 100%, rotación y visibilidad | Mecánica de composición o estado. |

Esta cobertura no declara editable cualquier regla CSS. Form conserva decisiones
propias de layout: el formulario prueba uso conjunto, no certifica su cobertura.

## Composición real

`/compositions/contact` reúne nombre, email con icono, asunto, mensaje, Reset y
Preview request. Usa CSS canónico y el enhancer web real de Select. Los campos
nativos conservan datos, selección, validación y reset. La composición consulta
`validity`, muestra feedback y enfoca el primer campo inválido. Usa `noValidate`
porque ese flujo lo controla la composición. La carga es simulada; no envía datos.

Se conserva el piloto de Foundations: todavía aporta casos adyacentes, iconos,
loading, read-only, tamaños y textos largos que este formulario no reúne.

## Evidencia local

- `validate:docs`, `validate:tokens:catalogue`, adaptadores web/Shopify,
  TypeScript y build Vite pasan. El build se escribió en
  `/private/tmp/gallery-button-select-build`. Persisten avisos previos de assets
  externos, 12 avisos de madurez Shopify y tamaño del bundle; no son fallos nuevos.
- 366 rutas de fuente y 2.928 comparaciones con ocho matrices; se mantienen 201
  rutas legacy y 1.608 comparaciones de paridad. 237 referencias públicas CSS.
- Chromium, Button/Select en Light/Dark: edición de medidas, interlineado, carga,
  foco, popup, opciones, peso seleccionado y reset. Line height 2 produce 32 px
  con fuente de 16 px; loading de 1.200 ms y stroke de 3 px se reflejan en CSS.
- Select: gaps 8/12 px, borde 3 px, indicador 24 px, panel gap 16 px, padding
  8 px, borde 3 px y alto máximo 180 px. Opciones: padding 16/12 px, mínimo
  52 px, peso seleccionado 700. Reset restaura los valores iniciales.
- Formulario: Light/Dark × 390/800/1200/1600 px; controles de una línea y botones
  a 46 px, gaps 4 px, sin overflow horizontal ni popup fuera del viewport.
- Envío vacío, foco de error, Home/Arrow/Enter/End/Escape, opción disabled,
  selección en FormData, loading disabled y reset del valor/trigger comprobados.
  Sin errores de ejecución en esa secuencia.
- Override directo: borde 3 px y radio 16 px alcanzan Input, Select y Button;
  sus alturas pasan conjuntamente a 50 px. Textarea conserva su comportamiento
  multilínea y recibe la API compartida de Input.
- Prueba final Light/Dark: color de foco de Button, texto Link en hover/active,
  color compartido disabled de Select y borde con panel abierto responden a sus
  controles. Se repitieron los 64 casos adyacentes del piloto: altura de 46 px
  y alineación vertical en escritorio/tablet, con apilamiento en móvil.
- El navegador y servidor de evidencia se cerraron. `evidence:assert-clean`
  pasó; `git diff --check` pasó y `site/dist` permanece sin cambios.

Capturas en `output/playwright/`: `contact-composition-light.png`,
`contact-composition-dark.png`, `contact-composition-mobile.png` y
`select-public-customization.png`.

## Límites y siguiente checkpoint

El propietario aprobó el resultado general y pidió el seguimiento registrado
abajo. No se probaron otros navegadores, lector
de pantalla, dispositivos físicos, todas las composiciones ni accesibilidad
completa. El formulario usa su validación explícita: no certifica cualquier
consumidor con validación automática del navegador. No hubo integración remota
de Shopify o Figma ni promoción de madurez.

Las copias CSS se regeneran, pero Webflow/Framer siguen con el pipeline legacy
y no reciben estos tokens como salida lista para distribución. No se modifica
`site/dist`. Las copias de consumidores necesitan aplicar y revisar los cambios.

Tras la revisión visual: guardar el bloque y pasar al piloto acotado de marca en
Shopify; luego llevar la misma familia pequeña a Figma.

## Seguimiento: indicador obligatorio y padding del botón

El propietario solicitó un token de color rojo para el asterisco. ADR 0295 añade
`color.field.required`, expuesto como `--color-field-required`: `red.600`
(`#DC2626`) en Light y `red.400` (`#F87171`) en Dark. Es independiente del estado
de error. Las cuatro reglas de indicador de primitivas, formularios, producto y
reseñas lo consumen. Los 20 contratos con Required y Fieldset lo declaran y lo
exponen mediante el control Required marker; Exhibit deriva la misma referencia.

- Chromium: 21 componentes × 2 temas, 42 casos correctos de color inicial,
  cambio a `#0066cc` y reset. Los fixtures conservaron un único marcador y el
  texto visible no cambió. La referencia aparece en los 21 Exhibit.
- Fieldset se verificó con un hijo Radio obligatorio, porque deriva el indicador
  del grupo y no tiene una propiedad Required propia.
- Contraste calculado sobre la superficie primaria: 4.829:1 en Light y 6.481:1
  en Dark. No certifica otras superficies ni accesibilidad completa.
- Fuente: 367 rutas, 2.936 comparaciones del catálogo; paridad legacy conservada.
  Registro, 182 contratos, Studio, docs, adaptadores web/Shopify, TypeScript y
  build Vite correctos. Se conservan los avisos previos. `site/dist` intacto.
- El botón del formulario mide 20 px de padding a izquierda y derecha, con 21 px
  hasta las cajas del contenido por su borde de 1 px. La flecha deja unos 3.33 px
  vacíos a la derecha dentro del SVG: de ahí la diferencia óptica. No se alteró
  padding, geometría de icono ni altura de Button.
- Capturas finales, tras estabilizar la transición de tema:
  `output/playwright/contact-required-light-1200.png`,
  `contact-required-dark-1200.png` y `contact-required-dark-390.png`.
- Servidor y navegador cerrados; `evidence:assert-clean` correcto.

## Seguimiento: corrección óptica de Button

El usuario pidió compensar el espacio interno de la flecha tras revisar el
diagnóstico anterior. ADR 0296 introduce `--space-button-icon-edge-offset`,
editable en Studio y listado en Exhibit, con 3.333333 px por defecto. El padding
de escritorio queda en 20 px del lado del texto y 16.67 px del lado del icono.
Este resultado sustituye la decisión anterior de conservar ambos lados en 20 px.

Se conservan los SVG originales. La corrección se aplica a cada lado con icono
posicionado; texto solo, Link e icon-only mantienen su tratamiento. El indicador
de carga se dibuja dentro del espacio del icono sustituido y conserva el ancho
del botón. El valor es una elección óptica ajustable, no una medición automática
válida para todos los dibujos o tamaños.

Validaciones de fuente, catálogo, contratos, Studio, docs y adaptadores correctas.
Chromium verificó Light/Dark, móvil/escritorio, 450 combinaciones temporales de
Button (270 sustituciones de icono sin desplazamiento), límites, edición y reset.
Evidencia visual: `output/playwright/contact-optical-button-light.png`.
Recursos locales cerrados; sin cambios en `site/dist`, Figma ni Shopify remoto.
