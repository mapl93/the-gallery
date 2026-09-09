# Checkpoint: Subscription Option

Fecha: 2026-09-09. ADR 0344. Continúa el punto 5.

## Resultado

Nueve roles fuente completan 24 valores públicos. Borde, padding, gaps de la
opción/header/precio/recurrencia y pesos de labels se personalizan desde tokens.
Las dimensiones y pesos iniciales reutilizan primitivas existentes; los factores
usan la separación del sistema. La tipografía base también queda explícita.

El Radio conserva diámetro y gap como autoridad del inset del contenido. Los
gaps del resumen y metadata dejan de cambiar incidentalmente al editar el Radio.
Fieldset, Radio, Price y Badge conservan sus APIs. La selección, precios, términos,
cadencia y payload de compra siguen bajo las responsabilidades de ADR 0246.

## Validación

- 560 comparaciones de elementos conservan geometría/tipo/colores en ambos
  temas, a 320/600/900/1200px, con compra única o plan mensual seleccionado.
  No aparece overflow en esos casos.
- Padding 30px, borde 3px, gap de contenido 10px, gaps del header 16px/12px,
  resumen 10px, recurrencia 14px y pesos 500/700 responden por separado.
  Radio 28px + gap 12px produce inset 40px en RTL; cambiar su gap a 16px lleva
  el inset a 44px y conserva el resumen en 10px. Capturas revisadas.
- Flecha nativa RTL conserva selección/FormData. Reset vuelve a compra única;
  términos sólo visibles al seleccionar el plan. Grupo vacío falla required y
  Fieldset disabled se propaga. Colores forzados conservan borde de 3px.
  La consulta existente apila el header y retira los insets estrechos sin overflow.
- Studio edita/restablece valores, selecciona plan, asocia términos en
  aria-describedby y propaga disabled. Exhibit muestra las nuevas referencias.
- Fuente, catálogo 963 rutas/7704 comparaciones, contratos, Studio, docs,
  consumidor CLI y adapters pasan. No cambió JS/TS. Auditorías mantienen madurez
  y los dos avisos advisory de Shopify.

Evidencia ignorada: `output/playwright/subscription-values/`. Fixture retirada,
navegador cerrado, gate limpio y servidor preexistente preservado.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla ni dispositivo físico.
Los planes y precios son fixtures, sin alta de suscripción, checkout, proveedor
ni Shopify remoto. El componente permanece pilot. Copias propias adoptan los
nuevos tokens/CSS explícitamente; ajustes de gap de Radio ya no cambian los gaps
de metadata. Sin site/dist, publicación ni Figma. Continúan Collection Hero/Grid.
