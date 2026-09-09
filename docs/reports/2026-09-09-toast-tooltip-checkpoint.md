# Checkpoint: Toast y Tooltip

Fecha: 2026-09-09. ADR 0329. Continúa el punto 5 de la auditoría.

## Resultado

Toast añade ocho tokens de geometría y reutiliza semibold: 24 roles públicos.
Tooltip añade seis: 16 roles públicos. Factores de spacing conservan las relaciones
responsive existentes. Studio y Exhibit consumen el ancho de Toast; desaparecen
el máximo y mínimo locales que enmascaraban la personalización. El borde base de
Toast se identifica como fallback inactivo para las cuatro variantes de severidad.

Tooltip centra contenido y flecha sobre el mismo eje físico, corrigiendo la
combinación anterior de inset lógico y translateX físico que fallaba en RTL.
El puente invisible para el puntero deriva de la separación configurable.

La captura reveló una segunda divergencia de Studio: contenido más alto invadía
la cabecera de la página. Studio reserva su altura medida más el gap derivado de
tokens, de modo que el borde superior del contenido flotante coincide con Customize
(ADR 0283). ResizeObserver es local, se desconecta al desmontar y no añade una API
de componente ni un servicio general de posicionamiento.

## Evidencia local

- Chromium: 344 mediciones conservan geometría, color y tipo iniciales en las
  cuatro variantes de Toast y Tooltip LTR, a través de ocho matrices.
- Toast: ancho 440px, gap 8px, padding 16px, borde 3px, icono 24px/offset 6px,
  título gap 10px/peso 500. A 280px, texto largo y RTL caben sin overflow y la
  acción pasa a fila 2/columna 2 usando el mismo gap. Entrada personalizada 24px,
  estado oculto, movimiento reducido y borde de sistema forzado pasan.
- Tooltip: ancho 200px, padding 8/16px, flecha 8px y puente de 40px responden a
  tokens. A viewport 320px, gutter total 60px limita el contenido a 260px sin
  overflow interno. Se verifica el centro en RTL y un contexto LTR anidado; el
  CSS anterior reproduce un desplazamiento de 288px en la fixture RTL.
- El puntero cruza la separación sin ocultar el contenido y puede permanecer
  sobre él. Foco lo revela; Escape lo oculta conservando el foco. Nombre Material
  details y descripción siguen separados mediante aria-describedby/role tooltip.
  Colores forzados y movimiento reducido conservan su tratamiento.
- Studio edita las geometrías, respeta cuatro severidades y distingue anuncios
  None/Assertive de la variante visual. Dismiss retira el Toast y devuelve foco
  al disparador local; reset vuelve a los valores iniciales. Tooltip Controlled
  open, Escape y reset pasan. No se prueba un servicio global de notificaciones.
- Tras ajustar la reserva de Studio, tres alturas de contenido (36/76/156px) y
  gaps de 16/32/48px mantienen el contenido en el borde superior de la zona de
  preview. Cambios de texto, medida y tipo responden; teclado y puntero siguen
  funcionando. Captura final abierta verificada en y=152, igual a la zona de
  preview; una captura previa se reemplazó porque desplazar el puntero la cerraba.
- Social Proof real en Studio hereda borde de 3px y padding de 16px. Conserva
  presentación pasiva sin role/live region. Su omisión Shopify v1 sigue vigente.
- Exhibit enumera las nuevas referencias. Catálogo 723 rutas/5784 comparaciones,
  fuente/paridad legacy, contratos, Studio, docs, TypeScript y adapters pasan.
  Auditorías automatizadas pasan sin promoción de madurez.

Evidencia ignorada: `output/playwright/notice-values/` contiene resultados JSON,
script del consumidor CLI, pruebas de reserva de Studio y capturas revisadas.
La fixture fue retirada y cada fase cerró su navegador; gate limpio y servidor
preexistente conservado.

## Límites y continuidad

No se verifican lectores de pantalla físicos, Safari/Firefox, colisiones reales
en bordes de pantalla, portales, retrasos, cola, duración de visualización,
pausa/recurrencia ni proveedor de Social Proof. No se afirma que un ancho máximo
implemente colocación sin colisiones, ni que un token de transición sea duración
de notificación. La altura privada medida es dato de la demostración, no un valor
de diseño que deba exportarse.

Ambos siguen pilot. Web/Shopify regenerados para adopción copy-and-own explícita;
sin subida remota, site/dist ni Figma. Continúan Accordion y Tabs.
