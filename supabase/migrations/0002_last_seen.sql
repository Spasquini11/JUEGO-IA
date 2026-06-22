-- Épica F5 (avisos): marcar cuándo cada persona vio por última vez una sesión,
-- para poder mostrar el indicador "tenés algo nuevo" en el Home.
alter table public.participants
  add column if not exists last_seen_at timestamptz;
