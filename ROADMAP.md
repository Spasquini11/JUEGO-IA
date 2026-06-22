# ROADMAP.md — Las épicas (de maqueta a producto 10/10)

Lista de tareas grandes ("épicas") para llevar **Entre Nosotros** de las pantallas
visuales de hoy a un producto real y excelente. Las hacemos **de a una**, iterando:
construir → mostrar → ajustar → siguiente.

**Alcance:** estas épicas construyen el MVP del PRD (F1–F11) bien hecho. Las ideas
fuera del MVP viven en `IDEAS.md` (no se construyen todavía).

**Convención:** `[ ]` pendiente · `[~]` en curso · `[x]` hecha · 🔑 = necesita que
Santiago cree una cuenta o haga una acción con sus manos.

---

## Ya hecho (base)

- [x] Esqueleto del proyecto (Next.js + TypeScript + Tailwind), secretos protegidos, Git + GitHub.
- [x] Lenguaje visual "siglo 21" + las 6 pantallas estáticas (bienvenida, home, crear,
      invitación, conversación con avatares, cerrar/resumen).

## Fase 1 — Cimientos (que sea una app de verdad)

1. [x] 🔑 **Base de datos (Supabase):** modelo de datos (usuarios, sesiones, participantes,
   invitaciones, mensajes, resúmenes) + reglas de acceso (cada quien ve solo lo suyo).
2. [x] 🔑 **Login por link mágico:** entrar sin contraseña, solo con el email.
3. [x] **F1 real — crear sesión:** guardar en base (tema, objetivo, invitados; máx. 5
   personas y 20 sesiones activas). *(La ayuda de IA para el objetivo llega en la épica 6.)*
4. [x] 🔑 **F2 real — invitaciones por email (Resend):** link mágico al invitado; aceptar /
   proponer ajuste / declinar; reinvitar 1 sola vez tras 14 días.
5. [x] **F3 real — el hilo:** escribir y leer mensajes (2–5 personas), sin indicadores de presión.

## Fase 2 — El corazón (el coach, lo que lo hace único)

> ⏸ **Decisión (pagos al final):** las épicas que usan IA (6, 7, 8, 9, 12 y el resumen de
> la 10) necesitan la cuenta **paga** de Anthropic. Las **diferimos al final**; primero
> hacemos todo lo gratis/técnico. Recién al cierre Santiago crea esa cuenta.

6. [ ] 🔑⏸ **F4 — coach con IA (Claude):** responder, suavizar, más directo, profundizar,
   entender, ver temas; lee el hilo; siempre privado; con límites éticos (no manipular).
   Incluye la ayuda para clarificar el objetivo al crear. *(En pausa: necesita Anthropic.)*
7. [ ] **F7 — contenido sensible:** protocolo de crisis (cuidado + ayuda profesional +
   emergencias genéricas) + disclaimers, integrado en el coach.
8. [ ] **Prueba no negociable — privacidad del coach:** que su ayuda NUNCA aparezca en el
   hilo ni se filtre a otros. Testeada y automatizada.
9. [ ] **Prueba no negociable — crisis:** con mensajes simulados, que el coach responda como manda el PRD.

## Fase 3 — El ciclo completo de una conversación

10. [x] **F6 real — cierre + resumen:** proponer cierre + confirmación (o 7 días sin objeción).
    *(Cierre hecho —gratis—; el resumen con IA queda para el final.)*
11. [~] **F5 — avisos:** indicador in-app de novedad ("Nuevo") **hecho**; el email agrupado
    (máx. 1/día) queda diferido hasta tener un dominio verificado (va con el deploy).
12. [ ] **F8 — apertura guiada:** 2–3 preguntas de inicio sugeridas al creador.
13. [ ] **F9 — nudge suave:** tras 7 días sin actividad, un empujoncito privado y desactivable.
14. [ ] **F10 real — tus conversaciones:** lista con datos reales (activas/cerradas) +
    sugerir archivar a los 30 días.
15. [x] **F11 — borrado real a pedido:** borrar de verdad lo que una persona pide (no fingido).

## Fase 4 — Calidad 10/10 y salir al mundo

16. [ ] **Seguridad a fondo:** cifrado, no loguear contenido de mensajes, revisión de las
    reglas de acceso y de las variables de entorno.
17. [ ] **Pruebas de los flujos principales:** crear, invitar, aceptar/declinar, mensajes, cierre, resumen.
18. [ ] **Accesibilidad y rendimiento:** teclado, foco, contraste, "reduce motion"; que vuele en el celu.
19. [ ] **Pulido fino:** estados de error y vacío con la voz de la app; copys en español rioplatense.
20. [ ] 🔑 **Publicar en internet:** deploy a Vercel (HTTPS), nombre/dominio, y dejar listo
    para invitar a los primeros 5–10 testers.
