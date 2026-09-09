# Checkpoint: valores visuales de Product Card

Fecha: 2026-09-09. ADR 0338. Continúa el punto 5.

## Resultado

Trece roles nuevos completan 30 valores públicos. El inset compartido de 12px
referencia dimension.12 y conserva la alineación aprobada de badges, texto,
Price, Quick Look y footer. Hay controles para gaps, factores tipográficos,
tracking, peso de título, foco y desplazamiento de entrada. Card aporta su
superficie, borde, radio y escala de imagen; no se duplican sus valores.
La tipografía base se consume explícitamente en la raíz para que overrides
locales alcancen el texto heredado. Studio y Exhibit muestran la API.

La descripción conserva dos líneas y su texto completo en DOM; la proporción
cuadrada/retrato sigue siendo propiedad semántica. El gap de identidad y el gap
adicional de descripción se suman. Los anchos siguen perteneciendo al contenedor.
Button, Badge y Price conservan sus APIs y Quick View su coordinación de target.

Se corrige el zoom por hover que aún se aplicaba con movimiento reducido. Antes
el estado calculado seguía en scale(1.03), aunque sin transición; ahora es none,
igual que la rama de foco. Product Card conserva la sombra de reposo y no se eleva.

## Validación

- 336 comparaciones de elementos a 320, 768, 1280 y 1600px, en ambos temas y
  proporciones, conservan geometría, tipografía y colores iniciales. Se alternaron
  hojas completas y terminaron las transiciones antes de comparar estados.
- Inset 20px alinea los cuatro grupos en LTR/RTL (22px contando borde de 2px).
  Gaps 5/15px, footer 9/13px, tipo base 20px, factores 0.8/0.9, tracking 0.1em,
  pesos 500/600, línea 32px y radio 18px responden a sus tokens.
- Foco de título de 3px con offset 4px y fallback forzado verificados. Zoom 1.1
  sólo afecta la imagen, no la superficie. Quick Look usa su offset 16px y se
  revela por hover. Captura de personalización revisada.
- Studio edita/restablece tokens. Ocultar artista conserva Price y restaurarlo
  conserva su contenido. Exhibit enumera el inset y Product Slider lo hereda.
- Fuente, contratos, Studio, docs, adapters, catálogo y copia CLI pasan. Catálogo:
  895 rutas y 7160 comparaciones. Auditoría estructural: 182 componentes sin gaps;
  los dos avisos advisory de peso de assets Shopify continúan.

Evidencia local ignorada: `output/playwright/product-card-values/`. Fixture
retirada, navegador cerrado y gate de recursos limpio; servidor previo preservado.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla ni dispositivo táctil
real. No se verificó coordinación Quick View ni Shopify remoto. Se conserva el
estado stable previamente existente, sin atribuir aprobación humana nueva a
estos controles. Salidas regeneradas requieren adopción copy-and-own. No se
publicó site/dist ni se trabajó en Figma. Continúan Product Info y Product Slider.
