export async function POST(request) {
  const { clientes, resenas, dolor } = await request.json();

  const clientesTexto = {
    menos_5: "menos de 5 clientes al dia",
    "5_10": "entre 5 y 10 clientes al dia",
    "11_20": "entre 11 y 20 clientes al dia",
    mas_20: "mas de 20 clientes al dia",
  }[clientes];

  const resenasTexto = {
    ninguna: "ninguna resena en Google",
    menos_10: "menos de 10 resenas en Google",
    "10_30": "entre 10 y 30 resenas en Google",
    mas_30: "mas de 30 resenas en Google",
  }[resenas];

  const dolorTexto = {
    clientes_nuevos: "conseguir clientes nuevos",
    retencion: "que los clientes vuelvan mas seguido",
    precios: "cobrar mas por sus servicios",
    equipo: "manejar mejor su equipo",
    no_se: "no saber que les esta frenando",
  }[dolor];

  const nivelClientes = {
    menos_5: { nivel: "critico", brecha: "muy por debajo del benchmark de 15-25 clientes/dia", prioridad: "aumentar volumen urgentemente antes que cualquier otra cosa" },
    "5_10": { nivel: "bajo", brecha: "por debajo del benchmark de 15-25 clientes/dia", prioridad: "aumentar volumen de clientes nuevos" },
    "11_20": { nivel: "medio", brecha: "cerca del benchmark, con margen de mejora", prioridad: "optimizar ticket promedio y retencion" },
    mas_20: { nivel: "bueno", brecha: "en benchmark o por encima", prioridad: "aumentar ticket promedio y fidelizar" },
  }[clientes];

  const nivelResenas = {
    ninguna: { nivel: "critico", impacto: "invisible para el 76% de clientes nuevos que buscan online", accion: "Google Business es prioridad #1 absoluta" },
    menos_10: { nivel: "bajo", impacto: "credibilidad muy baja online, pierde clientes ante competencia", accion: "generar resenas es urgente esta semana" },
    "10_30": { nivel: "medio", impacto: "presencia basica pero insuficiente para destacar", accion: "acelerar ritmo de resenas nuevas" },
    mas_30: { nivel: "bueno", impacto: "buena reputacion online que hay que mantener activa", accion: "responder todas las resenas y mantener flujo" },
  }[resenas];

  const nivelDolor = {
    clientes_nuevos: { enfoque: "ADQUISICION", estrategia: "el plan debe centrarse 80% en conseguir clientes nuevos, no en retener existentes", canales: "Google Business + Instagram Reels son los canales prioritarios" },
    retencion: { enfoque: "RETENCION", estrategia: "el plan debe centrarse en que los clientes actuales vuelvan mas seguido, de 1 vez al mes a 2 veces", canales: "WhatsApp Business + programa de lealtad son los canales prioritarios" },
    precios: { enfoque: "TICKET PROMEDIO", estrategia: "el plan debe centrarse en justificar precios mas altos con mejor experiencia y servicios adicionales", canales: "Instagram para posicionamiento premium + upsell de servicios" },
    equipo: { enfoque: "OPERACION", estrategia: "el plan debe centrarse en estabilizar el negocio internamente antes de escalar marketing", canales: "WhatsApp para sistematizar + Google Business para no perder clientes existentes" },
    no_se: { enfoque: "DIAGNOSTICO", estrategia: "el plan debe atacar las 3 areas mas debiles simultaneamente con acciones simples y medibles", canales: "Google Business + Instagram + WhatsApp como base minima" },
  }[dolor];

  const contexto = `
DATOS DE LA BARBERIA:
- Clientes por dia: ${clientesTexto} (nivel ${nivelClientes.nivel})
- Situacion vs benchmark: ${nivelClientes.brecha}
- Resenas en Google: ${resenasTexto} (nivel ${nivelResenas.nivel})
- Impacto de resenas: ${nivelResenas.impacto}
- Problema principal declarado: ${dolorTexto}
- Enfoque del plan: ${nivelDolor.enfoque}

INTERPRETACION ESTRATEGICA:
- Prioridad #1 para esta barberia: ${nivelClientes.prioridad}
- Accion urgente en reputacion: ${nivelResenas.accion}
- Estrategia central del plan: ${nivelDolor.estrategia}
- Canales que mas sentido tienen: ${nivelDolor.canales}

CONTEXTO DEL SECTOR:
- Ticket promedio saludable: $250-400 MXN
- Benchmark clientes: 15-25 por dia por silla
- El 76% de clientes nuevos busca barberia online primero
- Reels de transformacion generan 10x mas alcance que fotos
- WhatsApp Business reduce no-shows del 20% al 5-8%
- Referidos generan 30-40% de nuevos clientes sin costo
- Una barberia con 4.6 estrellas recibe 3x mas llamadas que una con 4.1`;

  const prompt1 = `Eres experto en marketing para barberias en Mexico.
${contexto}

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "cliente_ideal": {
    "descripcion": "descripcion especifica para esta barberia en max 35 palabras considerando su nivel de clientes y problema",
    "edad": "rango de edad del cliente ideal para este tipo de barberia",
    "comportamiento": "como busca barberia considerando su nivel de resenas en max 20 palabras",
    "motivacion": "por que volveria considerando el problema principal en max 20 palabras"
  },
  "canales": [
    {
      "nombre": "canal mas importante para esta barberia segun su situacion",
      "por_que": "razon especifica basada en sus datos en max 25 palabras",
      "acciones": ["accion concreta 1 en max 15 palabras", "accion concreta 2 en max 15 palabras", "accion concreta 3 en max 15 palabras"]
    },
    {
      "nombre": "segundo canal prioritario para esta barberia",
      "por_que": "razon especifica basada en sus datos en max 25 palabras",
      "acciones": ["accion concreta 1 en max 15 palabras", "accion concreta 2 en max 15 palabras", "accion concreta 3 en max 15 palabras"]
    }
  ],
  "promocion": {
    "nombre": "nombre de promocion especifica para su problema principal",
    "descripcion": "descripcion en max 30 palabras alineada con su enfoque",
    "como_comunicarla": "como comunicarla segun sus canales en max 20 palabras",
    "cuando_lanzarla": "cuando lanzarla segun su situacion actual en max 15 palabras"
  }
}`;

  const prompt2 = `Eres experto en marketing para barberias en Mexico.
${contexto}

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "calendario": [
    {
      "semana": "Semana 1",
      "foco": "foco especifico para esta barberia en max 8 palabras",
      "acciones": ["accion lunes-martes en max 20 palabras", "accion miercoles-jueves en max 20 palabras", "accion viernes-sabado en max 20 palabras"]
    },
    {
      "semana": "Semana 2",
      "foco": "foco en max 8 palabras",
      "acciones": ["accion en max 20 palabras", "accion en max 20 palabras", "accion en max 20 palabras"]
    },
    {
      "semana": "Semana 3",
      "foco": "foco en max 8 palabras",
      "acciones": ["accion en max 20 palabras", "accion en max 20 palabras", "accion en max 20 palabras"]
    },
    {
      "semana": "Semana 4",
      "foco": "foco en max 8 palabras",
      "acciones": ["accion en max 20 palabras", "accion en max 20 palabras", "accion en max 20 palabras"]
    }
  ],
  "posts": [
    {
      "titulo": "titulo del post alineado con el enfoque",
      "tipo": "Reel de transformacion",
      "caption": "caption con emojis alineado al problema principal en max 60 palabras",
      "imagen": "que grabar especifico para esta barberia en max 20 palabras",
      "cta": "llamado a la accion en max 10 palabras"
    },
    {
      "titulo": "titulo del post",
      "tipo": "Post de oferta",
      "caption": "caption con emojis alineado al problema principal en max 60 palabras",
      "imagen": "que grabar en max 20 palabras",
      "cta": "llamado a la accion en max 10 palabras"
    },
    {
      "titulo": "titulo del post",
      "tipo": "Post de confianza",
      "caption": "caption con emojis alineado al problema principal en max 60 palabras",
      "imagen": "que grabar en max 20 palabras",
      "cta": "llamado a la accion en max 10 palabras"
    }
  ]
    "plan_accion": {
    "esta_semana": [
      "accion concreta #1 de marketing para implementar esta semana en max 20 palabras",
      "accion concreta #2 de marketing para hacer antes del viernes en max 20 palabras"
    ],
    "este_mes": [
      "accion concreta #3 sistema de marketing a implementar en max 20 palabras",
      "accion concreta #4 habito de contenido a construir en max 20 palabras"
    ],
    "resultados_30_dias": [
      "resultado medible #1 especifico en clientes o pesos MXN",
      "resultado medible #2 especifico sobre presencia digital",
      "resultado medible #3 sobre engagement o conversiones"
    ]
  }
}`;

  const llamarAPI = async (prompt) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    if (!data.content || !data.content[0]) throw new Error("Error API");
    const texto = data.content[0].text;
    const limpio = texto.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(limpio);
  };

  try {
    const [parte1, parte2] = await Promise.all([
      llamarAPI(prompt1),
      llamarAPI(prompt2),
    ]);

    const reporte = {
      cliente_ideal: parte1.cliente_ideal,
      canales: parte1.canales,
      promocion: parte1.promocion,
      calendario: parte2.calendario,
      posts: parte2.posts,
      plan_accion: parte2.plan_accion,
    };

    return Response.json({ ok: true, reporte });
  } catch (e) {
    console.log("Error:", e.message);
    return Response.json({ ok: false, error: "Error generando el reporte" });
  }
}