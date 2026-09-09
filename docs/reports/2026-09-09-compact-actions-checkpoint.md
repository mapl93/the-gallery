# Checkpoint: Button Group, Icon Button y Close Button

Fecha: 2026-09-09. ADR 0320. Continúa el punto 5 de la auditoría.

## Resultado

Icon Button expone 21 roles públicos y Close Button trece. Dieciséis tokens nuevos
representan dimensiones de control/icono, geometría de foco y superficies antes
fijas en CSS; Icon Button incluye grosor/color del borde. Se reutilizan los roles
semánticos existentes. Los tamaños se editan independientemente por preset.

Button Group reutiliza el grosor de Button: la unión deja de estar fija en 1px y
sigue `--border-button-width`. Radio exterior y ancho de borde forman su API
propia; el resto de cada hijo sigue perteneciendo al contrato completo de Button.
No se duplica su catálogo ni se convierten datos de la demostración en tokens.

## Evidencia local

- Chromium: 152 mediciones de raíces (19 por ocho matrices: cuatro anchos
  390/768/1280/1600 y Light/Dark) coinciden con el CSS anterior.
- Consumidor instalado mediante CLI: tres pares de control/icono independientes
  38/18, 52/28 y 64/32px; las dimensiones anteriores del icono se conservan al
  cambiar únicamente el control. No requiere runtime JS propio.
- Uniones LTR/RTL: bordes y solapamientos de 3px; radio exterior de 12px y esquinas
  internas rectas. Un único hijo conserva sus cuatro esquinas. Full distribuye
  342px disponibles entre etiquetas largas sin overflow horizontal.
- Foco nativo y simulado leen ancho 3px/offset 5px. Fondo RGBA 25% y borde
  personalizado responden. Enter y Espacio activan una vez cada uno, disabled no
  activa ni entra en Tab, flechas no capturan navegación, no se envía formulario.
- Reduced motion elimina transiciones. Forced colors conserva contorno sólido
  e icono visible; esto no certifica contraste ni todos los temas del sistema.
- Studio controla tamaños, icono, foco y alfa; reset devuelve 40px/32px. Small y
  Large se editan por separado. Filled + Hover mantiene sus ejes independientes.
  Exhibit incluye las nuevas referencias; capturas de Icon Button y Button Group
  revisadas visualmente.
- Lightbox existente hereda Close Button 44/22px e Icon Button 52/26px; Next image
  cambia al elemento siguiente y Close image viewer cierra la superficie.
- Fuentes, comparación legacy, catálogo (596 rutas/4768 comparaciones), 490
  referencias CSS públicas, contratos, Studio, docs, TypeScript y adapters pasan.
  Auditoría: 182 componentes, cero gaps estructurales/drift. No promoción a stable.

La documentación oficial [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
se verificó el 2026-09-09: tamaño, forma y separación reales condicionan el criterio,
con excepciones explícitas. No se añadió un límite automático al editor de tokens
ni se atribuye conformidad a un diámetro aislado.

Evidencia ignorada en `output/playwright/compact-actions/`. Fixture temporal retirada;
la sesión de navegador se cerró y el gate de recursos está limpio. Se preservó el
servidor preexistente. No se probaron Safari/Firefox, lectores de pantalla reales,
cualquier combinación arbitraria de tokens ni una tienda Shopify remota.

## Adopción y continuidad

Web/Shopify se regeneraron desde fuentes; las copias existentes requieren adopción
explícita. Lightbox conserva sus colores de superficie propios sobre estos átomos.
Bordes diferentes por hijo requieren una política de composición del consumidor.
No hay subida de tema, `site/dist`, Figma ni nuevas plataformas.
Continuar Toggle y FAB; mantener pilot y las responsabilidades semánticas actuales.
