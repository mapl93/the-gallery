# Limpieza de texturas del home — 15 octubre 2026

Estado: publicado el 15 octubre 2026 con autorización explícita del propietario.
El 16 octubre el propietario autorizó registrar y subir esta mejora en Git.

El GLB de la bolsa y el del horno incluían imágenes que el renderer sustituía
al preparar los materiales. El build ahora elimina esas referencias y sus
imágenes antes de comprimir con Meshopt. Conserva los bytes de geometría y de
las imágenes utilizadas. Los originales editables y sus mapas PBR permanecen
intactos; esta proyección sirve al renderer específico del storefront.

## Por qué algunos objetos incluyen imágenes

- Diario y archivo: su acabado se construye con geometría y materiales
  procedurales del visor; sus GLB actuales no contienen imágenes.
- Bolsa: las fibras se calculan en el shader, pero la impresión gráfica sigue
  usando una imagen. Se conserva esa imagen y su segundo canal UV. Los seis
  mapas eliminados correspondían a acabados sustituidos por el shader.
- Horno: el acabado V2 se genera proceduralmente durante el build y se guarda
  como ocho imágenes para su uso posterior. Se conservan esas ocho imágenes,
  el mapa de oclusión y tres mapas empaquetados de rugosidad/metallicidad: aunque
  el runtime sustituye su rugosidad, todavía utiliza la información metálica.
  Se eliminan cinco imágenes anteriores que ya no intervienen en el resultado.

No es una exigencia inherente a cada objeto: refleja cómo se implementó su
acabado. Eliminar imágenes utilizadas o sustituirlas por shaders sería otro
cambio, con sus propias comprobaciones de calidad y coste de renderizado.

## Tamaños

Bytes exactos de los archivos entregables, antes de cualquier compresión HTTP:

| Modelo | Antes | Después | Ahorro |
| --- | ---: | ---: | ---: |
| Bolsa | 6.086.116 | 2.591.832 | 3.494.284 |
| Horno | 10.786.592 | 9.531.008 | 1.255.584 |
| Diario | 3.227.688 | 3.227.688 | 0 |
| Archivo | 2.763.048 | 2.763.048 | 0 |
| Total | 22.863.444 | 18.113.576 | 4.749.868 |

El ahorro total es 4,75 MB decimales (20,77%). Es una reducción de descarga;
no constituye una medición de FPS ni de tiempo de carga en producción.

## Implementación y reproducción

`scripts/lib/prune-gallery-textures.js` refleja las sustituciones actuales de
`nonwoven-material.js` y `kiln-finish.js`. Conserva referencias compartidas,
referencias privadas de `galleryKilnFinish.textures` y la excepción del ladrillo
bajo `ControlBox`. Rechaza entradas comprimidas y extensiones no soportadas.
Si cambian esos materiales, debe revisarse también esta proyección de entrega.

`scripts/build-shopify-home-gallery.mjs` aplica la limpieza después del bake
del horno y antes de Meshopt. Su opción `--models-only` reutiliza las referencias
locales y conserva los bundles JS y las hojas CSS existentes:

```sh
node scripts/build-shopify-home-gallery.mjs --kiln-root /ruta/al/checkout/del/horno --models-only
node --test scripts/prune-gallery-textures.test.js
npm run validate:adapter:shopify
```

Requiere las fuentes generadas locales y las dependencias compatibles del
checkout indicado. Solo se actualizaron las copias de bolsa y horno del preview.
El registro Git de esta mejora incluye los dos GLB publicados, el build y sus
helpers, las pruebas y la dependencia Meshoptimizer. No incorpora el resto del
storefront pendiente ni sus fuentes de modelado: el build completo sigue
requiriendo esas fuentes y el checkout del horno indicados arriba.

## Evidencia y límites

Evidencia local en `output/playwright/texture-pruning-20261015/`:

- Siete pruebas unitarias aprobadas. Validación del adapter Shopify aprobada,
  con advertencias de madurez preexistentes.
- `structural-parity.json`: geometría, transformaciones y materiales efectivos
  coinciden para 46 mallas de bolsa y 47 de horno, usando GLTFLoader/Meshopt y
  los mismos preparadores de materiales y recorte del visor. Esta comprobación
  identifica imágenes por sus bytes; no simula su rasterización.
- `screenshot-parity.json`: los 14 pares de PNG antes/después son idénticos
  byte a byte. Se verificaron cinco objetos del home, horno abierto y vista
  de horneado, en temas claro y oscuro, a 1440 × 1000 y con movimiento reducido.
- `visual-parity.json`: estados capturados y cero excepciones de página.
  Vite registró fallos de conexión de su WebSocket HMR en el entorno local;
  no se consideran una consola completamente limpia.
- El fixture local tenía `data-about-url=""`, que abría el overlay About.
  La prueba interceptó únicamente su HTML para usar `/pages/about` en ambas
  versiones. No se modificó el producto para esta corrección del fixture.
- Diario, archivo, controlador y renderer permanecen idénticos a la copia
  inicial. Los archivos editables originales no se sobrescribieron.

No se midieron móvil, FPS ni red real de producción. Las capturas cubren estados
estables, no todos los fotogramas de las animaciones. El navegador propio se
cerró; `evidence:cleanup` y `evidence:assert-clean` pasaron y preservaron el
servidor local preexistente del usuario.

## Publicación

Se verificó que el tema `189414932787` de `mkvm3d-hf.myshopify.com` seguía activo.
Los dos archivos anteriores del CDN coincidían con el baseline y se guardaron
en `output/playwright/texture-pruning-20261015/publication/` antes de publicar.
Se ejecutó exclusivamente:

```sh
shopify theme push --store mkvm3d-hf.myshopify.com --theme 189414932787 --allow-live --only assets/home-shop.glb --only assets/home-services.glb --nodelete --path platforms/shopify --json
```

Shopify confirmó el upload. Ambos archivos descargados del CDN con un nuevo
parámetro `v` coinciden byte a byte con los candidatos validados; la URL sin
versión todavía devolvía el contenido anterior en caché. Las identidades y URLs
de comprobación están en `publication/cdn-verification.json`.

La prueba de navegación en un navegador limpio llegó a la protección por
contraseña. La conexión con la pestaña autenticada existente de Chrome agotó
su tiempo de espera. Por tanto, se verificó la entrega de archivos en producción,
pero no se repitió allí la comprobación visual ni se midió rendimiento.
Se cerró el navegador temporal y pasó `evidence:assert-clean`.
