# Checkpoint: Collection Promo

Fecha: 2026-09-09. ADR 0327. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Trece tokens nuevos, roles compartidos y seis referencias aplicables de Link
completan 32 controles visuales. Se resuelve la excepción registrada en ADR 0325:
el offset local del subrayado y su grosor en Hover ya tienen tokens de E6. Foco,
grosor en reposo y movimiento reutilizan Link; sus colores contextuales siguen
con la composición, sin exportar inputs de Link que aquí no se consumen.

Alturas mínimas amplia/compacta son dimensiones. Padding compacto, gaps y tamaño
de eyebrow conservan sus proporciones actuales respecto a bases compartidas,
ahora mediante factores editables. Esto preserva la respuesta de marca y viewport:
base 32px × factor 0.25 produce 8px; no se congelan esas derivaciones por breakpoint.
La container query sigue eligiendo la disposición. Compact preview es una fixture
de Studio con Checkbox compartido, no una nueva propiedad del componente.

El color primary también alimenta el overlay y Studio identifica ambos usos.
Opacidad de overlay/eyebrow, tracking e icono son editables. Uppercase conserva el
tratamiento aceptado del eyebrow; media/crop/focal point y posición editorial son
responsabilidad del target. Span 2 sale del inventario de estados y mantiene su
variante y colocación en el Grid conforme a ADR 0274.

## Evidencia local

- Chromium: 232 mediciones (29 elementos × ocho matrices) preservan presentación
  de cuatro tiles, con/sin media y amplia/compacta. Incluyen contenido, overlay,
  texto y CTA; la densidad actual no cambia con los nuevos defaults.
- Una base de 40px y factor compacto 0.5 producen padding 40/20px. Mínimos de
  18/14rem producen 288/224px. Eyebrow con base 20px y factor 0.7 mide 14px;
  tracking 0.2em mide 2.8px, opacity 0.6, gap 12px. CTA gap 24px, icon gap 16px,
  icono 1.75rem/28px y overlay 0.8 responden al token correspondiente.
- Link conserva grosor en reposo 3px, Hover 4px, offset 6px, foco 4/3px y radio
  6px. Enter sigue un fragmento real en el consumidor. La raíz permanece pasiva.
- Texto largo y RTL caben en el tile; el icono refleja su dirección. Colores
  forzados ocultan visualmente media/overlay, conservan alt y añaden el borde de
  sistema existente. No se mide aquí contraste de todas las imágenes/opacidades.
- El Grid de 800px acepta span 2 en el li real; a 280px mantiene una columna sin
  overflow, sin span implícito y con el mismo orden de los tres registros de
  ejemplo. Esto no prueba consultas, paginación ni conteos de una tienda remota.
- Studio edita dimensiones y Link, y Compact preview produce ancho real de 280px
  con la regla canónica: padding 20px y mínimo 224px. Captura revisada. Quitar
  destino o texto omite el CTA; quitar eyebrow lo omite; título vacío omite el
  tile. Quitar media retira también overlay. Reset devuelve la fixture amplia y
  los defaults. Studio conserva su navegación de ejemplo interceptada existente;
  la navegación nativa se prueba en el consumidor CLI.
- Exhibit referencia las nuevas variables. Fuente, paridad legacy, catálogo de
  692 rutas/5536 comparaciones, contratos, Studio, docs, TypeScript y adapters
  pasan. Los IDs iniciales de nuevos controles se normalizaron a kebab-case antes
  de la evidencia. Auditorías automatizadas pasan sin promoción de madurez.

Evidencia ignorada: `output/playwright/promo-values/evidence-result.json` y
`promo-compact.png`. CLI instala el cierre de dependencias sin runtime de E6.
Fixture temporal retirada, navegador cerrado y gate limpio; servidor preexistente
preservado.

## Límites y continuidad

No se verifican Safari/Firefox, lectores de pantalla físicos, toda combinación
arbitraria de factor/densidad/color/media, imágenes de marca futuras ni inserción
y editor Shopify remotos. Los factores no son límites de diseño impuestos por
el sistema. La evidencia local no certifica contraste para cualquier opacidad.

E6 permanece pilot. CSS/tokens/manifests Web y Shopify se regeneran para adopción
copy-and-own explícita, sin subida de tema, site/dist ni Figma. El schema/data,
conteo/paginación y preview de Shopify siguen en el checkpoint de ese target.
Continúan Modal y Drawer.
