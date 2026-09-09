# Checkpoint: Inline Error, Password Input y Number Input

Fecha: 2026-09-09.

Antes de editar, el bloque anterior se guardó y subió a GitHub en el commit
`f245126`, rama `codex/v1-component-refinement`. Este bloque queda implementado
y validado localmente, con salidas Web y Shopify regeneradas. Sus cambios aún no
tienen commit propio ni se han subido al tema Shopify alojado. La entrega sigue
la secuencia Web → Shopify.

## Resultado

ADR 0306 incorpora 25 decisiones públicas en la capa de componentes existente.
Contratos, registro, Studio y la referencia de Exhibit apuntan a esos tokens.
Se reutilizan los roles compartidos de color, tipografía, radio, foco, opacidad
y movimiento. No se añaden capas, modos ni una nueva política de comportamiento.

| Componente | Decisiones nuevas | Composición verificada |
| --- | --- | --- |
| Inline Error | Padding horizontal/vertical, gap/tamaño/offset del icono y opacidad de fondo (6) | Error del grupo de respuesta en Contacto |
| Password Input | Ancho preferido máximo, separación/icono/foco del revelado y cuatro medidas del indicador de fortaleza (9) | Auth Forms, con el mismo campo nativo y sin indicador de fortaleza en Sign in |
| Number Input | Anchos del valor y de las acciones, padding, separador, icono/signo y línea proporcional (10) | Cantidad opcional de piezas en Contacto |

Ejemplos: `--space-password-input-toggle-clearance` cambia la separación entre
texto y acción; `--space-number-input-action-width` cambia el ancho de ambos
botones; `--opacity-inline-error-background` controla la mezcla de fondo. Las
fórmulas de centrado, los glifos numéricos LTR y los colores del sistema en modo
de contraste forzado permanecen privados.

## Correcciones comprobadas

- **Densidad de Number Input:** medía 48px por sumar los bordes exteriores a
  acciones de 46px. Ahora el mínimo exterior usa el rol compartido de 46px y
  las acciones descuentan sus bordes: 44px interiores con borde de 1px. Su ancho
  conserva 46px mediante un token independiente. Input, Password Input, Number
  Input y Button miden 46px en las composiciones revisadas.
- **Overrides ocultos del sitio:** Studio fijaba tamaños de icono y el ancho
  de Password Input. Se retiraron esas reglas para que los controles públicos
  afecten al componente canónico. Auth Forms conserva su decisión de composición
  a todo el ancho disponible.
- **Espaciado duplicado:** los fixtures de Number y Password combinaban el gap
  del sitio con márgenes de Field Wrapper. Ahora componen el renderer compartido
  dentro del contenedor del sitio, con `.field__control` y referencias de feedback
  correspondientes a cada campo.
- El registro de estos componentes enumera sus colores públicos concretos en
  lugar de depender del comodín `--color-input-*`. Password declara además el
  color de superficie secundaria que ya consumía.

Evidencia de fuente: `components/css/forms.css:1993` (Inline Error),
`:2033` (Password), `:2204` (Number) y `:2270` (cálculo de acciones);
`scripts/build-web-tokens.js:265` (aliases); los tres archivos de
`tokens/source/components/`; `site/src/components/studio/NumberInputArtwork.tsx`
y `InlineErrorArtwork.tsx`; `site/src/pages/ContactComposition.tsx`.

## Pruebas

- Catálogo canónico: 440 rutas y 3.520 comparaciones entre ocho matrices.
  Compilador, paridad de migración, aliases, movimiento y consumidores CSS válidos.
- 182 contratos, 182 definiciones Studio y 182 páginas MDX válidos; TypeScript
  sin errores. Auditoría estructural: 182 pasan, cero gaps estructurales y cero
  divergencias del manifiesto. Se mantienen 5 stable, 173 pilot y 4 deprecated.
- CLI: instalación con dependencias y 20 escenarios de protección de copias.
  Adaptadores Web/Shopify y controles de marca válidos; 40 comparaciones de
  defaults Shopify. Persisten las advertencias anteriores de madurez de adapters.
- Chromium en 1200px/Light y 390px/Dark: overrides efectivos de las 25 decisiones
  nuevas, Reset y ausencia de desbordamiento en los escenarios medidos.
- Inline Error: texto largo, icono opcional, padding, gaps, peso, opacidad y
  mapeo de anuncio None/Polite/Assertive. Cambiar atributos no demuestra por sí
  solo el anuncio de un lector de pantalla.
- Password: el revelado conserva el mismo nodo y valor, `aria-pressed`, foco,
  familia Error al hacer hover, readonly con revelado disponible y disabled
  con ambas partes deshabilitadas. Strength None elimina su asociación; Strong
  la repone sin añadir un live region. Se comprobó RTL, movimiento reducido y
  tratamiento de barras con colores forzados emulados.
- Number: campo vacío, pasos decimales con teclado, límites, acciones, readonly,
  disabled y valor numérico LTR en interfaz RTL. Un paso emite `input` y `change`.
  Con altura mínima de 50px, borde de 2px y ancho de acción de 48px, el exterior
  mide 50px y las acciones 48 × 46px. Se verificó movimiento reducido emulado.
- Contacto: el número vacío sigue siendo opcional; 100 permanece editable y
  produce un sexto enlace de error, que enfoca el campo correcto. El formulario
  vacío mantiene cinco errores. Los pasos llegan a FormData, Reset vacía el
  número y el siguiente incremento empieza en 1. La preparación es local.
- Auth Forms: Email, Password y Button a 46px; revelado del mismo nodo,
  `autocomplete=current-password`, valor en FormData y personalización del icono
  efectiva. El envío de demostración no transmite credenciales.
- Exhibit muestra los controles de los tres componentes. Se inspeccionaron
  capturas de Password y Number en RTL, Inline Error con texto largo y las
  composiciones Contacto/Auth Forms. El selector fijo de tema del sitio puede
  aparecer superpuesto en capturas recortadas; no pertenece al componente.

La evidencia no versionada se conserva en
`output/playwright/specialized-fields-evidence.json` y las capturas
`specialized-*.png`. Durante las pruebas se corrigieron dos supuestos del script:
Strength usa un select y el blur de una edición directa puede emitir `change`
antes del evento de una acción. No se cambió el runtime para satisfacer esos
supuestos. La medición 48→46px sí identificó una diferencia real de geometría.

Se cerró la sesión `gallery-refinement` y pasó `evidence:assert-clean`.
El servidor preexistente en 4173 se reutilizó y preservó; no se dejó un servidor
propio de estas pruebas.

## Compatibilidad, límites y siguiente bloque

Las copias existentes no se actualizan automáticamente. Al adoptar este bloque,
hay que copiar los tokens y CSS compatibles y revisar overrides locales: Number
cambia de 48px a 46px exteriores y el sitio deja de imponer medidas privadas en
estas vistas. No se eliminan aliases públicos existentes. Cambiar bordes, anchos,
padding o tipografía independientemente requiere revisar que acciones y texto
quepan; un token aislado no garantiza accesibilidad.

No se probó Safari, Firefox, lector de pantalla, todas las combinaciones de marca,
Shopify alojado con estos cambios ni la actualización de una aplicación real.
No se reconstruyó `site/dist`, publicó paquete ni promovió contrato a stable.
Figma queda fuera del alcance.

Este bloque continúa la cobertura pública por familias del punto 5 de la
auditoría; no declara terminado el catálogo ni la integración Shopify completa.
El siguiente bloque propuesto es Combobox y Date Picker, comprobando sus valores
visuales junto con apertura, selección, teclado y foco antes de avanzar a las
composiciones comerciales.
