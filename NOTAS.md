# NOTAS.md — Bitácora del proyecto (en criollo)

Este archivo lo mantiene Claude Code para que Santiago entienda el proyecto sin
tecnicismos. Se actualiza al final de cada sesión de trabajo. **Acá no van secretos nunca.**

## Qué es

**Entre Nosotros** (nombre provisorio): una web para tener conversaciones difíciles e
importantes con familia o pareja, con un *coach* de IA privado para cada persona.
La definición completa está en `PRD.md`.

## Cómo está armado (la arquitectura, en simple)

- **La app:** Next.js (el framework web más usado; un solo lenguaje para todo).
- **Guardar datos + login por link mágico:** Supabase *(todavía sin conectar)*.
- **Emails:** Resend *(todavía sin conectar)*.
- **El coach (IA):** Claude / Anthropic *(todavía sin conectar)*.
- **Hosting:** Vercel *(todavía sin conectar)*.

Por ahora solo está la **base corriendo en tu compu**. Las cuentas externas las vamos a
conectar más adelante; te voy a avisar cuándo te toque crear una cuenta o pegar una clave.

## Estructura de carpetas

- `src/app/` → las pantallas de la app.
- `src/` → el código (componentes, lógica) va adentro de acá.
- `public/` → imágenes y archivos estáticos.
- `*.md` y `bocetos.html` → los documentos del proyecto (PRD, bocetos, privacidad, guía).
- `IDEAS.md` → mejoras, ideas y dudas para más adelante (no frena el trabajo de ahora).
- `ROADMAP.md` → la lista de épicas (tareas grandes) que vamos haciendo de a una.
- `.env.local` → acá van los secretos (todavía **no existe**; lo creamos al conectar cuentas). **Nunca** se sube.
- `.env.example` → plantilla sin secretos que sí se versiona, para saber qué claves hacen falta.

## Seguridad

- Los secretos viven solo en `.env.local` (en tu compu), ignorado por Git.
- Nada de claves en el código ni en estos documentos.

## Estado actual — Sesión 1 (19/06/2026)

**Hecho:**
- Diseño técnico aprobado por Santiago.
- Node actualizado a v24 (lo hizo Santiago a mano).
- Base de la app creada: Next.js + TypeScript + Tailwind + ESLint.
- Dependencias instaladas.
- Secretos protegidos: `.gitignore` reforzado + `.env.example`.
- Git local iniciado.
- **F1 (parte visual):** base de diseño (colores burdeos/rosado, modo claro/oscuro,
  tipografía) + **Pantalla 1 "Nueva conversación"** del boceto, estática y accesible.
  Ya se puede agregar/quitar personas a invitar (1 a 4). Todavía no guarda en base.
- **Pantalla 2 "La invitación"** (estática): lo que ve quien recibe el link —
  tema + objetivo, confirmar nombre, y aceptar / proponer ajuste / declinar.
  Vive en la dirección `/invitacion` (datos de ejemplo por ahora). El campo del
  nombre viene precargado con el que puso quien invita (ver `IDEAS.md`).
- **Pantalla 3 "La conversación + el coach"** (estática): hilo de mensajes de ejemplo
  en burbujas, barra para escribir y el **panel del coach privado** que se abre y
  cierra con el botón "🔒 Coach". Vive en `/conversacion`.
- **Nuevo rumbo visual + Home:** tipografía moderna (Inter), el burdeos como acento
  sobre base más neutra, y el **Home "Tus conversaciones"** en `/` (tarjetas con
  avatares de color por persona, estado activa/cerrada y aviso de novedad). La
  Pantalla 1 "Crear" se movió a `/crear`. Componente `Avatar` reutilizable creado.
- **Conversación con identidad por persona:** cada mensaje de otra persona muestra su
  avatar (color + iniciales) y los propios van a la derecha. Se sumó "‹ Volver".
- **Pantalla de bienvenida** (F11) en `/bienvenida`: qué es, consentimiento en simple
  (sacado de `PRIVACIDAD.md`), aviso de emergencia y botón "Entiendo y quiero entrar".
- **Pantalla 4 "Cerrar y resumen"** en `/cerrar`: estado "propuso cerrar" → al
  confirmar aparece el resumen (borrador, descriptivo–no-interpretativo) con su aviso.
- **Épica 1 — Base de datos (Supabase):** 6 tablas + reglas de privacidad (RLS) creadas;
  la app se conecta OK (chequeo `/api/db-check` devolvió ok, 0 sesiones). El esquema vive
  en `supabase/migrations/0001_init.sql`; las claves, solo en `.env.local` (no se suben).
- **Épica 2 — Login por link mágico:** entrar sin contraseña con el email; Home protegido
  (sin sesión va a `/ingresar`); botón "Salir". Probado de punta a punta por Santiago.
- **Épica 3 — Crear sesión real (F1):** `/crear` guarda en la base (sesión + creador +
  invitados + invitaciones) y el Home lista las conversaciones reales (estado con puntito,
  avatares, "hace X"). Validado por Santiago.

**Por revisar (sin urgencia):**
- npm reportó 2 "vulnerabilidades moderadas" en la base recién creada. Vienen de
  herramientas internas de desarrollo, no de la app. No se tocan con el arreglo
  automático (rompe cosas); las revisamos con calma más adelante.

## Próximo paso

Épica 4 (invitaciones) **núcleo construido**: al crear una sesión se mandan los emails de
invitación (Resend); `/invitacion/[token]` muestra la invitación real y permite **aceptar**
(la sesión pasa a activa) o **declinar**. Falta que Santiago lo **pruebe de punta a punta**
(invitándose a su propio email) y, después, sumar **proponer un ajuste** y **reinvitación**.

Recordatorio: sin dominio verificado, Resend solo entrega al email de la cuenta de Santiago.
Pendiente visual (IDEAS): pasada dedicada a la paleta. El SQL evoluciona con migraciones.
