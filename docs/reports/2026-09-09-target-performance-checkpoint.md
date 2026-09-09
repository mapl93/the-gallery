# Política de rendimiento por target — 2026-09-09

## Resultado

ADR 0310 aplica la instrucción del propietario: los límites deben corresponder a
un target y tener fundamento externo. Los topes internos de 64 KiB para tokens,
21 KiB para Storytelling y los demás topes de familias/runtime dejan de bloquear.
Se conservan como referencias históricas; no se aumentaron para acomodar el peso.

El estado previo ya estaba respaldado en `217cbf0`, subido a
`origin/codex/v1-component-refinement` y sin diferencias locales al iniciar.
Esta corrección cambia la política y su evidencia; no reduce el tamaño entregado.

## Política ejecutable

- Cada medición declara `web` o `shopify`, y sólo puede leer archivos de ese
  target. Se conservan las 21 superficies Web y se añaden tres Shopify: tokens y
  máximos por inventario CSS/JS, con detalle de cada archivo.
- Un límite nuevo necesita ámbito de aplicación, unidad exacta, autoridad, URL
  primaria y fecha de comprobación. Las referencias de una herramienta son
  advertencias; sólo un requisito de plataforma aplicable puede ser obligatorio.
  La revisión de la fuente sigue siendo necesaria: un campo URL no demuestra por
  sí solo que la regla sea correcta.
- El inventario distingue observación, recomendación, requisito y evidencia no
  disponible. Archivos faltantes o selecciones vacías producen error y valores
  nulos, nunca un aprobado con cero bytes. Se retira el bypass `--allow-gaps`.
- Los checks de arquitectura para comportamiento pasivo y propiedad de recursos
  permanecen vigentes; no son estándares universales de peso.

## Lectura actual

El comando termina correctamente: **24 superficies, 22 observaciones, 2
advertencias y 0 errores**. No hay requisitos externos obligatorios de bytes
codificados en este inventario ni certificación de rendimiento del target.

| Evidencia | Bytes sin comprimir | Gzip local | Interpretación |
| --- | ---: | ---: | --- |
| Tokens Web | 731 093 | 89 489 | Observación; sin tope interno obligatorio. |
| Mayor instalación Storytelling: Artist Card | 182 508 | 25 880 | Dependencias CSS completas; tokens aparte. |
| Tokens Shopify / mayor CSS local | 731 253 | 89 537 | Supera la referencia configurable de 100 000 bytes crudos. |
| Mayor JS local Shopify: theme.js | 117 896 | 22 837 | Supera la referencia configurable de 10 000 bytes crudos; es el agregado de compatibilidad. |

El informe generado también enumera los módulos JS individuales que superan la
referencia. Incluir un archivo en el inventario no significa que la página lo
cargue: el target tiene un runtime selectivo. No se sumaron todos los archivos
como si fueran el peso de una página real.

Shopify mantiene documentación contradictoria sobre tamaño comprimido frente a
crudo. Se contrastó la guía de rendimiento con el código oficial de Theme Check:
para archivos locales utiliza tamaño del filesystem. Las referencias son
configurables y no están activadas en `.theme-check.yml`. Véanse fuentes y
aplicabilidad en ADR 0310; este comando no simula una ejecución de Theme Check.

Gzip ahora omite nombre y fecha de cabecera. Por eso tokens Web muestra 89 489 B
frente a los 89 500 B del gate anterior: son 11 bytes del método de medida,
no una mejora del CSS. El modelo de instalaciones concatenadas también sigue
siendo una comparación local, no transferencia HTTP real.

## Qué significa repetir el catálogo

`scripts/build-web-tokens.js:459` toma todas las declaraciones y todos los alias
en cada uno de cuatro viewports. Lo hace para Light, Dark por preferencia del
sistema y Dark explícito: doce bloques de salida para las ocho matrices
conceptuales existentes.

En `platforms/web/tokens.css:414`, el token de separación del label del Input
apunta a `--tg-dimension-4`, que vale 4 px. Esa misma declaración aparece doce
veces, junto con doce copias de su alias público `--space-input-label-gap`.
Por ejemplo, vuelve a aparecer en el bloque tablet en la línea 1330 sin cambiar.
H1 sí cambia de tamaño entre viewports: no todas las repeticiones son evitables.

El problema potencial está en la política de generación CSS. No significa que
existan doce tokens fuente diferentes para ese espacio. El piloto propuesto
emitiría sólo diferencias por viewport dentro de cada ámbito de tema, y tendría
que demostrar equivalencia de cascada, aliases, temas anidados y overrides.
La prueba temporal previa sólo estimó tamaño; todavía no valida esa equivalencia.

## Verificación y continuidad

- `npm run validate:refinement:performance`: 13 pruebas pasan, con casos de
  límites sin fuente, aislamiento por target, unidades, faltantes, inventario
  completo, dependencias, política malformada y códigos de salida.
- `npm run audit:refinement:performance`: inventario regenerado sin errores;
  mantiene dos advertencias explícitas de Shopify.
- `npm run validate:docs`: pasa para 182 componentes, contratos y definiciones
  Studio. Conserva los avisos existentes de fixtures externos/estilos inline.
- `git diff --check` y `npm run evidence:assert-clean`: pasan.

No se cambiaron tokens, componentes, generadores de targets, sus assets,
`site/dist`, el tema alojado ni estados stable. No fue necesaria una sesión de
navegador ni una nueva medición visual para este cambio de política. No se
ejecutaron Theme Check, pruebas de transferencia/CDN, Lighthouse ni subida de
paquete; sus resultados quedan sin verificar aquí.

Los batches pueden continuar con sus comprobaciones funcionales y estructurales.
La reducción de repetición del CSS es una propuesta pendiente, con aceptación por
equivalencia y reducción medida, sin exigir 64 KiB o 21 KiB arbitrarios. El alcance
sigue siendo sistema Web y después Shopify.
