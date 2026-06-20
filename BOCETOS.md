# BOCETOS.md — Las 4 pantallas (especificación)

Referencia visual: `bocetos.html`. Este archivo describe las pantallas en texto para construirlas. Es un boceto: la estructura, los elementos y el clima están definidos; el pulido fino del diseño es del desarrollo, respetando el espíritu.

## Dirección de diseño (aplica a todo)

- Mobile-first, minimalista, con mucho aire y pocos bordes.
- Color principal **burdeos #641C34**; rosados tenues (ej. #F6EBEE) para cards y burbujas; fondo claro cálido (#FBF8F7).
- Modo claro/oscuro automático según el dispositivo.
- Sin indicadores de presión: **nada de "visto" ni "escribiendo"**.
- Indicador simple de novedad dentro de la app ("tenés algo nuevo").
- Accesible: teclado, foco visible, buen contraste, "reduce motion".

## Pantalla 1 — Crear la conversación

**Para qué:** el creador define el tema y el objetivo, y elige a quién invita.

Elementos, en orden:
- Título: "Nueva conversación".
- Campo **Tema** (texto corto). Placeholder: "Ej.: Nuestra relación con la plata".
- Campo **¿Qué querés lograr?** (texto largo). Placeholder: "Escribí el objetivo en tus palabras…".
- Botón secundario opcional: "✦ Ayudame a clarificar el objetivo" → abre la ayuda de IA para reformular el objetivo. Nota chica: "Opcional · la IA te ayuda a redactarlo". El texto final lo decide el creador.
- Sección **¿A quién invitás?**: fila con Nombre + Email, y "+ Agregar persona". Nota: "Entre 2 y 5 personas en total" (1 a 4 invitados).
- Disclaimer chico: "Esto no es terapia ni la reemplaza".
- Botón principal: "Crear e invitar".

Decisión: solo el creador invita. El creador puede editar el objetivo después, con aviso a todos.

## Pantalla 2 — La invitación (lo que ve quien la recibe)

**Para qué:** que el invitado vea el tema y el objetivo **antes** de entrar, y decida.

Elementos:
- Eyebrow: "Te invitaron". Título: "[Nombre] te invitó a conversar".
- Card con **Tema** (destacado) + **objetivo** (texto, entre comillas, tal como lo escribió el creador).
- Una línea de contexto: "Un espacio para tener una charla importante, con calma".
- Campo **Confirmá tu nombre**.
- Tres acciones, en este orden de peso:
  1. "Aceptar" (principal).
  2. "Proponer un ajuste al objetivo" (secundario → manda un mensaje al creador).
  3. "Declinar" (terciario, pero visible → opción de primera, con mensaje opcional).
- Nota chica: "Entrás con un link, sin crear contraseña · Solo mayores de 18".

Estados: si el invitado declina en una sesión de 2, la sesión queda "no iniciada" (el creador invita a otro o archiva). Reinvitación a quien declinó: 1 sola vez, tras 14 días.

## Pantalla 3 — La conversación + el coach privado

**Para qué:** leer y escribir en el hilo, y usar el coach privado para ayudarse.

Elementos:
- Header: eyebrow con cantidad de personas + **Tema** de la sesión.
- **Hilo de mensajes**: burbujas con nombre de quien habla. Mensajes propios alineados a la derecha. Sin "visto" ni "escribiendo".
- Barra para escribir abajo: campo "Escribí tu mensaje…" + botón **"🔒 Coach"**.
- **Panel del coach (privado, solo lo ve esa persona)**, con encabezado "🔒 Coach privado — solo vos" y estas acciones (chips): "Ayudame a responder", "Suavizar", "Más directo", "Profundizar", "Entender al otro", "Ver temas sin explorar".
- Nota dentro del panel: "Solo vos ves esto. No se marca en la conversación".

Decisión: el coach es de cada persona, invisible para el resto. Lee el hilo para ayudar, pero su asistencia jamás aparece en la conversación compartida. El coach entrega texto que la persona copia/edita/publica; nunca publica solo.

Duda abierta para Santiago (no bloquea): ¿el panel del coach es fijo abajo, o se abre con el botón y ocupa pantalla cuando se lo necesita? Proponer la opción más simple y dejar que la valide.

## Pantalla 4 — Cerrar y resumen

**Para qué:** cerrar la conversación de común acuerdo y, si se quiere, generar un resumen.

Elementos:
- Título: "Cerrar la conversación".
- Estado: "[Nombre] propuso cerrar. Esperando que confirmen los demás". Nota: "Si nadie objeta, se cierra sola en 7 días".
- Botones: "Confirmar cierre" (principal) y "Seguir conversando" (secundario).
- Al cerrarse, sección **Resumen (opcional)**:
  - Card con qué incluye: de qué se habló, qué quedó pendiente, qué planteó cada persona.
  - Banner: "Borrador. Puede tener errores. Revisalo antes de compartir".
  - Botones: "Compartir resumen" (principal) y "Descartar".

Decisión: cualquiera propone cerrar; se cierra con confirmación de todos o a los 7 días. El resumen **describe** lo que se dijo, **no interpreta** ni saca conclusiones; es un borrador privado que una persona aprueba antes de compartir; es el mismo para todos. La sesión cerrada queda en modo lectura (se guarda 1 año).
