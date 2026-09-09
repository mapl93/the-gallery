# Checkpoint: orden canónico de CSS en la CLI

Fecha: 2026-09-09. ADR 0340. Corrección de distribución detectada durante el punto 5.

## Problema y corrección

Al instalar `product-info product-slider`, la CLI reunía familias CSS según el
orden en que recorría las dependencias. Eso colocaba product.css antes de
layout.css. Seguir las instrucciones emitidas hacía que Carousel sobreescribiera
el display:grid de Product Slider con display:flex. La instalación incremental
y add-all también producían órdenes distintos al canónico.

La unión ahora sigue sources.cssFiles del manifest Web, cuyo orden procede de
components/css/index.css. Tokens siguen primero. Un archivo requerido ausente
de ese inventario provoca error antes de escribir. No cambia el contenido de
los archivos copiados ni la protección de personalizaciones del consumidor.

## Evidencia

- La nueva prueba de integración falló antes de la corrección en solicitud
  conjunta, incremental y add-all; ambas permutaciones, incremental y add-all
  pasan después con el subconjunto canónico exacto.
- Pasan los 20 escenarios existentes de protección copy-and-own, incluida
  conservación local, conflictos sin escrituras, dry run, idempotencia y diff.
- Chromium con el consumidor copiado confirma display:flex bajo el orden anterior
  y display:grid bajo el corregido. La navegación finita de la composición de
  Studio continúa funcionando. Evidencia compartida con el batch visual en
  `output/playwright/product-info-slider-values/`.
- Recursos cerrados y fixture retirada; el servidor preexistente fue preservado.

## Adopción

La CLI emite el orden correcto para nuevas instalaciones y comprobaciones de
componentes existentes. Las aplicaciones que ya copiaron sus imports deben
reordenarlos explícitamente; esta corrección no modifica sus archivos de entrada.
No se publicó un paquete ni se certificó Shopify remoto.
