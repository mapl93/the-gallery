# Checkpoint: Filter Panel y Pagination

Fecha: 2026-09-09. ADR 0347. Continúa el punto 5.

## Resultado

Diecisiete roles fuente completan 19 valores públicos de Filter Panel y 16 de
Pagination. Las dimensiones, bordes y peso se apoyan en primitivas/roles
existentes; los factores de separación siguen usando el espacio del sistema.
El ancho inicial de panel conserva 15rem. Drawer y cada control compuesto
mantienen su propia API, sin duplicar sus contratos completos en Filter Panel.

Pagination usa el default de icono aprobado: 18px tanto en Web como en Shopify.
La forma continúa siendo propia del target. El CSS canónico sustituye la regla
de tamaño exclusiva de Studio y prevalece sobre dimensiones intrínsecas del SVG.
La altura del elemento es ahora mínima, para admitir una línea más alta sin
alterar el tamaño inicial. URL, ventana de páginas y datos no se convierten en
valores visuales.

## Evidencia

- Filter Panel conserva 352 comparaciones de elementos a 320/600/900/1200px en
  ambos temas con formulario inline sin enhancement, controles Checkbox/Input,
  Tags y acciones manuales. Cero gap explícito equivale al antiguo gap normal.
- Personalización de panel: ancho 20rem/320px, borde 3px, divisor 2px, gap de raíz
  15px, padding de raíz 10px, padding de grupos 15px, Tags 12px, título 10px/peso
  500, opciones 8px, campos de precio 6px y acciones 12px. Capturas revisadas.
- Runtime copiado por CLI preserva el mismo formulario al cambiar de ancho a
  Drawer y regresar. Prueba draft sin commit, FormData de submit manual, reset de
  cancelación, solicitud inmediata, exclusión de resultados, Escape con retorno
  de foco y adyacencia RTL. No realiza solicitudes de resultados.
- Studio prueba unidades rem, controles visuales, draft/Apply/Cancel controlados,
  Drawer/Escape, reset y Exhibit. Se corrigieron esperas del harness para el
  foco programado con animation frame y consultas a controles ya ocultos.
- Pagination conserva 192 comparaciones a los mismos anchos/temas. Prueba gap
  10px, padding 20px, elipsis 12px, icono 24px, peso 700, radio 12px y mínimo de
  52px. Una línea de 64px aumenta la altura a 64px sin overflow estrecho.
- La simulación del SVG intrínseco de 16px usado por Shopify confirma 16px con
  CSS previo y 18px con el nuevo. No es una prueba del storefront remoto.
- Lista/enlaces nativos, Enter a URL de destino, current no interactivo,
  elipsis pasiva, icono RTL y foco normal/forzado pasan. Studio comprueba
  primera/última página, navegación de fixture, edición/reset y Exhibit.
- Fuente, catálogo 991 rutas/7928 comparaciones, contratos, Studio, docs,
  consumidor CLI y adapters pasan. Sin cambios de JS/TS. Auditorías mantienen
  la madurez; los límites de rendimiento siguen siendo específicos del target.

Evidencia ignorada: `output/playwright/filter-panel-values/` y
`output/playwright/pagination-values/`. Fixtures retiradas. Una sesión/pestaña por
fase; cierre en finally, gate limpio y cero procesos de prueba al terminar.
Chrome personal y servidor preexistente preservados.

## Límites y adopción

Solo Chromium local, sin Safari/Firefox, lector de pantalla ni Shopify remoto.
El umbral adaptativo previo de Filter Panel no se ha redefinido ni certificado
con cambios de tamaño raíz de rem; modificar el ancho de panel no recalcula ese
umbral. El destino sigue siendo responsable de consultas, URLs, resultados y
foco externo. No se certifica todo el comportamiento de las dependencias de nuevo.

El Theme Check completo registrado en ADR 0346 mantiene errores históricos de
_legacy; los adapters generados no representan certificación ni publicación.
Copias existentes adoptan explícitamente CSS/tokens. Ambos componentes siguen
pilot, sin nueva aprobación estética general, site/dist ni Figma.
Continúa la familia de storytelling, empezando por Artist Profile y Artist Card.
