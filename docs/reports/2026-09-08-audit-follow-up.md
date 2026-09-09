# Seguimiento de los nueve hallazgos de la auditoría

Fecha: 2026-09-08. Alcance aprobado: corregir 9, 3 y 7; conservar y documentar
las escalas del 8; delimitar y posponer la exportación interoperable del 6.
Prioridad actualizada por ADR 0303: sistema base Web → Shopify. Figma queda fuera
del plan; las referencias a su piloto en este informe son antecedentes.

Antes de editar se validó el piloto Figma y se guardó en GitHub el checkpoint
`b6e62ac`, sobre el checkpoint Shopify `0f13e5e`. Las correcciones de este informe
son posteriores a ese respaldo. No se ha publicado una biblioteca ni desplegado
el tema con este bloque.

## Estado de los nueve puntos originales

| # | Hallazgo original | Estado y alcance |
| --- | --- | --- |
| 1 | Contraste Danger y textos de feedback/acento | Corregidas las combinaciones identificadas en ADR 0292 y su informe. Este bloque no repite ni amplía la certificación de contraste. |
| 2 | Controles de marca Shopify desconectados | Piloto implementado y comprobado en tema no publicado (ADR 0297). La integración Shopify completa sigue después del sistema base. |
| 3 | Roles tipográficos inconsistentes y pesos sin consumir | Corregidos en fuente, aliases, utilidades y composiciones editoriales; comprobados en ocho matrices y con un cambio temporal de marca. ADR 0300. |
| 4 | Catálogo y documentación tomando fuentes antiguas | Superficies identificadas corregidas en ADR 0292; se mantiene la distinción entre fuentes, referencias históricas y salidas. |
| 5 | Decisiones públicas de Input ocultas en el generador | Migradas a fuente y expuestas en contratos/Studio/Exhibit por ADRs 0292–0294; cobertura ampliada por batches en ADRs 0304–0309 y 0312, hasta Color Picker y Segmented Control. El resto del catálogo continúa pendiente de revisión de cobertura. |
| 6 | DTCG-style presentado como interoperabilidad estricta | Parcial y pospuesto explícitamente: límites documentados, sin cambiar formato ni afirmar conformidad estricta. El piloto Figma no sustituye una exportación conforme. |
| 7 | Variantes y estados mezclados | Corregidas las intersecciones identificadas en 12 contratos y sus controles; las combinaciones conservan sus selectores de implementación. ADR 0301. La revisión semántica y certificación completa por componente continúa. |
| 8 | Dos vocabularios de espaciado ambiguos | Decisión aceptada y aplicada: utilidades fijas con primitivas existentes; roles semánticos adaptativos. Se conservan nombres y medidas. ADR 0302. |
| 9 | CLI sobrescribe personalizaciones | Corregido con plan previo, baselines por archivo, dry-run, comparación de contenido y resolución explícita por ruta. 20 escenarios automatizados, además de la prueba de dependencias. ADR 0299. |

## Cambios y evidencia

### Protección de consumidores — error corregido, certeza alta

- `cli/index.js:181` prepara el plan completo antes de escribir. La protección
  cubre CSS base, familias, tokens, módulos y entrada de runtime.
- `cli/install-plan.js` compara copia local, último upstream aceptado y upstream
  actual mediante SHA-256. Cambios locales con upstream intacto se conservan;
  cambios en ambos lados detienen el plan. La versión del paquete se registra
  como procedencia, no como sustituto de la comparación de bytes.
- `cli/index.js:311` consume `install.tokens` del manifiesto Web; las nuevas
  instalaciones reciben el CSS generado desde `tokens/source/`. No se borran
  los JSON legacy ni se convierten sus personalizaciones silenciosamente.
- `cli/index.js:395` compara todos los archivos únicos del grafo, incluyendo
  tokens y runtime. Antes solo se comparaba el CSS de componentes.
- `scripts/validate-cli-protection.js` usa copias temporales independientes del
  paquete y del consumidor: modificar upstream durante la prueba nunca modifica
  el repositorio real.

Ejemplo: personalizar `primitives.css` y añadir Input conserva la personalización
si upstream no cambió. Si una nueva versión modifica también ese archivo, el CLI
no instala parcialmente el componente. Tras revisar/combinar los cambios, el
consumidor puede conservar una ruta concreta con `--keep-local`; esa elección
no prueba por sí sola compatibilidad funcional. Véase `docs/CLI.md`.

### Tipografía — inconsistencia corregida, certeza alta en lo medido

- `tokens/source/semantics/typography.tokens.json` enlaza H1/H2/H3 a UI y Article
  Body a editorial. Los tamaños y pesos de fuente se conservan.
- `scripts/build-web-tokens.js:156` deja de enviar el alias de encabezado de
  interfaz a la familia serif.
- `components/css/foundations.css:23` aplica explícitamente el peso de cada
  encabezado. Display aplica 700, H1/H2 600 y H3 500; Body conserva 16/24px.
- `components/css/foundations.css:424` aplica la familia editorial a Prose y sus
  encabezados; `prose-excluded` preserva la familia UI de controles embebidos.
- `components/css/blog.css` y los contratos Article Hero/Body usan el alias
  editorial explícito para título y capitular.

La prueba de marca cambió temporalmente la familia UI a Arial, la editorial a
Georgia y H1 a peso 700: cada rol recibió el cambio esperado. No se guardaron
esas personalizaciones de prueba.

### Estados — inventario corregido y simulación verificada

Los siete campos Checkbox, Radio, Switch, Tags Input, Star Input, Number Input
y Quantity Selector combinan validación y foco mediante ejes independientes.
Icon Button, Link, Drawer, Slider y Mega Menu también eliminan sus cruces
redundantes de variante/interacción. Los 12 contratos pasan de 102 a 71 entradas
de estado; la reducción no elimina sus selectores CSS de intersección.

`site/src/components/studio/AdvancedControlStudio.tsx:486` corrige además un fallo
observado en el navegador: el foco simulado de Tags Input desaparecía al cambiar
la variante, aunque el inspector seguía indicando Focus. El preview conserva
ahora la presentación enfocada y calcula su color desde la variante actual.
El foco real del inspector sigue siendo independiente.

`validate:contracts` rechaza nombres de estado que repiten una variante más un
sufijo de interacción conocido. Los estados de anatomía, disponibilidad o
capacidad no se eliminan por una coincidencia textual superficial.

### Espaciado — decisión aplicada, sin cambio visual de medidas

`components/css/foundations.css:169` expresa los pasos fijos mediante primitivas.
`.p-8` y `.gap-8` resuelven a 32px en 390, 800, 1200 y 1600px de viewport, tanto
en Light como Dark. `space.scale.8` conserva 40/40/64/64px respectivamente.
El caso de 80px se deriva de la primitiva de 4px; no se añadió un token solo para
ese valor. Foundations explica cómo elegir entre ambas convenciones.

## Validación y límites

- `validate:cli`: dependencias cerradas y 20 escenarios de protección.
- `build:adapter:web`: compilación de ocho matrices, paridad de migración,
  tokens públicos, movimiento y adapter de 182 componentes.
- `build:adapter:shopify` y `validate:shopify:brand`: copias regeneradas desde
  fuente; 10 controles de color, 40 comparaciones de defaults, 2 fuentes,
  3 layouts y 2 locales. Persisten advertencias de madurez ya documentadas.
- `validate:docs`: 182 contratos, 182 definiciones Studio y 182 páginas MDX;
  permanecen avisos históricos de assets externos y estilos de ejemplos.
- TypeScript del sitio y `git diff --check`.
- Navegador Chromium, una sesión y una pestaña: tipografía/espaciado en ocho
  matrices y cambio temporal de familias/peso de marca.

La fase final pasó 12 casos de Studio (Checkbox, Radio, Switch, Tags Input,
Quantity Selector e Icon Button en Desktop/Light y Mobile/Dark), cuatro casos de
foco nativo (Number Input y Star Input), dos composiciones Article Body y dos
formularios de contacto. En estos últimos se comprobó validación, foco del primer
error, preparación local sin envío y Reset; Input y Button midieron 46px.
Las demás intersecciones corregidas recibieron validación estructural; no se
repitió aquí toda la navegación de Drawer, Slider, Link o Mega Menu.

Se inspeccionaron capturas de Checkbox, artículo y contacto. La evidencia local
no versionada está en `output/playwright/audit-*-evidence.json` y las capturas
`audit-checkbox-*`, `audit-article-*` y `audit-contact-*`. El primer intento de
interacción utilizó el input visualmente cubierto de un control segmentado;
se corrigió el procedimiento para pulsar su etiqueta visible. Las mediciones
finales esperan las transiciones antes de comparar colores.
`evidence:cleanup` y `evidence:assert-clean` confirmaron la sesión y servidor
cerrados. No se ha probado otro motor, lector de pantalla, proyecto
real de un consumidor ni Shopify alojado con estas correcciones. No se reconstruyó
`site/dist`. La exportación DTCG estricta, la política de publicación/versiones y
la certificación visual completa de cada componente conservan sus propios límites.
Las versiones de los contratos afectados avanzan para registrar el cambio;
no cambia la política de versiones del paquete ni se publica una versión.
Ningún contrato se promovió automáticamente a `stable`.

## Siguiente checkpoint

Conservar esta base, revisar la cobertura de personalización pública por familias
y continuar la certificación Web con composiciones reales. El cierre de estos
hallazgos no equivale a que todo el catálogo esté terminado. Shopify retoma su piloto después. Figma queda fuera del plan por ADR 0303.

## Evidencia posterior — 2026-09-09

El checkpoint de controles de selección se documenta en
`docs/reports/2026-09-09-choice-controls-checkpoint.md`. Cierra las pruebas de
interacción pendientes de Drawer, Slider, Link y Mega Menu, añade un consumidor
HTML independiente del CLI y amplía la personalización de Checkbox/Radio/Switch.
La captura oscura detectó y permitió corregir un indicador Checkbox invisible.
ADR 0303 retira Figma de los contratos planificados y requisitos de entrega.

El siguiente bloque del punto 5 está registrado en
`docs/reports/2026-09-09-form-infrastructure-checkpoint.md`: Field Wrapper,
Fieldset y Form, con 30 decisiones de fuente y evidencia de composición real.

Continúa en `docs/reports/2026-09-09-specialized-fields-checkpoint.md`: Inline
Error, Password Input y Number Input incorporan 25 decisiones públicas. Las
mediciones corrigen la altura exterior de Number Input de 48px a 46px; Contacto
y Auth Forms verifican composición, datos nativos, estados y personalización.

`docs/reports/2026-09-09-popup-fields-checkpoint.md` continúa el punto 5 con
Combobox y Date Picker: 39 decisiones, corrección del ancho compuesto, IME y foco,
y evidencia en un formulario HTML con el adaptador público.

`docs/reports/2026-09-09-file-pin-checkpoint.md` amplía el mismo punto 5 con
File Upload y Pin Input: 24 decisiones, reset nativo, miniaturas locales y medidas
compactas consistentes, con pruebas de formulario independiente.

ADR 0309 añade Tag/Tags Input (15 decisiones) y corrige contraste de eliminación,
padding RTL y controles compuestos. Su checkpoint histórico detuvo la corrida en
los antiguos presupuestos internos de tokens Web y Storytelling; ADR 0310 los
retira después por decisión del propietario y exige límites por target con fuente.
ADR 0311 completa la deduplicación responsive con equivalencia comprobada. El
slice CSS propuesto queda como mejora opcional, sin bloquear nuevos batches.

ADR 0312 continúa el punto 5 con Color Picker y Segmented Control: 23 decisiones,
43 controles visuales por componente, selección de opciones corregida en Studio,
gap de leyenda efectivo y contorno seleccionado en colores forzados. Véase
`docs/reports/2026-09-09-native-choice-checkpoint.md` para comparaciones, pruebas
nativas y composiciones. Ambos conservan `pilot`; Slider es el siguiente batch.

ADR 0313 continúa con Slider: seis decisiones y 31 controles visuales, estados
separados de modo/validación, inicialización real en Studio, límites nativos,
foco al activar la pista y reglas de colores forzados/movimiento reducido por
motor. Véase `docs/reports/2026-09-09-slider-checkpoint.md`. Mantiene `pilot` y
continúa la cobertura de la base Web, con Shopify como destino posterior.

ADR 0314 añade siete decisiones a Badge/Price, con 17/13 controles públicos,
semántica pasiva conservada y evidencia de personalización en Product Card.
`docs/reports/2026-09-09-passive-primitives-checkpoint.md` registra 48 comparaciones
de presentación y 16 mediciones Studio; continúa el punto 5 sin promover madurez.

ADR 0315 continúa con Quantity Selector: siete decisiones, 39 controles, altura
exterior compartida de 46px y ancho compacto en grids. Studio consume Field
Wrapper y el enhancer canónico; se verifican eventos nativos y composiciones en
`docs/reports/2026-09-09-quantity-checkpoint.md`. Permanece `pilot`.

ADR 0316 continúa el punto 5 con Rating y Loading Skeleton: nueve decisiones,
10/13 roles públicos, unidades relativas y máximo de movimiento de Skeleton
preservados. Pasan 64 comparaciones y veinte mediciones de Studio, con terminación
real de la animación, preferencias estáticas y composiciones Review verificadas.
Véase `2026-09-09-rating-skeleton-checkpoint.md`; no se promovió madurez humana.

ADR 0317 amplía Empty State/Divider con seis decisiones y 17/4 roles públicos.
Corrige la validación en ejecución del encabezado contextual de Empty State.
Cuarenta y ocho presentaciones y quince mediciones pasan, incluyendo Cart Empty,
Empty Collection, textos largos y RTL. Véase `2026-09-09-empty-divider-checkpoint.md`.

ADR 0318 corrige un problema transversal del punto 5: Studio perdía alfa al editar
RGBA y mostraba negro para expresiones como el color-mix de Empty State. El editor
conserva transparencia, muestra su resultado y mantiene completas las expresiones
no interpretadas. Evidencia en `2026-09-09-studio-color-checkpoint.md`.


ADR 0319 resuelve la decisión de Avatar: diámetro e iniciales son personalizables
por tokens, conservando las parejas como defaults. Cuatro decisiones nuevas y los
roles tipográficos existentes completan trece controles. Pasan 56 raíces y cuatro
parejas independientes en CLI/Studio, con Author Card y Comment Section como
consumidores. Véase `2026-09-09-avatar-checkpoint.md`.

ADR 0320 continúa el punto 5 con Button Group, Icon Button y Close Button:
21/13/2 roles públicos respectivamente para Icon/Close/Group, dieciséis tokens
nuevos y unión derivada del borde de Button. Paridad en ocho matrices, consumidor
CLI, Studio/Exhibit, teclado, movimiento reducido y composición Lightbox probados.
Ver `docs/reports/2026-09-09-compact-actions-checkpoint.md`. Continúan en pilot;
Web/Shopify regenerados sin subida de tema. Siguiente lote: Toggle y FAB.

ADR 0321 amplía Toggle y FAB a 21 roles públicos cada uno, con 17 tokens nuevos.
Se verifican paridad, selección nativa, offsets físicos, foco oculto y movimiento
reducido; Comment Section hereda el espaciado de Toggle. Studio conserva los offsets
canónicos dentro de su marco local. Ver
`docs/reports/2026-09-09-toggle-fab-checkpoint.md`. Continúan pilot; siguiente lote:
Alert, Progress, Spinner y Stat.

ADR 0322 continúa Alert, Spinner y Stat con 18 tokens nuevos y reutilización de
pesos/easing. Paridad de 280 mediciones, anuncios explícitos, ring/motion, grupo
responsive y reset pasan. Los fallbacks de Alert dejan de presentarse como controles
activos de severidad. Ver `docs/reports/2026-09-09-feedback-values-checkpoint.md`.
Progress circular sigue con la decisión del propietario: diámetro y grosor
independientes en píxeles. No cambia la madurez ni se sube un tema Shopify.

ADR 0323 implementa Progress con diámetro/grosor independientes por decisión del
propietario: diez tokens nuevos y 21 roles públicos. Conserva grosor visible,
registra la corrección mínima de radio y verifica porcentajes, rango, movimiento
y controles aplicables en Studio. Ver `2026-09-09-progress-checkpoint.md`.
Continúa el punto 5 sin promoción de madurez ni subida remota de Shopify.

ADR 0324 completa Table/Data List con 18 tokens y 24/12 roles públicos; 480
mediciones conservan defaults. Ordenación nativa, foco, scroll, gaps por container
query y composición Size Chart pasan. Elimina dos presentaciones repetidas como
estados conforme a ADR 0274. Ver `2026-09-09-tabular-checkpoint.md`.
Continúa Timeline/Link sin promoción de madurez ni subida de tema.

ADR 0325 completa Timeline/Link con 17 tokens y 27/12 roles públicos. El rail de
Timeline deriva de sus dimensiones y Link conserva el grosor del subrayado entre
variantes. Paridad visible, estados, RTL, navegación y Studio pasan. Ver
`2026-09-09-timeline-link-checkpoint.md`. Collection Promo hereda foco pero mantiene
subrayado local; esa excepción requiere el lote de la composición, sin bloqueo.

ADR 0326 completa Card con tres tokens y catorce roles públicos, corrigiendo la
simulación de Hover de Studio para usar escala, elevación y preferencias reales.
Pasan 48 combinaciones, pruebas de puntero/movimiento y Author/Product Card.
Se conserva su stable previo; ver `2026-09-09-card-checkpoint.md`.

ADR 0327 resuelve Collection Promo, incluida la excepción de subrayado de Link:
13 tokens nuevos y 32 roles públicos, con factores que conservan las relaciones
responsive. Pasan 232 mediciones, compact preview, Grid Span 2, omisiones y Link.
Ver `2026-09-09-collection-promo-checkpoint.md`; continúa Modal/Drawer.

ADR 0328 completa Modal/Drawer con 17 tokens nuevos y 25/23 roles públicos. Studio
refleja los anchos de fuente; pasan 176 mediciones, scroll, RTL, edición, teclado
y herencia en Size Chart/Cart Drawer. Ver `2026-09-09-modal-drawer-checkpoint.md`.
La modalidad de página completa sigue siendo del target; continúan Toast/Tooltip.

ADR 0329 completa Toast/Tooltip con 14 tokens nuevos y 24/16 roles públicos. Pasan
344 mediciones, RTL, acción responsive, puente de puntero, teclado y herencia
pasiva en Social Proof. Studio reserva la altura real de Tooltip más el gap de
tokens. Ver `2026-09-09-toast-tooltip-checkpoint.md`; continúan Accordion/Tabs.

ADR 0330 completa Accordion/Tabs con 19 tokens nuevos y 28/22 roles públicos.
Corrige selección desincronizada en Studio e indicador de Tabs recortado por scroll.
Pasan 296 mediciones de geometría/tipo, teclado, FAQ y seis capturas con verificación
de píxeles del indicador; cambios de pintado y fallback forzado explícitos. Ver
`2026-09-09-accordion-tabs-checkpoint.md`; continúan Breadcrumb/Popover.

ADR 0331 completa Breadcrumb/Popover con 16 tokens nuevos y 19/26 roles públicos.
Se preserva la geometría canónica LTR en 168 mediciones de ocho matrices y se
corrige la orientación de flecha RTL. Studio deja de ocultar los límites de ancho
y compone Input real; Exhibit/migración Popup reservan su altura. Tokens, reset,
foco natural, Escape/cierre exterior, RTL estrecho y herencia de Input pasan.
Fuente/adapters/CLI validados; sin certificación integral ni entrega remota.
Detalle: `2026-09-09-breadcrumb-popover-checkpoint.md`. Continúan Dropdown Menu y
Context Menu dentro del punto 5; no se declaran cerrados los nueve puntos.

ADR 0332 completa Dropdown/Context Menu con 30 tokens nuevos y 46/45 roles públicos;
Context referencia los valores internos de Dropdown. Se quitan variantes duplicadas
en estados, se conserva altura personalizada mayor en coarse y se corrige el cierre
indebido por scroll interno de Context Studio. Cuatrocientas comparaciones de defaults,
interacciones, coordenadas, reclamp por tokens, adapters y CLI pasan. Sin promoción
de madurez ni subida remota. Detalle: `2026-09-09-action-menu-checkpoint.md`.
Continúan Command Palette y Steps; los nueve puntos no se declaran cerrados.

ADR 0333 completa Command Palette/Steps con 39 tokens nuevos y 57/25 roles públicos.
Hay 592 comparaciones de defaults, foco visible en colores forzados, protección IME
de Studio, geometría independiente de Steps y herencia en Checkout Progress.
Se separa orientación de estados y se conserva done como alias de completed.
Fuente/adapters/CLI y evidencia local pasan, sin promoción ni entrega remota.
Detalle: `2026-09-09-command-palette-steps-checkpoint.md`. Continúan Carousel y
Scroll Area; los nueve puntos no se declaran cerrados.

- ADR 0334 completa Carousel/Scroll Area con 13 valores fuente y 26/8 roles
  públicos. 192 comparaciones conservan valores iniciales. Carousel corrige
  tercera diapositiva, Reset, inspector y dirección anidada; Scroll Area distingue
  límites nativos de fallback y respeta auto coarse. Puntos 5/7 continúan sin
  promoción automática ni Shopify remoto. Evidencia:
  `docs/reports/2026-09-09-carousel-scroll-area-checkpoint.md`.

- ADR 0335 completa geometría de Lightbox: 15 valores fuente, 38 roles públicos,
  240 comparaciones iniciales y composición Product Gallery verificadas. Corrige
  foco al cerrar, dirección anidada y foco de zoom; retira el cap extra de imagen
  de Studio. Su paleta sigue pendiente de decisión explícita del propietario;
  no se declara cobertura completa del punto 5. Evidencia:
  `docs/reports/2026-09-09-lightbox-geometry-checkpoint.md`.

- ADR 0336 resuelve la paleta pendiente de Lightbox: tokens semánticos propios,
  cuatro aliases a valores del sistema y densidad 0.92 en fuente. 43 roles
  públicos; 120 comparaciones iniciales y propagación de aliases/Studio/hover
  verificadas. El punto 5 sigue abierto para el resto del sistema. Evidencia:
  `docs/reports/2026-09-09-lightbox-palette-checkpoint.md`.

- ADR 0337 completa Product Gallery con 22 roles nuevos y 46 tokens públicos.
  Conserva 304 comparaciones de reposo; corrige foco recortado, encogimiento de
  targets de indicadores y dirección anidada. Edición/reset, activación explícita
  y composición Lightbox verificadas localmente. Sin certificar reproducción/3D
  ni Shopify remoto. Evidencia: `docs/reports/2026-09-09-product-gallery-checkpoint.md`.
  Continúa Product Card dentro del punto 5; los nueve puntos no se declaran cerrados.

- ADR 0338 completa Product Card con 13 roles fuente y 30 valores públicos.
  Conserva 336 comparaciones iniciales y la alineación aprobada; reutiliza Card
  y corrige zoom por hover bajo movimiento reducido. Studio/reset, RTL e herencia
  en Product Slider pasan. Mantiene madurez previa sin nueva aprobación humana.
  Evidencia: `docs/reports/2026-09-09-product-card-checkpoint.md`.
  Continúan Product Info y Product Slider dentro del punto 5.
