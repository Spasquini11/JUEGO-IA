# PRD — Conversaciones Asistidas por IA (nombre provisorio: "Entre Nosotros")

**Versión:** 0.2 (MVP) · **Fecha:** Junio 2026 · **Estado:** Definición cerrada, lista para diseño técnico
**Producto:** Santiago · **Redactado con:** Claude

> Cambios v0.1 → v0.2: se resolvieron las 20 decisiones de producto pendientes (ver Sección 11), se agregó la regla "la IA describe, no interpreta" para los resúmenes (6.5 y 7), se sumó la sección de Seguridad y manejo de datos (14), y se actualizaron plazos (auto-cierre 7 días, retención 1 año).

---

## 1. Visión

Ayudar a las personas a tener las conversaciones importantes que vienen postergando — con sus padres, hijos, parejas o hermanos — usando IA como facilitadora silenciosa, nunca como protagonista.

No es un juego, no es una red social, no es terapia. Es un espacio dedicado e intencional donde una conversación difícil puede ocurrir a su propio ritmo, con ayuda privada para expresarse mejor.

## 2. Problema

Las conversaciones más importantes de la vida (dinero, traumas familiares, decisiones de vida, conflictos pendientes, historia familiar) no ocurren, o salen mal, por tres razones:

1. **No hay espacio:** WhatsApp mezcla lo trascendente con memes y logística. Cara a cara, las emociones desbordan.
2. **No hay habilidad:** la gente no sabe cómo empezar, cómo preguntar sin atacar, cómo responder sin defenderse.
3. **No hay ritmo adecuado:** estas conversaciones necesitan tiempo para pensar; la inmediatez del chat o de la charla en vivo lo impide.

## 3. Hipótesis a validar

> **H1 (central):** Si le damos a las personas un espacio dedicado + un tema explícito + un coach privado de IA, van a tener conversaciones que de otro modo no tendrían (o tendrían peor).

Hipótesis secundarias:

- **H2:** El coach privado (ayuda a redactar, suavizar, profundizar) es el diferenciador frente a WhatsApp; sin él, el producto es solo otro chat.
- **H3:** La asincronía sin presión (días o semanas) es una ventaja, no un problema, para este tipo de conversación.
- **H4:** El invitado acepta participar si la invitación es transparente, sin fricción y le permite co-apropiarse del objetivo.

**Criterio de validación del MVP:** de ~5-10 sesiones reales con conocidos cercanos, al menos la mitad llega a 3+ intercambios por participante, y los participantes reportan cualitativamente que la conversación "valió la pena" o que "no habría ocurrido sin esto".

## 4. Público objetivo (MVP)

- Padres e hijos **adultos**, parejas, hermanos, familias.
- **Solo mayores de 18 años.** Los menores quedan explícitamente fuera del MVP por razones legales y de seguridad (ver Riesgo R7).
- Idioma: **español rioplatense** (de "vos"), tono cálido pero sobrio. Mercado inicial: Argentina. Arquitectura preparada para i18n, sin traducir todavía.
- Primeros usuarios: 5-10 conocidos cercanos de Santiago, invitados a mano.

## 5. Principios de producto

1. **La IA nunca domina.** Es opcional, invisible para los demás, sin nombre ni avatar, y su éxito es que la conversación fluya sin ella.
2. **Sin métricas de vanidad.** No hay puntos, rachas, rankings ni "ganadores". El éxito se mide en conexión, profundidad, comprensión mutua, vulnerabilidad y continuidad.
3. **Lento es bueno.** El producto no apura. Las notificaciones informan, no presionan.
4. **Consentimiento simétrico.** Nadie entra a una conversación emboscado; el invitado ve el tema antes de aceptar y puede proponer ajustes al objetivo.
5. **Privacidad primero.** El contenido es de lo más sensible que existe. Mínima retención, mínimo acceso, máxima claridad sobre qué ve quién.
6. **La IA describe, no interpreta.** En resúmenes y reflexiones, la IA ordena y condensa lo que se dijo literalmente; nunca infiere sentimientos, intenciones ni saca conclusiones por las personas.

## 6. Concepto y flujo principal

### 6.1 Creación de sesión

1. El creador define un **tema** (título corto) y una **descripción/objetivo** libre.
2. La IA ofrece (opcional) ayudar a clarificar el objetivo: lo reformula, sugiere enfoques, detecta si el framing puede sonar acusatorio y propone alternativas. El creador siempre decide el texto final.
3. El creador agrega entre 1 y 4 invitados (sesiones de 2 a 5 personas en total), con nombre y email.
4. **Solo el creador puede invitar participantes.** Los demás participan, pero no suman gente.
5. El creador **puede editar el objetivo después de que otros aceptaron**, con aviso a todos los participantes y registro del cambio (no es una guerra: es para aclarar, no para cambiar las reglas a escondidas).
6. **Límite:** máximo 20 sesiones activas por usuario.

### 6.2 Invitación, aceptación y reinvitación

1. Cada invitado recibe un email con: quién lo invita, el tema, el objetivo, y qué es la plataforma (una frase).
2. El invitado accede por **link mágico** (sin contraseña, sin crear cuenta tradicional). Solo confirma su nombre.
3. Antes de entrar puede: **aceptar**, **proponer un ajuste al objetivo** (mensaje al creador), o **declinar** (con mensaje opcional). Declinar es un camino de primera clase, no un caso de error.
4. La sesión se activa cuando al menos un invitado acepta.
5. **Si la sesión es de 2 personas y el único invitado declina**, la sesión queda en estado "no iniciada". El creador puede invitar a otra persona, o archivarla.
6. **Reinvitación:** el creador puede reinvitar a quien declinó **una sola vez, y recién después de 14 días**, para que nunca se sienta insistencia. Si esa persona declina de nuevo, ahí queda (decisión final).

### 6.3 La conversación

1. Hilo **asíncrono y libre** de mensajes de texto, tipo conversación (no tipo chat instantáneo): sin indicadores de "escribiendo", sin "visto", sin contadores. Esto reduce presión.
2. **Apertura guiada (opcional):** al activarse la sesión, la IA propone al creador 2-3 preguntas de apertura posibles; el creador elige, edita o ignora. Es el único "andamiaje"; la conversación en sí es libre.
3. Cada participante escribe cuando quiere. Sin límite de tiempo. La conversación puede durar horas, días o semanas.
4. Notificación por email cuando hay un mensaje nuevo (agrupada: máximo 1 email por sesión por día) + un indicador simple dentro de la app ("tenés algo nuevo"). Sin notificaciones push nativas en el MVP.
5. **Nudge suave:** si una sesión activa lleva 7 días sin actividad, la IA puede sugerir (solo al participante que "debe" responder, en privado) una forma de retomar. Nunca más de un nudge por semana. Desactivable.
6. **Inactividad prolongada:** a los 30 días sin actividad, la app sugiere archivar la sesión. Nunca se archiva ni borra sola sin que alguien lo pida.

### 6.4 El coach privado (corazón del producto)

Cada participante tiene un asistente **estrictamente privado**. Nadie más ve que existe ni qué se conversa ahí. El coach **puede leer todo el hilo de la conversación** (lo que todos escribieron) además del borrador del usuario, porque eso es lo que lo hace útil — pero esa asistencia es siempre privada. Acciones:

- **Ayudame a responder:** dado el hilo y un borrador (o nada), propone caminos de respuesta.
- **Reformular:** suavizar un mensaje, volverlo más directo, quitarle tono acusatorio, convertir reproches en pedidos.
- **Profundizar:** sugiere preguntas para explorar lo que el otro dijo.
- **Entender:** ayuda a interpretar qué *podría* estar sintiendo/queriendo decir el otro, siempre con humildad ("podría ser que…"), nunca como diagnóstico ni afirmación.
- **Detectar temas:** señala hilos sueltos o temas que aparecieron y no se exploraron.

Reglas del coach:

- Los mensajes asistidos **no se marcan** públicamente (decisión tomada). Contrapeso obligatorio: el coach tiene **límites éticos explícitos** — ayuda a expresar con honestidad, y se niega a ayudar a manipular, mentir, ocultar estratégicamente o "ganar" la discusión. Si detecta esa intención, lo dice con franqueza y redirige.
- Sin nombre, sin avatar, sin personalidad de personaje. Es una herramienta, no un participante.
- Tono natural, variado, poco repetitivo. Nunca usa la misma plantilla dos veces seguidas.
- El coach jamás escribe ni publica por el usuario; siempre entrega texto que el usuario copia/edita/publica.

### 6.5 Cierre y resumen

1. Cualquier participante puede **proponer el cierre**. La sesión se cierra cuando todos los participantes activos confirman, o **tras 7 días sin objeción**.
2. Al cerrar, la IA ofrece generar un **resumen opcional**. El resumen es **descriptivo, no interpretativo**: ordena y condensa lo que se dijo literalmente (de qué se habló, qué quedó pendiente, qué planteó cada uno), pero **nunca infiere sentimientos, intenciones ni saca conclusiones** ("nunca dice: lo que tu mamá en realidad quiere decir es…"). Leer la mente es lo que puede fallar, así que no se hace.
3. Candados del resumen: (a) antes de mostrarse a todos es un **borrador privado** para quien lo pide, con la advertencia "esto es un borrador, puede tener errores, revisalo antes de compartir"; (b) lo **aprueba una persona**, no se publica solo; (c) está **etiquetado como ayuda falible**. El resumen es el mismo para todos (no personalizado) para evitar relatos divergentes.
4. La sesión cerrada queda accesible en modo lectura para sus participantes.
5. (Diferido, no MVP) El mismo mecanismo permite un resumen "¿dónde estamos?" a mitad de conversación; se construye con la misma lógica de "describe, no interpreta", así que sumarlo después no requiere rediseño.

## 7. Rol y límites de la IA — comportamiento ante contenido sensible

Esto es **parte del MVP, no un extra**. Las sesiones tocarán traumas, abuso, duelo, conflictos graves.

- Si un participante menciona ideación suicida, autolesión, abuso en curso o violencia, el coach: (a) responde con calidez y sin minimizar, (b) deja de "facilitar la conversación" y prioriza a la persona, (c) sugiere **buscar ayuda profesional** y, si hay peligro inmediato, **contactar los servicios de emergencia locales** — mensaje de cuidado **genérico**, sin números de línea específicos (lo mínimo indispensable que debe estar), (d) no profundiza en detalles de métodos ni dramatiza.
- La IA nunca diagnostica ("tu padre es narcisista", "tenés depresión"). Describe comportamientos, no etiqueta personas.
- La IA nunca toma partido entre participantes (aunque solo hable con uno, no demoniza al otro).
- Disclaimer claro y visible al crear sesión y en la bienvenida: *esto no es terapia ni la reemplaza*.

## 8. Funcionalidades del MVP (lista cerrada)

| # | Funcionalidad | Prioridad |
|---|--------------|-----------|
| F1 | Crear sesión: tema + descripción + refinado opcional con IA; máx. 20 activas/usuario | P0 |
| F2 | Invitar por email con link mágico; aceptar / proponer ajuste / declinar; reinvitación 1 vez tras 14 días | P0 |
| F3 | Hilo asíncrono y libre de mensajes de texto (2-5 participantes), sin indicadores de presión | P0 |
| F4 | Coach privado: responder, reformular, profundizar, entender, detectar temas (lee el hilo, siempre privado) | P0 |
| F5 | Notificación por email (agrupada, 1/día máx.) + indicador in-app de novedad | P0 |
| F6 | Cierre por propuesta + confirmación (o 7 días sin objeción); resumen final opcional, descriptivo-no-interpretativo | P0 |
| F7 | Protocolo de contenido sensible (genérico) + disclaimers | P0 |
| F8 | Apertura guiada (preguntas de inicio sugeridas al creador) | P1 |
| F9 | Nudge suave tras 7 días de inactividad | P1 |
| F10 | Vista "mis sesiones" (lista simple: activas / cerradas); sugerir archivar a los 30 días de inactividad | P1 |
| F11 | Bienvenida/consentimiento mínimo; modo claro/oscuro automático; borrado real a pedido | P1 |

**Responsive:** mobile-first (la mayoría responde desde el celular), funcional en desktop. Una sola web, sin apps nativas.

### 8.1 Calidad y accesibilidad (aplica a todo el MVP)

- **Accesibilidad mínima:** navegable con teclado, foco visible, buen contraste de color (el burdeos sobre fondo claro cumple) y respeto por "reduce motion" para quien tenga las animaciones desactivadas.
- **Rendimiento:** tiene que abrir y responder rápido en un celular promedio y con conexión no ideal. Simple y liviano.
- **Estados de error y vacío:** mensajes claros, en la voz de la app (qué pasó y cómo seguir), nunca en jerga técnica ni disculpándose.
- **Pruebas obligatorias antes de invitar gente real:** el protocolo de contenido sensible (F7) y el límite de privacidad del coach (que la asistencia nunca aparezca en el hilo compartido) tienen que estar testeados. Son las dos conductas de mayor riesgo del producto.

## 9. Fuera de alcance del MVP (explícito)

Monetización, gamificación, perfiles complejos, sistema social, rankings, recomendaciones públicas, audio/notas de voz, apps nativas, multiidioma, menores de edad, plantillas de temas curadas, intervención pública de la IA en el hilo, resumen a mitad de sesión, exportar la conversación (PDF/recuerdo), integración con WhatsApp, moderación humana, analytics avanzados, notificaciones push nativas.

## 10. Riesgos y mitigaciones

| # | Riesgo | Impacto | Mitigación MVP |
|---|--------|---------|----------------|
| R1 | Contenido de crisis (suicidio, abuso, violencia) sin manejo adecuado | Crítico | F7: protocolo del coach (genérico) + sugerir ayuda profesional/emergencias + disclaimers. Probarlo con casos simulados antes del lanzamiento. |
| R2 | Fuga o mal manejo de datos hipersensibles | Crítico | Ver Sección 14. Claves en `.env` nunca compartido; cifrado en tránsito y reposo; sin uso de datos para entrenamiento; no loguear contenido de mensajes; borrado real a pedido. |
| R3 | El invitado se siente emboscado y no entra | Alto (mata H4) | Flujo de invitación transparente; declinar y proponer ajustes como caminos de primera clase; la IA ayuda al creador a no escribir objetivos acusatorios. |
| R4 | Uso del coach para manipular (agravado por no marcar mensajes asistidos) | Alto | Límites éticos explícitos del coach; se niega y lo explica. Revisar esta decisión si aparecen señales en la validación. |
| R5 | Las conversaciones mueren (asincronía sin gamificación) | Alto (mata H3) | F9 nudges suaves; F8 apertura guiada; medir dónde mueren los hilos. |
| R6 | El producto no se diferencia de WhatsApp | Alto (mata H2) | El coach privado + espacio intencional son la apuesta. Validar preguntando explícitamente a los testers. |
| R7 | Participación de menores | Crítico (legal) | Solo 18+, declarado en términos y en el flujo de invitación. Caso "padres-hijos adolescentes" recién post-MVP y con asesoría legal. |
| R8 | La IA suena repetitiva/robótica y la gente la abandona | Medio | Variar plantillas de prompts, tono cálido, pocas palabras; testear con usuarios reales temprano. |
| R9 | La IA "pifia" una interpretación en el resumen | Medio | Regla "describe, no interpreta" (6.5); borrador privado + aprobación humana + etiqueta de falibilidad. |
| R10 | Costo de API si el coach se usa mucho | Bajo (escala chica) | Con 10 usuarios es irrelevante; priorizar capas gratuitas; monitorear igual. |

## 11. Decisiones tomadas

| # | Decisión | Resolución |
|---|----------|-----------|
| 1 | Nombre del producto | "Entre Nosotros" (provisorio); definitivo antes de comprar dominio. |
| 2 | Tono | Español rioplatense (de "vos"), cálido pero sobrio. |
| 3 | Identidad del coach | Sin nombre, sin avatar, sin personalidad de personaje. |
| 4 | Rol de la IA en la conversación | Solo coach privado de cada participante. Sin intervención visible en el hilo. |
| 5 | Marcado de mensajes asistidos | No se marcan. Compensado con límites éticos del coach (R4). |
| 6 | Editar objetivo tras aceptación | Permitido, con aviso a todos y registro del cambio. |
| 7 | Quién invita | Solo el creador. |
| 8 | Invitado declina (sesión de 2) | Queda "no iniciada"; el creador invita a otro o archiva. |
| 9 | Reinvitación | 1 sola vez, tras 14 días. Si declina de nuevo, final. |
| 10 | Estructura de la conversación | Libre; apertura guiada opcional como único andamiaje. |
| 11 | Límite de sesiones | Máx. 20 activas por usuario. |
| 12 | Acceso del coach al hilo | Sí, lee todo el hilo + borrador; siempre privado. |
| 13 | Recursos de crisis | Genéricos: cuidado + ayuda profesional + emergencias locales; sin números específicos. |
| 14 | Auto-cierre | 7 días sin objeción tras propuesta de cierre. |
| 15 | Inactividad | Sugerir archivar a los 30 días; nunca borrar sin pedido. |
| 16 | Retención de sesiones cerradas | 1 año. |
| 17 | Resumen | Solo al cierre en el MVP; descriptivo, no interpretativo; borrador privado + aprobación humana. |
| 18 | Exportar conversación | Después del MVP. |
| 19 | Bienvenida/consentimiento | Sí, una pantalla simple. |
| 20 | Modo oscuro | Sí, claro/oscuro automático según el dispositivo. |
| 21 | Notificaciones | Email agrupado (1/día) + indicador in-app. Sin push nativo. |
| 22 | Autenticación | Links mágicos por email, sin contraseñas. |
| 23 | Modalidad | Solo texto. |
| 24 | Edad | Solo adultos (18+). |
| 25 | Costos | Priorizar capas gratuitas; revisar tras el MVP. |
| 26 | Manejo de claves | `.env` nunca compartido + gestor de contraseñas para cuentas (Sección 14). |

## 12. Decisiones abiertas (resolver más adelante)

1. Nombre definitivo del producto y dominio.
2. Resumen a mitad de sesión (diferido; diseño ya resuelto, solo falta sumarlo).
3. ¿Retención de sesiones cerradas más allá de 1 año? (revisar con uso real).
4. Modelo y proveedor de IA, y política exacta de datos con el proveedor (se define en el diseño técnico — lo decide Claude con Santiago).
5. Plazo final de reinvitación (hoy 14 días; revisar si en la práctica se siente bien).

## 13. Métricas (cualitativas primero)

Brújula central: **"¿Te ayudé o no?"**. Para volverla contestable, en 5-10 sesiones de validación se mide a mano:

- **Activación:** % de invitados que aceptan y publican al menos 1 mensaje.
- **Continuidad:** sesiones que llegan a 3+ intercambios por participante; tiempo entre mensajes; dónde mueren los hilos.
- **Uso del coach:** % de mensajes donde se usó; qué acción se usa más (reformular vs. responder vs. profundizar).
- **Profundidad/conexión (cualitativo):** entrevista corta post-sesión a cada participante:
  - ¿Llegaron a algo? (una decisión, un entendimiento, un "no sabía que sentías eso").
  - ¿Lo volverían a hacer para otro tema?
  - ¿Se lo recomendarían a alguien? (la prueba más honesta).
  - ¿Quedaron un poco más tranquilos o aliviados que antes?
- **Cierre:** % de sesiones que llegan a cierre formal + resumen.

Sin dashboards en el MVP: una planilla manual alcanza.

## 14. Seguridad y manejo de datos

Esta app guarda lo más sensible que existe (traumas de gente real). Reglas no negociables:

- **Claves y secretos** (de IA, base de datos, email) van en un archivo `.env` que vive solo en la máquina de Santiago y **nunca se comparte ni se sube a internet** (`.gitignore`). Jamás en el código ni en un documento.
- **Contraseñas de cuentas** (hosting, email, IA) van en un **gestor de contraseñas** (no en un readme ni en notas de texto).
- **Notas de arquitectura** en lenguaje simple sí pueden ir en un `NOTAS.md` local, en castellano, mantenido por Claude Code, para que Santiago entienda qué está pasando. (Notas sí; secretos no.)
- **No loguear el contenido de los mensajes.** Cifrado en tránsito y reposo.
- **Sin uso de datos para entrenamiento.**
- **Retención:** sesiones cerradas se guardan 1 año. Cualquier participante puede pedir el borrado real de sus mensajes; el creador puede borrar la sesión entera con aviso.
- Cualquier acción que requiera crear cuentas, ingresar contraseñas/pagos o apretar botones irreversibles **la hace Santiago**, no la IA.

## 15. Fases

- **Fase 0 — PRD y diseño (estamos cerrándola):** definición cerrada (este documento) + bocetos simples de las 4 pantallas (crear / invitar-aceptar / conversar+coach / cerrar).
- **Fase 1 — Construcción del MVP:** F1-F7 (P0), con Claude Code en VS Code, trabajando sobre este PRD.
- **Fase 2 — P1 y pulido:** F8-F11, protocolo de crisis testeado, copys revisados.
- **Fase 3 — Validación:** 5-10 sesiones reales, entrevistas, planilla de métricas.
- **Fase 4 — Decidir:** iterar, pivotar o ampliar según H1-H4.

## 16. Apéndice — Qué más hay que ver (además del PRD)

Documentos: este `PRD.md`, el `CLAUDE.md` (instrucciones para Claude Code), un texto corto de privacidad para los testers, y (opcional) bocetos de las 4 pantallas.

Cuentas que Santiago tendrá que crear (guiado, cuando haga falta): proveedor de IA, hosting (plan gratis), envío de emails (plan gratis), dominio (más adelante). Todas las contraseñas al gestor.

En la compu (Claude Code ayuda a instalar): VS Code, Node.js, extensión de Claude Code, Git.

Antes de invitar gente real: probar el protocolo de seguridad con mensajes inventados, y definir cómo invitar a los 5-10 testers y cómo recoger su feedback.
