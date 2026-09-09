# Checkpoint: paleta semántica de Lightbox

Fecha: 2026-09-09. ADR 0336. Completa la decisión pendiente del punto 5.

## Resultado

El propietario eligió tokens propios anclados al sistema. Cuatro colores son
aliases: fondo a color.overlay; foreground y superficie de controles a gray.0;
texto de controles a gray.900. Sus nombres expresan funciones de Lightbox y
viven en la capa de componentes. La densidad existente de 0.92 pasa a la fuente
como decisión del componente. No se añade una familia global para medios.

La paleta es estable entre temas. text.inverse no era un alias adecuado, porque
pasa a gray.900 en oscuro. Los roles pueden apuntar directamente a primitivas
cuando no existe un rol global que conserve su significado. Lightbox alcanza
43 tokens públicos, editables desde Studio y documentados en Exhibit.

Hover en navegación/zoom conserva ahora el foreground propio; antes Icon Button
lo sustituía con el texto de la página, llegando a rgb(250,250,250) sobre controles
blancos en oscuro. Close ya conservaba su paleta. El fallback de colores forzados
continúa usando colores del sistema.

## Validación

- 120 comparaciones de elementos a 390/1280px y en ambos temas preservan medidas
  y colores iniciales. Se normalizaron colores a RGBA para comparar el antiguo
  rgb() con color-mix(), alternando hojas completas anteriores/actuales.
- Se verificó la cadena generada sin aplanar aliases. Override global de la
  primitiva canónica --tg-color-gray-0 a #abcdef cambia texto y controles
  referenciados; --tg-color-overlay cambia el tintado. Los overrides de roles
  públicos locales personalizan Lightbox sin editar CSS ni sus primitivas.
- Tintado #20408080 y densidad 0.5 producen alpha 0.25098. Foreground #e9e3dc,
  controles #fee1ae/#263521 se preservan en hover y foco de controles. Captura
  revisada; son valores de prueba, no una nueva identidad aprobada.
- Colores forzados mantienen fondo blanco/texto negro del sistema. Studio edita
  los cinco inputs, combina alpha/densidad y Reset restaura el default. Exhibit
  enumera la API. Product Gallery hereda la superficie de controles del Lightbox.
- Fuente, paridad legacy, catálogo 860 rutas/6880 comparaciones, contratos,
  Studio, docs, adapters y consumidor CLI pasan. Auditorías mantienen madurez y
  dos avisos Shopify advisory. No cambió TypeScript ni el motor de interacción.

Evidencia ignorada en `output/playwright/lightbox-palette/`; fixture retirada y
navegador cerrado. Servidor preexistente preservado y gate de recursos limpio.

## Límites

Pruebas locales Chromium, sin Safari/Firefox, lectores de pantalla, revisión de
cualquier combinación arbitraria de colores ni Shopify remoto. Las salidas
regeneradas requieren adopción copy-and-own. Se conserva pilot y no se publicó
site/dist ni se trabajó en Figma. Se resuelve la pregunta de alcance de paleta;
no se declara terminada la auditoría global ni certificada la plataforma.
