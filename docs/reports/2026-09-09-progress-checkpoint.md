# Checkpoint: Progress

Fecha: 2026-09-09. ADR 0323. Continúa el punto 5 de la auditoría.

## Resultado

La decisión del propietario se implementa con diámetro y grosor del círculo
independientes en píxeles. Diez tokens nuevos cubren geometría y movimiento;
el peso del valor reutiliza el rol semibold. El contrato expone 21 roles públicos.

El círculo conserva diámetro 48px y grosor visible 5.333333px: la antigua
coordenada de trazo 4 se escalaba por el viewBox de 36 a 48px. El radio pasa de
21.2px a 21.333333px para encajar el trazo exactamente; esta corrección de
0.133333px se registra como cambio deliberado, no como paridad exacta del radio.

El SVG actual evita ese escalado y normaliza porcentajes con pathLength=100.
El valor cero oculta el trazo de progreso para evitar el punto que produce un
extremo redondo. La barra indeterminada mide su recorrido respecto a su pista,
permitiendo personalizar ancho del segmento, duración y curva. Se conserva la
curva CSS ease-in-out original, distinta del rol semántico in-out existente.

Studio muestra únicamente los controles aplicables a Bar, Circle o Indeterminate.
Exhibit documenta los nuevos roles y corrige su ejemplo Bar de 70% visual a su
valor semántico declarado de 65%. Los datos de avance no se convierten en tokens.

## Evidencia local

- Chromium: ocho matrices (390/768/1280/1600px × Light/Dark) conservan las 64
  mediciones de Bar. Circle conserva diámetro, grosor visible, tipografía y peso;
  la pequeña diferencia de radio se mide por separado.
- Pares independientes diámetro/grosor 32/3, 96/3, 96/8 y 36/12px producen radios
  14.5, 46.5, 44 y 12px. La medida comprueba unidades visibles y transformación SVG.
- Bar responde a altura 12px, gap 10px, separaciones de etiqueta 8/20px, ancho
  preferido 8rem y peso 500 sin alterar su valor accesible 65.
- En una pista de 300px, segmentos de 30% y 60% miden 90/180px. A 750ms de un ciclo
  de 1500ms, sus desplazamientos son 135/90px: el recorrido usa la pista real.
  Movimiento reducido detiene la animación. Colores forzados conservan el trazo
  configurable de Circle; no se certifica contraste de cualquier personalización.
- Studio aplica círculo 80/6px y radio 37px, oculta el punto al valor cero y genera
  dash 100/0 al completar. Rango 20–80 con valor 50 produce 50% visual y ARIA exacto;
  el texto accesible independiente se conserva.
- Indeterminate selecciona Bar y omite valor numérico/texto visible; cambiar a
  Circle lo desactiva. Ancho de segmento 50% funciona. Reset restaura 48/5.333333px.
- Una segunda fase confirma visibilidad de controles para Bar, Circle,
  Indeterminate y reset. La captura final de Circle fue revisada visualmente.
- Free Shipping Bar conserva composición y valor 65% al editar el gap de Progress.
  Un consumidor instalado con CLI y Exhibit usan las nuevas referencias.
- Fuente, paridad legacy, catálogo de 641 rutas/5128 comparaciones, contratos,
  Studio, docs, TypeScript y adapters pasan. Auditorías de componentes y rendimiento
  pasan sin errores; avisos de rendimiento Shopify siguen siendo orientativos.

Evidencia ignorada: `output/playwright/progress-values/`, incluidos
`evidence-result.json`, `controls-result.txt` y `circle-final-controls.png`.
Fixture temporal retirada, navegador cerrado y gate de recursos limpio; se
preserva el servidor preexistente del propietario.

## Adopción y límites

Los consumidores copy-and-own deben adoptar el SVG actual además de CSS/tokens
para obtener radio ajustado y porcentajes normalizados. El markup antiguo con
viewBox mantiene su radio y recibe un trazo sin escalado; no se migra automáticamente.

Web/Shopify regenerados, sin subida de tema ni nueva plantilla Circle de Shopify.
No se verificaron Safari/Firefox, lectores de pantalla reales, tienda remota ni
combinaciones arbitrarias de dimensiones y colores. No cambia la madurez pilot;
no se modifica site/dist ni se incorpora Figma. Continúan las primitivas restantes.
