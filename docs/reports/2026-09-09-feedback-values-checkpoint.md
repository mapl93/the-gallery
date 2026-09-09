# Checkpoint: Alert, Spinner y Stat

Fecha: 2026-09-09. ADR 0322. Continúa el punto 5 de la auditoría.

## Resultado

Dieciocho tokens nuevos cubren geometría y movimiento; pesos tipográficos y easing
reutilizan roles existentes. Alert declara 21 roles públicos, Spinner quince y
Stat dieciséis. Se documentan las derivaciones de color en vez de presentar un
color de entrada como si fuera el resultado exacto.

Los dos controles de fallback de Alert antes aparentaban editar el componente,
pero las cuatro severidades sustituyen esos colores. Ahora están identificados
como fallback e inactivos en esas variantes. Los alias continúan disponibles para
compatibilidad de la clase base; no se crea una severidad neutral.

Stat conserva su ejemplo inicial individual y añade Group preview, una fixture
opcional con tres StatArtwork completos y un control Checkbox compartido. Permite
probar los tokens de grupo sin inventar propiedades de datos en el contrato.

## Evidencia local

- Chromium: 280 mediciones (35 elementos × ocho matrices de ancho/tema) coinciden
  con el CSS anterior, incluidos los cuatro colores de Alert y tamaños de Spinner.
- Alert responde a gap 20px, padding 18/24px, borde 3px, icono 28px/offset 3px,
  separación de título 8px y peso 500. Close Button hereda tamaño 40px. Texto largo
  se contiene a 390px y el consumidor retira el Alert tras Enter en su cierre.
- Studio de Alert edita geometría/peso; Info→Error conserva role=status cuando se
  eligió Polite; Assertive produce role=alert. Dismiss y reset pasan. Los controles
  de fallback están deshabilitados y la referencia explica por qué.
- Spinner admite diámetros 20/32/48/64px con grosor independiente de 3px. Reduced
  motion lo vuelve estático; en movimiento normal el ciclo responde a 1200ms con
  curva lineal equivalente e iteración mientras se renderiza. Colores forzados
  distinguen arco/pista. No se certifica duración real de una carga de aplicación.
- Overlay de Spinner responde a padding 16/20px y gap 18px, conserva un único
  Status. En Studio, quitar el texto deja el gráfico decorativo sin overlay;
  reset restaura 24px. Control de diámetro visible según preset.
- Stat edita gap y pesos de valor/cambio sin alterar OpenType ni slashed-zero-off.
  Columnas mínimas 180/80px cambian de una a tres; contenedor de 72px sigue sin
  overflow. Studio comprueba mínimo 260→100px, tres métricas, herencia de pesos
  y reset al ejemplo individual. Nombre final del control: Group preview.
- Exhibit incluye las nuevas referencias de los tres componentes. Capturas de
  Alert y grupo Stat revisadas. Los controles fijos de tema aparecen en las capturas
  de página completa a la posición de scroll desde la que se tomó la imagen.
- Fuentes, paridad legacy, catálogo 631 rutas/5048 comparaciones, contratos, Studio,
  docs, TypeScript y adapters pasan; 182 componentes sin gaps ni drift. Avisos de
  rendimiento Shopify orientativos, sin errores. No promoción a stable.

Evidencia ignorada: `output/playwright/feedback-values/`. Consumidor CLI sin runtime
propio; Close Button llega como dependencia de Alert. Fixture temporal retirada,
navegador cerrado, gate limpio y servidor preexistente preservado.

## Límites y continuidad

No se verificaron lectores de pantalla reales, Safari/Firefox, todos los tamaños
o colores arbitrarios ni anuncios/cargas de una tienda remota. Las proporciones
de color y la tipografía heredada mantienen sus responsabilidades documentadas.

Web/Shopify regenerados para adopción copy-and-own explícita; sin subida de tema,
`site/dist` o Figma. Progress continúa por separado con la decisión del propietario:
diámetro y grosor del círculo independientes mediante tokens en píxeles.
