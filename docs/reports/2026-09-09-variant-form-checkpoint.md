# Checkpoint: Variant Selector y simplificación de Product Form

Fecha: 2026-09-09. ADR 0341. Continúa el punto 5.

## Resultado

Variant Selector incorpora 14 roles fuente y alcanza 40 valores públicos:
factores de separación e inset del disco, pesos, bordes, anillo seleccionado,
foco y grosor de marcas de indisponibilidad. Dimensiones/pesos reutilizan
primitivas existentes. El diámetro conserva la relación con el target y el
espacio base, pero deja de depender de editar el gap entre opciones. El anillo
expone gap y grosor, cuya suma determina el spread exterior.

Se retira border-subtle de este inventario porque no tenía consumidor; el token
global sigue disponible. Los labels de Studio explicitan cuándo un color afecta
varios estados. Colores e imágenes de producto siguen siendo datos del target.
El asterisco conserva el color compartido y la alineación estándar. Se corrige
el centrado RTL del tachado, que antes podía desaparecer por el recorte del disco.

Product Form no añade tokens fuente: sus consumidores y contrato usan un único
submitter. El gap entre acciones, flex basis 16rem y mínimo 12rem no aportaban
control visible a esa composición. Se eliminan y se conserva el botón ocupando
el ancho disponible. Studio expone el gap real entre secciones; Button, Quantity
y Variant Selector mantienen sus APIs. Pendiente y no disponible siguen separados.

## Validación

- 1024 comparaciones de elementos (376 Selector, 648 Form) a 320, 768, 1280 y
  1600px, en ambos temas, conservan geometría y tipografía. Form incluye estados
  normal, disabled y pending. El gap declarado de acciones cambia de 18px a cero
  en el ejemplo estrecho, sin cambiar ningún rectángulo: se excluyó únicamente
  ese gap sin efecto al comparar filas con un solo hijo.
- Target 56px/disco 50px, gaps 18/12px, bordes de 3/2px, gap/grosor de anillo
  3/5px, foco 5px con offsets 3/4px y marcas de 4px responden a tokens. Cambiar
  sólo gap de opciones conserva el diámetro. Pesos 700/500/600 independientes.
- Radios nativos conservan teclado, reset y FormData. Porcelain agotado sigue
  seleccionable; Ash imposible permanece disabled. Se comprobaron colores
  forzados y ausencia de transición con movimiento reducido.
- Capturas RTL antes/después, con valores iniciales iguales, revisadas: el
  tachado pasa de ausente a cruzar el centro. Dirección LTR anidada en RTL
  conserva el signo correcto de traslación.
- Studio edita/restablece tokens y sincroniza el texto seleccionado. Product Form
  actualiza su fixture de merchandise al elegir Ink, conserva quantity y el
  submitter en FormData y distingue pending/no disponible. Sin compra real.
- Quick View conserva su formulario visible y acción de ancho completo.
  Sticky ATC tiene un formulario fuente oculto en Studio: allí se verificaron
  herencia de gap y asociación nativa del botón externo, no geometría visible.
- Fuente, catálogo de 924 rutas/7392 comparaciones, contratos, Studio, docs,
  adapters y consumidor CLI pasan. Auditorías mantienen madurez y los dos avisos
  advisory de Shopify. No cambió JS ni TypeScript.

Evidencia ignorada: `output/playwright/variant-form-values/`. Fixture retirada,
navegador cerrado, gate limpio y servidor preexistente preservado.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla, dispositivo táctil real
ni Shopify remoto. No se certificó una compra ni un coordinador de producción.
Ambos permanecen pilot. Copias con acciones adicionales ajenas a neutral v1
deben revisar su layout al adoptar la simplificación. Sin paquete publicado,
site/dist ni Figma. Continúan Size Chart y Back in Stock.
