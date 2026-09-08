# Piloto de marca en Shopify

## Resultado

Piloto subido y probado en el editor real de Shopify. Está disponible para
revisión visual del propietario como **gallery-brand-pilot-2026-09-08**,
tema `188631449907`, con rol `UNPUBLISHED` en manú studio.

[Abrir el editor del piloto](https://admin.shopify.com/store/mkvm3d-hf/themes/188631449907/editor).

El tema activo **The Gallery**, `184841142579`, conserva su rol `MAIN` y no se
editó. Antes de este bloque se guardó y subió `8162b62`, con el formulario,
el marcador obligatorio y la corrección óptica de Button aprobados. Los cambios
de este piloto se guardan en un checkpoint Git independiente, posterior a
`8162b62`, antes de iniciar el piloto de Figma.

Los seis ajustes de color que ya existían en `config/settings_schema.json` no
tenían consumidores Liquid. Ahora se conectan mediante un único snippet a los
tokens semánticos. Se añaden cuatro controles del botón principal, correspondientes
a decisiones que ya existían en el repositorio. No se añaden tokens ni modos.

| Ajuste Shopify | Variable canónica | Inicial |
| --- | --- | --- |
| `color_surface_primary` | `--tg-color-surface-primary` | `#FFFFFF` |
| `color_surface_secondary` | `--tg-color-surface-secondary` | `#F5F5F5` |
| `color_surface_archival` | `--tg-color-surface-archival` | `#F6F2F0` |
| `color_text_primary` | `--tg-color-text-primary` | `#171717` |
| `color_text_secondary` | `--tg-color-text-secondary` | `#525252` |
| `color_border_default` | `--tg-color-border-default` | `#E5E5E5` |
| `color_button_primary` | `--tg-component-button-primary-background-default` | `#404040` |
| `color_button_primary_hover` | `--tg-component-button-primary-background-hover` | `#262626` |
| `color_button_primary_active` | `--tg-component-button-primary-background-active` | `#0A0A0A` |
| `color_button_primary_text` | `--tg-component-button-primary-text` | `#FFFFFF` |

Los colores afectan a la apariencia clara, como indica el editor en español e
inglés. La apariencia oscura conserva su paleta. Los alias existentes propagan
los ajustes a Input, Textarea, Select, Button y otros consumidores; el texto
principal también alimenta el foco. Los colores de validación y obligatorio
conservan su responsabilidad.

`snippets/theme-brand-settings.liquid` concentra también las dos fuentes y su
carga, compartida por `theme.liquid`, `password.liquid` y `gift_card.liquid`.
La fuente de interfaz alimenta controles, texto general y títulos comunes;
la editorial alimenta artículos. Se corrige la divergencia previa de gift card.
El snippet se carga después de los CSS en las tres páginas.

Los ajustes de color se imprimen directamente dentro de `style`, sin filtros
de color, siguiendo el mecanismo de [vista previa de Shopify](https://shopify.dev/docs/storefronts/themes/tools/online-editor#live-preview).
El [schema de ajustes](https://shopify.dev/docs/storefronts/themes/architecture/config/settings-schema-json)
define el editor; los valores guardados pertenecen a cada tienda.

## Comprobaciones

- `validate:shopify:brand`: 10 asociaciones de color, 40 comparaciones contra
  los valores compilados de la fuente en cuatro viewports, dos selectores de
  fuente, tres órdenes de carga y dos idiomas.
- `validate:docs` y construcción/validación del adaptador Shopify: correctas.
- Theme Check de Shopify CLI 3.92.1 sobre el paquete nativo final: **0 errores,
  12 advertencias**, en `logo`, `brand-story` e `image-text`. Antes de cargar se
  completaron las traducciones de schema de `artist-profile`, `comments` y
  `related-articles` en inglés y español. `_legacy` queda en el repositorio como
  referencia y no forma parte del paquete. El resultado del paquete no equivale
  a limpiar los diagnósticos de los archivos históricos del repo.
- El script de validación de la skill no dispone de `@shopify/theme-check-common`
  en esta instalación. Se ejecutó Theme Check mediante el CLI ya instalado y
  el Node disponible, sin instalar ni modificar herramientas.
- Chromium, Light/Dark y 390/800/1200/1600 px: los valores iniciales conservan
  colores y geometría; la paleta de ejemplo cambia los consumidores Light,
  mantiene los colores Dark y conserva controles de 46 px sin desbordamiento.
- Hover, pulsado, fuente de interfaz, omisión de colores vacíos y actualización
  mediante variables CSS de editor simuladas: correctos. Movimiento reducido
  durante la medición evita confundir colores intermedios con los finales.

La paleta de ejemplo solo se inyectó durante la prueba local. Sus contrastes
calculados sobre el fondo de la muestra son 14,08:1 para texto principal,
6,65:1 para secundario y 4,63:1 para el marcador obligatorio. El texto blanco
del botón alcanza 7,93:1, 10,50:1 y 13,95:1 en reposo, hover y pulsado.
Esto no certifica toda la interfaz ni una futura paleta elegida por el propietario.

Capturas locales, no versionadas:

- `output/playwright/shopify-brand-light-desktop.png`
- `output/playwright/shopify-brand-light-mobile.png`

Servidor y navegador cerrados; `evidence:assert-clean` correcto.

## Prueba alojada y trazabilidad

- Se importó un ZIP nuevo desde el administrador de Shopify usando la sesión de
  Chrome del propietario. El CLI requería renovar autenticación; no se amplió
  ningún permiso para evitar ese paso. Shopify creó un borrador y su API confirmó
  los roles `UNPUBLISHED` y `MAIN` de los dos IDs anteriores al terminar.
- El paquete contiene exclusivamente `assets`, `config`, `layout`, `locales`,
  `sections`, `snippets` y `templates`. La portada de esta copia compone Contact
  Section y Newsletter para probar campos y botones. El `templates/index.json`
  oficial del repo no cambia. Los ajustes iniciales del nuevo tema se generaron
  desde los defaults del schema, sin copiar selecciones de la tienda activa.
- Los diez colores se cambiaron en el editor usando la paleta de ejemplo. Se
  observaron fondos, textos, bordes y botones; después de guardar y recargar,
  los diez valores seguían seleccionados. Los estilos computados del storefront
  confirmaron las diez variables con los valores guardados. El input y el botón
  del Newsletter midieron 46 px y compartían la misma coordenada vertical;
  los controles de contacto también conservaban 46 px, sin overflow horizontal.
- Los dos selectores de fuentes se cambiaron a Alegreya Sans y Alegreya, se
  guardaron y persistieron tras recarga. Esto detectó una regresión: `font.family
  | json` introducía comillas literales alrededor de nombres de varias palabras,
  produciendo una familia inexistente y usando el fallback. Se eliminó `json`
  en ambos bindings, conforme a la [documentación oficial de font.family](https://shopify.dev/docs/api/liquid/objects/font#font-family),
  y se añadió la comprobación al validador. Se actualizó exclusivamente el
  snippet del borrador mediante `themeFilesUpsert`; checksum MD5 confirmado:
  `0d70ead0d5c635a9e163d4f510ee9218`. La recarga mostró la fuente corregida.
- Se restauraron los diez colores originales, Inter y Lora mediante el editor y
  se guardaron. El piloto queda con la identidad inicial de Gallery.
- Se inspeccionaron el formulario móvil y las vistas Shopify de Password y
  Gift card, esta última con los datos de muestra del editor. No se emitió una
  tarjeta real ni se enviaron formularios de contacto o suscripción.
- Vaciar el texto hexadecimal del selector conserva el último valor válido:
  no representa un ajuste Shopify vacío. La omisión por `blank` sigue cubierta
  por validación de fuente y simulación local, sin atribuirle una prueba alojada.

Paquete inicial: SHA-256
`73f8535924426a7e144a8f833a91a03f3ddcbefdd0d2bda6b83eaa3c5513a6e8`.
El snippet recibió después la corrección de fuente anterior. El paquete final,
con esa corrección y los defaults restaurados, queda como artefacto local no
versionado en `output/shopify/Gallery-Brand-Pilot-2026-09-08-validated.zip`:
SHA-256 `64cff9989f821b9aa9e603ca5f73b28712bcd8fdd48ce8ec5ea32974e22440b8`.

## Límites y siguiente checkpoint

La prueba local proyecta las asociaciones del snippet a CSS sobre el formulario
real de Gallery; la prueba alojada anterior la complementa con Liquid real,
fuentes, selección, guardado y recarga. Dark y los cuatro viewports completos
se comprobaron localmente, no como matriz alojada. El editor móvil se revisó
visualmente; las mediciones de 46 px corresponden al storefront de escritorio.
Password y Gift card se inspeccionaron con los defaults restaurados, sin repetir
la matriz completa de diez ajustes en cada página. No se probó una composición
editorial real con la fuente alternativa, ni envíos, compras o checkout.
No se modificaron el tema activo, el `settings_data.json` canónico, `site/dist`
ni Figma. Este piloto no certifica el resto de componentes del tema.

El siguiente paso es la revisión visual del propietario en el enlace anterior.
Después puede avanzar el piloto de Figma. La paleta definitiva y una posible
personalización de Dark requieren revisión; no se deducen de esta muestra.

En una copia existente, adoptar el snippet, sus tres llamadas, el schema y las
traducciones junto con el adaptador compatible. Conservar los IDs y las selecciones
del comerciante. Actualizar The Gallery no modifica automáticamente esa copia.
