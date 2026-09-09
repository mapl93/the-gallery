# Checkpoint: Rating y Loading Skeleton

Fecha: 2026-09-09. Decisión: ADR 0316. Continúa el punto 5 de la auditoría.

## Resultado

Nueve decisiones de fuente incorporan las separaciones y tamaño grande de Rating,
y las medidas Text/Title/Button y duración de Skeleton. Se reutilizan Body weight
y linear easing. Contrato, registro, CSS, Studio y referencia Exhibit coinciden:
Rating tiene diez roles públicos y Skeleton trece. Se preservan valores y unidades.

Skeleton mantiene sus tres ciclos, máximo de 4,5 segundos y presentación estática
con movimiento reducido o colores forzados. El editor permite pedir otra duración,
pero Web acota cada ciclo a 0–1500ms según el contrato existente. Este límite no
es un presupuesto global. Studio reinicia una sola vista decorativa al editar;
no incorpora temporizadores ni bucles al componente o al runtime.

Rating sigue siendo una proyección pasiva con valor y etiqueta suministrados por
el consumidor. La media estrella, los cinco glifos y las formas vacías se conservan.
Default/Circle y ciclo de carga de Skeleton siguen siendo responsabilidad del
consumidor. Ambos contratos permanecen `pilot`.

## Evidencia

- Chromium: 64 comparaciones antes/después de ocho presentaciones en anchos
  390/768/1280/1600, Light/Dark. Sin cambios imprevistos de medidas, tipografía,
  color, gradiente, radio o duración. La función lineal mantiene su equivalencia
  usando el alias existente `cubic-bezier(0,0,1,1)`.
- Veinte mediciones de Studio: separaciones, tamaños, peso, medidas relativas,
  ancho/alto, easing, duración, preferencias y reset. `2em` son 30px con el texto
  de 15px del consumidor Studio; no se supone una base universal de 16px.
- Web Animations API en consumidor instalado: solicitudes de 500/9000/-100ms
  producen duraciones totales de 1500/4500/0ms. El caso predeterminado termina
  realmente, queda `finished` y no deja animaciones activas después de 4500ms.
- Reduced motion y forced colors eliminan animación y gradiente. Rating mantiene
  glifos llenos, contornos y superposición de media estrella; colores del sistema
  conservan la distinción por forma.
- Rating expone un nombre por imagen, oculta sus estrellas y no introduce foco.
  Falta de etiqueta requerida elimina la raíz en Studio. Review y Review Summary
  heredan la separación personalizada y conservan sus imágenes nombradas a 390px.
- Consumidor CLI sin módulos JS de estos componentes: las seis formas permanecen
  decorativas. Una petición simulada propiedad de la fixture sustituye el contenido,
  limpia `aria-busy` y actualiza un único Status externo.
- Ambas referencias Exhibit muestran los roles nuevos. Capturas de consumidor y
  Studio revisadas. Reset visual devuelve 1500ms en el siguiente frame; una primera
  captura demasiado temprana mostró el valor anterior, sin defecto persistente.
- Validaciones de fuentes/ocho matrices, 1608 comparaciones legacy, 570 rutas de
  catálogo/4560 comparaciones, 464 referencias CSS públicas, contratos, Studio,
  docs, decisiones, TypeScript y adapters Web/Shopify: correctas. Auditoría
  estructural: 182 pasan, sin drift ni gaps; no implica aprobación humana.

Evidencia local ignorada: `output/playwright/rating-skeleton-customization/`.
Los ensayos corregidos fijan preferencias iniciales, usan el index.html explícito
de Vite y clases BEM completas en la fixture; los resultados citados son los finales.
Fixture servida retirada; navegador cerrado; gate de recursos limpio. Se preservó
el servidor local preexistente del usuario.

## Límites y adopción

No se verificaron Safari, Firefox ni lectores de pantalla reales. La fixture de
carga no certifica una petición Shopify, tiempos de red o reserva exacta de layout.
Tokens arbitrarios del consumidor pueden cambiar legibilidad o geometría.
Se regeneraron Web/Shopify; no se subió un tema remoto ni se actualizaron copias
existentes. Sin cambios en `site/dist`, formatos, publicación de paquetes o Figma.
Continuar con las primitivas restantes y después sus composiciones comerciales.
