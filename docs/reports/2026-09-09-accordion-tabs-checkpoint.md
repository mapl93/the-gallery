# Checkpoint: Accordion y Tabs

Fecha: 2026-09-09. ADR 0330. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Diecinueve tokens nuevos y pesos compartidos completan 28 roles públicos en
Accordion y 22 en Tabs. Bordes, icono, gaps, padding del disparador/contenido y
foco se editan desde tokens. Las relaciones responsive conservan su base común;
la rotación del icono, selección, hidden y layout externo no se convierten en
valores públicos de diseño.

Tabs tenía dos problemas adicionales comprobados. Su control Details-selected
no reflejaba seleccionar Overview o Shipping desde la vista; ahora click, foco
automático, activación manual y Customize comparten la actualización local. La
propiedad sigue representando Details, sin inventar una API global de índice.

La línea seleccionada calculaba un color válido pero el scroll la recortaba por
su margen negativo. Se comprobó también sin foco del panel. El track ahora se
pinta dentro de la lista y el borde seleccionado permanece dentro del área visible,
con el mismo token de grosor y sin cambiar la altura habitual. En colores forzados
se usa un borde de sistema para el track: ese modo añade un grosor a la altura de
lista y mantiene visible la selección. No se desactiva la preferencia del usuario.

## Evidencia local

- Chromium: 296 mediciones en ocho matrices. Accordion conserva los valores
  medidos; Tabs conserva geometría exterior, tipo y colores. Los cambios de borde
  del track y margen de tabs se reconocen como cambios de implementación esperados,
  no se presenta una paridad completa de todas las propiedades CSS.
- Accordion: borde 3px/divisores 2px, trigger padding 8/16px, gap 8px, icono 32px,
  peso 700, cuerpo 10/30/18px y altura mínima 60px. Foco 3px/inset 4px, contenido
  largo RTL a 280px, colores forzados y movimiento reducido pasan. Enter/Space
  abren/cierran details nativo; el contenido abierto entra en la secuencia de Tab.
- Studio Accordion mantiene aria-expanded, hidden y el control First item expanded
  sincronizados. Disabled usa el atributo nativo y preserva la superficie al hover.
  Reset devuelve los defaults. FAQ real hereda borde 3px y padding inline 30px.
- Tabs: track/indicador 3px, margen cero, trigger padding 8/12px, mínimo 60px,
  panel 16/24px y peso 600. Foco del tab 3px/inset 4px y panel offset 5px pasan.
  La lista estrecha conserva scroll horizontal y el panel visible recibe Tab.
- Studio Tabs conserva Shipping al seleccionarlo aunque Details-selected sea falso;
  Customize puede volver a Details/Overview. Manual separa foco y selección;
  Space/Enter activan, End omite deshabilitados y ArrowRight sigue RTL. Una sola
  pestaña participa en Tab y un solo panel queda visible. Deshabilitar Shipping
  seleccionado cae en Overview y reset restaura Details y Automatic.
- La captura inicial sin foco mostró el píxel gris (229,229,229) donde debía estar
  el indicador. La verificación final lee píxeles PNG reales: a 2px y 5px muestra
  accent (234,88,12) en claro, (251,146,60) en oscuro y el Highlight de sistema
  compuesto con su alpha en colores forzados. Se verifican seis capturas; la de
  claro/5px también se revisa visualmente. Alturas de lista 58/61px normales y
  60/66px forzadas documentan el fallback de borde, sin ocultar la diferencia.
- La fixture corrigió dirección heredada entre casos de scroll; los controles y
  la composición esperan sus renders/estilos antes de medir. No se atribuyeron
  esos errores iniciales de medición a los componentes.
- Exhibit enumera las nuevas referencias. Fuente y paridad legacy, catálogo
  742 rutas/5936 comparaciones, contratos, Studio, docs, TypeScript y adapters
  pasan. CLI adopta la actualización de CSS con procedencia registrada sin
  sobrescribir personalización local. Auditorías no promueven madurez.

Evidencia ignorada en `output/playwright/disclosure-values/`: resultados del
consumidor y Studio, capturas, medición del indicador y verificación de píxeles.
Pillow del runtime ya disponible se utilizó solo para leer píxeles, sin instalar
paquetes. Fixture retirada; cada fase cerró navegador y dejó el gate limpio.
Servidor preexistente preservado.

## Límites y continuidad

No se verifican Safari/Firefox, lectores de pantalla físicos, variantes verticales,
tabs enrutados/cerrables, lazy loading, proveedores de grupo ni comportamiento
Shopify remoto. Tabs no tiene otra composición de componente identificada en CSS;
se prueba su consumidor CLI y Studio, sin inventar una composición adicional.

Accordion y Tabs permanecen pilot. La corrección visual de la selección no es
aprobación estética ni certificación integral. Web/Shopify se regeneran para
adopción copy-and-own; sin subida remota, site/dist ni Figma. Continúan Breadcrumb
y Popover.

[CSS Color Adjustment Level 1](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-properties)
especifica la supresión de degradados en colores forzados que justifica el
fallback de borde de sistema.
