# Checkpoint: Process Timeline y Collection Story

Fecha: 2026-09-09. ADR 0349. Continúa el punto 5.

## Resultado

19 roles nuevos completan 33/34 valores públicos, preservando escalas y valores
iniciales. Marcador, línea y foco se apoyan en primitivas existentes; ratios,
tracking y factores conservan relaciones con tipografía/espacio/paleta del
sistema. El centrado y largo del conector son derivados. Collection Story
expone el ancho máximo apilado sin alterar sus columnas anchas. Button sigue
siendo una elección explícita del consumidor para el slot de acciones.

## Evidencia

- 536 comparaciones de geometría, tipo y paleta a 320/600/900/1200px, en ambos
  temas, con/sin media y Story invertida. Sin overflow horizontal de página.
- Consumidor instalado por CLI con Process Timeline, Collection Story y Button
  solicitado explícitamente para las acciones del fixture.
- Process: marcador 52px y línea 4px producen top 24px; pasos de 240px, imagen
  cuadrada, gap de título 30px, padding inferior 10px y gap de contenido 12px.
  La prueba verifica la cota de inset al 5% y el mínimo de paso limitado por
  el ancho disponible. Flechas nativas desplazan el carril en LTR y RTL; foco
  4px/offset 6px y forced colors permanecen visibles.
- Story: imagen cuadrada 504px, contenido apilado 300px, gap computado de
  párrafos 1.5em/36px con texto de 24px, tracking 0.2em, borde 5px, inset 10px
  y gap de acciones 15px. La columna ancha supera el cap apilado; invertirla
  no cambia el DOM y deja de invertir la posición al estrecharse. Omitir media
  deja una columna completa. El borde sigue el lado lógico en RTL.
- Una sonda de mezcla con primary #112233, accent #c80000 y participación 0.25
  produce [63,26,38,255] en la cita; label comparte el mismo color. Son valores
  de prueba, no una nueva paleta ni una certificación de contraste.
- Studio prueba edición, ratios, borde, centrado derivado, omisión de media,
  reset y referencias de Exhibit. Studio Tour hereda el marcador/conector
  personalizado; no se añade un reproductor ni se certifica media externa.
- Fuente, catálogo 1027 rutas/8216 comparaciones, contratos, Studio, registry,
  docs, CLI y adapters pasan. Sin nuevos JS/TS ni cambios de madurez.

Capturas revisadas y resultado en `output/playwright/narrative-values/`
(ignorado). Fixture retirada. Una sesión/pestaña, navegador cerrado y lista de
procesos de prueba vacía. Chrome personal y servidor preexistente preservados.
La consola solo registró favicon ausente del fixture e información de React.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla ni Shopify remoto. La
prueba de gap de párrafos mide CSS computado; no evalúa todo el contenido
editorial. Los medios de consumidor son decorativos; no se certifican todos
los textos alternativos del catálogo de Studio. Ambos siguen pilot. Las copias
existentes adoptan CSS/tokens explícitamente. Sin site/dist, publicación,
despliegue ni Figma.
