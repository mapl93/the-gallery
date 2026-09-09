# Checkpoint: Card

Fecha: 2026-09-09. ADR 0326. Continúa el punto 5 de la auditoría.

## Resultado

Card completa catorce roles públicos con tres tokens nuevos: borde 1px,
elevación Hover 2px y escala de imagen 1.03. Studio añade los controles de timing
de media y ambas curvas que ya existían. La categoría transform registra el rol
numérico de escala en el inventario existente; no crea un formato ni una capa.

La simulación previa de Hover en Studio usaba translateY(-2px) inline, no mostraba
la escala de imagen y podía ignorar preferencias de movimiento/puntero. Ahora sus
selectores locales consumen los mismos tokens y condiciones que Card. La fuente
canónica sigue independiente de Studio, sin nuevo runtime del componente.

## Evidencia local

- Chromium: 48 combinaciones (tres variantes × reposo/Hover × ocho matrices de
  tema/ancho) conservan dimensiones, borde, sombras, transformaciones, espaciado,
  duración y curvas del CSS anterior. Incluye la imagen opcional de Flat.
- Borde 3px, contenido 24px, elevación 6px y escala 1.1 se aplican mediante tokens
  a las tres variantes. Flat mantiene shell inmóvil y shadowless con borde
  transparente; su media escala como en el contrato aceptado.
- Foco dentro de Card libera el clipping de overflow. Reduced motion elimina
  transiciones y transformaciones de Card/media. Emulación táctil CDP verifica
  realmente pointer:coarse y hover:none; las transformaciones quedan desactivadas.
- Studio refleja los mismos valores, incluye zoom de media y duración 450ms,
  conserva las variantes independientes y respeta ambos modos de preferencia.
  Reset vuelve a borde 1px, contenido 16px, reposo y ausencia de transformaciones.
  Captura personalizada revisada visualmente con la fixture editorial existente.
- Author Card hereda borde 3px y elevación 6px. Product Card hereda el borde pero
  permanece inmóvil y conserva su escala de imagen 1.03 independiente; esa
  excepción está aceptada y no se elimina por cambiar la base.
- Exhibit presenta la escala y las demás referencias; consumidor CLI instalado.
  Fuente, paridad legacy, catálogo, contratos, Studio, docs, TypeScript y adapters
  pasan. Pasan también las veinte pruebas de protección copy-and-own y la
  instalación con dependencias, después de registrar la categoría transform.
- Auditorías automatizadas pasan. Card conserva el stable aprobado en ADR 0290;
  no se promueve otro componente ni se certifican arbitrariamente sus overrides.

Evidencia ignorada: `output/playwright/card-values/evidence-result.json` y
`card-custom.png`. Fixture temporal retirada, navegador cerrado y gate limpio;
servidor preexistente preservado.

## Límites y continuidad

Emulación de preferencias no equivale a prueba en dispositivo táctil físico.
No se verificaron Safari/Firefox, lectores de pantalla reales, todas las escalas
arbitrarias ni tienda Shopify remota. Web/Shopify regenerados para adopción
explícita de las copias; sin subir tema, Figma ni site/dist. Se preserva la base
visual aprobada. Continúa Collection Promo y después la cobertura restante.
