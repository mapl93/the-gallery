# Checkpoint: Toggle y FAB

Fecha: 2026-09-09. ADR 0321. Continúa el punto 5 de la auditoría.

## Resultado

Toggle y FAB exponen 21 roles públicos cada uno. Diecisiete tokens nuevos cubren
espaciado, dimensiones y foco antes fijos. Toggle mantiene altura mínima extensible;
FAB conserva anclaje físico inferior derecho y sus políticas de visibilidad/acción
siguen perteneciendo al consumidor. No cambia el runtime de selección.

Studio deja de sobrescribir los offsets de FAB con cero. Su contenedor de ejemplo
usa posicionamiento absoluto con los mismos tokens; la salida canónica continúa
fija al viewport. Este desplazamiento del ejemplo es intencional y se distingue de
la paridad del componente instalado. No se introducen decisiones sobre safe areas,
colisiones con barras fijas ni desplazamiento automático de la página.

## Evidencia

- Chromium, consumidor CLI: 72 mediciones (nueve raíces por ocho matrices,
  390/768/1280/1600 × Light/Dark) iguales al CSS anterior.
- Toggle responde a altura mínima 52px, padding 18/10px, separación interna 12px,
  grupo 10px y borde 3px. Click, Enter y Espacio mantienen exactamente una selección
  y propagan un click cada uno. Tab normal, flechas sin captura y disabled intacto.
- Etiquetas largas crecen a 86px sin desbordar 342px disponibles. Foco personalizado
  3px/5px. Forced colors conserva el marcador de selección del sistema de 2px.
- FAB responde a control/icono 64/30px, offset derecho 32px e inferior 40px en LTR
  y RTL, borde 3px y foco 4px/6px. Activación nativa y disabled probados.
- Estado oculto desplaza 16px y excluye foco; reduced motion elimina transiciones.
  Con movimiento normal, la salida termina en visibility:hidden.
- Studio: controles de Toggle y FAB, foco simulado, posiciones, Hidden y reset
  comprobados. Exhibit incluye las nuevas referencias. Capturas Desktop de Toggle
  y Mobile de FAB revisadas. La reacción existente de Comment Section hereda
  padding 22px y conserva su cambio de aria-pressed independiente.
- Fuentes, paridad legacy, catálogo 613 rutas/4904 comparaciones, contratos, Studio,
  docs, TypeScript y adapters Web/Shopify pasan. Auditoría: 182 componentes sin gaps
  estructurales ni drift. Los dos avisos de rendimiento Shopify siguen siendo
  orientativos, sin errores ni promoción de madurez.

Evidencia ignorada: `output/playwright/toggle-fab/`. Consumidor generado con el módulo
real toggle-group; FAB no añade un runtime de scroll. Fixture temporal retirada,
navegador cerrado y gate limpio; servidor preexistente preservado.

## Límites y adopción

No se verificaron Safari/Firefox, tecnologías de asistencia reales, cualquier
combinación de tokens, safe areas de dispositivos ni comportamiento de una tienda
remota. La tipografía heredada de Toggle y el marcador en colores forzados conservan
sus responsabilidades documentadas. Los tokens no certifican accesibilidad.

Web/Shopify regenerados para adopción copy-and-own explícita. Sin subida de tema,
`site/dist`, Figma o nuevos targets. Ambos componentes continúan pilot.
Continuar Alert, Progress, Spinner y Stat en lotes de feedback verificables.
