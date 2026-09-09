# Checkpoint: File Upload y Pin Input

Fecha: 2026-09-09. Respaldo previo: `701560d`, subido antes del batch.

## Resultado

ADR 0308 añade 24 decisiones públicas (17 File Upload, 7 Pin Input), conectadas
con contratos, registro, Studio/Exhibit y salidas Web/Shopify. Se conservan los
roles compartidos de foco, tipografía y estados. File Upload expone geometría,
espacios y miniaturas; Pin Input expone medidas normales/compactas y peso.

El reset de File Upload vacía la selección nativa. Su fixture opcional de imágenes
revoca los object URLs. Se retiran las medidas móviles exclusivas del sitio para
Pin Input, se ajusta su umbral compacto a los 328px que requieren seis celdas
normales, y Studio respeta readonly al pegar y feedback vacío/neutral.

## Evidencia

- Studio en 1200px/Light y 390px/Dark: 51 mediciones de controles, incluida toda
  decisión nueva y foco/borde compartidos. Selección de archivo local, previews,
  icono opcional, override directo, disabled, reset y revocación del object URL.
  Pin conserva seis celdas alineadas: 48×56px en escritorio y 44×52px en móvil;
  verifica avance, retroceso, pegado, readonly, flechas RTL y feedback.
- Exhibit muestra el inventario generado en los cuatro componentes de los dos
  batches, incluidos Combobox y Date Picker. Una primera aserción del script no
  esperó a cargar ese inventario; la comprobación con espera explícita pasa.
- Formulario HTML independiente con CSS/runtime público: FileList múltiple con
  dos entradas del mismo archivo, FormData, required, exclusión disabled y reset;
  seis valores Pin nativos, avance, pegado, readonly, RTL y restauración de sus
  defaults. Ambas vistas caben sin desbordamiento horizontal.
- Movimiento reducido y colores forzados emulados. Capturas Studio y composición
  oscura inspeccionadas. El navegador propio se cerró y `evidence:assert-clean`
  pasó; se conservó el servidor local preexistente.

Evidencia no versionada: `output/playwright/file-pin-evidence.json`,
`file-pin-consumer.html` y capturas `file-pin-*.png`.

## Límites

No se verificó cámara, diálogo del sistema operativo, arrastre real entre apps,
lector de pantalla, Safari/Firefox, proveedor de verificación OTP ni subida de
archivos. Las imágenes se mantienen locales. El formulario usa el runtime público
completo; no sustituye la certificación Shopify alojada ni todos los consumidores.
Dimensiones personalizadas, más segmentos y contenido extenso deben revisarse en
su contexto. No se reconstruye `site/dist` ni se promueve madurez automáticamente.
