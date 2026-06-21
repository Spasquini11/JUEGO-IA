# IDEAS.md — Mejoras, ideas y dudas para más adelante

Acá anoto cosas que van surgiendo y que **no** son parte del paso actual: mejoras
posibles, ideas fuera del alcance del MVP, y dudas para decidir con calma. Nada de esto
frena el trabajo de ahora; es una lista para no perdernos nada.

> Recordatorio: el MVP es la lista cerrada de funcionalidades del PRD (F1–F11). Lo que
> esté "fuera de alcance" queda anotado acá como idea, **no se construye** todavía.

## Decisiones tomadas sobre la marcha

- **(19/06/2026) Nombre del invitado en la Pantalla 2.** El campo "Confirmá tu nombre"
  viene **pre-cargado con el nombre que puso quien invita** (al invitar se carga nombre +
  email de cada persona). El invitado lo confirma o lo corrige; ese es el nombre con el
  que lo ven los demás. No hay "nombre de cuenta" aparte: la identidad es el email (link
  mágico). En la base de datos es un solo campo de texto, sin complicación.

- **(19/06/2026) Dirección visual "siglo 21".** La paleta burdeos/rosado es sobre todo
  para el **logo y la marca**; en la interfaz el burdeos se usa como **acento** (botón
  principal, detalles, títulos puntuales) sobre una base más neutra y limpia. Sumamos
  tipografía moderna (Inter), tarjetas con aire y profundidad sutil, y **un color por
  persona** (avatares) para identificar a cada quien de un vistazo.

## Pendientes acordados (próximos pasos)

- **Pantalla de bienvenida / carga** antes del Home, con un botón para entrar (junta la
  F11 "bienvenida/consentimiento" con la pantalla donde carga la app). *(Hecho — vive
  en `/bienvenida`; cuando haya login, será la puerta automática antes del Home.)*
- **Home "Tus conversaciones"**: lista de conversaciones activas/cerradas + algo lindo.
  *(Hecho en este paso, a validar.)*
- **Diferenciador por persona en la conversación**: avatar con iniciales y color propio
  de cada uno, para ver de un vistazo quién habla. *(Hecho.)*
- **Armonizar** las pantallas ya hechas (1 "crear", 2 "invitación", 4 "cerrar") con el
  nuevo lenguaje visual.

## Ideas y mejoras para revisar más adelante

Propuestas de producto/UX para evaluar (no son del paso actual; respetan el alcance del MVP):

- **Autoguardado de borradores:** que no se pierda lo que estás escribiendo (mensaje u
  objetivo) si cerrás sin querer.
- **Resumen editable antes de compartir:** quien lo aprueba puede ajustar el texto del
  borrador (sigue siendo descriptivo) antes de mandarlo.
- **Señal sutil de "tenés algo nuevo"** por sesión, sin presión (nada de "visto").
- **Identidad de marca real:** un logo simple en vez del wordmark de texto de hoy.
- **Confirmaciones cálidas y reversibles:** al declinar o cerrar, un "deshacer" breve por
  si fue sin querer.
- **Accesibilidad extra:** control de tamaño de texto / alto contraste opcional.

## Dudas abiertas

- (vacío por ahora — se va llenando)
