# Checkpoint: transparencia del editor de colores de Studio

Fecha: 2026-09-09. Decisión: ADR 0318. Corrección transversal del punto 5.

## Problema y resultado

El selector nativo recibía solo hexadecimal RGB: perdía el alfa de RGBA y
reemplazaba las expresiones que no reconocía por negro. Empty State permitió
observar el segundo fallo: su icono predeterminado usa `color-mix` con 60% del
texto secundario y transparente; no usa RGBA al 40%. Una afirmación provisional
de la prueba confundió ese valor con el caso de ensayo y fue corregida.

El inspector conserva ahora alfa al editar RGB y RGB al editar opacidad. La muestra
representa el color completo sobre un damero. Los colores sRGB compatibles tienen
un campo de opacidad porcentual con el mismo estilo del resto del inspector;
formatos no interpretados conservan la expresión CSS completa, editable, y su
muestra visual. No se simula negro ni se aplanan mezclas a otra identidad de color.
El editor de sombras reutiliza el campo numérico general sin cambiar su contrato.

## Evidencia

- Once casos de hex/RGB/RGBA y alfa: hexadecimal corto/largo con y sin alfa,
  porcentajes, transparente, cero y límites válidos. Editar RGB conserva alfa;
  editar opacidad conserva canales fraccionarios. Ocho formas no soportadas o
  mal formadas pasan al editor completo, evitando interpretación parcial.
- Chromium, interfaz real: el color-mix original se conserva. Un override explícito
  `rgba(82,82,82,.4)` permite probar RGB → `rgba(18,52,86,.4)`, opacidad → `.25`,
  y cero alfa sin reaparecer al cambiar RGB. Muestra y componente coinciden.
- Opacidad queda entre 0 y 100; un borrador inválido no sustituye el último valor.
  Foco por teclado pasa del selector al campo de opacidad. Reset Light/Dark
  restaura la expresión completa de cada tema con 60% de su texto secundario.
- El borde transparente de Button sigue en cero al editar RGB; cambiar su opacidad
  a 50 produce `rgba(68,102,136,.5)` en el borde real. Slider mantiene su editor de
  sombras: blur 9px y alfa .35 se serializan juntos correctamente.
- `color(display-p3 ...)` permanece completo en el campo de texto, sin controles
  parciales. Capturas a 1280/390 revisadas; campos sin overflow y tipografía de
  opacidad 12px como los demás editores.
- TypeScript, docs/contratos/Studio/decisiones y diff whitespace correctos.

Evidencia ignorada: `output/playwright/studio-color-alpha/`. Sesión cerrada y gate
limpio; servidor local preexistente preservado. Los eventos del picker se emitieron
sobre el input nativo; no se operó ni certificó el diálogo de color del sistema.
No se verificaron lectores de pantalla, Safari/Firefox o todos los colores CSS.

## Entrega

Cambio exclusivo del sitio: sin tokens nuevos, contratos o adapters regenerados,
`site/dist`, paquetes, Shopify remoto ni Figma. No modifica los valores canónicos
por usar Studio, ni promueve componentes. La implementación conserva el modelo de
personalización local de la vista y reinicio explícito a los valores canónicos.
