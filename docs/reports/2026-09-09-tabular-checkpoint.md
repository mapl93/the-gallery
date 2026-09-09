# Checkpoint: Table y Data List

Fecha: 2026-09-09. ADR 0324. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Dieciocho tokens nuevos y pesos existentes completan 24 roles públicos de Table y
doce de Data List. Se preservan defaults y responsabilidades: Table mantiene sus
capacidades combinables y el target ordena los datos; Data List usa su container
query de 20rem y los tokens aportan los valores para cada disposición.

Table permite editar padding de celda, bordes de wrapper/fila por separado, foco
y dimensiones del control de ordenación. Sus márgenes negativos derivan del
padding para conservar la alineación del texto. Data List permite editar
espaciado de pares, filas y grupos; el mismo gap apilado se consume en grupos
horizontales y filas verticales estrechas. No se duplica el catálogo responsive.

Se retiran striped/horizontal de los inventarios de estados del contrato conforme
a ADR 0274. Siguen disponibles como capacidad y variante, respectivamente; no se
eliminan clases ni posibilidades visuales. Los controles de Studio se muestran
según su aplicabilidad, y Exhibit documenta las responsabilidades y la adopción.

## Evidencia local

- Chromium: 480 mediciones (60 elementos × ocho matrices de ancho/tema) conservan
  tamaños, espaciado, color, tipografía, bordes, opacidad y dirección de layout.
- Table responde a padding 18/24px, wrapper 3px, separadores 2px, foco 3/4px,
  control de ordenación mínimo 44px, padding 6/12px, gap 10px e icono 20px.
  El texto permanece a 24px del borde de la celda y la última fila sigue sin regla.
- Opacidad sin ordenar 0.7 se aplica; ordenada o en colores forzados permanece 1.
  El primer intento de prueba introdujo 70 en el token unitario; se corrigió la
  expectativa a 0.7 y se repitió la evidencia completa. No requirió cambiar Studio.
- Wrapper de 220px permite scroll horizontal con ArrowRight sin overflow de página;
  foco nativo de wrapper y sort trigger conserva las dimensiones personalizadas.
- Studio combina striped, rowHover y sortable. Enter ordena ascendente, Espacio
  descendente, aria-sort coincide con las filas y desactivar sortable elimina sus
  metadatos. Movimiento reducido elimina la transición de hover. Reset pasa.
- Data List de 480px usa pares en fila con gap 28px; a 280px los apila con gap 8px.
  Padding 14px, borde 3px, peso 600, orden DT/DD y ausencia de última regla persisten.
  Un valor largo sin espacios y RTL no amplían el contenedor.
- Grupos horizontales de 240px envuelven con gaps 22/32px y gap interno 8px, sin
  padding ni separador de fila. Studio aplica los valores, oculta controles
  inaplicables y reset restaura defaults. Capturas Table/Data List revisadas.
- Size Chart consume Table y hereda padding 16/28px, conservando caption y sus
  tres encabezados de fila. Exhibit referencia las nuevas variables. No se halló
  otro consumidor compuesto canónico de Data List en el inventario inspeccionado;
  su prueba usa el consumidor CLI y Studio, sin inventar una composición de producto.
- Fuentes, paridad legacy, catálogo 659 rutas/5272 comparaciones, contratos, Studio,
  docs y adapters pasan. Auditorías automatizadas de componentes y rendimiento
  pasan; no cambian la aprobación humana ni los avisos orientativos de Shopify.

Evidencia ignorada: `output/playwright/tabular-values/evidence-result.json` y
capturas del mismo directorio. Consumidor instalado con CLI. Fixture temporal
retirada, sesión cerrada y gate limpio; servidor preexistente preservado.

## Límites

La ordenación de Studio es de datos locales de ejemplo; no se verifican comparación
remota ni todos los datasets. No se prueban Safari/Firefox, lectores de pantalla
reales, colores/dimensiones arbitrarias o tienda Shopify remota. Consumidores
copy-and-own deben adoptar CSS/tokens explícitamente. Web/Shopify regenerados sin
subir tema; sin site/dist, Figma ni promoción de pilot. Continúan Timeline y Link.
