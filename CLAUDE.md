# CLAUDE.md — Instrucciones para Claude Code

Este archivo le dice a Claude Code cómo trabajar en este proyecto. Leelo antes de cualquier tarea.

## Qué es esto

**Entre Nosotros** (nombre provisorio) es una aplicación web para ayudar a familiares y parejas (padres e hijos adultos, parejas, hermanos) a tener conversaciones difíciles e importantes. La IA actúa como un **coach privado de cada participante**, nunca como un moderador visible en la conversación compartida.

La definición completa está en `PRD.md`, los bocetos de las pantallas en `BOCETOS.md` (+ `bocetos.html` como referencia visual), y el texto de privacidad/consentimiento en `PRIVACIDAD.md`. **Leé los cuatro antes de empezar.**

## Regla de oro

- El alcance del MVP es **exactamente** la lista cerrada de funcionalidades de la Sección 8 del PRD (F1-F11). Nada más.
- Todo lo de la Sección 9 del PRD ("Fuera de alcance") está **prohibido** para el MVP. Si algo parece útil pero está fuera de alcance, anotalo como sugerencia, no lo construyas.
- **No inventes nada fuera de lo que dice el PRD.** Ante una duda de producto, preguntá; no completes con suposiciones.
- Usá **arquitecturas simples, conocidas y bien soportadas**. Nada experimental ni "ingenioso". Lo aburrido y probado gana.
- Ante una decisión grande de arquitectura, **explicásela a Santiago en lenguaje simple y esperá su OK** antes de avanzar.

## Cómo es Santiago y cómo comunicarte

- Santiago **no es programador**. Explicá en castellano simple, sin jerga (o traduciéndola).
- De toda la parte técnica (arquitectura, base de datos, framework, hosting, datos) **te ocupás vos**. No le pidas decisiones técnicas; cuando haya opciones, dale una recomendación clara y el porqué.
- Lo que **sí hace Santiago** (avisale claramente cuando toque): crear cuentas, ingresar contraseñas o datos de pago, y apretar botones irreversibles. Por seguridad, eso lo hace él, no vos.

## Primer entregable: el diseño técnico

Antes de escribir código, **proponé el diseño técnico en lenguaje simple y esperá el OK**:
- Qué stack (lenguaje/framework) y por qué, en una frase entendible.
- Cómo se va a guardar la información (modelo de datos) explicado en criollo: qué es una sesión, un participante, un mensaje, una invitación, un resumen.
- Dónde va a vivir la app (hosting) y cómo se mandan los emails, priorizando capas gratuitas.
- La estructura de carpetas en una línea.

Esto **no se pre-escribe en estos documentos**: es tu primera propuesta, no un dato de entrada. Santiago lo aprueba y recién ahí empezás a codear.

## Principios de código

- **Simple y reutilizable.** Legible y mantenible por sobre lo "ingenioso".
- **Una sola web responsive, mobile-first.** Sin apps nativas. Fluida en celular y desktop.
- Comentá el código en castellano donde ayude a que Santiago entienda qué hace cada parte.
- Trabajá **funcionalidad por funcionalidad** (F1 → F7). Después de cada una: mostrá lo hecho, explicá en simple, y seguí.

## QA y pruebas (Santiago quiere que te ocupes de esto)

- Escribí pruebas para los flujos principales (crear sesión, invitar/aceptar/declinar, mensajes, cierre, resumen).
- **Pruebas no negociables antes de invitar usuarios reales** (las dos conductas de mayor riesgo):
  1. **Protocolo de crisis (F7):** ante mensajes que simulan ideación suicida, autolesión, abuso o violencia, el coach responde como manda la Sección 7 del PRD (cuidado genérico, ayuda profesional, emergencias si hay peligro; sin números específicos, sin detalles de métodos).
  2. **Límite de privacidad del coach:** la asistencia de IA **nunca** aparece en el hilo compartido ni se filtra a otros participantes, bajo ninguna circunstancia.
- Hacé QA vos mismo (revisá tu propio trabajo, probá casos borde) antes de dar algo por terminado.

## Calidad y accesibilidad

- Accesibilidad mínima: navegable con teclado, foco visible, buen contraste, respeto por "reduce motion".
- Rendimiento: abre y responde rápido en un celular promedio con conexión no ideal.
- Estados de error y vacío: claros, en la voz de la app (qué pasó y cómo seguir), activos, sin jerga y sin disculparse.
- "Listo" significa: anda en celular y desktop, cumple las conductas de seguridad/privacidad donde corresponda, los textos están en español rioplatense, y no hay ningún secreto en el repo.

## Seguridad y datos (no negociable)

Esta app guarda lo más sensible que existe: traumas de gente real. Por lo tanto:

- **Nunca** pongas claves, secretos o contraseñas en el código ni en ningún archivo que se suba al repo. Van en un archivo `.env` que está en `.gitignore` y vive solo en la máquina de Santiago.
- **Nunca** loguees el contenido de los mensajes de las conversaciones.
- Cifrado en tránsito y en reposo. Sin usar datos para entrenamiento.
- Retención: sesiones cerradas se guardan 1 año. Borrado **real** cuando un usuario lo pide (no "borrado lógico" que en realidad conserva todo).
- Mantené un `NOTAS.md` en castellano, en lenguaje simple, explicando la arquitectura y las decisiones, para que Santiago entienda el proyecto. Actualizalo a medida que construís. (Notas sí; secretos nunca.)

## Reglas de comportamiento de la IA dentro de la app

- **El coach es privado por usuario.** La asistencia nunca se muestra en el hilo compartido, y los mensajes asistidos **no se marcan** como tales.
- El coach **lee todo el hilo + el borrador** del usuario para dar buenos consejos, pero siempre en privado.
- **Límites éticos del coach:** ayuda a expresarse con honestidad; se niega a ayudar a manipular, mentir, ocultar estratégicamente o "ganar" la discusión, y lo dice con franqueza si detecta esa intención.
- **La IA describe, no interpreta.** En resúmenes y reflexiones, ordena y condensa lo que se dijo literalmente; **nunca** infiere sentimientos, intenciones ni saca conclusiones. Nada de "lo que en realidad quiere decir es…".
- El resumen final es un **borrador privado** para quien lo pide, con advertencia de que puede tener errores; lo aprueba una persona antes de compartirse; está etiquetado como ayuda falible.
- **Protocolo de crisis (obligatorio):** ante señales de ideación suicida, autolesión, abuso o violencia, el coach responde con calidez, no minimiza, prioriza a la persona, sugiere ayuda profesional y —si hay peligro inmediato— contactar servicios de emergencia locales. Mensaje genérico, sin números específicos, sin detalles de métodos, sin dramatizar.
- El coach **no tiene nombre, avatar ni personalidad de personaje**. Es una herramienta.
- Tono: español rioplatense (de "vos"), cálido pero sobrio, variado y poco repetitivo.
- **Solo adultos (18+).** Declararlo en la bienvenida y en la invitación.

## Glosario (usá siempre los mismos términos)

- **Sesión:** una conversación sobre un tema, con sus participantes.
- **Creador:** quien crea la sesión e invita. Es el único que invita.
- **Participante:** cada persona dentro de una sesión.
- **Coach:** el asistente privado de cada participante.
- **Resumen:** el cierre descriptivo (no interpretativo) opcional.
- **Invitación:** el acceso por link mágico que recibe quien es invitado.

## Idioma

- Interfaz y copys: **español rioplatense** (de "vos"). Para textos de privacidad/consentimiento, usá `PRIVACIDAD.md`.
- Preparar la arquitectura para internacionalización (i18n) a futuro, pero **no traducir** en el MVP.

## Diseño visual

- Mobile-first, minimalista, con aire. Color principal: **burdeos #641C34**, con rosados tenues para calidez. Modo claro/oscuro automático. `bocetos.html` es la referencia de clima; el pulido fino es tuyo, respetando ese espíritu.

## Ritmo de trabajo y cuidado del uso

Santiago dirige y tiene tiempo, pero un plan de uso limitado (Pro). Trabajá así:

- **Plan primero, después construí.** Antes de empezar algo, listá las tareas chicas y hacelas **de a una**, parando después de cada una para que Santiago la vea. No te lances a una corrida larguísima de muchos pasos sin checkpoints.
- **Tareas chicas y verificables.** Cada tarea tiene que producir algo que se pueda mirar o probar (una pantalla, un comportamiento). Si algo es grande, dividilo y hacé solo el primer paso.
- **Commit entre tareas.** Guardá una versión después de cada tarea que funcione, con un mensaje claro. Es la red de seguridad para volver atrás.
- **Cuidá el uso (importante):** sé conciso en tus explicaciones (Santiago no necesita ensayos), no rehagas de más (si algo está cerca, hacé el arreglo chico, no un rewrite) y no repitas trabajo. Preferí pasos cortos y claros a corridas largas.
- **Bitácora en `NOTAS.md` (REGLA FIJA — hacelo solo, sin que Santiago te lo pida):** al final de cada sesión de trabajo, guardá todo (commit) y **actualizá `NOTAS.md`** con dónde quedaron y cuál es el próximo paso. Santiago no se va a acordar de pedírtelo, así que es tu responsabilidad hacerlo siempre. Así, la próxima sesión retoma sin re-explicar (y sin gastar uso de más).
- **Pará y preguntá** ante dudas de producto o decisiones grandes, en vez de adivinar y tener que rehacer.
- Mejor tardar más días y que quede bien, que apurar y romper.

## Flujo de trabajo

1. Proponé el diseño técnico (arriba) y esperá el OK.
2. Configurá el proyecto base + `.env` en `.gitignore` + `NOTAS.md` inicial + Git local.
3. Implementá las funcionalidades P0 en orden (F1 → F7), una por una, mostrando y explicando.
4. Antes de invitar usuarios reales, corré las pruebas no negociables (crisis + privacidad del coach).
5. Avisá a Santiago cada vez que tenga que crear una cuenta, poner una contraseña/pago o apretar un botón irreversible.
6. **Al terminar cada sesión, por tu cuenta (sin que te lo pidan):** guardá (commit) y actualizá `NOTAS.md` con dónde quedaron y el próximo paso.
