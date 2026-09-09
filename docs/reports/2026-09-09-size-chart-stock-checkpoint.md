# Checkpoint: Size Chart y Back in Stock

Fecha: 2026-09-09. ADR 0342. Continúa el punto 5.

## Resultado

Size Chart añade un factor de separación entre párrafos de notas y completa
seis valores públicos. Modal, Table y Segmented Control conservan sus APIs; no
se duplican sus catálogos. El fixture contiene dos párrafos para mostrar el gap.

Back in Stock añade nueve roles y completa 31 valores públicos: separaciones,
padding, bordes y mínimos de interlineado, además de las familias, pesos, tamaños,
colores y anatomía de Input existentes. Los mínimos de interlineado se identifican
como tales: el valor efectivo es el mayor entre el mínimo y la línea del sistema.

En la composición amplia se elimina el offset estimado del botón. Una subgrid
comparte las filas del Input completo con el formulario: label, campo y mensaje
conservan sus márgenes reales. El baseline apila los controles y la mejora se
activa con soporte de subgrid y contenedor de 40rem. Se preservan DOM y tab order.

Studio retira el cap adicional de 520px del panel. El workspace sigue limitando
su ancho: a 1800px de viewport, reducir el factor de padding a 0.5 permite ver la
composición amplia con 654px útiles, sin modificar los defaults del componente.

## Validación

- 476 comparaciones de elementos conservan los defaults de Size Chart a
  320/768/1280/1600px y de Back in Stock estrecho a 320/600px, en ambos temas.
- El botón amplio pasa de un desfase de 4px a cero con label de una línea.
  Con label de dos líneas, gap 12px y mensaje 10px, pasa de -38px a cero.
  También pasan RTL, campo directo sin wrapper de icono y ausencia de mensaje.
  Input y Button conservan los 46px de altura inicial. Capturas revisadas.
- Padding 40px, gap 15px, borde 3px, líneas 31.5/33.6px, gap del formulario
  10px, offset 5px y status con padding 12px/acento 8px responden a tokens.
  El grosor del acento persiste con colores forzados.
- Al retirar la regla de mejora mediante CSSOM, el formulario amplio conserva
  el baseline apilado. Esto simula el fallback; no certifica otro navegador.
- Studio: notas, matrices CM/IN escritas por el target, Escape, foco de retorno,
  reapertura, reset, personalización del panel y referencias Exhibit pasan.
  El submit preview muestra el error explícito de proveedor ausente; no hay envío.
- Fuente, catálogo de 934 rutas/7472 comparaciones, contratos, Studio, docs,
  TypeScript, adapters y consumidor CLI pasan. Auditorías mantienen madurez y
  los dos avisos advisory de Shopify. No cambia el runtime ni Liquid.

Evidencia ignorada: `output/playwright/size-chart-stock-values/`. Fixture retirada,
navegador cerrado, gate limpio y servidor preexistente preservado.

## Límites

Chromium local, sin Safari/Firefox, lector de pantalla, tacto físico ni Shopify
remoto. La igualdad de altura usa la densidad inicial compartida de Input/Button;
overrides independientes de sus alturas requieren revisión de la composición.
Sin proveedor de notificaciones ni conversión automática de unidades. Ambos
contratos permanecen pilot. Sin site/dist, paquete publicado ni Figma.
Continúan Location Search y Store Locator.
