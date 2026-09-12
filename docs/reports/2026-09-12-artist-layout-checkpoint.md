# Checkpoint: Artist Index y Artist Statement

Fecha: 2026-09-12. ADR 0351. Continúa el punto 5.

## Resultado

24 roles nuevos completan 39/36 valores públicos. Index expone sus tres
densidades y visuales de composición/filtros; Statement expone medidas,
proporciones y ritmo. Se preservan los valores iniciales y sus relaciones con
tipografía/espacio del sistema. Registry de Index incorpora su inventario con
la categoría existente transition. Los pesos antes implícitos son explícitos.

Se retira el padding 24px/16px de Studio que anulaba el espaciado canónico de
Statement. El ejemplo MDX de Index compone la base plana de Card como el
renderer compartido, conservando Artist Card como elección del consumidor.

## Evidencia

- Consumidor CLI con Index, Statement y Artist Card solicitado explícitamente
  para los registros del fixture; Card/Badge llegan por su dependencia real.
- 936 comparaciones de geometría/tipo/paleta a 320/600/900/1200px, ambos temas,
  con/sin introducción y retrato. Tolerancia máxima 0.02 CSS px para reparto
  fraccional; no se cambia el aspecto inicial ni aparece overflow de página.
- Index personalizado: cuatro/tres/dos columnas según banda, intro 30ch
  (302.812px con la fuente de prueba), inset al 4%, gap de cabecera 15px,
  gap entre controles 12px, padding 5px/15px y borde 3px. Foco 4px/offset 6px,
  disabled nativo, RTL, count cero acotado a uno y reduced motion pasan.
- Esos botones son sondas explícitas de estilos del consumidor. No representan
  un filtro implementado ni certifican selección, resultados, URL o anuncios.
- Statement personalizado: retrato cuadrado de 463.844px, reparto 50/50 después
  del gap, narrativa máxima 448px, cita con borde 4px/inset 10px, párrafos 15px,
  imagen de firma limitada efectivamente a 120px y offset sticky 20px confirmado
  haciendo scroll. Retrato apilado limitado a 200px; sin retrato queda una columna.
- El borde relativo sube a 8px con raíz de 32px. Al reducir el valor relativo,
  respeta el mínimo personalizado de 3px. RTL y forced colors conservan el borde.
  El harness se corrigió para medir el ancho renderizado de firma: CSS computado
  conserva la expresión min(100%, 120px), no una longitud resuelta simple.
- Studio comprueba unidades ch, densidades, límite real del slot de filtros,
  padding canónico 40px, proporción/cap del retrato, borde, omisión/reset y
  Exhibit. Fuente, catálogo 1080 rutas/8640 comparaciones, contratos, Studio,
  registry, CLI, docs y adapters pasan. Sin cambios de JS/TS ni madurez.

Capturas revisadas y resultados en `output/playwright/artist-layout-values/`
(ignorado). Fixture retirada. Cada fase usó una sesión/pestaña headless y cerró
navegador/servidor propios; puerto 4173 libre y procesos de prueba vacíos.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla ni Shopify remoto. Los
retratos del consumidor son decorativos; el trazo de firma es una sonda de
medida, sin afirmaciones de identidad o autenticidad. No se certifica filtrado
ni todas las combinaciones de tokens. Ambos siguen pilot. Copias existentes
adoptan cambios explícitamente. Sin site/dist, publicación, despliegue ni Figma.
