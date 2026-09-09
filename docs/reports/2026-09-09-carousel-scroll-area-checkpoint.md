# Checkpoint: Carousel y Scroll Area

Fecha: 2026-09-09. ADR 0334. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Trece valores nuevos completan 26 roles públicos en Carousel y ocho en Scroll
Area. Carousel permite cambiar gaps, inset de controles, diámetro/escala de
puntos y foco. Sus flechas exponen los cinco tokens de geometría/foco que ya
heredan de Icon Button. La colocación previous/next permanece en anatomía y
sale del inventario de estados. Los componentes permanecen pilot.

La reproducción previa de Carousel mostró la tercera diapositiva visible con
indicador/status de la segunda. Reset marcaba la primera sin mover el viewport;
el inspector también cambiaba el indicador sin desplazarlo. Ahora comparten
selección explícita, scroll directo y reinicio sincronizados. En los extremos,
el foco del control que se deshabilita pasa al track. Se corrigió además el
giro de flechas de un Carousel LTR anidado en un documento RTL.

Scroll Area expone tintado del track, foco y grosor del fallback WebKit. Studio
separa y etiqueta ese fallback: hover, radio y grosor no prometen personalización
de la barra estándar. Se conserva thin y auto para coarse; el fallback coarse
vuelve también a auto, en vez de fijar 12px, cumpliendo la política de ADR 0104.

## Evidencia local

- Chromium: 192 comparaciones de elementos en cuatro anchos y dos temas
  preservan valores iniciales. Se alternaron hojas anteriores/actuales completas.
- Carousel personalizado: gap 20px, inset 12px, punto 12px escalado 1.5,
  gap de puntos 8px y separación vertical 16px. Target 60px; controles 48px,
  iconos 24px y borde 2px heredados de Icon Button. Foco de track 3px/-4px,
  punto 3px/-6px y control 3px/+4px. Colores forzados conservan foco; RTL usa
  scroll lógico y respeta subárboles LTR.
- Studio verifica tercera diapositiva, control de primer punto, navegación por
  Enter, foco en extremos, scroll directo, RTL, edición de tokens y Reset.
  Estado, aria-current y status coinciden con la diapositiva físicamente visible.
  Se probó también desplazamiento suave y reinicio inmediato sin movimiento reducido.
- Scroll Area: color estándar rgb(36,96,128)/rgb(208,224,240), foco 3px/-5px,
  PageDown desplaza contenido. CDP confirma pointer:coarse y auto tanto estándar
  como fallback; forced colors restaura scrollbar-color auto y foco visible.
  Un viewport estrecho RTL mantiene contenido alcanzable. Studio omite juntos
  role/tabindex/aria-label al vaciar el nombre y Reset los restaura.
- Fallback: se comprobaron declaraciones calculadas de 18px/radio 7px. Eso no
  demuestra que el navegador pinte esa geometría mientras la ruta estándar está
  activa; se documenta expresamente ese límite.
- Exhibit enumera referencias públicas. Product Slider real hereda control de
  48px y foco de track 3px/-4px; conserva su propia densidad/gap de composición.
- Fuente, paridad legacy, catálogo 840 rutas/6720 comparaciones, contratos,
  Studio, docs, TypeScript, adapters, auditorías y consumidor CLI pasan. Siguen
  dos avisos de tamaño del target Shopify, advisory, sin nuevos límites globales.

Evidencia ignorada en `output/playwright/carousel-scroll-values/`: CSS previo,
consumidor, precheck, mediciones, Studio y capturas. Fixture retirada y sesiones
cerradas; gate de recursos limpio. Servidor preexistente preservado.

## Límites y continuidad

No se certifican Safari/Firefox, scrollbars antiguos, preferencias físicas del
sistema operativo, lectores de pantalla, colecciones productivas ni Shopify
remoto. El renderer de Studio coordina su fixture; no se añadió un runtime
neutral para instalar carruseles funcionales en cualquier target. Las salidas
Web/Shopify regeneradas requieren adopción copy-and-own; no hubo subida remota,
site/dist ni Figma. Continúa Lightbox y la siguiente composición dependiente.

[CSS Scrollbars Level 1](https://www.w3.org/TR/css-scrollbars-1/) y su
[borrador actual](https://drafts.csswg.org/css-scrollbars/) sustentan la distinción
entre ancho nativo elegido por la plataforma y declaraciones WebKit de fallback.
