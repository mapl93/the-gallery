# Checkpoint: Collection Grid

Fecha: 2026-09-09. ADR 0346. Continúa el punto 5.

## Resultado

Las cuatro densidades se editan mediante tokens, como pidió el propietario.
Cuatro roles fuente y tres alias nuevos completan siete valores públicos,
incluidos gap y padding. Se conserva `--grid-columns` para escritorio y se
corrige su referencia: antes heredaba las doce columnas de la cuadrícula general;
ahora recibe las cuatro del componente. La cuadrícula general permanece en doce.

Las consultas de contenedor solo cambian el valor activo de una fórmula común.
Se elimina la propiedad semántica `columns`; los atributos antiguos 2–6 conservan
su precedencia y los overrides heredados/locales de `--grid-columns` funcionan.
Studio expone los cuatro tokens y ya no anula los paddings con CSS de presentación.
El ejemplo MDX anterior recupera Price, obligatorio en Product Card.

Shopify conserva el ID, opciones y elección guardada de su setting `columns`;
la asigna al token público. No se subió el tema ni se añadieron controles remotos.
Las copias existentes requieren adopción explícita del nuevo contrato 0.3.0.

## Validación

- 1780 comparaciones de elementos, con ocho Product Cards completas, conservan
  geometría, paleta y tipografía del override habitual de cuatro columnas a
  320/600/900/1200/1600px en claro/oscuro, sin overflow de la lista.
- Sin override, se reproduce doce antes/cuatro después en ancho grande. Es la
  corrección deliberada del default, no una afirmación de paridad universal.
- Atributos 2–6 mantienen prioridad incluso frente a un token de ocho;
  overrides locales/heredados de cinco conservan el resultado anterior.
- Los cuatro tokens producen 2/3/4/5 columnas independientemente por banda.
  Padding 32px/16px y gap 20px responden. CSS resuelve cero/negativos a uno,
  2.4 a dos, 2.5 a tres y permite ocho: no se impone un techo neutral de seis.
- ul/li, Price por tarjeta, orden de tabulación del primer producto, dirección
  RTL y lista vacía pasan. Capturas revisadas. No se certificó aquí Quick Look
  ni el comportamiento completo de Product Card nuevamente.
- Studio prueba cuatro controles de tokens, padding/gap reales, reset y
  referencia Exhibit. Su slot requerido sigue fijo: el primer intento de prueba
  quiso desactivarlo y se corrigió el harness, no el contrato. El caso de lista
  vacía se verifica en el consumidor.
- Fuente, catálogo 974 rutas/7792 comparaciones, TypeScript, contratos, Studio,
  docs, consumidor CLI y adapters pasan. Auditorías conservan la madurez.
- Shopify CLI 3.92.1 Theme Check no encuentra incidencias en los archivos
  modificados. El tema completo no pasa: tres MissingTemplate preexistentes
  en `_legacy/{artist-story,editorial-media,collection-grid}.liquid` por el antiguo
  snippet `button`, más 55 advertencias. El validador del plugin no pudo iniciar
  por falta de `@shopify/theme-check-common`; no se instalaron dependencias.

Evidencia ignorada: `output/playwright/collection-grid-values/`. Fixture retirada.
Cada fase usó una sesión/pestaña, con limpieza en `finally`; después del cierre,
el gate y la inspección de procesos no encuentran navegador de pruebas. Chrome
personal y servidor preexistente se conservan. La inspección actual no reconstruye
las más de 90 instancias anteriores reportadas por el propietario.

## Límites

Chromium local; sin Safari/Firefox, lector de pantalla, Theme Editor remoto ni
regresión visual completa de Featured Collection. La composición que omite el
override también adopta el default corregido. Sigue pilot. Sin site/dist,
publicación, despliegue ni Figma. Continúa Filter Panel y Pagination.
