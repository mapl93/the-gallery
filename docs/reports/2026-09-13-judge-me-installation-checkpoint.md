# Judge.me: instalación y configuración inicial — 2026-09-13

## Resultado

El propietario completó la instalación. Se verificó **Free Plan** en el panel
de Judge.me de la tienda `mkvm3d-hf`. El trial de pago aparece como disponible,
no iniciado. Esto cierra la instalación pendiente de ADR 0411; no certifica la
integración de los componentes Review de Gallery.

## Cambios y comprobación

Las solicitudes automáticas estaban habilitadas. Se desactivaron y guardaron
por separado las de pedidos nacionales, internacionales y POS, respetando la
configuración aprobada sin correos a clientes. Después de guardar, cada control
apareció desmarcado; el estado agregado y el panel recargado mostraron
**Requests disabled**. SMS y notificaciones push ya aparecían desactivados.

El historial mostró el estado vacío, sin filas de solicitudes. El panel mostró
cero solicitudes enviadas durante los últimos 30 días y cero reseñas. No se
enviaron solicitudes, se importaron pedidos, se crearon reseñas de prueba ni se
contactó con soporte durante esta comprobación. La evidencia es la interfaz
observada, no una auditoría independiente de las colas del proveedor.

## Tema y límite de la evidencia

La pestaña existente del editor identifica `184841142579`, **The Gallery**, como
tema **Active**. Su interruptor de Judge.me estaba activado y Guardar deshabilitado.
Sin embargo, el panel de la app, después de volver a cargarlo, seguía mostrando
**Embed disabled** y 0/2 pasos completados. No se verificó un widget de reseñas
renderizado. No se atribuye esta diferencia a una causa sin comprobarla.

El agente no modificó ni guardó el tema activo, no publicó cambios ni activó un
plan de pago. Se reutilizaron las pestañas de Chrome existentes del usuario;
no se iniciaron servidores, navegadores ni pestañas adicionales.

## Próxima evidencia requerida

- Preparar la integración en un tema sin publicar; no reutilizar este identificador
  como supuesto piloto sin comprobar su estado.
- Verificar carga del embed, detección del proveedor y un producto concreto.
- Contrastar datos publicados, compra verificada, agregados y formulario con las
  capacidades reales disponibles antes de conectar los componentes de Gallery.
- Probar cambios de variante, editor, español, ancho reducido, app ausente y
  ausencia de widgets o datos estructurados duplicados.

La instalación no añade una dependencia obligatoria al sistema neutro ni cambia
su política de tokens. No se ejecutaron pruebas de envío a clientes.

## Referencia primaria

La [documentación de solicitudes automáticas de Judge.me](https://judge.me/help/en/articles/8379844-automatic-review-request-emails),
consultada el 2026-09-13, documenta la activación inicial y los controles separados
por tipo de pedido. El estado final se verificó en la tienda, no solo en esa guía.
