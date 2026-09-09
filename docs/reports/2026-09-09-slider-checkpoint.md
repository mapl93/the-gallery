# Checkpoint: Slider / Range

Fecha: 2026-09-09. Base previa: `34e628e`, sincronizada y limpia al iniciar.
Continúa el punto 5 y reconcilia los ejes del punto 7. ADR 0313; estado `pilot`.

## Resultado

- `tokens/source/components/slider.tokens.json:1` añade seis decisiones, con los
  defaults existentes: pista 4px, tirador 20px, control 44px, gap vertical 8px,
  separación label/valor 16px y borde 2px. `components/css/forms.css:197` las consume
  junto con Body weight e Input focus width. La altura admite el tirador; no se
  introduce un mínimo universal ni una orientación nueva.
- Los 31 roles públicos tienen controles en Studio y referencia derivada en
  Exhibit. El inventario corrige la superficie secundaria sin uso por el borde
  real de la pista. Las mezclas de color se presentan como entradas editables.
  Progreso, dirección, centrado y mecanismos nativos siguen siendo privados.
- `components/contracts/slider.contract.json:128` conserva tres estados de
  interacción. Modo, validación y anatomía dejan de duplicarse en esa lista;
  permanecen las propiedades y todos los selectores CSS.
- `site/src/components/studio/AdvancedControlStudio.tsx:146` inicializa el enhancer
  canónico. Antes, un clic al 20% de la pista dejaba los valores en 60–80 porque
  Studio marcaba la raíz como inicializada sin instalar el comportamiento.
- `components/js/theme.js:520` respeta los límites predeterminados cuando faltan
  atributos. La activación de pista conserva el foco del tirador: el comportamiento
  predeterminado del puntero ya no lo devuelve al documento. Ambos errores tienen
  reproducción y comprobación posterior, con certeza alta.
- `components/css/forms.css:454` separa cinco listas que mezclaban selectores
  WebKit/Mozilla. Chromium descartaba reglas de cursor, movimiento reducido y
  colores forzados completas, según el comportamiento documentado por
  [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Selector_list).
  Ahora el contorno de foco y el borde de pista se aplican al elemento nativo.

## Evidencia y validación

24 mediciones de Studio en Desktop/Light y Mobile/Dark: geometría, tipografía,
radio y duración; overrides, reset, seis cambios de modo, teclado, validación y
disabled. El clic actualiza también el inspector; el foco permanece al ajustar
el valor. Exhibit muestra los nuevos roles desde el mismo metadato.

Consumidor HTML instalado con el CLI: solo CSS base/forms, tokens y los módulos
core/slider. 32 comparaciones en cuatro anchuras, dos temas y cuatro familias de
validación no detectan cambios inesperados de geometría/color. Verificados pista,
un par input/change, teclado, valores ordenados, FormData, exclusión disabled,
reset, RTL, texto largo y mutaciones de límites, incluidos max ausente/vacío.

CDP inspeccionó el árbol interno del input Chromium: tirador real 20×20 con borde
2px y pista 4px; overrides 30×30, borde 3px y pista 8px. Con colores forzados el
contorno configurado mide 6px y el borde de pista 1px; con movimiento reducido la
transición del tirador mide 0s. Before / After conserva el progreso nativo y la
contención en dos anchuras/temas. Capturas revisadas; su geometría editorial propia
se conserva y no recibe aprobación visual nueva.

Pasan fuente/ocho matrices, comparación legacy, 547 paths del catálogo, 440 refs
públicas, contratos/Studio/MDX, TypeScript, adaptadores Web/Shopify y 20 escenarios
del CLI. Auditoría estructural: 182 contratos, sin gaps/drift; conserva cinco
estables. Rendimiento: 24 superficies, cero errores y los dos avisos orientativos
Shopify existentes; no son límites generales del sistema.

Evidencia local: `output/playwright/slider-customization/`. Los intentos que
detectaron pérdida de foco y reglas descartadas preceden a las correcciones;
los resultados JSON finales corresponden al código corregido. Se corrigió además
el nombre de la composición usado por el harness. Sesión cerrada, fixture servido
eliminado y gate de recursos limpio; servidor preexistente conservado.

## Adopción y límites

Web y Shopify regenerados. Copiar CSS, tokens y runtime compatibles juntos; las
copias existentes no se actualizan solas. Sin publicación de Shopify, cambios de
paquete, Figma ni reconstrucción de `site/dist`. Evidencia en Chromium, sin Safari,
Firefox, lector de pantalla, todos los overrides o certificación completa Shopify.
La estabilidad humana y las funciones avanzadas opcionales conservan sus gates;
no bloquean continuar la cobertura de componentes de la base Web.
