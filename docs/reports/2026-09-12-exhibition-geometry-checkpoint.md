# Checkpoint parcial: geometría de Exhibition Page

Fecha: 2026-09-12. ADR 0352. Continúa el punto 5; decisión pendiente en punto 1.

## Entregado

23 roles nuevos amplían el perfil a 56 valores públicos. Se conserva la curva
inicial de altura con cuatro controles y se retira un límite redundante. La
información utiliza todo el ancho cuando falta descripción o metadata, en vez
de conservar una columna vacía. Registry y Studio cubren el inventario público.

## Evidencia

- Consumidor instalado por CLI con Exhibition Page, sin dependencias inventadas.
- 712 comparaciones de geometría/tipo/paleta a 320/600/900/1200px, ambos temas,
  con/sin media. Tolerancia geométrica 0.02 CSS px; gap normal/0px se normaliza
  donde ambos representan la separación inicial nula.
- La curva de min-block-size coincide en trece anchos de viewport entre 160 y
  2200px, incluyendo sus cambios de tramo. Esa prueba extrema solo compara la
  fórmula; no certifica legibilidad a 160px. La contención se verifica desde 320px.
- Personalización: mínimo calculado del hero 400px, gap 10px, márgenes adicionales
  de label/título 2px/6px, párrafos 18px, reparto de info 50/50, detalle con gap
  6px/padding 8px/borde 3px, tres columnas de obras y cuatro de artistas, gaps
  de headings 10px/15px, avatar 72px y separación nombre/rol 4px.
- Solo metadata ocupa 1059.844px del contenido disponible, en una columna;
  solo descripción también usa una. A 320px el mínimo del hero queda en 136px
  y puede crecer por contenido; los registros se acotan a una columna.
- RTL, secciones/listas nativas, ausencia de controles inventados y forced
  colors pasan. Studio verifica gaps, rem/ch, omisión de regiones y media,
  reset y referencia de Exhibit.
- Fuente, catálogo 1103 rutas/8824 comparaciones, contratos, Studio, registry,
  CLI, docs y adapters pasan. Las auditorías estructurales no resuelven el
  defecto visual pendiente ni promueven madurez.

## Bloqueo de paleta

Sobre `gallery-interior.jpg`, la fuente actual combina scrim negro al 60% con
texto blanco en claro y #171717 en oscuro. En el hero de Studio de 656px, la
región de fechas en oscuro queda entre 1.0002:1 y 2.9681:1; la de ubicación
entre 1.0001:1 y 3.1223:1. El texto pequeño incumple contraste en toda esa
superficie. En claro, el mínimo conservador de las cuatro cajas de texto es
5.7418:1. El análisis rasteriza la imagen con su crop y scrim, y evalúa las
cajas de texto, no una certificación general de cualquier fotografía.

Hay dos muestras solo de navegador: foto oscurecida con texto blanco en ambos
temas (recomendada) y foto aclarada con texto oscuro para el tema oscuro. Se
espera la elección del propietario antes de cambiar esos defaults. El valor
negro fijo todavía no se presenta como una API pública de color finalizada.

Resultados y capturas en `output/playwright/exhibition-values/` (ignorado):
`baseline.json`, `result.json`, `baseline-dark.png`,
`option-darkened-white-text.png` y `option-lightened-dark-text.png`.
Fixture retirada. Cada fase cerró su única sesión/pestaña y servidor propios;
puerto 4173 libre y lista de procesos de prueba vacía. Chrome personal preservado.

## Límites

Chromium local, sin Safari/Firefox, lector de pantalla ni Shopify remoto.
Exhibition Page sigue pilot y este checkpoint es parcial: el hero oscuro aún
necesita la decisión de paleta y su corrección con tokens. No se eligen modelos
de exposiciones/artistas/obras, comercio, activación o templates Liquid. Copias
existentes adoptan cambios explícitamente. Sin site/dist, publicación,
despliegue ni Figma.
