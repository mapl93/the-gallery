# Checkpoint: valores visuales de Product Gallery

Fecha: 2026-09-09. ADR 0337. Continúa el punto 5 de la auditoría.

## Resultado

Veintidós roles nuevos completan 46 tokens públicos: proporción del medio,
separaciones compactas/amplias, miniaturas y sus opacidades, límites del rail,
geometría de foco, badges e indicadores. Opacidades y dimensiones existentes se
referencian por alias; los valores propios restantes conservan el diseño actual.
Button, Badge, Icon Button y Lightbox mantienen sus responsabilidades compartidas.
Studio expone los roles y Exhibit documenta su alcance.

La consulta de contenedor de 48rem conserva sus cambios de disposición y separación.
El rail crece hasta alojar miniaturas mayores; el máximo de Badge deriva de su
inset. Se corrige el foco recortado usando un marco interior y la dirección anidada
de activación, AR y flechas. Los indicadores compactos envuelven sin reducir el
tamaño configurado. No se impone un límite de cantidad ni se cambia la decisión
visual pendiente sobre mostrar miniaturas e indicadores simultáneamente.

## Validación

- 304 comparaciones de elementos a 390, 768, 1280 y 1600px, en claro y oscuro,
  conservan los valores iniciales en reposo. Se alternaron hojas completas,
  normalizando únicamente gap normal a su valor usado de cero en flex.
- Miniaturas de 96px, borde de 3px, rail de 96px/200px y overflow; opacidades
  0.4/0.7/0.9; ratio 1.5; gaps compactos/amplios de 12/30px; badges con inset
  5px y padding 2/6px; navegación de 48px e iconos de 24px responden a tokens.
- Capturas antes/después revisadas: el antiguo foco externo de 4px quedaba
  recortado; el nuevo marco de 4px con offset -4px se ve completo. Foco de imagen
  personalizado y colores forzados mantienen la geometría configurada.
- En 272px, cinco indicadores con targets de 60px y gap de 10px envuelven en
  dos filas sin overflow. Antes se reducían a unos 54.4px. Dirección LTR anidada
  en documento RTL conserva centrado, AR y flechas correctas.
- Studio permite editar y restablecer tokens. Seleccionar vídeo no lo activa;
  Play crea el elemento nativo y cambiar a modelo retira el vídeo inactivo.
  Front abre Lightbox y Escape cierra. Exhibit enumera los nuevos valores.
- Fuente, paridad legacy de 1608 entradas, catálogo de 882 rutas/7056 comparaciones,
  contratos, Studio, docs, adapters y copia CLI pasan. Auditorías: 182 componentes
  con gates estructurales aprobados; permanecen dos avisos advisory de Shopify
  (CSS 350089/100000 bytes; JS 118114/10000). No hubo cambio de runtime ni TypeScript.

Evidencia local ignorada: `output/playwright/product-gallery-values/`. Fixture
retirada, navegador cerrado y gate de recursos limpio; servidor preexistente
preservado.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla ni Shopify remoto. El vídeo
de prueba verifica activación y anatomía nativa, no reproducción de un archivo real.
El modelo de Studio es ilustrativo y no certifica un motor 3D ni AR. Estos checks
no certifican accesibilidad integral ni cualquier personalización arbitraria.
El contrato permanece pilot; salidas regeneradas requieren adopción copy-and-own.
No se publicó site/dist ni se trabajó en Figma. Continúa Product Card.
