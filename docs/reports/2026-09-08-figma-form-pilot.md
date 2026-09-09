# Piloto de formularios: repositorio → Figma

Fecha: 2026-09-08, Buenos Aires.

Estado: implementado y comprobado; pendiente de revisión visual del propietario.
Biblioteca sin publicar.

## Resultado

El piloto está en el archivo existente [The Gallery: Design System](https://www.figma.com/design/k3axoTaF87g17fBRgJ0PMY/The-Gallery--Design-System?node-id=1149-5).
Contiene Button, Input, Select y Textarea editables, con variantes y estados
independientes, variables, estilos y tres composiciones de formulario.

Antes de empezar se guardó y subió el checkpoint Shopify `0f13e5e` en
`codex/v1-component-refinement`. El tema piloto Shopify continúa sin publicar;
esta fase no cambió Shopify. Los nuevos scripts y documentos de Figma quedan
como cambios locales para revisión.

El archivo Figma contenía siete páginas y 584 variables anteriores. El piloto
crea siete páginas con prefijo Gallery Pilot y tres colecciones propias.
No se sobrescribieron los componentes ni las colecciones históricas.

## Qué contiene

| Superficie | Resultado |
| --- | --- |
| Tokens | 134 de origen y 20 cálculos privados del adaptador; 154 variables |
| Colecciones | Primitives 47; Colors 53; Metrics 54 |
| Modos | Default; Light/Dark; Mobile/Tablet/Desktop/XL |
| Estilos | Seis tipográficos, incluido Link subrayado, y una sombra para Select |
| Button | 5 variantes × 6 estados, tamaño etiquetado default |
| Input / Select / Textarea | 4 variantes de validación × 5 estados por componente |
| Composiciones | Claro y oscuro en escritorio; claro en móvil |
| Identidad | Mapa persistente de archivo, páginas, variables, estilos y componentes |

Los 20 cálculos del adaptador no aumentan el catálogo público de tokens. Por
ejemplo, `adapter.input.error.border` guarda el resultado del color-mix que ya
existe en CSS. `adapter.button.lineHeightPx` expresa en píxeles la combinación
del tamaño de texto y su interlineado unitario.

## Comprobaciones realizadas

- Se contrastaron los cuatro contratos, la clausura de alias de tokens/source,
  las salidas CSS y las fórmulas reales de primitives.css.
- Chromium midió 16 colores derivados en ambos temas y confirmó Input/Button
  de 46 px, texto 16/24 px, bordes de 1 px y sus paddings actuales.
- Se revisaron capturas nativas de Figma de Button, Input, Select, Textarea,
  foco, documentación y formularios en claro, oscuro y móvil.
- Se verificaron los 154 valores/alias, tipos, modos, código CSS asociado,
  estilos vinculados, 90 variantes y ejes independientes. Sin errores.
- El conteo final fue 738 variables: 584 anteriores y 154 del piloto.
- La prueba modificó únicamente las variables Figma del piloto para llevar
  labelGap y messageGap de 4 a 8 px. Los 15 campos de las tres composiciones
  recibieron el cambio; el input y botón adyacentes conservaron 46 px y la
  misma coordenada vertical.
- La restauración recuperó exactamente el registro previo: IDs, contenido de
  instancias, alias, posiciones y dimensiones. Los gaps oficiales quedan en 4 px.
- Se repitieron las actualizaciones generadas de variables, estilos y geometría,
  además de los cuatro constructores. No se duplicaron variables, estilos ni sets.
- `npm run build:figma:pilot` y `npm run validate:figma:pilot` comprueban la
  proyección y la evidencia registrada. La validación local no consulta Figma.
- La sesión temporal de Chromium se cerró explícitamente y el control de
  recursos quedó limpio. No se inició el servidor de documentación ni se
  reconstruyó site/dist.

La evidencia estructurada está en `platforms/figma/pilot/evidence.json`.
Los identificadores están en `manifest.json`; las peticiones reproducibles,
bajo output/figma, se regeneran desde scripts versionables.

## Qué aprendimos del puente

**Alias y actualizaciones.** La cadena de alias puede conservarse entre
colecciones. El cambio de gaps demuestra propagación a instancias sin perder sus
textos. Esto verifica actualización de valores; no demuestra una migración
estructural general de todos los componentes.

**Unidades.** Figma vincula opacidad como porcentaje: el 0.5 del CSS debe
proyectarse como 50. La primera revisión visual detectó esa diferencia y la
transformación quedó corregida. Rem se convierte con raíz de 16 px; cambiar esa
hipótesis requiere regenerar y revisar.

**Cálculos.** Figma no ejecuta color-mix ni la aritmética CSS. Los colores se
muestrean en sRGB de 8 bits y los cálculos de geometría se materializan en el
adaptador. Cambiar sus entradas en Figma no recalcula los derivados: hace falta
sincronizar. El anillo de foco usa un borde real, ya que la primera representación
con sombra expandida no aparecía correctamente en la exportación PNG.

**Composición y semántica.** Los asteriscos usan color.field.required y los gaps
pertenecen al contrato compartido de campo. El formulario posee sus textos y
distribución. Las propiedades de Figma no sustituyen required, aria-invalid,
validación, navegación por teclado ni envío en la implementación.

## Professional y portabilidad

La documentación oficial vigente indica hasta diez modos por colección en
Professional; el piloto usa como máximo cuatro. La API REST de variables requiere
Enterprise y no fue la vía utilizada. La escritura y lectura se comprobaron con
Plugin API sobre este archivo. [Planes de Figma](https://help.figma.com/hc/en-us/articles/360040328273-Figma-plans-and-features),
[API REST de variables](https://developers.figma.com/docs/rest-api/variables/).

Figma también documenta importación nativa DTCG en modos. Esa alternativa sigue
abierta para distribución de tokens; no equivale por sí sola a generar componentes
editables ni convierte este piloto en una biblioteca publicada.
[Modos e importación](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables).

El repositorio mantiene su formato DTCG-style actual. Esta proyección no lo migra
ni declara conformidad completa con los formatos y tipos de DTCG 2025.10.
[Especificación de formato](https://www.designtokens.org/TR/2025.10/format/),
[especificación de color](https://www.designtokens.org/tr/2025.10/color/).

## Revisión del propietario y siguiente checkpoint

Revisar el formulario en claro/oscuro/móvil, alternar Variant y State en
instancias y comprobar labels, mensajes, asteriscos, iconos y foco. La siguiente
decisión es si esta edición resulta suficientemente clara y útil para extender
el patrón. No hace falta reconstruir el sistema ni crear más capas.

Antes de una ampliación conviene cerrar el flujo de actualizaciones derivadas y
su comunicación al diseñador. La publicación, el traslado de material histórico
y la migración de otros componentes siguen fuera de este checkpoint.

## Límites

No se verificó publicación/consumo en otro archivo ni sincronización inversa.
No se implementaron todos los tamaños Button, icon-only, ubicaciones de loading,
prototipos interactivos ni la semántica de placeholder/value. Textarea representa
el mínimo CSS de 120 px, no todas sus reglas dinámicas de líneas y resize.

El margen externo de Input queda inventariado; aquí el contenedor posee las
separaciones entre controles. El offset del subrayado de Link no tiene un
vínculo independiente en este artwork. No se consideran tokens sin uso por ello.

No se certificaron en Figma contraste accesible para cualquier marca, rasterizado
idéntico entre motores, sustitución arbitraria de familias tipográficas ni todo
el contenido extremo. Tampoco se repitieron las pruebas funcionales completas del
formulario web ya registradas en ADR 0294. El material histórico se conservó por
identidad y por el alcance de las escrituras; no se comparó un hash completo de
todos sus nodos.
