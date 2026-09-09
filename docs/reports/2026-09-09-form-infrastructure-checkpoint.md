# Checkpoint: Field Wrapper, Fieldset y Form

Fecha: 2026-09-09.

Antes de editar, el bloque anterior se guardó y subió a GitHub en el commit
`ad85735`, rama `codex/v1-component-refinement`. Los cambios de este informe están
implementados y validados localmente, sin commit/push propios ni subida al tema
Shopify alojado. La entrega termina en Web → Shopify.

## Resultado

Se amplió la personalización pública de los tres componentes bajo ADR 0305. Las
30 nuevas decisiones viven en la capa de componentes ya existente y referencian
primitivas cuando corresponde. Contratos, registro, Studio, Exhibit y salidas
Web/Shopify consumen la misma fuente. No se añadieron capas ni modos.

| Componente | Decisiones nuevas | Roles existentes reutilizados |
| --- | --- | --- |
| Field Wrapper | Tamaño, gap y desplazamiento superior del icono de feedback (3) | Gaps independientes de label/mensaje, tipografía, colores de texto/validación y marcador obligatorio |
| Fieldset | Borde, padding, inset/peso de leyenda y gaps normales/compactos (8) | Colores, radio, tipografía y opacidad disabled |
| Form | Gaps de bloques/secciones/filas/acciones, separadores, títulos y geometría/fondo/enlaces del resumen (19) | Familia, tamaños, colores, radio y geometría de foco |

Además se corrigieron problemas comprobables:

- **Espacio duplicado en Field Wrapper:** el Input compuesto aportaba su margen
  inferior además del gap del wrapper. `.field__control` elimina ese margen y
  label, helper y feedback reciben exactamente sus espacios públicos.
- **Feedback neutral oculto en Studio:** Default descartaba el texto escrito, y
  otras variantes reponían contenido después de vaciarlo. Ahora el texto y la
  familia visual conservan responsabilidades separadas.
- **Estilos del sitio sobre Form:** la regla de títulos de documentación añadía
  margen superior de 40px y un borde al título del resumen del contacto. La
  composición queda excluida de esa regla y usa los estilos canónicos.
- **Columnas invisibles en Studio:** su contenedor estaba limitado a 520px, por
  debajo del umbral de Form de 640px. El fixture ahora permite hasta 768px; las
  columnas siguen dependiendo de la capacidad real del contenedor.
- El contenido requerido de Form aparece bloqueado en Customize, coherente con
  su contrato; el marcador de Field Wrapper documenta el color público vigente.

Evidencia principal: `components/css/forms.css:1856` (gaps),
`scripts/build-web-tokens.js:235` (aliases),
`site/src/components/studio/FieldWrapperArtwork.tsx:16` (composición compartida),
`site/src/pages/ContactComposition.tsx:68` (resumen),
`site/src/styles/docs.css:218` (límite del CSS del sitio) y
`site/src/styles/studio.css:928` (ancho de fixture).

## Composición real

El contacto usa Field Wrapper para Name sin duplicar su label, Fieldset para
preferencias de respuesta y Form para secciones, acciones y errores. El resumen
agrupa los fallos de los radios por nombre: el formulario vacío produce cinco
enlaces, no seis. Cada enlace lleva al control correspondiente; Subject enfoca
el trigger del Select mejorado. Se conserva el foco inicial en el primer error.
La vista continúa preparando una solicitud local y no envía información.

## Criterios verificados

- Tokens: 415 rutas canónicas, 3.320 comparaciones en ocho matrices; 308
  referencias CSS públicas definidas. Aliases y salidas Web/Shopify válidos.
- 182 contratos, 182 definiciones Studio y 182 MDX válidos; TypeScript sin errores.
- Auditoría estructural sin escritura: 182 pasan, cero gaps estructurales y cero
  divergencias del manifiesto Web. Madurez conservada: 5 stable, 173 pilot,
  4 deprecated. No equivale a certificación humana.
- CLI: instalación con dependencias y 20 escenarios de protección de copias.
  Shopify: adaptador y controles de marca válidos (40 defaults comparados).
- Chromium: Field Wrapper y Fieldset en 1800px/Light y 390px/Dark. Gaps reales
  4/4/4px, edición independiente a 12/8/8px, icono de 18px, gap de 9px y offset de 2px, ausencia
  de helper/feedback con ids correctos, Default con texto, Reset, etiquetas largas,
  variantes y required. Fieldset: padding de 24px y borde de 3px, gaps18/22 y compactos11/15;
  cambio compacto también en escritorio, flechas, disabled y exclusión de FormData,
  RTL y ausencia de overflow.
- Form: sus 19 decisiones nuevas tienen una medición de override efectivo;
  también foco de 6px y offset de 2px, enlaces al campo, validación y reset nativos, colores
  forzados y movimiento reducido emulados. La línea proporcional 1.4 mide 28px
  con título de 20px y 25.2px con título de 18px. Tres columnas a 688px de contenedor y
  una a 326px; prueba adicional a 700/360px con acciones que pasan de fila a columna.
- Contacto en 1200px/Light y 390px/Dark: cinco enlaces con foco correcto, datos
  nativos, preparación local, eliminación del resumen al validar y Reset.
  Input y Button permanecen en 46px, sin desbordamiento horizontal. El título
  del resumen mide 16px, sin margen superior ni borde ajeno al componente.
- Exhibit presenta la referencia de controles de los tres componentes. Se
  inspeccionaron capturas del wrapper largo, Fieldset RTL, Form con tres columnas
  y contacto oscuro antes/después de corregir la interferencia de títulos.

La evidencia no versionada está en `output/playwright/form-infrastructure-evidence.json`,
`form-contact-evidence.json` y las capturas `form-*.png`. Dos hipótesis del script
se corrigieron durante la prueba: el título móvil mide 18px (no 20px) y el flex del
fixture estrechaba un ancho temporal; las pruebas finales verifican unidades
proporcionales y el ancho real. No eran defectos del compilador ni del container query.

Se cerró la sesión `gallery-refinement` y pasó `evidence:assert-clean`. El servidor
preexistente de 4173 se reutilizó y se preservó; no queda un servidor propio.

## Compatibilidad y límites

Field Wrapper deja de usar `--space-input-margin-bottom` como gap uniforme.
Al adoptar este checkpoint, un consumidor que lo personalizaba específicamente
para el wrapper debe mover ese override a `--space-input-label-gap` y
`--space-input-message-gap`, y poner `.field__control` en el hijo canónico.
El alias antiguo sigue disponible para el margen exterior de Input. Las copias
existentes no se actualizan automáticamente y el CLI protege sus personalizaciones.

Se mantienen las mezclas privadas de contraste y los umbrales estructurales,
con sus razones en ADR 0305 y las páginas MDX. Los mensajes de Field Wrapper y
Fieldset conservan su interlineado existente de 20px; Input conserva 16px. Esta
revisión no cambia esa densidad editorial ni la presenta como un error. Se puede
revisar visualmente después usando los controles públicos existentes.

No se probó Safari, Firefox, lector de pantalla, toda composición del catálogo,
una actualización de una aplicación real ni Shopify alojado con estos cambios.
La emulación de accesibilidad no certifica todas las combinaciones de marca.
No se reconstruyó `site/dist`, se publicó un paquete ni se promovió madurez.

Este checkpoint continúa el punto 5 de la auditoría original, cobertura visual
pública por familias; no declara terminados los 182 componentes. El siguiente
bloque puede completar Inline Error y los controles de formulario especializados
pendientes antes de pasar a composiciones comerciales. Shopify sigue después del
sistema Web; Figma queda fuera del plan.
