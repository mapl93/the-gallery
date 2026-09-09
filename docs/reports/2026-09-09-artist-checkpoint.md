# Checkpoint: Artist Profile y Artist Card

Fecha: 2026-09-09. ADR 0348. Continúa el punto 5.

## Resultado

17 roles nuevos completan 32/27 valores públicos. Se conserva la base plana de
Card, Badge, tipografía editorial, proporciones y relaciones iniciales. Los
bordes se apoyan en primitivas existentes; proporciones, tracking y factores
son decisiones del componente vinculadas a su tipo/espacio o paleta del sistema.

Artist Card ahora declara sus tokens también en el registry. Movimiento se
clasifica con las categorías existentes transition/transform, sin ampliar el
esquema. Studio muestra todos los valores públicos del perfil. El retrato
transparente del fallback MDX de Artist Profile deja de describir una persona
que no está representada en ese recurso.

## Evidencia

- 328 comparaciones conservan geometría/tipo/paleta con y sin retrato a
  320/600/900/1200px en ambos temas. La tarjeta se prueba en un contenedor de
  hasta 480px; Profile prueba su composición ancha y estrecha.
- Profile: retrato cuadrado de 440px, gap de párrafos 1.5em/36px con texto de
  24px, tracking 0.2em, borde 5px, inset 10px y gap de acciones 15px.
- La participación del acento se comprueba con dos colores de prueba: 0.25
  produce [63,26,38,255], sin reducir la opacidad del texto. Esos colores son
  sondas del test, no una propuesta de paleta. El contraste de la cita inicial
  sobre su superficie es 5.295:1 claro y 5.744:1 oscuro. No certifica cualquier
  personalización ni todo el componente.
- Card: retrato cuadrado de 478px dentro de 480px incluyendo el borde transparente
  canónico, gap de retrato 12px, badge 18px/6px, nombre 6px, medium 12px y conteo
  18px. Se corrigió el harness para descontar ese borde, sin cambiar Card.
- Hover pasivo no transforma; enlace nativo permite scale 1.1, foco 4px/offset
  6px y Enter a destino. Reduced motion suprime el transform, forced colors
  conserva el foco, RTL refleja el inset lógico y botón disabled suprime énfasis.
- Profile preserva asociación sección/título y una columna completa al omitir
  retrato. Studio prueba ratio/unidades/borde, omisión de retrato/metadata/Badge,
  reset y Exhibit. El fixture de Artist Card sigue pasivo; el hover interactivo
  se comprueba en el consumidor, no se inventa una propiedad de interacción.
- Fuente, catálogo 1008 rutas/8064 comparaciones, contratos, Studio, registry,
  docs, CLI y adapters pasan. Sin nuevos JS/TS. Auditorías mantienen madurez y
  política de límites por target.

Capturas revisadas en `output/playwright/artist-values/` (ignorado). Fixture
retirada, una sesión/pestaña por fase, navegador cerrado y comprobación de
procesos vacía. Se preservaron Chrome personal y servidor preexistente.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla ni Shopify remoto.
Artist Card todavía necesita el modelo de datos/destino de artista para un
adapter Liquid dedicado; esta fase entrega su CSS, no inventa ese modelo.
Ambos siguen pilot. Copias existentes adoptan explícitamente CSS/tokens y la
clasificación del catálogo. Sin site/dist, publicación, despliegue ni Figma.
Continúan Process Timeline y Collection Story.
