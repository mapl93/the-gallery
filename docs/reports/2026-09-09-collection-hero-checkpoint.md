# Checkpoint: Collection Hero

Fecha: 2026-09-09. ADR 0345. Continúa el punto 5.

## Resultado

Siete roles fuente completan 23 valores públicos: altura mínima con imagen,
ancho máximo del texto, límites proporcionales del padding, factor del gap,
escala del conteo y peso del título. Tipografía base y roles existentes también
se exponen. Las dimensiones 300px/680px siguen siendo decisiones del componente;
no se amplía la escala primitiva artificialmente para alojarlas.

El padding efectivo es el menor entre el espacio del sistema y la fracción del
ancho disponible. Studio identifica ambos valores para que un límite que sigue
activo no parezca un control roto. Se conserva la composición derivada de imagen,
la pareja texto/scrim de cada tema y el crop/centrado aprobado en ADR 0119.

## Validación

- 88 comparaciones de elementos conservan geometría, tipo y paleta a
  320/600/900/1600px en ambos temas, con y sin imagen.
- Personalización: altura mínima 420px, ancho de lectura 400px, padding 90px/70px,
  conteo 16px, título peso 500 y gap 15px. En 272px útiles, caps 0.2/0.1 producen
  aproximadamente 54.4px/27.2px de padding sin overflow. Capturas revisadas.
- Sobre los 4.860.000 píxeles de la imagen de ejemplo, la composición del scrim
  inicial de 0.6 conserva mínimos de contraste de 5.836:1 en claro y 6.061:1 en
  oscuro. Es evidencia del fixture y paleta actuales, no de cualquier imagen o
  personalización ni una certificación integral de accesibilidad.
- Colores forzados vuelven transparentes los píxeles y preservan el nodo/alt.
  Studio edita/reset, deriva la clase al agregar/quitar imagen, conserva alt
  vacío decorativo y muestra las nuevas referencias en Exhibit.
- Fuente, catálogo 970 rutas/7760 comparaciones, contratos, Studio, docs,
  consumidor CLI y adapters pasan. Sin cambios de JS/TS. Auditorías conservan
  madurez y los dos avisos advisory de Shopify.

Evidencia ignorada: `output/playwright/collection-hero-values/`. Fixture retirada,
navegador cerrado, gate limpio y servidor preexistente preservado.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla, imágenes alternativas ni
Shopify remoto. Sigue pilot, sin nueva aprobación estética de la inversión del
scrim en oscuro. Sin site/dist, publicación ni Figma. Continúa Collection Grid
con la decisión del propietario: todas las densidades mediante tokens y
compatibilidad con copias actuales.
