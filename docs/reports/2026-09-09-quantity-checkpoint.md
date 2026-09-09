# Checkpoint: Quantity Selector

Fecha: 2026-09-09. Base previa: `61a0e59`, subida y limpia al iniciar.
Continúa el punto 5 y elimina una condición de implementación del inventario de
estados del punto 7. ADR 0315; conserva `pilot` y su separación de Number Input.

## Resultado y evidencia

- `tokens/source/components/quantity-selector.tokens.json:1` añade siete
  decisiones: ancho de valor 48px, padding horizontal/vertical 4px, separador 1px,
  icono 16px, ancho de acción 46px y line-height unitless 1.5. Reutiliza borde/foco
  Input y peso Body. 39 roles públicos disponibles en Studio y Exhibit.
- `components/css/primitives.css:1151` calcula la altura interior descontando
  los bordes: el exterior pasa de 48px a los 46px compartidos con Button. Acciones
  y campo se estiran juntos cuando aumenta la tipografía/padding. El wrapper
  conserva su ancho intrínseco dentro de un grid, evitando el espacio vacío que
  las capturas mostraron más allá del botón de incremento.
- `site/src/components/studio/QuantitySelectorStudio.tsx:99` preserva el borde
  canónico por defecto y propaga el borde simulado a los separadores. El foco
  exterior tiene un control de color propio. Studio compone Field Wrapper
  completo y una relación de feedback real; no imita su texto con estilos locales.
- `site/src/components/studio/QuantitySelectorArtwork.tsx:52` reutiliza el
  enhancer canónico mediante sus hooks. Las acciones actualizan el modelo y
  emiten input/change nativos, sin la segunda implementación que omitía eventos.
  El spinner siempre oculto deja de presentarse como estado interactivo; se
  conservan sus reglas CSS. Certeza alta en cambios medidos y reproducidos.

## Comprobaciones

**32 comparaciones** en cuatro anchuras, Light/Dark y cuatro variantes: único
delta de la geometría nativa de referencia, -2px de altura exterior/interior.
Button y Quantity miden 46px. **22 mediciones Studio** verifican todas las
decisiones nuevas, borde/foco/peso compartidos, unidades, overrides/reset,
altura exterior configurable, crecimiento por padding, ancho compacto y estados.

Consumidor independiente del CLI con Quantity y Button: paso alineado a min/step,
edición intermedia inválida, límites, vacío/required, fallback de step no positivo,
teclado, FormData, readOnly focusable/submittable, disabled excluido y reset.
Diez llamadas de inicialización mantienen un único par input/change por acción.
RTL, separadores lógicos, números largos, movimiento reducido y colores forzados.

Product Form y Cart Line Item conservan incremento único de 1 a 2, el override de
ancho del valor, altura 46px y contención a 390px. No se enviaron formularios ni
comandos de carrito. Capturas finales revisadas, incluido el ancho compacto.
Studio preserva un único marcador required y el destino de aria-describedby.

Pasan fuente/ocho matrices, catálogo de 561 paths, refs públicas, TypeScript,
contratos/Studio/registro/MDX, Web/Shopify y decisiones de refinamiento.
Auditoría estructural: 182 contratos sin gaps/drift, cinco estables previos.
Rendimiento mantiene 24 superficies, cero errores y dos avisos orientativos
Shopify. No se aplican presupuestos generales sin fuente.

Evidencia local: `output/playwright/quantity-customization/`, con baseline CSS,
scripts, resultados JSON, consumidor instalado y capturas. Se corrigió la clase
del Button de prueba y después se repitió el pase completo tras la corrección de
ancho compacto. Fixture servido eliminado; sesión cerrada y gate de recursos
limpio. Servidor preexistente conservado.

## Adopción y límites

Web y Shopify regenerados. Adoptar CSS/tokens compatibles en copias consumidoras;
la actualización no es automática. La vista de Studio usa el runtime ya existente.
Sin subida de tema, `site/dist`, Figma ni cambio de madurez. Solo Chromium; sin
Safari/Firefox/lector de pantalla, persistencia comercial real, inventario ni
certificación completa Shopify. Continúa la base Web con Rating y Loading Skeleton.
