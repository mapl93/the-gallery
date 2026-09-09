# Checkpoint: Pickup Location Selector y Store Locator

Fecha: 2026-09-09. ADR 0343. Continúa el punto 5.

## Resultado

20 roles nuevos completan 37 valores públicos por componente. Doce pertenecen
al bloque Location Search ya compartido: espaciado de header, formulario, lista,
detalles y encabezado de resultados; padding/bordes de registros, status y slot
del mapa; peso del título. No se crea un componente adicional ni una capa global.

Pickup expone grosor del anillo seleccionado y separación/inset de sus detalles.
Estos dos empiezan en cero porque el selector anterior no tenía consumidores:
el supuesto margen basado en iconos de Input nunca afectaba al renderer actual.
Se retiran ese selector muerto y sus dos referencias del inventario, conservando
los tokens globales de Input. No se promete alineación automática con Radio.

Store Locator expone tres factores del área de acciones, escala del encabezado
de resultados y peso del nombre. Los valores iniciales preservan CSS y defaults
de encabezados del navegador. La tipografía del cuerpo consume roles del sistema.
Todos los roles públicos tienen controles en Studio; los hijos conservan sus APIs.

La ilustración del mapa y su mínimo de 10rem pasan a CSS de Studio. El slot real
permite editar borde/padding, sin presentar estilo, altura, datos o pines de un
proveedor inexistente como opciones del sistema.

## Validación

- 472 comparaciones de elementos conservan geometría, tipo, colores y anillo a
  320/600/900/1200px en ambos temas; incluyen slot de mapa y registros seleccionados.
- Base 20px produce gaps de header 15px, formulario 10px, lista 30px y detalles
  8px; padding de registros 25px/mapa 22px; bordes 3px/2px y acento de status 8px.
  Gap/inset de detalles 12px/18px y anillo 5px se aplican al contenido real en RTL.
  El cuerpo responde a 20px/30px y peso 500; título con peso 500 independiente.
- Store Locator responde a gaps de acciones 5px/15px, offset 12px, encabezado
  30px y nombre peso 500. A 320px apila acciones sin overflow. Se registró la
  paleta de error por data-status, sin representar una respuesta de red real.
- Radio conserva flechas nativas RTL y checkedness; FormData conserva la búsqueda.
  Colores forzados eliminan el anillo decorativo. Capturas personalizadas revisadas.
- Studio edita/restablece ambos perfiles, selecciona una identidad controlada,
  filtra registros locales, muestra vacío, activa explícitamente la ubicación
  simulada y mantiene la lista con el mapa ilustrativo. Exhibit expone las referencias.
- Fuente, catálogo 954 rutas/7632 comparaciones, contratos, Studio, docs,
  TypeScript, consumidor CLI y adapters pasan. Las auditorías mantienen madurez
  y los dos avisos advisory de Shopify.

Evidencia ignorada: `output/playwright/location-values/`. Fixture retirada,
navegador cerrado, gate limpio y servidor preexistente preservado.

## Límites

Chromium local. Sin lector de pantalla, Safari/Firefox ni dispositivo real.
Loading conserva su contrato y markup; no se simuló una red lenta. Sin geocoding,
permiso de ubicación, mapas reales, reserva de inventario ni Shopify remoto.
Ningún dato del fixture acredita disponibilidad de una sucursal real. Ambos
siguen pilot. Copias propias deben adoptar CSS/tokens explícitamente; las que
usaron el selector privado retirado necesitan revisar esa personalización.
Sin site/dist, publicación ni Figma. Continúa Subscription Option.
