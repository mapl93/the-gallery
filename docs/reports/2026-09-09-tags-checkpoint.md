# Checkpoint: Tag y Tags Input

Fecha: 2026-09-09. Respaldo previo: `1cd86ea`, subido antes de editar.

## Resultado

ADR 0309 añade 15 decisiones (10 Tag, 5 Tags Input). Se conectan los controles
antes inertes de padding del campo y se separan sus espacios del margen/icono de
Input. Tag conserva un mínimo de 24px para quitar, usa padding lógico y ofrece
geometría, opacidad y foco propios. El campo usa la altura mínima compartida de
46px; puede crecer por etiquetas, contenido y filas.

Tags Input compone TagArtwork y publica los tokens de esa dependencia. El
validador y la auditoría de preparación comparten la resolución de referencias en el CSS de dependencias declaradas, igual
que ya hacía para clases y comportamiento. Tres comprobaciones verifican que
acepta la dependencia, detecta su ausencia y rechaza un token de archivo ajeno.
Sigue siendo evidencia por archivo, no una auditoría de cada selector.

Studio respeta feedback vacío. Los algoritmos de colección, duplicados,
serialización y envío permanecen bajo el consumidor. El foco simulado usa los
mismos tokens que el foco nativo.

## Evidencia

- Cuatro casos Studio: Tag y Tags Input en 1200px/Light y 390px/Dark. 56 mediciones
  cubren las 15 decisiones, controles compuestos y geometría de foco/borde.
  6rem se resuelve a 96px para el borrador; el token conserva su unidad.
- Target de quitar conserva 24px cuando el inspector solicita 12px. Remover y
  restaurar Tag eligen foco superviviente; una acción sin nombre se omite.
- Tags Input: altura vacía 46px, aceptación con Enter, duplicado conserva borrador,
  blur/coma/Backspace no alteran la colección, IME no confirma, eliminación devuelve
  foco, readonly omite acciones y disabled las desactiva. Movimiento reducido y
  colores forzados emulados.
- La primera prueba RTL detectó padding inicial/final invertido. Después de usar
  propiedades lógicas se midieron 20px/12px en ambas direcciones, solo y compuesto.
- La X con opacidad 0.6 medía aproximadamente 2.81:1 sobre el fondo Light real.
  Con el nuevo default 0.7 mide 3.482:1 en Light y 5.773:1 en Dark. La comprobación
  usa colores calculados y composición alfa, no píxeles suavizados de la captura.
  El criterio aplicable es [WCAG 2.2, contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- Exhibit publica el inventario de ambos componentes. Filter Panel demuestra
  override directo de Tag, eliminación y foco en el siguiente filtro en las dos
  vistas. La comprobación final espera el requestAnimationFrame que programa el foco.
- Catálogo: 518 rutas y 4144 comparaciones en ocho matrices. Pasan contratos,
  Studio, MDX, TypeScript, adaptadores Web/Shopify y 20 escenarios copy-and-own del
  CLI. No se modifica madurez. Recursos propios cerrados; servidor previo conservado.

Evidencia local no versionada: `output/playwright/tags-evidence.json` y
`tags-*.png`. Se inspeccionaron las capturas del campo Light/Dark; la comprobación
final de contraste y Filter Panel incluye la opacidad corregida.

## Bloqueo y límites

El gate de rendimiento tiene dos brechas obligatorias: tokens Web y la instalación
máxima de Storytelling. El detalle y la separación antes/después están en
`docs/reports/2026-09-09-component-batches-checkpoint.md`. Este es un checkpoint
funcional con un bloqueo de entrega registrado, no una certificación de release.

No se probó lector de pantalla, Safari/Firefox ni un backend/serializador de Tags
Input. El comportamiento de colección en Studio es un controlador de ejemplo;
no se convierte en runtime neutral. Shopify sólo recibe salidas locales generadas.
No se reconstruyó `site/dist`, no se subió al tema alojado y no se promovió stable.
