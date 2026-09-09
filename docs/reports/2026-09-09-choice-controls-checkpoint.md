# Checkpoint: alcance Web → Shopify y controles de selección

Fecha: 2026-09-09.

El bloque anterior quedó respaldado en GitHub como `8c86add` antes de estos
cambios, en `codex/v1-component-refinement`. Este checkpoint está implementado y
validado localmente; aún no tiene commit ni push propios.

## Alcance de entrega

ADR 0303 elimina Figma del plan, en lugar de dejarlo para una fase posterior.
La secuencia termina en **sistema Web → Shopify**.

- Se retiró el adaptador Figma planificado de los 182 contratos y del registro.
- Se eliminaron sus comandos de piloto del paquete activo.
- Las referencias históricas de Studio son opcionales. Su ausencia ya no provoca
  un fallo estructural ni exige producir archivos o artwork en Figma.
- Se actualizaron la guía de agentes, prioridades, documentación y las páginas de
  arquitectura/contratos. Los archivos del piloto y exportaciones se conservan
  como antecedentes; no se borró ningún archivo remoto.
- Los contratos conservan exactamente sus estados de madurez. Fuera de los tres
  controles de este bloque, se comprobó por comparación de JSON que sus únicos
  cambios son la retirada del adaptador planificado y la versión de metadatos.

## Personalización implementada

ADR 0304 añade **17 decisiones de fuente** en la capa de componentes existente.
Sus aliases públicos llegan a CSS, contratos, registro, Studio y Exhibit.

| Componente | Controles añadidos o expuestos | Criterio comprobado |
| --- | --- | --- |
| Checkbox | Grosor de borde, tamaño y colores del indicador; geometría de foco, familia y peso del label | Borde de 3px, marca de 10px con color editado, foco de 6px y offset de 2px; Reset restaura los defaults |
| Radio | Grosor de borde y separación interior del punto; geometría de foco, familia y peso del label | El inset editado modifica el punto; selección y foco conservan la variante |
| Switch | Ancho, alto y tamaño del thumb para sus tres tamaños; grosor de borde, inset lateral, superficie Off y borde Hover; foco y tipografía | Tamaños existentes 36/20/14, 44/24/18 y 52/28/22px; edición independiente por tamaño, márgenes laterales iguales y RTL |

Se reutilizan los tokens públicos existentes para tamaño de Checkbox/Radio,
separación del label, radios, superficies, validación, sombra, opacidad y
movimiento. `--typo-body-weight` apunta al peso semántico Body existente: añade
un alias de salida, no una nueva decisión de fuente.

Los renderers de Studio consumen la misma geometría y las mismas derivaciones de
color que el foco nativo. Se eliminaron sus copias literales de 4px y los
reemplazos de borde que desvirtuaban la mezcla canónica al simular foco.

Evidencia principal:

- `scripts/build-web-tokens.js:217`: aliases de la nueva API.
- `components/css/primitives.css:768`: borde público de Checkbox.
- `components/css/primitives.css:782`: máscara de Check/Minus con color editable.
- `components/css/forms.css:97`: recorrido de Switch calculado desde su interior.
- `site/src/pages/ContactComposition.tsx:97`: grupo Radio real con semántica nativa.
- `scripts/validate-studio-metadata.js:354`: referencia histórica opcional.

### Corrección visual detectada durante la prueba

La captura inicial del formulario oscuro mostró un Checkbox seleccionado con
marca blanca sobre fondo blanco. La comprobación de propiedades CSS por sí sola
no había detectado la invisibilidad: la máscara existía y estaba visible.

El token inicial del indicador ahora referencia el texto del Button primario,
que corresponde a la superficie seleccionada. La medición final fue:

| Apariencia | Indicador | Superficie seleccionada |
| --- | --- | --- |
| Light | `rgb(255, 255, 255)` | `rgb(64, 64, 64)` |
| Dark | `rgb(23, 23, 23)` | `rgb(255, 255, 255)` |

La nueva captura confirma que la marca vuelve a distinguirse. Los colores siguen
siendo personalizables y la familia de validación conserva su indicador gray 900.
Es una corrección adicional concreta del ámbito de contraste del hallazgo 1;
no certifica todas las combinaciones posibles del sistema.

## Composición y consumidor

El formulario de contacto usa los renderers compartidos:

- Radio selecciona la preferencia de respuesta y tiene un único marcador de grupo.
- Checkbox añade instrucciones de cuidado a los datos de la solicitud.
- Switch muestra información de visitas inmediatamente. No tiene `name`, porque
  esa preferencia de presentación no forma parte de los datos enviados.

Se comprobaron foco del primer error, grupo obligatorio, navegación con flechas,
exclusión mutua, Space, datos de formulario, efecto inmediato, limpieza de error y
Reset. La preparación sigue siendo local y no envía información. Input y Button
conservan 46px y el formulario no tiene desbordamiento horizontal en las dos
configuraciones verificadas.

Un consumidor HTML independiente, instalado mediante el CLI, conservó un gap de
12px, controles de 24px y foco de 6px al añadir Radio, Switch y Select. Select se
mejoró con el runtime copiado; el formulario conservó selección, valores y reset
nativos. Al cambiar posteriormente upstream por la corrección del indicador,
el CLI detectó el conflicto con los tokens personalizados y detuvo el plan sin
escribir. Una combinación revisada y `--keep-local` conservaron la personalización
junto a los nuevos defaults. Este es un consumidor diagnóstico, no una migración
de una tienda o aplicación existente del propietario.

## Verificaciones cerradas

- Compilación de ocho matrices y paridad de migración de tokens.
- Catálogo canónico: 385 rutas y 3.080 comparaciones con el compilador.
- API CSS pública: 278 referencias definidas.
- Contratos, Studio, registro y 182 páginas MDX válidos; TypeScript del sitio.
- Auditoría estructural sin escritura: 182 componentes sin gaps estructurales;
  este resultado no sustituye revisión humana ni promueve madurez.
- CLI: prueba de dependencias y 20 escenarios de protección, más el consumidor
  navegable descrito arriba.
- Web y Shopify regenerados y validados. Los controles de marca Shopify siguen
  pasando sus 40 comparaciones de defaults, 10 colores y 2 selectores de fuente.
- Chromium: los tres controles en Desktop/Light (1200px) y Mobile/Dark (390px),
  edición, reset, variantes/foco, mixed Checkbox, disabled, colores forzados y
  movimiento reducido; Switch también en RTL y sus tamaños Small/Large.
- Se cerraron las pruebas pendientes de Drawer (posición, ciclo y retorno de
  foco, Escape), Slider (teclado y límites de rango), Link (tres variantes y
  navegación nativa) y Mega Menu (trigger, enlaces normales/destacados, foco y
  cierre), en ambas configuraciones.
- Exhibit muestra los nuevos controles desde sus metadatos compartidos.
- Capturas inspeccionadas: Checkbox con label largo, formulario oscuro antes y
  después de la corrección del indicador.

La evidencia local no versionada vive en `output/playwright/choice-*-evidence.json`,
las capturas `choice-*` y `choice-consumer/`. La copia temporal servida desde
`site/public` fue retirada. `evidence:cleanup` y `evidence:assert-clean` cerraron
el navegador y los servidores propios. En la última fase se reutilizó y preservó
un servidor preexistente, que no pertenece a esta ejecución.

## Límites y siguiente checkpoint

Shopify recibió salidas locales regeneradas; este bloque no incluye una subida
al tema alojado. Persisten los avisos de madurez Shopify ya existentes. No se
reconstruyó `site/dist`, se publicó un paquete ni se promovieron componentes.

La evidencia de navegador es Chromium; Safari, Firefox, lectores de pantalla y
una migración real del consumidor siguen sin verificar. Las mezclas privadas de
color, caminos de iconos, centrado, ocultación nativa, wrapping y reglas de sistema
en colores forzados permanecen explícitamente documentados como implementación.
Un override arbitrario puede requerir revisar contraste y relaciones geométricas.

El siguiente bloque es **Field Wrapper, Fieldset y Form**: revisar su API visual,
espaciado entre leyenda/controles/feedback y composición sin duplicar las
responsabilidades de Input, Checkbox, Radio y Switch. El punto 5 de la auditoría
continúa por familias; este checkpoint no declara terminado todo el catálogo.
Después del sistema Web, la entrega continúa exclusivamente con Shopify.
