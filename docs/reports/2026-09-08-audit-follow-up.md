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
