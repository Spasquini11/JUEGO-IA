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

**Por revisar (sin urgencia):**
- npm reportó 2 "vulnerabilidades moderadas" en la base recién creada. Vienen de
  herramientas internas de desarrollo, no de la app. No se tocan con el arreglo
  automático (rompe cosas); las revisamos con calma más adelante.

## Próximo paso

**F1 — Crear sesión:** armar la base visual (colores burdeos/rosado, modo claro/oscuro,
tipografía) y la **Pantalla 1 "Crear conversación"** del `BOCETOS.md`, todavía estática
(sin guardar en base de datos). Primero la pantalla; la base de datos viene después.
