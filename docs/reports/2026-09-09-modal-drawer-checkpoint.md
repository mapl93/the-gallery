# Checkpoint: Modal y Drawer

Fecha: 2026-09-09. ADR 0328. Continúa el punto 5 de la auditoría.

## Resultado

Dieciséis tokens de geometría y un color semántico compartido completan 25 roles
públicos en Modal y 23 en Drawer. Se reutilizan peso semibold, opacidad de scrim,
colores, tipo, sombra, radio, curvas, duración y niveles existentes. Drawer declara
ahora la curva del backdrop que ya consumía. Un ID duplicado en Studio se corrigió
antes de la evidencia; la validación completa pasa.

Los factores de espaciado conservan sus relaciones con la base responsive. Modal
permite editar ancho máximo, fracción de altura de viewport, inset, padding del
cuerpo y chrome, separación del cierre/acciones, divisores y desplazamiento de
entrada. Drawer permite ancho preferido, gap al viewport, divisores y padding de
cada sección/separación del cierre. No se cambia su altura dinámica completa ni
la colocación física Right/Left. Tint y opacidad de backdrop son independientes.

Studio deja de enmascarar el ancho con valores propios: Modal pierde la deducción
adicional de 48px y Drawer aplica los mismos tokens en su contenedor local. Exhibit
adopta también esos límites locales de Drawer y deja de forzar el lado derecho.
Estas correcciones de demostración son explícitas; la paridad de defaults se mide
en el consumidor canónico, no contra los antiguos anchos de Studio.

## Evidencia local

- Chromium: 176 mediciones (11 elementos × dos componentes × ocho matrices) con
  paridad de geometría, tipo y colores normalizados. rgba y color-mix se comparan
  por sus canales renderizados, sin confundir diferencias de serialización.
- Modal: ancho 460px, máximo 55% de viewport de 900px = 495px, cuerpo 30px,
  chrome 20px, close gap 10px, action gap 12px y divisores 3px. Drawer: ancho
  350px, cabecera 20px, cuerpo 30px y footer 16px. Los cuerpos largos desplazan
  contenido manteniendo fija la cabecera.
- Con viewport 320px, RTL y título largo sin espacios, Modal mide 280px y Drawer
  240px, sin overflow horizontal. Drawer mantiene derecha física y pasa a izquierda
  física al seleccionar Left. El cierre desplaza toda su anchura; Modal usa el
  offset personalizado de 24px. El backdrop cerrado queda hidden/pointer-events none.
- Tint #20408080 × opacidad 0.4 produce alpha 0.200784. Colores forzados mantienen
  el borde de sistema de 1px y movimiento reducido elimina la transición.
- Studio: controles de dimensiones/factores, tipografía, color/opacidad, duración
  y niveles editables; reset vuelve a los valores iniciales. Capturas de ambos
  revisadas. Reapertura desde el trigger, foco inicial dentro, Tab/Shift+Tab,
  Escape y retorno al trigger pasan en la demostración local.
- Size Chart y Cart Drawer reales en Studio heredan divisores de 3px y padding de
  cabecera 20px. Sus composiciones siguen controlando los límites exteriores de
  sus fixtures; no se afirma que el nuevo ancho base gobierne todas ellas.
- Exhibit enumera los nuevos tokens. Fuente, 1608 comparaciones legacy, catálogo
  709 rutas/5672 comparaciones, contratos, Studio, docs, TypeScript y adapters pasan.
  Auditoría estructural pasa sin promoción de madurez. Persisten dos advertencias
  de rendimiento Shopify ya inventariadas; no son límites globales de Web.

Evidencia ignorada: `output/playwright/overlay-values/evidence-result.json`,
`modal-custom.png`, `drawer-custom.png`. Consumidor CLI instalado con cierre de
11 dependencias/componentes. El log solo registra favicon ausente de la fixture,
avisos de lectura Canvas del medidor e información DevTools, sin errores runtime
de componentes. Fixture retirada, navegador cerrado y gate limpio; se conserva
el servidor preexistente.

## Límites y continuidad

No se certifica modalidad de página completa, inertness global, scroll-lock,
portales/anidamiento, lectores de pantalla físicos, Safari/Firefox ni teclado
virtual móvil. La prueba de CSS cerrado no sustituye la gestión target del foco.
No se certifican colores/dimensiones arbitrarios ni una marca futura.

Modal y Drawer siguen pilot. Outputs Web/Shopify regenerados para adopción
copy-and-own, sin subida remota, site/dist ni Figma. Siguen Toast y Tooltip.
