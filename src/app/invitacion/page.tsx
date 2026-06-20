/*
  Pantalla 2 del boceto: "La invitación" (lo que ve quien recibe el link).
  Estática por ahora: los datos (quién invita, tema, objetivo) son de ejemplo y
  los botones todavía no hacen nada. En el futuro va a vivir en una ruta con el
  código del link mágico, por ejemplo /invitacion/[token].
*/

export default function InvitacionPage() {
  // Datos de ejemplo. Más adelante van a venir de la invitación real.
  const invita = "Tania";
  const tema = "Nuestra relación con la plata";
  const objetivo =
    "Quiero que podamos hablar de cómo manejamos el dinero en casa, sin que termine en pelea.";

  return (
    <main className="mx-auto w-full max-w-[460px] px-5 py-8 sm:py-12">
      <p className="eyebrow">Te invitaron</p>
      <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-brand">
        {invita} te invitó a conversar
      </h1>

      <div className="card mt-5">
        <p className="card-tema">{tema}</p>
        <p className="card-obj">“{objetivo}”</p>
      </div>
      <p className="nota">Un espacio para tener una charla importante, con calma.</p>

      <label htmlFor="nombre" className="campo-label mt-6">
        Confirmá tu nombre
      </label>
      <input
        id="nombre"
        type="text"
        className="campo"
        defaultValue="Lucía"
        placeholder="Tu nombre…"
      />
      <p className="nota">
        Es el nombre con el que te van a ver los demás. Si no te llamás así, cambialo.
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        <button type="button" className="btn-primary">
          Aceptar
        </button>
        <button type="button" className="btn-outline">
          Proponer un ajuste al objetivo
        </button>
        <button type="button" className="btn-ghost">
          Declinar
        </button>
      </div>

      <p className="nota">
        Entrás con un link, sin crear contraseña · Solo mayores de 18
      </p>
    </main>
  );
}
