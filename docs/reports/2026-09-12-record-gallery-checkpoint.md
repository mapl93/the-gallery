# Checkpoint: Certificate y Masonry Gallery

Fecha: 2026-09-12. ADR 0350. Continúa el punto 5.

## Resultado

29 roles nuevos completan 45/29 valores públicos. Certificate permite editar
medidas, tracking, padding, ritmo, columnas, subrayado y foco. Masonry expone
ancho preferido/máximo de columnas, separación vertical, padding/gap de caption,
foco y escala interactiva. Se conservan los valores iniciales y la procedencia
de bordes/foco en primitivas y de factores en espacio/tipografía/paleta.

Se corrige el hover de piezas nativas deshabilitadas: conservan caption visible
y no amplían la imagen. La supresión de transform con movimiento reducido sigue
teniendo prioridad. No se añade un modo de activación ni un servicio de
verificación de certificados.

## Evidencia

- Consumidor real instalado con `tg add certificate masonry-gallery`.
- 888 comparaciones iniciales de geometría/tipo/paleta a 320/600/900/1200px y
  ambos temas. Certificate completo/mínimo; nueve obras con/sin captions.
  El harness normaliza gap computado normal/0px, equivalentes en esta grilla.
- Certificate personalizado: ancho 640px, padding 40px, marco/regla 4px, largo
  de regla 100px, media 120px, tres columnas anchas y dos compactas; ritmo
  label/atribución/detalle/firma/verificación de 15/10/6/40/10px, tracking 0.2em,
  subrayado 3px/offset 1em y foco 4px/offset 6px. En ancho reducido el padding
  alcanza su mínimo de 20px; un count cero queda acotado a una columna.
- La atribución inicial sobre Archival obtiene contraste 5.295:1 claro y
  5.744:1 oscuro; label/enlace 7.024:1 y 6.986:1. Son esas combinaciones,
  no una certificación de cualquier personalización o de autenticidad.
- El enlace nativo mantiene texto y destino al quitar media; Enter, foco,
  forced colors y alineación lógica de detalles pasan.
- Masonry personalizado: ocho piezas ocupan cuatro columnas, gap vertical
  12px, padding 12px y separación título/precio 6px. El primer harness esperaba
  cuatro columnas ocupadas con nueve piezas iguales; el navegador las equilibró
  en tres respetando el máximo de cuatro. Se corrigió el caso de prueba, no
  el algoritmo nativo. Se documenta esta diferencia entre máximo y ocupación.
- Pasan figura pasiva, enlace nativo, botón disabled, foco 4px/offset 6px,
  hover scale 1.1, movimiento reducido, forced colors, RTL y proporción natural.
  El count acepta seis y acota cero a uno. La prueba no certifica un modo
  Lightbox ni la prevención de activación de un enlace con aria-disabled.
- Studio: unidades rem en ancho/media, columnas, marco, omisión de verificación,
  caption, reset y Exhibit. Fuente, catálogo 1056 rutas/8448 comparaciones,
  contratos, Studio, registry, CLI, docs y adapters pasan. Sin cambios de JS/TS
  ni de madurez.

Capturas revisadas y resultados en `output/playwright/record-gallery-values/`
(ignorado). Fixture retirada. Cada fase usó una sesión/pestaña headless; al
terminar se cerraron navegador y servidor propios, con puerto 4173 libre y
lista de procesos de prueba vacía. Chrome personal se preservó.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla, tacto físico ni Shopify
remoto. La muestra usa imágenes decorativas iguales para aislar el cálculo de
columnas; no evalúa todo el contenido editorial o todos los ratios posibles.
Certificate y Masonry siguen pilot. Copias existentes adoptan CSS/tokens y
metadata explícitamente. Sin site/dist, publicación, despliegue ni Figma.
