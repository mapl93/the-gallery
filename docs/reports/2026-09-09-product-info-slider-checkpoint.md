# Checkpoint: valores visuales de Product Info y Product Slider

Fecha: 2026-09-09. ADR 0339. Continúa el punto 5.

## Resultado

Product Info añade ocho roles y alcanza 23 valores públicos: factores de gaps,
tracking, pesos independientes, inset de listas y mínimo de columnas de metadata.
Las fuentes, tamaños, interlineados, colores y espacio base existentes completan
la API de Studio/Exhibit. Mantiene Price requerido, contenido rico nativo y
proyección pasiva de los datos que entrega el coordinador del target.

Product Slider añade siete roles y alcanza 28 valores públicos. Sus cantidades
visibles iniciales de 2/3/4 tarjetas, gaps, ancho flexible y peso de título son
editables. Las consultas de contenedor de 48rem/64rem sólo sustituyen el número
activo en una fórmula común; no hay nuevos modos ni catálogos duplicados. El
mínimo geométrico de una tarjeta evita división inválida, sin limitar la colección.
Carousel/Icon Button aportan controles y foco; Product Card conserva su propia API.
Se corrige la mención obsoleta quick-add del contrato a Quick Look.

La prueba de instalación conjunta descubrió además un orden de CSS incorrecto
en la CLI, corregido y subido por separado mediante ADR 0340.

## Validación

- 1440 comparaciones de elementos (296 Info, 1144 Slider) a 320, 768, 900 y
  1200px, en ambos temas, conservan geometría, colores y tipografía iniciales.
  Se alternaron las hojas anteriores/actuales completas en el consumidor CLI.
- Info: espacio base 24px, identidad 12px, contenido 18px, metadata en una
  columna de 342px y pesos 400/500/700 funcionan independientemente. El inset
  de lista 2em usa el tamaño responsive real de 16px y produce 32px. Texto
  largo y lista RTL no desbordan; captura revisada.
- Slider: 1/2/3 tarjetas en contenedores de 342/852/1152px, gap 15px, controles
  separados 6px, título con base 160px/peso 500, botones 48px e iconos 24px.
  El valor cero usa una tarjeta. Foco heredado de 3px/inset 5px y colores
  forzados conservan el indicador.
- Studio edita y restablece ambos componentes; Exhibit enumera los nuevos roles.
  Slider mantiene navegación finita y mueve el foco al track al alcanzar el
  límite. Cambiar a todas las tarjetas visibles desactiva ambos botones;
  restaurar overflow vuelve a habilitar navegación. No fue necesario modificar JS.
- Fuente, paridad legacy, catálogo de 910 rutas/7280 comparaciones, contratos,
  Studio, docs, adapters y copia CLI pasan. La CLI también pasó sus nuevos casos
  de orden de imports y los 20 escenarios de protección existentes.

Evidencia ignorada en `output/playwright/product-info-slider-values/`. Fixture
retirada, navegador cerrado, gate de recursos limpio y servidor anterior preservado.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla ni prueba táctil real.
No se certificó Shopify remoto, el coordinador de variantes ni Quick View.
Vendor en mayúsculas, subtítulo editorial en cursiva y links nativos conservan
el tratamiento aceptado; no se añadió un tipo genérico de token para modificarlos.
Ambos siguen pilot. Las copias requieren adopción explícita y no se publicaron
paquetes, site/dist ni Figma. Continúan Variant Selector y Product Form.
