-- =====================================================================
-- Entre Nosotros — esquema inicial de la base de datos (Épica 1)
-- Modelo: perfiles, sesiones, participantes, invitaciones, mensajes, resúmenes.
-- Seguridad: RLS (row level security) activado en todas las tablas; cada quien
-- ve solo lo suyo. La asistencia del coach NO se guarda (decisión de privacidad).
-- =====================================================================

-- Perfil de cada persona (datos de app ligados al usuario de autenticación)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- Una conversación sobre un tema
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  objective text,
  status text not null default 'no_iniciada'
    check (status in ('no_iniciada','activa','cerrada','archivada')),
  objective_history jsonb not null default '[]'::jsonb,
  close_proposed_by uuid references auth.users(id),
  close_proposed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

-- Cada persona dentro de una sesión
create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null check (role in ('creator','invitee')),
  display_name text not null,
  status text not null default 'invited'
    check (status in ('invited','accepted','declined')),
  created_at timestamptz not null default now()
);

-- El acceso por link mágico que recibe quien es invitado
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  email text not null,
  token text not null unique,
  status text not null default 'pending'
    check (status in ('pending','accepted','declined')),
  reinvite_count int not null default 0,
  last_sent_at timestamptz,
  created_at timestamptz not null default now()
);

-- Un mensaje del hilo compartido (sin "visto" ni "escribiendo": no se guardan)
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

-- El resumen descriptivo del cierre (borrador -> aprobado -> compartido)
create table if not exists public.summaries (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,
  content text,
  status text not null default 'draft'
    check (status in ('draft','approved','shared','discarded')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

-- Índices útiles
create index if not exists idx_participants_session on public.participants(session_id);
create index if not exists idx_participants_user on public.participants(user_id);
create index if not exists idx_messages_session on public.messages(session_id);
create index if not exists idx_invitations_token on public.invitations(token);

-- =====================================================================
-- Seguridad a nivel de fila (RLS): cada quien ve solo lo suyo
-- =====================================================================

-- Función de ayuda: ¿este usuario participa en esta sesión?
-- (SECURITY DEFINER para evitar recursión entre políticas)
create or replace function public.is_participant(p_session_id uuid, p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.participants
    where session_id = p_session_id and user_id = p_user_id
  );
$$;

alter table public.profiles     enable row level security;
alter table public.sessions     enable row level security;
alter table public.participants enable row level security;
alter table public.invitations  enable row level security;
alter table public.messages     enable row level security;
alter table public.summaries    enable row level security;

-- profiles: cada quien ve y edita su propio perfil
create policy "perfil propio: ver" on public.profiles
  for select using (id = auth.uid());
create policy "perfil propio: crear" on public.profiles
  for insert with check (id = auth.uid());
create policy "perfil propio: editar" on public.profiles
  for update using (id = auth.uid());

-- sessions: el creador o un participante pueden verla; el creador la crea/edita
create policy "sesiones: ver si participo o soy creador" on public.sessions
  for select using (
    creator_id = auth.uid() or public.is_participant(id, auth.uid())
  );
create policy "sesiones: crear como creador" on public.sessions
  for insert with check (creator_id = auth.uid());
create policy "sesiones: editar el creador" on public.sessions
  for update using (creator_id = auth.uid());

-- participants: ver si participás (o sos el creador); el creador agrega
create policy "participantes: ver de mis sesiones" on public.participants
  for select using (
    public.is_participant(session_id, auth.uid())
    or exists (
      select 1 from public.sessions s
      where s.id = session_id and s.creator_id = auth.uid()
    )
  );
create policy "participantes: el creador agrega" on public.participants
  for insert with check (
    exists (
      select 1 from public.sessions s
      where s.id = session_id and s.creator_id = auth.uid()
    )
  );
create policy "participantes: actualizar lo propio" on public.participants
  for update using (user_id = auth.uid());

-- messages: ver y escribir solo si participás en la sesión
create policy "mensajes: ver de mis sesiones" on public.messages
  for select using (public.is_participant(session_id, auth.uid()));
create policy "mensajes: escribir si participo" on public.messages
  for insert with check (
    sender_id = auth.uid() and public.is_participant(session_id, auth.uid())
  );
create policy "mensajes: borrar lo propio" on public.messages
  for delete using (sender_id = auth.uid());

-- summaries: ver/crear/editar si participás en la sesión
create policy "resumenes: ver de mis sesiones" on public.summaries
  for select using (public.is_participant(session_id, auth.uid()));
create policy "resumenes: crear si participo" on public.summaries
  for insert with check (
    created_by = auth.uid() and public.is_participant(session_id, auth.uid())
  );
create policy "resumenes: editar quien participa" on public.summaries
  for update using (public.is_participant(session_id, auth.uid()));

-- invitations: solo el creador de la sesión las ve/crea
-- (el invitado entra por su token, validado desde el servidor)
create policy "invitaciones: ver el creador" on public.invitations
  for select using (
    exists (
      select 1 from public.sessions s
      where s.id = session_id and s.creator_id = auth.uid()
    )
  );
create policy "invitaciones: crear el creador" on public.invitations
  for insert with check (
    exists (
      select 1 from public.sessions s
      where s.id = session_id and s.creator_id = auth.uid()
    )
  );
