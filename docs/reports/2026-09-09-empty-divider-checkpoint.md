# Checkpoint: Empty State y Divider

Fecha: 2026-09-09. Decisión: ADR 0317. Continúa los puntos 5 y 7.

## Resultado

Empty State tiene 17 roles públicos: añade padding horizontal independiente,
tamaño de icono y medidas máximas de título/mensaje. Divider expone cuatro roles:
color y grosor de cada variante. Valores predeterminados intactos; unidades `ch`
y alias a la escala semántica se conservan. Contratos, registro, Studio, Exhibit y
CSS coinciden. La raíz Empty State ahora rechaza encabezados ausentes/incorrectos
en ejecución, cumpliendo la decisión contextual ya aceptada en ADR 0236.

No cambian el propósito ni los ejes de Divider, ni aparece espaciado externo.
No cambian heading rank, carga, anuncios o recuperación en Empty State: los sigue
resolviendo el host. Divider conserva su estabilidad previamente aprobada;
Empty State sigue `pilot`. Las personalizaciones nuevas no son aprobación visual
de cualquier valor posible. Avatar permanece intacto mientras se aclara su regla
de parejas fijas de diámetro/tipografía.

## Evidencia

- Chromium: 48 presentaciones, 112 elementos, cuatro anchos (390/768/1280/1600)
  y dos temas. CSS anterior y actual coinciden en geometría, tipografía, color,
  margen y padding predeterminados. H2 y H5 tienen la misma presentación.
- Quince mediciones de Studio: padding de bloque e inline independientes, icono
  y SVG 80×80px, máximos relativos de texto, grosores 3/5px en ambos ejes, margen
  cero y reset. Los controles nuevos aparecen también en Exhibit.
- Fuente del renderer transpilada con TypeScript ya instalado y renderizada con
  React DOM Server: H1–H6 válidos; `div`, `h7`, vacío, ausente y título vacío no
  producen raíz. No se instaló una herramienta adicional.
- Texto largo localizado y RTL dentro de 220px no desborda. Divider conserva
  dimensiones y color del sistema con colores forzados. Propósito semántico
  expone la regla y orientación vertical; visual-only la oculta.
- Cart Empty y Empty Collection heredan icono de 48px, conservan H2 contextual y
  no desbordan a 390px. Capturas de ambos Studios revisadas.
- Consumidor instalado por CLI con CSS/tokens y sin runtime de estos componentes.
  Fuentes/ocho matrices, 1608 comparaciones legacy, catálogo 576 rutas/4608
  comparaciones, 470 referencias CSS públicas, contratos, Studio, docs, decisiones,
  TypeScript y Web/Shopify correctos. Auditoría: 182 pasan, cero gaps/drift.

Evidencia ignorada: `output/playwright/empty-divider-customization/`. Fixture
servida retirada, sesión cerrada, gate de recursos limpio. Servidor preexistente
preservado. No se verificaron lectores de pantalla, Firefox/Safari ni una tienda
Shopify alojada. El resultado no certifica todo texto/valor de marca arbitrario.

## Adopción

Se regeneraron Web/Shopify sin subir tema remoto ni modificar `site/dist`.
Las copias anteriores no se actualizan solas. Si un consumidor había personalizado
ambos insets de Empty State mediante el antiguo alias de section-gap, debe poner
su valor también en el nuevo rol inline para conservar esa personalización.
Continúan componentes base; sin trabajo de Figma ni cambios de formato o paquetes.
