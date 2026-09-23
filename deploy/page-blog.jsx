/* SATORI — Blog (blog.html). ES/EN. */

const { useState, useEffect } = React;

// ---------- ARTÍCULOS ----------
const ARTICULOS = [
  {
    slug: "marketing-llm-recomienda",
    fecha: { es: "Mayo 2026", en: "May 2026" },
    minutos: { es: "6 min de lectura", en: "6 min read" },
    categoria: { es: "Estrategia · IA", en: "Strategy · AI" },
    titulo: {
      es: "El nuevo marketing: que los LLMs te recomienden.",
      en: "The new marketing: get LLMs to recommend you."
    },
    bajada: {
      es: "Tus prospectos ya no preguntan en Google. Le preguntan a ChatGPT, Claude y Gemini. Si tu marca no aparece ahí, no existe.",
      en: "Your prospects don't ask Google anymore. They ask ChatGPT, Claude and Gemini. If your brand isn't there, it doesn't exist."
    },
    cover: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80&auto=format&fit=crop",
    destacado: true,
    rail: [
      { id: "canal", label: { es: "El canal nuevo", en: "New channel" } },
      { id: "modelos", label: { es: "Cómo te leen", en: "How they read you" } },
      { id: "metodo", label: { es: "Cómo lo hacemos", en: "How we work it" } },
      { id: "embudo", label: { es: "El embudo", en: "The funnel" } }
    ],
    cta: {
      kicker: { es: "¿Quieres que las IAs te recomienden?", en: "Want to be recommended by AIs?" },
      h3: { es: "Trabajemos tu posicionamiento listo para IA.", en: "Let's build your AI-ready positioning." }
    },
    ctaBlock: {
      titulo: { es: "¿Listo para que las IAs te recomienden?", en: "Ready to be recommended by AIs?" },
      sub: { es: "Una llamada de 30 minutos. Te explico cómo posicionamos tu marca en ChatGPT, Claude y Gemini.", en: "A 30-minute call. I'll show you how we position your brand inside ChatGPT, Claude and Gemini." }
    }
  },
  // Notas con cuerpo por bloques: ["lead"|"p"|"quote", texto] · ["h2", id, texto] · ["ul", [items]].
  // **texto** se pinta en dorado. El rail lateral sale de los h2.
  {
    slug: "automatizacion-bots-ia",
    fecha: { es: "Septiembre 2026", en: "September 2026" },
    minutos: { es: "5 min de lectura", en: "5 min read" },
    categoria: { es: "Automatización · IA", en: "Automation · AI" },
    titulo: {
      es: "Automatización con IA: tu negocio trabajando mientras duermes.",
      en: "AI automation: your business working while you sleep."
    },
    bajada: {
      es: "La mayoría de los negocios no necesita más gente. Necesita dejar de hacer a mano lo que un sistema hace mejor, más rápido y sin olvidarse.",
      en: "Most businesses don't need more people. They need to stop doing by hand what a system does better, faster and without forgetting."
    },
    cover: "assets/showroom/automatizacion-flow-horizontal.jpg",
    cuerpo: {
      es: [
        ["lead", "Cada semana alguien en tu equipo copia datos de un correo a una hoja, contesta la misma pregunta veinte veces o persigue un pago que ya debió llegar. No es falta de talento. Es falta de sistema."],
        ["h2", "costo", "El costo invisible de hacerlo a mano."],
        ["p", "Las tareas repetitivas no aparecen en ningún estado de resultados, pero se comen horas de tu mejor gente. Y lo peor no es el tiempo: es el error. El dato que se copió mal, el prospecto al que nadie le contestó el viernes en la noche, el recordatorio que nunca salió."],
        ["p", "Automatizar no es reemplazar personas. Es quitarles lo que no debería requerir criterio humano para que lo usen donde sí importa."],
        ["h2", "que-automatizar", "Qué automatizar primero."],
        ["p", "La regla es sencilla: empieza por lo que pasa muchas veces, siempre igual, y cuesta caro cuando falla."],
        ["ul", [
          "**Captura de prospectos** — el formulario de tu sitio llega al instante a tu equipo, se registra en tu base y dispara el primer mensaje.",
          "**Seguimiento** — recordatorios automáticos a quien no ha contestado, sin que nadie tenga que acordarse.",
          "**Reportes** — el resumen de la semana llega solo a tu correo o a tu chat, con los números que importan.",
          "**Registros entre sistemas** — la información que hoy copias de un lugar a otro se mueve sola."
        ]],
        ["h2", "bots", "Qué hace un bot con IA en la vida real."],
        ["p", "Un buen bot no es un menú de opciones disfrazado. Entiende lo que le escriben, responde con la información de tu negocio, agenda, califica si el prospecto vale la pena y, cuando algo se sale de su alcance, se lo pasa a una persona con el contexto completo."],
        ["quote", "La meta no es que el cliente hable con una máquina. Es que nunca se quede sin respuesta."],
        ["h2", "como-empezar", "Cómo empezar sin romper tu operación."],
        ["p", "No automatizamos todo de golpe. Primero entendemos cómo trabaja tu negocio hoy, elegimos uno o dos procesos con el mayor retorno y los ponemos a correr junto a tu operación actual. Cuando funcionan, sumamos el siguiente. Conectamos tus sistemas con herramientas como n8n y usamos IA donde aporta de verdad, no por moda."],
        ["p", "El resultado es un negocio que responde, registra y da seguimiento aunque tú estés en otra junta. Con claridad y dirección."]
      ],
      en: [
        ["lead", "Every week someone on your team copies data from an email into a spreadsheet, answers the same question twenty times, or chases a payment that should have arrived already. It isn't a talent problem. It's a system problem."],
        ["h2", "costo", "The invisible cost of doing it by hand."],
        ["p", "Repetitive tasks never show up on an income statement, but they eat hours from your best people. And the worst part isn't the time: it's the mistakes. The number copied wrong, the lead nobody answered on Friday night, the reminder that never went out."],
        ["p", "Automating isn't replacing people. It's taking away what shouldn't need human judgment so they can use it where it matters."],
        ["h2", "que-automatizar", "What to automate first."],
        ["p", "The rule is simple: start with what happens often, always the same way, and is expensive when it fails."],
        ["ul", [
          "**Lead capture** — your website form reaches your team instantly, gets logged in your database and triggers the first message.",
          "**Follow-up** — automatic reminders to whoever hasn't replied, without anyone having to remember.",
          "**Reports** — the weekly summary lands in your inbox or chat on its own, with the numbers that matter.",
          "**Records across systems** — the data you copy from one place to another today moves by itself."
        ]],
        ["h2", "bots", "What an AI bot does in real life."],
        ["p", "A good bot isn't a menu in disguise. It understands what people write, answers with your business's information, books meetings, qualifies whether the lead is worth it and, when something is beyond it, hands it to a person with the full context."],
        ["quote", "The goal isn't for the client to talk to a machine. It's that they're never left without an answer."],
        ["h2", "como-empezar", "How to start without breaking your operation."],
        ["p", "We don't automate everything at once. First we understand how your business works today, pick one or two processes with the highest return, and run them alongside your current operation. Once they work, we add the next one. We connect your systems with tools like n8n and use AI where it truly adds value, not because it's trendy."],
        ["p", "The result is a business that answers, records and follows up even while you're in another meeting. With clarity and direction."]
      ]
    },
    cta: {
      kicker: { es: "¿Qué proceso te está costando más?", en: "Which process is costing you the most?" },
      h3: { es: "Encontremos juntos lo primero que conviene automatizar.", en: "Let's find the first thing worth automating." }
    },
    ctaBlock: {
      titulo: { es: "¿Listo para que tu negocio trabaje solo?", en: "Ready for your business to run on its own?" },
      sub: { es: "Una llamada de 30 minutos. Revisamos tu operación y te digo qué automatizar primero.", en: "A 30-minute call. We review your operation and I'll tell you what to automate first." }
    }
  },
  {
    slug: "portales-de-negocio",
    fecha: { es: "Septiembre 2026", en: "September 2026" },
    minutos: { es: "4 min de lectura", en: "4 min read" },
    categoria: { es: "Portales · Datos", en: "Portals · Data" },
    titulo: {
      es: "Portales de negocio: tus números en una sola pantalla.",
      en: "Business portals: your numbers on one screen."
    },
    bajada: {
      es: "Si para saber cómo va tu empresa tienes que abrir diez archivos y preguntarle a tres personas, no tienes información: tienes arqueología.",
      en: "If knowing how your company is doing means opening ten files and asking three people, you don't have information: you have archaeology."
    },
    cover: "assets/showroom/portales-tablero.jpg",
    cuerpo: {
      es: [
        ["lead", "Casi todos los empresarios con los que hablo tienen los datos. El problema es que viven dispersos: una hoja de cálculo por área, el banco en otra pestaña, los proyectos en un chat y el estatus real en la cabeza de alguien."],
        ["h2", "tarde", "Cuando la información llega tarde, la decisión también."],
        ["p", "Un reporte que se arma a mano cada fin de mes ya nace viejo. Y como armarlo cuesta, se hace poco. Resultado: decides por intuición, no porque quieras, sino porque el dato no está a la mano."],
        ["h2", "que-es", "Qué es un portal de negocio."],
        ["p", "Es una página privada, hecha a la medida de tu empresa, donde ves en una sola pantalla lo que importa: finanzas, cartera, proyectos, operación. Se alimenta de tus fuentes —banco, hojas, sistemas— y se actualiza sin que nadie tenga que capturar dos veces."],
        ["ul", [
          "**Tableros de finanzas y cartera** — cuánto entra, cuánto sale, quién te debe y desde cuándo.",
          "**Seguimiento de proyectos** — cada proyecto con su estado, su responsable y su historial de cambios.",
          "**Paneles de administración** — cada persona de tu equipo actualiza lo suyo sin tocar lo de los demás."
        ]],
        ["h2", "que-debe-tener", "Qué debe tener para que tu equipo sí lo use."],
        ["p", "Un portal que nadie abre es un gasto. Los que funcionan comparten tres rasgos: muestran pocas cosas pero las correctas, cargan rápido en el celular y reflejan cómo trabaja tu empresa, no cómo trabaja un software genérico."],
        ["quote", "El mejor tablero es el que contesta la pregunta antes de que la hagas."],
        ["h2", "privado", "Privado de verdad."],
        ["p", "Tus números son de lo más delicado que tienes. Por eso cada portal que construimos entra con enlace por correo o Face ID —nada de contraseñas compartidas en un chat—, cada persona ve solo lo que le toca y la seguridad se revisa antes de salir a producción."],
        ["p", "Tener tu negocio en una pantalla no es un lujo de empresa grande. Es la forma más directa de decidir con claridad."]
      ],
      en: [
        ["lead", "Almost every business owner I talk to has the data. The problem is that it's scattered: a spreadsheet per department, the bank in another tab, projects in a chat, and the real status in someone's head."],
        ["h2", "tarde", "When information arrives late, so does the decision."],
        ["p", "A report assembled by hand at the end of every month is born old. And because it's costly to put together, it rarely happens. Result: you decide on gut feeling, not because you want to, but because the data isn't at hand."],
        ["h2", "que-es", "What a business portal is."],
        ["p", "It's a private page, built for your company, where you see what matters on one screen: finances, receivables, projects, operations. It feeds from your sources —bank, sheets, systems— and updates without anyone typing things twice."],
        ["ul", [
          "**Finance and receivables dashboards** — what comes in, what goes out, who owes you and since when.",
          "**Project tracking** — every project with its status, its owner and its change history.",
          "**Admin panels** — each person on your team updates their part without touching anyone else's."
        ]],
        ["h2", "que-debe-tener", "What it needs so your team actually uses it."],
        ["p", "A portal nobody opens is an expense. The ones that work share three traits: they show few things but the right ones, they load fast on a phone, and they reflect how your company works, not how generic software works."],
        ["quote", "The best dashboard answers the question before you ask it."],
        ["h2", "privado", "Truly private."],
        ["p", "Your numbers are among the most sensitive things you have. That's why every portal we build signs in with an email link or Face ID —no passwords shared in a chat—, each person sees only what's theirs, and security is reviewed before going live."],
        ["p", "Having your business on one screen isn't a big-company luxury. It's the most direct way to decide with clarity."]
      ]
    },
    cta: {
      kicker: { es: "¿Cuántos archivos abres para saber cómo vas?", en: "How many files do you open to know how you're doing?" },
      h3: { es: "Diseñemos el portal que te lo diga en una pantalla.", en: "Let's design the portal that tells you on one screen." }
    },
    ctaBlock: {
      titulo: { es: "¿Listo para ver tu negocio completo?", en: "Ready to see your whole business?" },
      sub: { es: "Una llamada de 30 minutos. Revisamos qué números necesitas ver y de dónde salen.", en: "A 30-minute call. We review which numbers you need to see and where they come from." }
    }
  },
  {
    slug: "reservas-directas",
    fecha: { es: "Septiembre 2026", en: "September 2026" },
    minutos: { es: "4 min de lectura", en: "4 min read" },
    categoria: { es: "Hospedaje · Reservas", en: "Hospitality · Bookings" },
    titulo: {
      es: "Reservas directas: tu propiedad sin depender de las plataformas.",
      en: "Direct bookings: your property without depending on platforms."
    },
    bajada: {
      es: "Las plataformas son una gran vitrina. Pero si todas tus reservas pasan por ellas, tu negocio no es tuyo: es de su algoritmo.",
      en: "Platforms are a great storefront. But if every booking goes through them, your business isn't yours: it belongs to their algorithm."
    },
    cover: "assets/showroom/casaluna-live.jpg",
    cuerpo: {
      es: [
        ["lead", "Airbnb y Booking te traen huéspedes, y está bien usarlos. El problema empieza cuando son tu único canal: pagas comisión en cada noche, no te quedas con los datos de quien ya te visitó y un cambio en sus reglas puede vaciar tu calendario."],
        ["h2", "vitrina", "La plataforma es la vitrina, no la casa."],
        ["p", "El huésped que ya se quedó contigo y quiere regresar no debería tener que pasar otra vez por una plataforma. Con un sitio propio, ese segundo viaje —y la recomendación a sus amigos— se reserva directo contigo."],
        ["h2", "sitio-propio", "Qué tiene un sitio de reservas propio."],
        ["ul", [
          "**Fechas y tarifas en línea** — el huésped ve disponibilidad real y reserva sin intermediarios.",
          "**Calendario sincronizado** — lo que se reserva en Airbnb se bloquea en tu sitio y al revés, sin dobles reservas.",
          "**Panel de administración** — tú o tu encargado ven reservas, ajustan tarifas y bloquean fechas desde el celular.",
          "**Bilingüe** — para el huésped extranjero que busca en inglés."
        ]],
        ["h2", "estancia", "La estancia, en piloto automático."],
        ["p", "La reserva es solo el principio. Automatizamos los mensajes que hoy mandas a mano: confirmación, instrucciones de llegada, recordatorio un día antes, bienvenida y la invitación a dejar reseña al salir. El huésped siente atención personal; tú no tienes que estar pegado al teléfono."],
        ["quote", "Un buen anfitrión se nota en los detalles. Un buen sistema hace que nunca se te olviden."],
        ["h2", "convive", "Cómo convive con las plataformas."],
        ["p", "No se trata de salirte de Airbnb mañana. Se trata de que las plataformas sean un canal más y no el único. Con el calendario sincronizado sigues ahí mientras cada vez más reservas llegan directo, medidas desde su origen para saber qué te funciona."],
        ["p", "Tu propiedad, tus huéspedes, tus datos. Con claridad."]
      ],
      en: [
        ["lead", "Airbnb and Booking bring you guests, and it's fine to use them. The problem starts when they're your only channel: you pay a commission on every night, you don't keep the details of who already stayed with you, and a change in their rules can empty your calendar."],
        ["h2", "vitrina", "The platform is the storefront, not the house."],
        ["p", "A guest who already stayed with you and wants to come back shouldn't have to go through a platform again. With your own site, that second trip —and the recommendation to their friends— is booked directly with you."],
        ["h2", "sitio-propio", "What your own booking site includes."],
        ["ul", [
          "**Dates and rates online** — guests see real availability and book with no middlemen.",
          "**Synced calendar** — what gets booked on Airbnb is blocked on your site and vice versa, no double bookings.",
          "**Admin panel** — you or your manager see bookings, adjust rates and block dates from your phone.",
          "**Bilingual** — for the international guest searching in English."
        ]],
        ["h2", "estancia", "The stay, on autopilot."],
        ["p", "The booking is only the beginning. We automate the messages you send by hand today: confirmation, arrival instructions, a reminder the day before, a welcome and an invitation to leave a review at checkout. Guests feel personal attention; you don't have to be glued to your phone."],
        ["quote", "A good host shows in the details. A good system makes sure you never forget them."],
        ["h2", "convive", "How it coexists with the platforms."],
        ["p", "It's not about leaving Airbnb tomorrow. It's about platforms being one channel, not the only one. With the synced calendar you stay there while more and more bookings come in directly, tracked from their source so you know what works."],
        ["p", "Your property, your guests, your data. With clarity."]
      ]
    },
    cta: {
      kicker: { es: "¿Cuánto te cuesta cada noche en comisiones?", en: "How much does each night cost you in commissions?" },
      h3: { es: "Armemos el sitio de reservas de tu propiedad.", en: "Let's build your property's booking site." }
    },
    ctaBlock: {
      titulo: { es: "¿Listo para recibir reservas directas?", en: "Ready to take direct bookings?" },
      sub: { es: "Una llamada de 30 minutos. Te muestro cómo funciona con propiedades que ya lo usan.", en: "A 30-minute call. I'll show you how it works with properties already using it." }
    }
  },
  {
    slug: "mycfo-finanzas-con-ia",
    fecha: { es: "Septiembre 2026", en: "September 2026" },
    minutos: { es: "4 min de lectura", en: "4 min read" },
    categoria: { es: "Producto · Finanzas", en: "Product · Finance" },
    titulo: {
      es: "MyCFO: tus finanzas claras sin abrir una hoja de cálculo.",
      en: "MyCFO: clear finances without opening a spreadsheet."
    },
    bajada: {
      es: "Todos sabemos que deberíamos llevar nuestras finanzas al día. Casi nadie lo hace, porque registrar cuesta más que gastar.",
      en: "We all know we should keep our finances up to date. Almost nobody does, because logging takes more effort than spending."
    },
    cover: "assets/showroom/mycfo-laptop-poster.jpg",
    cuerpo: {
      es: [
        ["lead", "La mayoría de las personas y negocios pequeños no tiene un problema de ingresos. Tiene un problema de visibilidad: no sabe a dónde se fue el dinero del mes hasta que ya se fue."],
        ["h2", "friccion", "El problema no es la disciplina. Es la fricción."],
        ["p", "Las apps de finanzas fallan por lo mismo: te piden abrirlas, buscar la categoría y capturar el monto. Nadie hace eso diez veces al día. MyCFO nació de una idea simple: registrar tiene que ser tan fácil como mandar un mensaje."],
        ["h2", "como-funciona", "Cómo funciona."],
        ["ul", [
          "**Registras por chat en Telegram** — escribes lo que gastaste como se lo dirías a alguien, y queda registrado y categorizado.",
          "**Lee solo los correos de tu banco** — los avisos de cargos se registran sin que los captures y, si ya lo habías anotado, te lo dice.",
          "**16 monedas** — para quien vive, viaja o cobra en más de una."
        ]],
        ["p", "Le preguntas «¿cómo voy este año?» y te contesta con tus números reales, no con un promedio genérico."],
        ["h2", "portal", "Todo, en un portal con Face ID."],
        ["p", "Lo que registras por chat lo ves ordenado en un portal web: tu patrimonio, tu flujo del mes, tu ahorro y tus cuentas. Entras con Face ID, sin contraseñas que recordar."],
        ["h2", "avisos", "Avisos antes del problema, no después."],
        ["p", "Un motor de 11 reglas revisa tus movimientos y te avisa cuando algo no cuadra: un gasto fuera de lo normal o una categoría que se disparó. La idea no es regañarte al final del mes, sino darte tiempo de corregir."],
        ["quote", "Un CFO no te dice lo que ya pasó. Te dice lo que viene."],
        ["p", "MyCFO es un producto de SATORI y ya lo usan clientes reales. Si quieres claridad sobre tu dinero sin convertirte en contador, es por aquí."]
      ],
      en: [
        ["lead", "Most people and small businesses don't have an income problem. They have a visibility problem: they don't know where the month's money went until it's gone."],
        ["h2", "friccion", "The problem isn't discipline. It's friction."],
        ["p", "Finance apps fail for the same reason: they ask you to open them, find the category and type the amount. Nobody does that ten times a day. MyCFO was born from a simple idea: logging has to be as easy as sending a message."],
        ["h2", "como-funciona", "How it works."],
        ["ul", [
          "**Log by chat on Telegram** — write what you spent the way you'd tell someone, and it's recorded and categorized.",
          "**It reads your bank emails on its own** — charge alerts are logged without you typing them and, if you'd already noted it, it tells you.",
          "**16 currencies** — for anyone who lives, travels or gets paid in more than one."
        ]],
        ["p", "Ask it \"how am I doing this year?\" and it answers with your real numbers, not a generic average."],
        ["h2", "portal", "Everything in a portal with Face ID."],
        ["p", "What you log by chat shows up organized in a web portal: your net worth, your monthly cash flow, your savings and your accounts. You sign in with Face ID, no passwords to remember."],
        ["h2", "avisos", "Alerts before the problem, not after."],
        ["p", "An 11-rule engine reviews your transactions and warns you when something's off: an unusual expense or a category that spiked. The point isn't to scold you at the end of the month, but to give you time to correct course."],
        ["quote", "A CFO doesn't tell you what already happened. They tell you what's coming."],
        ["p", "MyCFO is a SATORI product already used by real clients. If you want clarity about your money without becoming an accountant, this is the way."]
      ]
    },
    cta: {
      kicker: { es: "¿Sabes a dónde se fue tu dinero este mes?", en: "Do you know where your money went this month?" },
      h3: { es: "Prueba MyCFO y tenlo claro desde hoy.", en: "Try MyCFO and get clarity starting today." }
    },
    ctaBlock: {
      titulo: { es: "¿Listo para tener tus finanzas claras?", en: "Ready for clear finances?" },
      sub: { es: "Una llamada de 30 minutos. Te enseño MyCFO funcionando.", en: "A 30-minute call. I'll show you MyCFO in action." }
    }
  },
  {
    slug: "contenido-con-ia",
    fecha: { es: "Septiembre 2026", en: "September 2026" },
    minutos: { es: "4 min de lectura", en: "4 min read" },
    categoria: { es: "Contenido · IA", en: "Content · AI" },
    titulo: {
      es: "Contenido con IA: video de marca sin set de filmación.",
      en: "AI content: brand video without a film set."
    },
    bajada: {
      es: "Hace dos años, un video de marca con este nivel requería producción, locación y semanas. Hoy requiere algo más escaso: criterio.",
      en: "Two years ago, a brand video at this level required a crew, a location and weeks. Today it requires something scarcer: judgment."
    },
    cover: "assets/showroom/satori-contenido-ia-poster.jpg",
    cuerpo: {
      es: [
        ["lead", "La IA generativa cambió la economía del contenido. Imagen, movimiento, voz y música ya se pueden producir sin cámara ni estudio. Eso no significa que cualquier cosa generada sirva: significa que la diferencia ahora está en la dirección."],
        ["h2", "que-cambio", "Qué cambió."],
        ["p", "Antes, el costo de producir obligaba a hacer pocos videos y cuidarlos mucho. Ahora puedes tener un video de marca cinematográfico, variaciones para anuncios y reels verticales en días, no en meses. El cuello de botella pasó de la cámara a la idea."],
        ["h2", "que-producimos", "Qué producimos."],
        ["ul", [
          "**Video de marca** — piezas cinematográficas con narrativa, como nuestro propio film «Tu operación despierta».",
          "**Reels y anuncios** — formatos verticales pensados para detener el scroll y llevar a una acción.",
          "**Videos educativos** — explicar un tema complejo con ilustración, animación y narración, como la serie Skinner Operant Adventures.",
          "**Voz y música a la medida** — sin bancos genéricos que se escuchan en mil marcas."
        ]],
        ["h2", "educativo", "El caso educativo."],
        ["p", "En Skinner Operant Adventures el guion se narra tal cual lo escribió su autor. Nuestro trabajo fue convertir cada idea en imagen: ilustraciones con estilo propio, animación en los momentos clave y todo sincronizado con la voz, listo para YouTube y redes. Un tema de psicología conductual que en texto cuesta leer, en video se entiende."],
        ["h2", "criterio", "Lo que la IA no hace sola."],
        ["p", "La IA genera; no decide. Elegir el tono, cuidar que cada escena sea coherente con tu marca, detectar la mano con seis dedos o el texto mal escrito en una imagen, y saber cuándo algo está listo: eso sigue siendo trabajo humano. Ahí es donde ponemos el oficio."],
        ["quote", "La herramienta es nueva. El criterio no."],
        ["p", "Si tu marca necesita verse a la altura de lo que vendes sin la logística de una producción tradicional, hablemos."]
      ],
      en: [
        ["lead", "Generative AI changed the economics of content. Image, motion, voice and music can now be produced without a camera or a studio. That doesn't mean anything generated works: it means the difference now lies in the direction."],
        ["h2", "que-cambio", "What changed."],
        ["p", "Production costs used to force you to make few videos and guard them closely. Now you can have a cinematic brand video, ad variations and vertical reels in days, not months. The bottleneck moved from the camera to the idea."],
        ["h2", "que-producimos", "What we produce."],
        ["ul", [
          "**Brand video** — cinematic pieces with a story, like our own film \"Your operation awakens\".",
          "**Reels and ads** — vertical formats designed to stop the scroll and drive an action.",
          "**Educational videos** — explaining a complex topic with illustration, animation and narration, like the Skinner Operant Adventures series.",
          "**Custom voice and music** — no generic stock heard across a thousand brands."
        ]],
        ["h2", "educativo", "The educational case."],
        ["p", "In Skinner Operant Adventures the script is narrated exactly as its author wrote it. Our job was to turn each idea into images: illustrations with their own style, animation at key moments, everything synced to the voice, ready for YouTube and social. A behavioral psychology topic that's hard to read as text becomes easy to follow on video."],
        ["h2", "criterio", "What AI doesn't do on its own."],
        ["p", "AI generates; it doesn't decide. Choosing the tone, keeping every scene consistent with your brand, catching the six-fingered hand or the misspelled text in an image, and knowing when something is ready: that's still human work. That's where we put our craft."],
        ["quote", "The tool is new. Judgment isn't."],
        ["p", "If your brand needs to look as good as what you sell without the logistics of a traditional production, let's talk."]
      ]
    },
    cta: {
      kicker: { es: "¿Tu marca se ve como lo que vale?", en: "Does your brand look like what it's worth?" },
      h3: { es: "Produzcamos tu próximo video con IA.", en: "Let's produce your next AI video." }
    },
    ctaBlock: {
      titulo: { es: "¿Listo para contenido que detenga el scroll?", en: "Ready for content that stops the scroll?" },
      sub: { es: "Una llamada de 30 minutos. Te enseño ejemplos y armamos la idea de tu primera pieza.", en: "A 30-minute call. I'll show you examples and we'll shape the idea for your first piece." }
    }
  }
];

// Página actual: el build define BLOG_SLUG ("" = índice /blog; si no, la nota /blog/<slug>)
const SLUG_ACTUAL = typeof BLOG_SLUG !== "undefined" ? BLOG_SLUG : "";
const ARTICULO_ACTUAL = ARTICULOS.find((x) => x.slug === SLUG_ACTUAL) || null;

// "**negritas**" → texto dorado (React escapa el resto; nada de HTML crudo)
function goldText(s) {
  return String(s).split("**").map((part, i) => (i % 2 ? <strong key={i} style={emphasize}>{part}</strong> : part));
}

// Cuerpo por bloques de las notas nuevas
function Bloques({ items }) {
  return items.map((b, i) => {
    const [tipo] = b;
    if (tipo === "lead") return <p key={i} style={pLead}>{goldText(b[1])}</p>;
    if (tipo === "h2") return <h2 key={i} id={b[1]} style={h2Article}>{b[2]}</h2>;
    if (tipo === "ul") return <ul key={i} style={ulStyle}>{b[1].map((li, j) => <li key={j}>{goldText(li)}</li>)}</ul>;
    if (tipo === "quote") return <blockquote key={i} style={quoteStyle}>{b[1]}</blockquote>;
    return <p key={i} style={pStyle}>{goldText(b[1])}</p>;
  });
}

// ---------- HERO ----------
function BlogHero() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "Some of our thoughts",
    title: "Satori.",
    accent: "Blog.",
    sub: "Strategy, AI and growth — written from the trenches, all substance."
  } : {
    eyebrow: "Algunos de nuestros pensamientos",
    title: "Satori.",
    accent: "Blog.",
    sub: "Estrategia, IA y crecimiento — escrito desde la trinchera, con sustancia."
  };
  return (
    <PageHero id="inicio" eyebrow={c.eyebrow} title={c.title} accent={c.accent} sub={c.sub} />
  );
}

// ---------- ÍNDICE (/blog) ----------
function BlogIndex() {
  const [lang] = useLang();
  return (
    <section style={{ padding: "2rem clamp(1.25rem,4vw,2.5rem) 6rem", background: SATORI.CREAM, position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
        {ARTICULOS.map((x) => (
          <a key={x.slug} href={`/blog/${x.slug}`} data-reveal className="pillar-card" style={{
            display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit",
            background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "20px", overflow: "hidden",
            boxShadow: "0 14px 40px -22px rgba(14,14,14,0.18)"
          }}>
            <div style={{ aspectRatio: "16 / 9", overflow: "hidden", background: SATORI.INK }}>
              <img src={x.cover} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "1.4rem 1.5rem 1.6rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
              <div style={{ fontFamily: TYPE.mono, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.6 }}>
                <span style={{ color: SATORI.GOLD_DEEP }}>{x.categoria[lang] || x.categoria.es}</span> · {x.minutos[lang] || x.minutos.es}
              </div>
              <h2 style={{ fontFamily: TYPE.display, fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.01em", color: SATORI.INK, margin: 0 }}>
                {x.titulo[lang] || x.titulo.es}
              </h2>
              <p style={{ ...bodyStyle, fontSize: "0.95rem", margin: 0 }}>{x.bajada[lang] || x.bajada.es}</p>
              <span style={{ marginTop: "auto", paddingTop: "0.6rem", fontFamily: TYPE.mono, fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: SATORI.GOLD_DEEP }}>
                {lang === "en" ? "Read →" : "Leer →"}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- ARTICLE BODY ----------
function ArticleBody({ a }) {
  const [lang] = useLang();

  const bodyEs = (
    <React.Fragment>
      <p style={pLead}>
        Durante 20 años el juego fue claro: Google. Ranquear, hacer ads, comprar palabras clave,
        invertir en SEO y rezar para aparecer arriba.
      </p>
      <p style={pStyle}>
        Hoy, una parte cada vez más grande de tus prospectos no abre Google. Abre ChatGPT.
        Pregunta a Claude. Le pide a Gemini que le recomiende una agencia, un despacho,
        una clínica o un constructor. Y el modelo le da un nombre — o ninguno.
      </p>

      <h2 id="canal" style={h2Article}>El canal nuevo: la recomendación de una IA.</h2>
      <p style={pStyle}>
        Las landing pages siguen importando. Los ads, también. Pero hay un canal nuevo,
        gratis y casi invisible: ser <strong style={emphasize}>recomendado por un LLM</strong>.
        Cuando alguien pregunta "¿quién es el mejor para X en mi ciudad?", el modelo elige
        a partir de lo que ha leído de ti en internet — no de tus ads, sino de tu rastro.
      </p>

      <h2 id="modelos" style={h2Article}>¿Cómo te leen los modelos?</h2>
      <ul style={ulStyle}>
        <li><strong style={emphasize}>Contenido propio</strong> — artículos, casos, manifiesto, página de "Acerca de", reseñas en tu sitio.</li>
        <li><strong style={emphasize}>Menciones de terceros</strong> — medios, directorios, podcasts, entrevistas, casos publicados.</li>
        <li><strong style={emphasize}>Datos estructurados</strong> — Schema.org, FAQs, datos limpios de contacto, ubicación, horarios, equipo.</li>
        <li><strong style={emphasize}>Consistencia</strong> — un mensaje claro repetido en muchos lugares, no diez mensajes distintos.</li>
      </ul>

      <h2 id="metodo" style={h2Article}>Cómo lo trabajamos en SATORI.</h2>
      <p style={pStyle}>
        No es magia. Es estrategia. Construimos identidad clara, generamos contenido editorial
        de fondo, sembramos menciones en medios y directorios, y dejamos el sitio en un formato
        que los modelos entienden. El resultado: cuando un prospecto le pregunta a una IA
        por una empresa como la tuya, tu nombre aparece.
      </p>
      <blockquote style={quoteStyle}>
        Hace dos años, el SEO era para Google. Hoy, el SEO también es para ChatGPT.
        El que entendió esto temprano gana los próximos cinco años.
      </blockquote>

      <h2 id="embudo" style={h2Article}>El nuevo embudo, en una línea.</h2>
      <p style={pStyle}>
        Identidad → contenido propio → menciones de terceros → recomendación de un LLM →
        prospecto calificado en tu WhatsApp. Con claridad y dirección.
      </p>
    </React.Fragment>
  );

  const bodyEn = (
    <React.Fragment>
      <p style={pLead}>
        For 20 years the game was clear: Google. Rank, run ads, buy keywords, invest in SEO,
        and pray to show up on page one.
      </p>
      <p style={pStyle}>
        Today, a growing share of your prospects don't open Google. They open ChatGPT.
        They ask Claude. They ask Gemini to recommend an agency, a law firm, a clinic
        or a contractor. The model gives them a name — or none.
      </p>

      <h2 id="canal" style={h2Article}>The new channel: AI's recommendation.</h2>
      <p style={pStyle}>
        Landing pages still matter. Ads still matter. But there's a new channel,
        free and almost invisible: being <strong style={emphasize}>recommended by an LLM</strong>.
        When someone asks "who's the best at X in my city?", the model picks based on
        what it has read about you online — not from your ads, but from your trail.
      </p>

      <h2 id="modelos" style={h2Article}>How do models read you?</h2>
      <ul style={ulStyle}>
        <li><strong style={emphasize}>Owned content</strong> — articles, case studies, manifesto, "About" page, on-site reviews.</li>
        <li><strong style={emphasize}>Third-party mentions</strong> — press, directories, podcasts, interviews, published cases.</li>
        <li><strong style={emphasize}>Structured data</strong> — Schema.org, FAQs, clean contact info, location, hours, team.</li>
        <li><strong style={emphasize}>Consistency</strong> — one clear message repeated across many places, not ten different messages.</li>
      </ul>

      <h2 id="metodo" style={h2Article}>How we work it at SATORI.</h2>
      <p style={pStyle}>
        Not magic. Strategy. We build clear identity, generate editorial content with depth,
        seed mentions in press and directories, and leave the site in a format models understand.
        The result: when a prospect asks an AI about a business like yours, your name shows up.
      </p>
      <blockquote style={quoteStyle}>
        Two years ago, SEO was for Google. Today, SEO is also for ChatGPT.
        Whoever understood this early wins the next five years.
      </blockquote>

      <h2 id="embudo" style={h2Article}>The new funnel, in one line.</h2>
      <p style={pStyle}>
        Identity → owned content → third-party mentions → LLM recommendation →
        qualified prospect in your WhatsApp. With clarity and direction.
      </p>
    </React.Fragment>
  );

  return (
    <article
      id="inicio"
      style={{
        // Sin hero arriba: el padding superior deja libre la barra de navegación
        padding: "9rem clamp(1.25rem,4vw,2.5rem) 6rem",
        background: SATORI.CREAM,
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
            fontFamily: TYPE.mono,
            fontSize: "0.62rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: SATORI.INK,
            opacity: 0.55
          }}
        >
          <span style={{ color: SATORI.GOLD }}>{a.categoria[lang] || a.categoria.es}</span>
          <span>·</span>
          <span>{a.fecha[lang] || a.fecha.es}</span>
          <span>·</span>
          <span>{a.minutos[lang] || a.minutos.es}</span>
        </div>

        {/* title */}
        <h1
          style={{
            fontFamily: TYPE.display,
            fontSize: "clamp(2rem,5vw,3.4rem)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: SATORI.INK,
            margin: "0 0 1.5rem"
          }}
        >
          {a.titulo[lang] || a.titulo.es}
        </h1>

        {/* lead */}
        <p
          style={{
            fontFamily: TYPE.display,
            fontStyle: "italic",
            fontSize: "1.35rem",
            lineHeight: 1.5,
            color: SATORI.INK,
            opacity: 0.78,
            margin: "0 0 2.75rem"
          }}
        >
          {a.bajada[lang] || a.bajada.es}
        </p>

        {/* cover — tonos SATORI (sepia hacia oro, persona destacada en dorado) */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "20px",
            overflow: "hidden",
            background: SATORI.INK,
            marginBottom: "3rem",
            boxShadow: "0 30px 70px -30px rgba(14,14,14,0.35)",
            position: "relative"
          }}
        >
          <img
            src={a.cover}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(1) sepia(0.92) hue-rotate(-12deg) saturate(2.1) brightness(0.92) contrast(1.08)"
            }}
          />
          {/* warm overlay para reforzar la paleta SATORI */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${SATORI.INK}40 0%, transparent 45%, ${SATORI.GOLD}25 100%)`,
              mixBlendMode: "multiply",
              pointerEvents: "none"
            }}
          />
        </div>

        {/* body */}
        <div style={{ fontFamily: TYPE.body }}>
          {a.cuerpo ? <Bloques items={a.cuerpo[lang] || a.cuerpo.es} /> : (lang === "en" ? bodyEn : bodyEs)}
        </div>

        {/* author block */}
        <div
          style={{
            marginTop: "4rem",
            padding: "1.5rem 1.75rem",
            background: SATORI.WHITE,
            borderRadius: "20px",
            border: `1px solid ${SATORI.INK}10`,
            display: "flex",
            alignItems: "center",
            gap: "1.25rem"
          }}
        >
          <img
            src="assets/rodrigo.webp"
            alt="Rodrigo Tristán"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              objectFit: "cover",
              filter: "grayscale(1) contrast(1.05)"
            }}
          />
          <div>
            <p style={{ margin: 0, fontFamily: TYPE.display, fontWeight: 500, fontSize: "1.05rem", color: SATORI.INK }}>
              Rodrigo Tristán
            </p>
            <p style={{ margin: "0.25rem 0 0", fontFamily: TYPE.mono, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: SATORI.INK, opacity: 0.55 }}>
              {lang === "en" ? "Founder · SATORI" : "Fundador · SATORI"}
            </p>
          </div>
        </div>

        {/* inline contact CTA */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2.5rem 2rem",
            borderRadius: "24px",
            background: `linear-gradient(135deg, ${SATORI.GOLD}12 0%, ${SATORI.GOLD}05 100%)`,
            border: `1px solid ${SATORI.GOLD}30`,
            textAlign: "center"
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: TYPE.mono,
              fontSize: "0.66rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: SATORI.GOLD,
              marginBottom: "1rem"
            }}
          >
            {a.cta.kicker[lang] || a.cta.kicker.es}
          </p>
          <h3
            style={{
              fontFamily: TYPE.display,
              fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)",
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: SATORI.INK,
              margin: "0 0 1.5rem"
            }}
          >
            {a.cta.h3[lang] || a.cta.h3.es}
          </h3>
          <a
            href="#contacto"
            style={{
              ...btnGold,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem"
            }}
          >
            {lang === "en" ? "Contact me" : "Contactar"} →
          </a>
        </div>
      </div>
    </article>
  );
}

// styles
const pLead = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "1.2rem",
  lineHeight: 1.7,
  fontWeight: 400,
  color: "#0E0E0E",
  margin: "0 0 1.5rem"
};
const pStyle = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "1.08rem",
  lineHeight: 1.75,
  fontWeight: 300,
  color: "#0E0E0E",
  opacity: 0.85,
  margin: "0 0 1.5rem"
};
const h2Article = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "clamp(1.45rem, 2.6vw, 1.9rem)",
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "#0E0E0E",
  margin: "3rem 0 1.25rem"
};
const ulStyle = {
  listStyle: "none",
  padding: 0,
  margin: "0 0 1.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.85rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "1.05rem",
  lineHeight: 1.65,
  color: "#0E0E0E",
  opacity: 0.85
};
const emphasize = { color: "#A67C00", fontWeight: 500 };
const quoteStyle = {
  margin: "2.5rem 0",
  padding: "1.5rem 1.75rem",
  borderLeft: "3px solid #A67C00",
  background: "rgba(166,124,0,0.05)",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontStyle: "italic",
  fontSize: "1.15rem",
  lineHeight: 1.6,
  color: "#0E0E0E",
  opacity: 0.85,
  borderRadius: "0 14px 14px 0"
};

// ul li bullets via inline render
function _liAccent() { return null; }

// ---------- APP ----------
function App() {
  const [lang] = useLang();
  useEffect(() => {
    // js-reveal: desactiva el fallback CSS (revelado sin JS) y activa el reveal por scroll
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.setAttribute("data-revealed", "1");
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 200px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const a = ARTICULO_ACTUAL;
  // Índice: CTA genérico · Nota: su CTA y su rail (los h2 de la nota)
  const ctaTitulo = a ? a.ctaBlock.titulo : { es: "¿Quieres llevar esto a tu negocio?", en: "Want to bring this to your business?" };
  const ctaSub = a ? a.ctaBlock.sub : { es: "Una llamada de 30 minutos. Me cuentas tu negocio y te digo por dónde empezar.", en: "A 30-minute call. Tell me about your business and I'll tell you where to start." };
  const rail = !a ? [] : a.rail || (a.cuerpo.es.filter((b) => b[0] === "h2").map((b) => {
    const en = a.cuerpo.en.find((x) => x[0] === "h2" && x[1] === b[1]);
    return { id: b[1], label: { es: b[2].replace(/\.$/, ""), en: (en ? en[2] : b[2]).replace(/\.$/, "") } };
  }));

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: SATORI.CREAM }}>
      <NeuralBackground opacity={0.5} />
      <Nav current="blog" />
      {a && <SectionRail sections={[{ id: "inicio", label: { es: "Inicio", en: "Top" } }, ...rail]} />}
      {a ? <ArticleBody a={a} /> : <React.Fragment><BlogHero /><BlogIndex /></React.Fragment>}
      <CtaBlock titulo={ctaTitulo} sub={ctaSub} />
      <Footer social="satori" />
      <MobileMenuFab current={"blog"} />
      <FloatingWhatsApp />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
