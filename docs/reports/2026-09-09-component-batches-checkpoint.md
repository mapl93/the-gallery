# Corrida de batches pequeños — 2026-09-09

> Actualización posterior: el propietario aclaró que los límites deben ser por
> target y tener fundamento externo. ADR 0310 retira los topes internos y sus
> criterios de aceptación de 64/21 KiB. Este informe conserva el resultado
> histórico: fue un bloqueo de política interna, no una restricción técnica del
> target ni una medición de lentitud. Los batches pueden continuar; la optimización
> del generador sigue pendiente. Véase `2026-09-09-target-performance-checkpoint.md`.

## Resultado y checkpoints

Se avanzó en tres batches de dos componentes, hasta encontrar un bloqueo de
rendimiento. Se añadieron 78 decisiones de personalización públicas dentro de la
capa existente, con controles Studio/Exhibit y salidas generadas Web/Shopify.
La lupa de la demostración Combobox se retiró por decisión explícita del propietario.

| Batch | Componentes | Decisiones nuevas | Evidencia |
| --- | --- | ---: | --- |
| ADR 0307 | Combobox, Date Picker | 39 | `2026-09-09-popup-fields-checkpoint.md` |
| ADR 0308 | File Upload, Pin Input | 24 | `2026-09-09-file-pin-checkpoint.md` |
| ADR 0309 | Tag, Tags Input | 15 | `2026-09-09-tags-checkpoint.md` |

`d692086` respaldó el trabajo previo al primer batch; `701560d` respaldó el
primero y `1cd86ea` el segundo. Cada checkpoint se subió antes de editar el
siguiente. El tercero incorpora este diagnóstico; su commit es el que contiene
este informe. Se conserva la secuencia sistema Web → Shopify, sin Figma.

Las pruebas funcionales y estructurales pasan con los límites de cada informe.
Ningún contrato obtiene stable automáticamente. No hubo publicación de paquete,
rebuild de site/dist ni subida de estos batches al Shopify alojado.

## Bloqueo real encontrado

`node scripts/audit-refinement-performance.js` no pasa: 21 superficies, 17 pass,
2 brechas obligatorias y 2 excesos meramente diagnósticos.

| Superficie obligatoria | Medición del gate | Límite | Diferencia |
| --- | ---: | ---: | ---: |
| Tokens Web | 89 500 B gzip | 65 536 B | +23 964 B |
| Mayor instalación Storytelling: Artist Card | 25 880 B gzip | 21 504 B | +4 376 B |

Los presupuestos están definidos en `docs/refinement/performance-budgets.json` y
ADR 0273. El exceso de los bundles completos de CSS y runtime es diagnóstico
por esa decisión; no se confunde con un nuevo bloqueo de runtime selectivo.
Tokens Web no tiene una excepción de presupuesto documentada. No se cambió
ningún límite ni se convirtió un gate obligatorio en advertencia.

### Separación entre deuda previa y cambio de esta corrida

Medición comparable con gzip del sistema, nivel 9, sin nombre/fecha (`gzip -9 -n`):

| Estado | Tokens gzip | Mayor instalación Storytelling gzip |
| --- | ---: | ---: |
| Antes: d692086 | 74 777 B | 25 830 B |
| Combobox/Date Picker: 701560d | 81 783 B | 25 830 B |
| File Upload/Pin Input: 1cd86ea | 86 806 B | 25 830 B |
| Tag/Tags Input | 89 489 B | 25 880 B |

El gate de tokens suma 11 bytes de cabecera de archivo frente a la comparación
sin nombre/fecha. Ambos excesos ya existían antes; esta corrida añade 14 712 B a
tokens y 50 B al peor slice de Storytelling. Las validaciones de los batches
anteriores no establecían que este gate global estuviera verde.

### Causa y propuesta concreta

`scripts/build-web-tokens.js`, en `buildThemeBlocks`, repite el catálogo y todos
los alias en cada viewport: cuatro Light, cuatro Dark automático y cuatro Dark
manual. No son doce modos nuevos; es una política redundante de salida para ocho
matrices existentes. Agregar una decisión pequeña se repite en esos doce bloques.

Un prototipo **sólo temporal**, sin modificar el generador ni su salida oficial,
conserva un bloque completo por ámbito de tema y emite sólo declaraciones que
cambian respecto al viewport anterior. Su medición baja de 731 093 B sin comprimir
/ 89 489 B gzip a 191 987 B / 24 066 B gzip. Es una prueba de tamaño, todavía no
una prueba de equivalencia de cascada o de comportamiento. No se adoptó el prototipo.

Artist Card arrastra reset, foundations, utilities, layout, primitives y
storytelling completos. No es el costo de su markup aislado ni de un nuevo JS.
ADR 0273 reconoce que las familias CSS pueden convertirse en el siguiente cuello
de botella. No se retiraron dependencias ni estilos para maquillar la medición.

## Siguiente checkpoint propuesto antes de sumar componentes

1. Optimizar sólo la salida de tokens conservando fuentes, nombres públicos,
   unidades y las ocho matrices. Comparar todas las variables calculadas y aliases
   antes/después; probar Light/Dark explícito, preferencia del sistema, islas de
   tema anidadas, límites de viewport, overrides de marca y actualización dinámica.
   Aceptación: igualdad funcional y tokens por debajo de 64 KiB gzip.
2. Hacer un piloto de entrega CSS con Artist Card y su composición Card. Auditar
   qué parte de cada familia necesita su contrato antes de elegir extracción o
   reorganización; documentar esa decisión como continuación de ADR 0273. Aceptación:
   slice menor o igual a 21 KiB, sin perder estados, foco, media queries ni contenido,
   sin copiar estilos al sitio y con instalación CLI reproducible.
3. Ejecutar el gate completo y retomar batches de Color Picker, Segmented Control
   y Slider cuando pasen las superficies obligatorias. No ampliar presupuestos
   ni eliminar personalización/modos como solución automática.

El prototipo y la comparación están en archivos temporales y
`output/playwright/component-batches-performance.json` (evidencia no versionada).
El bloqueo no demuestra una necesidad de reconstruir el sistema: primero se
prueba una salida menos redundante y una entrega acotada de CSS.
