# Piloto de coherencia de controles — 2026-09-08

## Respaldo y alcance

Antes de modificar el sistema se creó y publicó el commit
`431fd1b2f7adad75940214f9abe1f725c7274f56` en
`origin/codex/v1-component-refinement`. La referencia remota se comprobó con
`git ls-remote`. Incluye el estado previo del repositorio, también los cambios
que ya estaban pendientes al comenzar. Es el punto de recuperación del piloto.

Esta entrega implementa las etapas 1–3: documentación y catálogo canónicos,
correcciones concretas de contraste y un piloto de Input/Button. Los cambios
posteriores al respaldo quedan locales para revisión. No se modificaron Figma
ni la tienda Shopify remota, ni se publicó o desplegó el piloto. `site/dist`
permanece intacto.

## Cambios y evidencia

| Cambio | Fuente | Resultado |
| --- | --- | --- |
| Catálogo desde fuente actual | `site/src/lib/tokens.ts`, `site/src/pages/Tokens.tsx` | 342 rutas, selección Light/Dark y cuatro viewports, alias, valores resueltos y procedencia. Ya no muestra únicamente los JSON heredados. |
| Foundations sin tablas históricas | `site/src/pages/Foundations.tsx` | Valores obtenidos de la misma fuente; distingue roles de tokens y comportamiento efectivo de las clases. |
| Button alineado con Input | `tokens/source/components/button.tokens.json`, modos viewport, `components/css/primitives.css` | 46 px de altura predeterminada, línea de 24 px y padding vertical de 10 px. Mantiene el crecimiento por contenido. |
| Cinco decisiones públicas de Input | `tokens/source/components/input.tokens.json`, `scripts/build-web-tokens.js` | Padding X/Y, margen inferior, tamaño y separación de iconos tienen rutas propias. Conserva los nombres públicos CSS y los valores anteriores. |
| Variante y foco independientes | Contratos Input/Textarea, sus metadatos Studio y `InputStudio.tsx` | Warning + Focus se compone mediante dos controles. Se eliminaron tres estados combinados por contrato; los selectores CSS siguen existiendo. |
| Contraste Danger | Fuente Button y sus equivalentes de paridad legacy | Texto blanco sobre red.600; hover/active sobre red.700. Contrastes medidos: 4,829:1 y 6,470:1 respectivamente en ambos temas. |
| Texto de feedback/acento | `components/css/foundations.css`, categoría de Article Hero en `components/css/blog.css` | Mezcla con texto primario siguiendo tratamientos ya usados por el sistema. Las cinco utilidades superaron 4,5:1 sobre la superficie primaria del piloto en ambos temas. |
| Referencias históricas claras | `docs/ARCHITECTURE.md`, `tokens/source/README.md`, `context.md`, análisis histórico de tokens | Web/Shopify consumen la fuente nueva; Webflow/Framer mantienen su flujo heredado. |

No se añadieron capas, modos, nuevas plataformas ni un token por variable
privada. La altura de 46 px conserva Input y ajusta Button; es la propuesta
concreta para cumplir la igualdad solicitada. El propietario aprobó el tratamiento
general y pidió el ajuste de separación descrito al final de este informe.
La densidad no implica añadir sombras.

## Validación realizada

- Fuente: 539 definiciones en 17 archivos, incluyendo 197 sobrescrituras de modo.
- Compilación de ocho matrices y 1.608 comparaciones del mapa de migración: pasan.
- Catálogo: 2.736 comparaciones contra el compilador, cubriendo las 342 rutas en
  las ocho matrices. La nueva orden `npm run validate:tokens:catalogue` verifica
  el resolver real del sitio y normaliza equivalencias de representación de color.
  Requiere construir antes las matrices y tener las dependencias del sitio.
- Compatibilidad web: los 213 nombres públicos consumidos por CSS están definidos.
- Contratos, Studio, registro, decisiones de refinamiento y documentación: pasan.
- Adaptadores web y Shopify generados desde fuente: pasan sus validaciones.
- TypeScript y build Vite: pasan. El build de verificación se escribió en
  `/private/tmp/gallery-control-pilot-build`, sin alterar el build versionado.
- Chromium, una sesión y una pestaña: 8 casos × 2 temas × 4 anchos
  (390, 800, 1200, 1600 px). Input y Button midieron 46 px en los 64 casos.
  En los anchos con composición horizontal comparten coordenada superior.
  El piloto apila los controles por debajo de 481 px y no desborda el viewport.
- Teclado/foco en Default, Error, Success y Warning; conservación del color de
  validación con hover; solo lectura; acción local anunciada; loading delante
  y detrás; desactivación de animación con movimiento reducido: comprobados.
- Input y Textarea Studio: Warning permanece al seleccionar Focus y Hover;
  cada selector de estado tiene cinco opciones independientes de variante.
- Catálogo: búsqueda de las cinco rutas Input y cambio a Dark/Mobile;
  `component.button.minHeight` muestra 46 px y el archivo de modo correcto.
- Recursos de evidencia: servidor y navegador cerrados; `evidence:assert-clean`
  pasó al terminar.

Capturas locales no versionadas: `output/playwright/control-pilot-light.png`,
`control-pilot-dark.png`, `control-pilot-mobile.png` y
`token-catalogue-input.png`. La página reproducible es
`/foundations/control-pilot` dentro del sitio local.

## Límites y riesgos pendientes

- Estas comprobaciones no equivalen a certificar accesibilidad integral ni a
  una aprobación estética. No se probaron lectores de pantalla, dispositivos
  físicos, Safari/Firefox, zoom/texto ampliado ni todos los componentes que
  componen Button. La etiqueta larga del piloto crece sin altura fija.
- El cambio de altura de Button también afecta sus consumidores y tamaños sm/lg.
  Antes de distribuirlo corresponde revisar composiciones comerciales reales,
  por ejemplo Product Card, formulario de contacto y acciones del carrito.
- El contraste se comprobó con los colores actuales y las superficies indicadas.
  Cambiar la marca o colocar esas utilidades sobre otro fondo requiere repetir
  las mediciones. La categoría Article Hero comparte la mezcla de acento, pero
  no se probó su composición completa en esta ronda de navegador.
- No se cambió la madurez de ningún componente. Button conserva su clasificación
  previa, pero la revisión visual de este ajuste queda expresamente pendiente.
- Shopify conserva sus 12 avisos de contratos marcados planned con adaptador
  existente. El build del sitio conserva el aviso de chunks grandes y docs
  advierte sobre referencias externas/estilos existentes.
- Una regeneración de diagnóstico de tokens Webflow/Framer mostró diferencias
  previas ajenas al piloto, además de 798 colisiones del flujo heredado. Se
  restauraron exclusivamente esas dos salidas a la versión respaldada. Su
  sincronización y corrección se posponen; no deben considerarse actualizadas
  ni listas para consumo. Los valores legacy de Danger se ajustaron solo para
  conservar la comparación de migración. Las copias CSS de los archivos
  modificados sí se regeneraron desde su fuente.

## Siguiente checkpoint

El propietario revisó favorablemente el tratamiento general y pidió corregir la
separación del Input en el piloto. Después de esa corrección, revisar una
composición comercial y posteriormente abrir los pilotos de
personalización de marca en el editor Shopify y biblioteca editable Figma.

Para Figma se prefiere “The Gallery Design System”. Antes de construir el puente
se verificará la capacidad vigente de Professional, el mecanismo de actualización
sin duplicados y la conservación de alias e identificadores. Las ediciones de
Figma no sustituyen la fuente oficial del repositorio.

El modelo copy-and-own exige revisar e incorporar los cambios en cada consumidor;
no se presupone una actualización automática de sus copias.

## Seguimiento: separación de Input y vida útil del piloto

El propietario pidió entre 2 y 4 px de separación entre label/campo y
campo/mensaje. El Input canónico ya tenía 4 px, pero `display: contents` en la
composición del piloto anulaba su gap de escritorio. La grilla del piloto ahora
reproduce esos 4 px; también se eliminó su diferencia móvil de 8 px. Se corrigió
la composición de documentación, sin añadir tokens ni alterar el componente.

Comprobación posterior en Chromium: ocho casos × Light/Dark × 390/1200 px
(32 combinaciones) con 4 px en ambas separaciones y controles de 46 px.
En escritorio Input y Button permanecen alineados. Input Studio se comprobó
por separado: conserva 4 px arriba y abajo del campo. Capturas actualizadas:
`output/playwright/control-pilot-gap4-{light,dark}-{390,1200}.png`.
El navegador y el servidor de evidencia se cerraron al terminar.

La ruta Foundations es temporal: sirve para revisar esta regla compartida.
Se retirará junto con sus enlaces cuando las composiciones comerciales cubran
los mismos casos; se conservarán la decisión y las evidencias. No se cambió la
clasificación de madurez de ningún componente en este seguimiento.
