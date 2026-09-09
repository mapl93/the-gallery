# Checkpoint: Command Palette y Steps

Fecha: 2026-09-09. ADR 0333. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Treinta y nueve tokens nuevos completan 57 roles públicos en Command Palette y
25 en Steps. Command descubre también el tintado, límites y movimiento que
realmente hereda de Modal; no copia tokens de partes que no usa. Steps permite
editar indicador, borde, conector, icono y espaciado independientemente. Orientación
sale del eje de estados y done queda documentado como alias de completed, con CSS
compatible conservado.

Se comprobaron y corrigieron dos fallos en Command Palette. La sombra de foco
se suprimía en colores forzados; ahora hay un outline inset de color de sistema
que usa el mismo token de grosor. En Studio, Enter durante IME podía cerrar la
paleta y simular ejecución. Ahora respeta la composición y limpia ese estado al
cerrar o reiniciar, siguiendo la protección ya usada por Combobox.

## Evidencia local

- Chromium: 592 comparaciones de elementos en ocho matrices conservan la
  geometría, color y tipografía iniciales de Command y Steps horizontal/vertical.
  Se alternan las hojas anterior/actual completas para evitar que una regla nueva
  se filtre a la medición del CSS anterior. Se incluyen geometrías de conectores.
- Command: ancho 640px, borde 3px, inset superior 32px y laterales/inferior 20px.
  Search padding 8/20px, gap 12px, divisor 2px e icono 24px; resultados limitados
  a 192px con padding 8px y scroll. Group padding 16/12/8px, tracking 1.2px,
  peso 700; filas de 80px con padding 8/16px, gap 12px, borde 2px e icono 24px.
  Atajos reciben 10px extra y footer padding 8/20px, gap 12px, divisor 2px.
- El overlay conserva alpha de color por densidad: #20408080 con 0.4 produce
  alpha calculado 0.200784. El límite heredado de Modal restringe el panel a
  400px al aumentar resultados; empty padding 20px y RTL estrecho pasan.
- La prueba previa muestra shadow none y outline style none en colores forzados.
  Con la corrección, outline solid 3px/offset -3px. Capturas anterior/actual
  revisadas confirman ausencia/presencia visible; los tamaños difieren por los
  tokens personalizados, no se presentan como paridad de geometría personalizada.
- Emulación CDP confirma pointer:coarse y preserva mínimo de resultado 80px.
  Movimiento reducido mantiene las comprobaciones en sus posiciones finales.
- Studio: controles afectan ancho 480px, padding, resultados y vacío. Home/End
  omiten deshabilitados; flechas mantienen DOM focus en el input y un único
  aria-activedescendant/seleccionado. Opciones permanecen fuera de Tab. Tab y
  Shift+Tab recorren input/Close; filtro solo deshabilitado no ejecuta; vacío se
  presenta visualmente y mediante status. Escape/Close/selección restauran foco.
- La reproducción anterior cerraba al recibir Enter con isComposing. Las pruebas
  finales envían compositionstart/end, Enter, flecha, Escape, Ctrl+K y keyCode 229:
  composición parcial no filtra/activa/cierra; compositionend confirma el filtro.
  Enter normal selecciona. Reapertura conserva query/filtro; Close y Reset limpian
  el guard. El atajo respeta otro campo editable. Son eventos de navegador
  simulados, no certificación de un teclado/IME de sistema operativo.
- Steps: indicador 48px, borde 4px, check 24px, base horizontal 192px, conector
  3px centrado a 22.5px. Gaps horizontal/descripcion 8/12px y pesos 700/600.
  Vertical usa gap 12px, padding inferior 20px, inset de contenido 10px,
  conector desde 48px y oculta el último. Texto largo RTL a 280px y scroll
  horizontal con bases mayores que el contenedor pasan; forced colors conserva
  la geometría. Studio orientación/reset preserva current/completed.
- Checkout Progress instalado y su Studio real heredan indicador 48px/borde 4px.
  En estrecho conservan orden, un current, texto Completed y omisión de conectores.
  Los gaps de esa composición estrecha siguen siendo responsabilidad del padre;
  no se afirma que herede todos los factores verticales de Steps.
- Exhibit enumera las nuevas referencias. Fuente/paridad legacy, catálogo
  827 rutas/6616 comparaciones, contratos, Studio, docs, TypeScript, adapters y
  consumidor CLI pasan. Auditorías mantienen madurez; avisos Shopify advisory.

Evidencia ignorada en `output/playwright/command-steps-values/`: fuente previa,
consumidor, precheck, mediciones, Studio y capturas. Fixture retirada; todas las
fases cerraron navegador y confirmaron gate limpio. Servidor preexistente preservado.

## Límites y continuidad

No se verifican Safari/Firefox, lectores de pantalla, IME físico, selección real
de comandos, proveedores globales, top-layer, modalidades productivas ni Shopify
remoto. La demostración de diálogo local no certifica aislamiento/inert de toda
una aplicación. Steps sigue siendo una lista pasiva y este trabajo no habilita
navegación por pasos ni personalización del checkout nativo de Shopify.

Ambos permanecen pilot. Web/Shopify se regeneran para adopción copy-and-own;
sin subida remota, site/dist ni Figma. Continúan Carousel y Scroll Area.

[CSS Color Adjustment Level 1](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-properties)
justifica el reemplazo del shadow por outline para foco en colores forzados.
