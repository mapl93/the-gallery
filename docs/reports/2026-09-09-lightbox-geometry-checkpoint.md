# Checkpoint: geometría de Lightbox

Fecha: 2026-09-09. ADR 0335. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Quince valores de geometría completan 38 roles públicos en Lightbox, con límites
de figura/imagen/fallback, gaps, insets independientes y controles heredados de
Close Button/Icon Button. Tipografía, peso e interlínea se aplican en la raíz
para que respondan a overrides locales. Previous/next siguen en anatomía y
salen del eje de estados. Permanece pilot.

Este checkpoint no cierra la cobertura de colores: OPEN-QUESTIONS mantiene una
decisión explícita sobre la paleta de medios. Se preguntó al propietario si usar
tokens propios de Lightbox con sus valores actuales o una familia compartida;
la respuesta seguía pendiente al cerrar esta evidencia. Se recomienda empezar
por el componente mientras no exista otro consumidor concreto.

Studio desmontaba Lightbox al cerrar y evitaba que Modal restaurara el foco.
La reproducción previa devuelve restored=false; conservar el componente montado
con open=false y pasar el trigger ref permite completar ese ciclo. Se corrigió
la dirección de flechas LTR anidadas en RTL. Zoom ahora comparte el color de foco
on-scrim de navegación/Close; antes heredaba rgb(23,23,23) sobre el fondo oscuro.

## Evidencia local

- Chromium: 240 comparaciones de elementos, cuatro anchos y dos temas, preservan
  geometría, tipografía y colores canónicos iniciales. Se alternaron las hojas
  anterior/actual completas. El fixture geométrico usa una imagen SVG local de
  dimensiones conocidas; no representa una fotografía de producto.
- Personalización: padding exterior 20px, figura 700x540px e imagen 480x360px;
  gap 12px. Insets Close/Navigation/Zoom 8/16/24px, gap Zoom 12px. Navegación
  48px, icono 24px, borde 2px; Close 44px, icono 22px. Texto de 16px con
  interlínea 28.8px y peso 500. Caption máximo 30ch, calculado 309.844px.
- Foco Zoom visible blanco de 3px con offset 4px, comprobado frente al color
  oscuro anterior y en captura. Colores forzados usan Canvas/CanvasText y foco
  negro de 3px. Direcciones RTL y LTR anidada pasan.
- Fallback 400x250px con borde 3px; viewport estrecho produce 160x240px mediante
  factores independientes. Las pruebas no simulan safe-area física de un teléfono.
- Studio real aplica el factor de imagen a 237.5px y permite 542.40625px al
  aumentarlo: ya no limita la demostración a 340px. Esto cambia la presentación
  del fixture anterior, no la geometría inicial del CSS canónico.
- Abrir, cerrar por Escape, reapertura y cierre de fallback restauran foco al
  trigger. Tab/Shift+Tab permanecen contenidos. Finite/loop, flechas RTL, zoom
  1.5x/reset, alt/counter sincronizados, error de imagen con nombre accesible,
  limpieza del error al reabrir y Reset de tokens pasan. No se cambió el motor
  privado de zoom/pan ni se certifican todos sus gestos.
- Exhibit enumera tokens. Product Gallery abre el mismo Lightbox y hereda el
  máximo de contenido 420px y controles de 48px. La copia CLI conserva su slice
  de dependencias y runtime. No se afirma que el HTML aislado de prueba añada
  comportamiento neutral de Lightbox por sí mismo.
- Fuente/paridad legacy, catálogo 855 rutas/6840 comparaciones, contratos,
  Studio, docs, TypeScript, adapters y auditorías pasan. Permanecen dos avisos
  advisory de tamaño Shopify, sin certificación ni nuevos límites globales.

Evidencia ignorada en `output/playwright/lightbox-values/`: CSS previo, consumidor,
precheck, mediciones, Studio y captura. Fixture retirada y navegador cerrado;
gate de recursos limpio, servidor preexistente preservado.

## Límites y decisión pendiente

No se verifican Safari/Firefox, lectores de pantalla, dispositivos físicos,
coordinación global de modales/inert/scroll lock, todas las imágenes/localizaciones,
gestos de pan ni Shopify remoto. La composición real de Product Gallery se
probó en el sitio Web. Salidas Web/Shopify regeneradas para adopción copy-and-own;
sin publicación remota, site/dist ni Figma.

Para completar Lightbox falta resolver el alcance de sus colores documentado en
`docs/OPEN-QUESTIONS.md` y ADR 0104. El alcance de la implementación pendiente es
pequeño: valores fuente, aliases, contrato/Studio y prueba de personalización de
la paleta elegida, conservando apariencia inicial y fallback de colores forzados.
