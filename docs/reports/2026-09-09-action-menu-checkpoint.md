# Checkpoint: Dropdown Menu y Context Menu

Fecha: 2026-09-09. ADR 0332. Continúa los puntos 5 y 7 de la auditoría.

## Resultado

Treinta tokens nuevos completan 46 roles públicos en Dropdown Menu y 45 en
Context Menu. Context define su superficie y referencia los quince tokens de
filas/etiquetas de Dropdown; no duplica esas definiciones. Se editan límites,
padding, borde, entrada, filas, foco, iconos, atajos y separadores. Los factores
responsive conservan la base compartida y las variantes dejan de repetirse como
estados. Context mantiene Open como única propiedad escalar.

Studio ya no oculta esos límites con anchos fijos. Su controlador contextual
conserva el punto de invocación y reajusta la posición tras cambios de tokens.
El inset local existente de 8px se representa una sola vez como variable privada;
no es un límite universal ni un requisito de plataforma.

Se corrigió un fallo real en la demostración: el listener de scroll en captura
cerraba Context Menu al desplazar su propio contenido. Ahora permite scroll
interno, incluidos los movimientos de foco que lo provocan; conserva cierre
ante scroll exterior y resize. Los elementos de menú también conservan una
altura personalizada grande bajo puntero grueso, usando el mayor mínimo entre
el token de fila y el objetivo táctil compartido.

## Evidencia local

- Chromium: 400 comparaciones de elementos entre CSS canónico anterior/actual,
  en ocho matrices de tema/viewport, preservan geometría, color y tipografía
  predeterminados. El ajuste coarse y la nueva composición de Studio se prueban
  por separado y no se presentan como paridad de esos casos personalizados.
- Ambas superficies: mínimo/máximo 384/416px, altura limitada a 256px, padding
  8px/borde 3px, overflow scrollable y desplazamiento cerrado hacia arriba 12px.
  Dropdown conserva gap al trigger independiente, probado en 10px.
- Filas compartidas: mínimo 80px, padding 8/16px, gap 12px, borde 2px,
  foco 3px/inset 4px, iconos 24px, extra-gap de atajo 10px. Separador 2px/gap
  12px, label padding 16/12/8px, tracking 1.2px y peso 700 pasan en ambos.
- Viewport 320px con texto largo RTL respeta ancho 260px tras gutter total 60px,
  sin overflow horizontal en la muestra. Colores forzados eliminan sombra y
  movimiento reducido elimina transiciones.
- Emulación CDP confirma pointer:coarse. La fila personalizada conserva 80px
  sobre el objetivo táctil 60px; inyectar CSS anterior reproduce su reducción
  a 60px. Se retira la emulación al terminar.
- Studio edita los tokens, alcanza 416px, limita altura y comparte filas. Home,
  End, flechas, typeahead, selección, Tab de salida, Escape/restauración y reset
  pasan. Un comando aria-disabled puede recibir foco según el contrato, pero
  Enter no lo activa. Default/Danger cambia la variante sin cambiar esos estados.
- Context abre por Shift+F10 y clic derecho, clampa geometría personalizada y
  conserva scroll interno. El fallo anterior se reprodujo con scrollTop 50:
  pasaba de visible a hidden. Tras la corrección sigue abierto, también al usar
  End. Scroll de página y resize siguen cerrándolo.
- Comprobación adicional de coordenadas finales: puntero (96,23) y teclado
  (96,50) relativos al área, iguales a sus posiciones esperadas tras clamp.
  Cambiar el ancho con el menú abierto lo lleva a 504px dejando 8px por lado.
  El reajuste responde a cambios de tokens y no compite con la apertura.
- Las pruebas esperan los frames de apertura/foco y miden posición final con
  movimiento reducido. Se corrigieron esperas anticipadas, scroll exterior de
  automatización y un Escape enviado al inspector; no se atribuyen al producto.
- Exhibit estrecho conserva contenido sin overflow horizontal (Dropdown 206.09px,
  Context 193.14px). Captura contextual final muestra el menú abierto en viewport;
  reemplaza una captura larga que lo había cerrado por scroll exterior.
- Fuente/paridad legacy, catálogo 788 rutas/6304 comparaciones, contratos,
  Studio, docs, TypeScript, adapters y consumidor CLI pasan. Auditorías conservan
  madurez y los avisos Shopify siguen siendo advisory.

Evidencia ignorada en `output/playwright/action-menu-values/`: resultados,
coordenadas, consumidor instalado y capturas. Fixture retirada, navegador cerrado,
gate limpio y servidor preexistente preservado.

## Límites y continuidad

No se verifican Safari/Firefox, lectores de pantalla, menús nativos/top layer,
portales productivos, long press, submenús, comandos ejecutados ni Shopify remoto.
El marco contextual es una demostración local, no un posicionador certificado.
Los tamaños contradictorios conservan la prioridad de mínimo que establece CSS;
texto/atajos extremos necesitan revisión contextual. Danger mantiene su mezcla
55% error/45% primary y las mayúsculas de label siguen siendo tratamiento definido.

Ambos permanecen pilot. Web/Shopify se regeneran para adopción copy-and-own;
sin subida remota, site/dist ni Figma. Continúan Command Palette y Steps.
