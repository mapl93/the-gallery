# Checkpoint: personalización de Avatar mediante tokens

Fecha: 2026-09-09. Decisión del propietario y ADR 0319. Continúa el punto 5.

## Resultado

La aclaración del propietario resuelve el bloqueo: diámetro y tipografía se
personalizan mediante tokens. Cuatro tokens nuevos representan los diámetros
32/40/56/80px; los cuatro tamaños tipográficos semánticos ya públicos se reutilizan.
No se duplica la escala tipográfica. Studio ofrece ambos controles para el preset
seleccionado; los trece roles visuales aparecen en la referencia Exhibit.

Se conserva `size` como única propiedad semántica. Las parejas iniciales son
valores predeterminados, no restricciones. La actualización explícita de ADR 0237
y OPEN-QUESTIONS evita que un siguiente colaborador restablezca la limitación.
Imagen/iniciales explícitas, nombres contextuales, política de carga del consumidor
y comportamiento pasivo no cambian. Avatar continúa `pilot`.

## Evidencia

- Chromium: 56 raíces en ocho matrices (390/768/1280/1600, Light/Dark) comparadas
  con el CSS previo. Geometría, tipografía, color, radio y no-shrink intactos.
- Los cuatro presets admiten controles independientes: 46/16, 58/20, 72/24 y
  96/32px de diámetro/letra, en consumidor CLI y Studio. Cambiar diámetro conserva
  la letra; editar la letra conserva diámetro. Los controles se alternan sin perder
  overrides. Reset vuelve al preset predeterminado de 40px.
- Author Card hereda diámetro Large de 72px y Comment Section hereda Default de
  48px. Ambos conservan su identidad redundante oculta junto al nombre visible.
- Imagen nativa decodificada a 80×80 con cover, alt contextual y sin segundo rol
  de imagen. Iniciales independientes nombradas; Avatar no introduce foco.
  El contenedor RTL estrecho no comprime su diámetro de 56px. Forced colors
  conserva el diámetro personalizado y añade el borde del sistema dentro de él.
- Exhibit muestra diámetro y tipografía; capturas Desktop predeterminada y Mobile
  personalizada revisadas. Consumidor CLI no necesita módulos JS para Avatar.
- Fuentes/ocho matrices, 1608 comparaciones legacy, catálogo 580 rutas/4640
  comparaciones, 474 referencias CSS públicas, contratos, Studio, docs, decisiones
  y adapters Web/Shopify pasan. Auditoría: 182 pasan, cero gaps y drift.

Evidencia ignorada: `output/playwright/avatar-customization/`. Fixture temporal
retirada, navegador cerrado y gate de recursos limpio. Se preservó el servidor
local preexistente. No se verificaron lectores de pantalla reales, Firefox/Safari,
la política de imágenes de una tienda remota ni cualquier tamaño arbitrario.

## Adopción

Web/Shopify regenerados; no hay subida de tema, `site/dist`, Figma ni nuevas
plataformas. Las copias existentes requieren adopción explícita de CSS/tokens.
Un override de tipografía compartida puede limitarse a `.avatar`; si se aplica
globalmente, afecta a todos sus consumidores semánticos. El usuario debe revisar
legibilidad y clipping al elegir proporciones propias.
Continuar Button Group, Icon Button y Close Button con el mismo criterio.
