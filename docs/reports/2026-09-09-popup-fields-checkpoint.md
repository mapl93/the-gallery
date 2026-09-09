# Checkpoint: Combobox y Date Picker

Fecha: 2026-09-09. Respaldo previo: `d692086`, subido a GitHub antes de editar.

## Resultado

ADR 0307 añade 39 decisiones públicas: 14 para Combobox y 25 para Date Picker.
Contratos, registro y controles Studio/Exhibit consumen esas fuentes junto con
roles compartidos existentes. El propietario eligió quitar la lupa exclusiva de
Studio, conservando el componente canónico sin un nuevo slot de icono.

Se corrigieron medidas impuestas por el sitio y la prioridad de ancho de
`.field__control`: su ancho completo es ahora un fallback de baja especificidad;
un campo puede mantener su ancho propio. Se compone Field Wrapper sin sumar el
gap del fixture. Date Picker obtiene tamaño canónico de iconos de navegación.

El enhancer Combobox y Studio ignoran Enter/flechas durante composición IME.
Los elementos filtrados permanecen ocultos aunque las opciones usan flex.
Seleccionar fecha en Studio devuelve el foco al campo y readonly impide abrir el
calendario. Son correcciones de los contratos existentes, no nuevas capacidades.

## Evidencia

- Studio: Combobox y Date Picker en 1200px/Light y 390px/Dark. Overrides de las
  39 decisiones, ancho 280px efectivo, límites de viewport 1160/350px con inset
  de 20px, medidas compactas/normales, teclado, estados, reset y token override
  directo. Los campos conservan 46px por defecto y no desbordan en esos casos.
- Formulario HTML independiente bajo el mismo origen local, con CSS y runtime
  público Web: filtrado oculta realmente las opciones, IME no confirma selección,
  Tab conserva texto libre, 42 días y un tab stop, límites inclusivos, selección
  y Escape devuelven foco, FormData, reset y flechas RTL. Combobox, Date Picker y
  Button miden 46px. Movimiento reducido y colores forzados emulados.
- Catálogo, compilador, contratos, Studio, MDX, TypeScript y adaptadores se validan
  sin promoción automática de madurez. Shopify recibe salidas locales generadas;
  este bloque no se sube al tema alojado.

Evidencia no versionada: `output/playwright/popup-fields-evidence.json`,
`popup-consumer.html` y capturas `popup-*.png`. Se inspeccionaron los popups y la
composición oscura. Las esperas del script respetan el foco programado y la
selección al soltar Enter. El acceso inicial al HTML fuera del root de Vite se
rechazó; se probó el mismo HTML mediante el contexto local, sin cambiar permisos
del servidor. La sesión de evidencia se cerró y pasó `evidence:assert-clean`.

## Límites y adopción

Se descartaron dos tokens propuestos para desplazamiento de popup: con `hidden`
el calendario cerrado no tiene una transformación visible comprobable. El 4px
existente queda documentado como mecánica privada. Tampoco se tokenizan columnas,
semanas, umbrales estructurales ni algoritmos de selección.

No se probó Safari, Firefox, lector de pantalla ni todas las combinaciones de
marca y dimensiones. La prueba HTML usa el runtime público completo; no sustituye
la prueba del instalador selectivo. Las copias existentes deben adoptar juntas
las versiones compatibles de tokens, CSS y JS y revisar overrides locales.
No se reconstruyó `site/dist`, publicó paquete ni cambió ningún contrato a stable.
El siguiente batch continúa con File Upload y Pin Input.
