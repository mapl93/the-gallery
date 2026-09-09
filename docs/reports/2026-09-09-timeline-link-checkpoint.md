# Checkpoint: Timeline y Link

Fecha: 2026-09-09. ADR 0325. Continúa el punto 5 de la auditoría.

## Resultado

Diecisiete tokens nuevos y pesos existentes completan 27 roles de Timeline y doce
de Link. Timeline deriva su geometría desde marcador, anillo y separaciones:
10 + 2 + 32px mantiene los 44px iniciales hasta el contenido. Sustituye la antigua
suma interna 24 + 20px sin mover texto, marcador o línea. Esas dos cajas internas
cambian deliberadamente; no se ofrecen dos controles redundantes para una distancia.

Link permite editar subrayado y foco, conserva la tipografía contextual y separa
los colores que alimentan su mezcla 70% accent / 30% primary. En Timeline, Marker
border identifica correctamente el uso de surface-primary; los estados continúan
usando colores compartidos y texto visible, sin nuevos colores por componente.

La evidencia detectó que text-decoration, como declaración abreviada, restablecía
el grosor a auto en Subtle/Nav. Ahora sus reglas cambian text-decoration-line y
conservan el token. Subtle hover comparte el grosor inicial de 1px de Default en
vez de delegarlo a auto; Nav sigue sin subrayado. Es una corrección explícita de
consumo del token, no una afirmación de paridad de aquella propiedad inactiva.

## Evidencia local

- Ocho matrices comparan las posiciones visibles y colores de seis entradas de
  Timeline y tres Link: 48 entradas y 24 enlaces. Se conservan geometría visible,
  colores, tipografía y decoración inicial; las cajas internas de Timeline y el
  grosor inactivo de variantes sin línea quedan fuera de esa afirmación.
- Marcadores/líneas de 20/4px y 32/6px permanecen centrados, con borde 3px, anillo
  4px, offset superior 8px y clearance inicial 6px. El contenido queda a 48/60px
  del origen, conforme al gap configurado de 24px. Gaps de metadata 8/16px,
  separación al título 10px y al contenido 12px se aplican.
- Timeline refleja la misma geometría en RTL y contiene texto largo sin espacios
  a 200px. Colores forzados conservan ring 4px y la distinción de marcadores llenos
  y delineados. Studio aplica tokens, recorre seis estados con texto y aria-current
  solo en Current, y reset restaura marcador 10px/inset visible 44px.
- Link hereda 18px/28px del contexto. Grosor 3px, offset 5px, foco 4/3px y radio
  6px se aplican a las tres variantes, con underline visible donde corresponde.
  Nav responde al peso 600. Hover, foco de teclado y Enter hacia un fragmento
  real funcionan; texto largo en RTL no amplía su contenedor de 180px.
- Movimiento reducido elimina las transiciones decorativas. Studio modifica
  geometría, conserva ambos inputs de color en Default y produce la mezcla
  comprobada de rojo/azul 0.7/0.3. Target, rel y aria-current siguen independientes;
  reset restaura propiedades y tokens. Capturas Timeline/Link revisadas.
- Collection Promo hereda foco 4/3px y radio 6px de Link. Su subrayado mantiene una
  excepción local: offset 3px y hover 2px en `components/css/collection.css`.
  Se registra para el lote de esa composición; no se afirma herencia completa
  ni cobertura visual terminada de Collection Promo. No hay un consumidor compuesto
  adicional de Timeline Primitive en los archivos inspeccionados; Process Timeline
  es otro componente y no se usa como evidencia de esta primitiva.
- Consumidor CLI, Exhibit, fuente, paridad legacy, catálogo 676 rutas/5408
  comparaciones, contratos, Studio, docs, TypeScript y adapters pasan. Auditorías
  automatizadas pasan sin promoción de madurez. Se actualizó también el consumidor
  CLI tras corregir el shorthand, reconociendo su copia local sin modificaciones.

Evidencia ignorada: `output/playwright/timeline-link-values/evidence-result.json`
y capturas del mismo directorio. Las pruebas corrigieron dos detalles de su propio
entorno: constructor URL no expuesto y nombre accesible completo del color picker.
Se cerró la fase antes de corregir CSS y se volvió a validar después. Fixture
retirada, navegador cerrado y gate limpio; servidor preexistente preservado.

## Límites y continuidad

No se verifican Safari/Firefox, lectores de pantalla reales, todas las dimensiones
arbitrarias, contenido cronológico de una aplicación ni navegación de tienda
remota. La evidencia de color usa inputs programáticos del control HTML; no prueba
el diálogo nativo del sistema operativo. Web/Shopify regenerados sin subir tema;
sin Figma ni site/dist. Se preserva pilot. Continúa la cobertura de componentes
y composiciones, incluida la excepción concreta de Collection Promo.
