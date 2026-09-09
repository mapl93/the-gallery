# Checkpoint: Badge y Price

Fecha: 2026-09-09. Base previa: `9f7d417`, ya subida y limpia al iniciar.
Continúa el punto 5. ADR 0314. Ambos contratos conservan `pilot`.

## Resultado

`tokens/source/components/badge.tokens.json:1` añade padding horizontal/vertical,
peso y tracking (10/2px, 600, 0.05em). `price.tokens.json:1` añade gaps de fila y
columna y peso principal (4/8px, 600); los pesos secundarios reutilizan Body 400.
`components/css/primitives.css:948` y `primitives.css:1075` consumen estos roles.
El inventario completo aparece en Studio/Exhibit: 17 tokens Badge y 13 Price.

Badge identifica las dos entradas de su mezcla de texto; el resultado combina
10% de foreground de feedback y 90% de texto primario. Las mayúsculas y el
centrado siguen siendo el tratamiento v1 documentado, sin introducir un tipo
string en la fuente. Price conserva formato monetario en el target, `<s>`,
etiquetas ocultas, `<bdi>` y OpenType independiente con cero ordinario fijo.
No hay cambios de comportamiento, defaults, capas ni runtime.

## Evidencia

- **48 comparaciones de presentación**: cuatro variantes Badge y dos Price,
  en 320/390/768/1440px y Light/Dark. Cero diferencias inesperadas de geometría,
  color, tipografía, padding o gaps frente al CSS anterior.
- **16 mediciones de Studio**: todas las decisiones nuevas y peso secundario,
  con overrides/reset en Desktop/Light y Mobile/Dark. `0.12em` produce 1,44px a
  12px de texto y 2,4px a 20px; no se convierte accidentalmente a píxeles fijos.
- Comprobados estados pasivos, opt-in `role=status`, texto dinámico sin foco,
  cuatro variantes Badge, cuatro switches OpenType, ocultación de compare-at en
  Default, unidad opcional, cadenas completas y textos largos sin overflow.
- Consumidor HTML instalado con el CLI, sin módulos JS: semántica nativa,
  cinco etiquetas de precio en DOM, aislamiento BDI, RTL y colores forzados.
  Contraste mínimo medido de texto: **4,576:1** en las combinaciones probadas;
  este resultado no garantiza cualquier override o superficie consumidora.
- Product Card en dos anchuras/temas hereda el padding Badge y el peso Price
  personalizados, conserva ambos componentes y no desborda. Capturas revisadas.

Pasan fuente/ocho matrices, catálogo de 554 paths, refs públicas,
contratos/Studio/registro/MDX, adaptadores Web/Shopify y decisiones de refinamiento.
Auditoría estructural: 182 contratos sin gaps/drift y cinco estables previos.
Rendimiento mantiene 24 superficies, cero errores y dos avisos Shopify
orientativos. Se conserva la política de límites por target de ADR 0310.

Evidencia local: `output/playwright/passive-customization/`, con scripts, CSS
anterior, consumidor, resultados JSON y capturas. El harness corrigió el nombre
accesible del selector de color antes del pase completo. Sesión cerrada, fixture
servido eliminado y `evidence:assert-clean` aprobado; servidor previo conservado.

## Adopción y límites

Salidas Web y Shopify regeneradas; los consumidores adoptan CSS/tokens juntos.
Sin subida de tema, `site/dist`, Figma, instalación de paquetes o promoción de
madurez. Pruebas en Chromium; Safari, Firefox, lector de pantalla, precisión
comercial de los datos, otros overrides y Shopify alojado quedan fuera de esta
evidencia. El batch siguiente continúa con Quantity Selector.
