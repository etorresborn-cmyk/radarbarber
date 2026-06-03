export async function POST(request) {
  const { clientes, resenas, dolor, precio_actual } = await request.json();

  const nivelPrecio = {
    menos_100: {
      nivel: "muy_bajo",
      rango: "menos de $100 MXN",
      vs_benchmark: "60-70% por debajo del benchmark saludable de $250-400 MXN",
      margen_perdido: "estas dejando $150-300 MXN por cliente en la mesa",
      potencial: "subir a $150-180 MXN en primera etapa sin perder clientes",
      urgencia: "CRITICA — precio tan bajo destruye la percepcion de calidad",
    },
    "100_180": {
      nivel: "bajo",
      rango: "$100-180 MXN",
      vs_benchmark: "por debajo del benchmark saludable de $250-400 MXN",
      margen_perdido: "estas dejando $70-220 MXN por cliente en la mesa",
      potencial: "subir a $200-230 MXN es viable sin perder clientes con justificacion correcta",
      urgencia: "ALTA — con inflacion acumulada tu margen real cayo 15-25%",
    },
    "181_280": {
      nivel: "medio",
      rango: "$181-280 MXN",
      vs_benchmark: "en el rango medio del benchmark — hay margen de mejora",
      margen_perdido: "puedes capturar $50-120 MXN mas por cliente con posicionamiento premium",
      potencial: "subir a $280-320 MXN agregando experiencia y servicios adicionales",
      urgencia: "MEDIA — estas bien pero hay dinero sin capturar",
    },
    mas_280: {
      nivel: "bueno",
      rango: "mas de $280 MXN",
      vs_benchmark: "en benchmark premium — bien posicionado",
      margen_perdido: "oportunidad en servicios adicionales y paquetes, no en el corte base",
      potencial: "crear paquetes premium de $500-900 MXN para eventos especiales",
      urgencia: "BAJA — optimizar mix de servicios mas que precio base",
    },
  }[precio_actual] || {
    nivel: "medio",
    rango: "precio no especificado",
    vs_benchmark: "necesita benchmark de zona",
    margen_perdido: "potencial de mejora identificado",
    potencial: "analisis de precios de competencia recomendado",
    urgencia: "MEDIA",
  };

  const nivelClientes = {
    menos_5: { texto: "menos de 5 clientes al dia", volumen: "bajo" },
    "5_10": { texto: "entre 5 y 10 clientes al dia", volumen: "medio-bajo" },
    "11_20": { texto: "entre 11 y 20 clientes al dia", volumen: "medio-alto" },
    mas_20: { texto: "mas de 20 clientes al dia", volumen: "alto" },
  }[clientes] || { texto: "clientes no especificado", volumen: "medio" };

  const nivelDolor = {
    clientes_nuevos: { enfoque: "subir precios con mas clientes requiere diferenciacion clara — el precio bajo no atrae mas clientes, atrae peores clientes" },
    retencion: { enfoque: "clientes que vuelven son menos sensibles al precio — puedes subir sin perderlos si la experiencia es buena" },
    precios: { enfoque: "ya sabes que vales mas — este plan te da los numeros exactos y el guion para comunicarlo" },
    equipo: { enfoque: "precios mas altos permiten pagar mejor al equipo y reducir rotacion — es una inversion en estabilidad" },
    no_se: { enfoque: "los precios desactualizados son la causa silenciosa #1 de barberia con poco margen" },
  }[dolor] || { enfoque: "optimizar precios para maximizar margen" };

  const prompt = `Eres el experto #1 en pricing para barberias en Mexico con 15 anos de experiencia.

DATOS DE ESTA BARBERIA:
- Clientes por dia: ${nivelClientes.texto} (volumen ${nivelClientes.volumen})
- Precio actual del corte basico: ${nivelPrecio.rango}
- Situacion vs benchmark: ${nivelPrecio.vs_benchmark}
- Dinero perdido por cliente: ${nivelPrecio.margen_perdido}
- Potencial inmediato: ${nivelPrecio.potencial}
- Urgencia: ${nivelPrecio.urgencia}
- Enfoque segun su problema: ${nivelDolor.enfoque}

INTERPRETACION ESTRATEGICA:
- Esta barberia tiene nivel de precios: ${nivelPrecio.nivel}
- El plan debe enfocarse en: ${nivelPrecio.nivel === "muy_bajo" || nivelPrecio.nivel === "bajo" ? "subir precios de forma gradual con justificacion clara" : nivelPrecio.nivel === "medio" ? "posicionamiento premium y servicios adicionales" : "optimizar el mix de servicios y crear paquetes premium"}
- Impacto potencial mensual: si sube el precio recomendado con ${nivelClientes.texto}, el incremento mensual es significativo

CONTEXTO DEL SECTOR:
- Benchmark ticket promedio saludable: $250-400 MXN por visita
- Barberia basica: $100-180 MXN ticket
- Barberia media: $200-350 MXN ticket  
- Barberia premium: $400-700 MXN ticket
- Una subida de $30-50 MXN sin perder clientes aumenta el margen neto 20-30%
- El 34% de barberias opera con margenes menores al 8% por precios desactualizados
- Inflacion acumulada en Mexico 2022-2025: aproximadamente 20-25%
- El ambiente del local puede justificar diferencia de precio del 25-40%
- Estrategia Good/Better/Best: clientes tienden a elegir el precio del medio
- Membresia mensual 2 cortes $450 MXN = ingreso recurrente garantizado
- Subir precios con anticipacion y comunicacion pierde menos del 5% de clientes

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "diagnostico": {
    "precio_actual": "${nivelPrecio.rango}",
    "nivel": "${nivelPrecio.nivel}",
    "resumen": "diagnostico directo en max 35 palabras con numeros concretos",
    "impacto_anual": "cuanto dinero se pierde al año con precio actual vs recomendado en pesos MXN",
    "oportunidad": "oportunidad concreta en max 20 palabras"
  },
  "precios_recomendados": {
    "corte_basico": {
      "precio_sugerido": "precio en MXN",
      "justificacion": "por que este precio en max 20 palabras",
      "incremento_mensual": "cuanto mas al mes con este precio y sus clientes actuales"
    },
    "corte_premium": {
      "precio_sugerido": "precio en MXN",
      "que_incluye": "que servicios adicionales incluye en max 20 palabras",
      "incremento_mensual": "cuanto mas al mes si el 40% elige premium"
    },
    "paquete_completo": {
      "precio_sugerido": "precio en MXN",
      "que_incluye": "corte + barba + que mas en max 20 palabras",
      "incremento_mensual": "cuanto mas al mes si el 20% elige paquete"
    }
  },
  "estrategia_subida": {
    "etapa1": {
      "cuando": "primera fecha recomendada",
      "cuanto_subir": "monto exacto a subir",
      "como_comunicarlo": "mensaje exacto para anunciar el aumento a clientes"
    },
    "etapa2": {
      "cuando": "segunda fecha recomendada",
      "cuanto_subir": "monto exacto a subir",
      "como_comunicarlo": "mensaje exacto para la segunda subida"
    }
  },
  "membresia": {
    "precio_sugerido": "precio mensual en MXN",
    "que_incluye": "que incluye la membresia",
    "argumento_venta": "como presentarla al cliente en max 25 palabras",
    "ingreso_garantizado": "cuanto garantizas al mes con 30 miembros"
  },
  "como_manejar_objeciones": [
    {
      "objecion": "objecion comun del cliente",
      "respuesta": "respuesta exacta lista para usar"
    },
    {
      "objecion": "segunda objecion comun",
      "respuesta": "respuesta exacta lista para usar"
    },
    {
      "objecion": "tercera objecion comun",
      "respuesta": "respuesta exacta lista para usar"
    }
  ]
  "plan_accion": {
    "esta_semana": [
      "accion concreta #1 relacionada con precios para hacer hoy o manana en max 20 palabras",
      "accion concreta #2 relacionada con precios para hacer antes del viernes en max 20 palabras"
    ],
    "este_mes": [
      "accion concreta #3 sistema de precios a implementar en max 20 palabras",
      "accion concreta #4 habito de revision de precios a construir en max 20 palabras"
    ],
    "resultados_30_dias": [
      "resultado medible #1 especifico en pesos MXN para esta barberia",
      "resultado medible #2 especifico para esta barberia",
      "resultado medible #3 especifico para esta barberia"
    ]
   }
}

REGLAS:
- Solo JSON valido, sin texto extra, sin backticks
- Todo en espanol
- Precios especificos en MXN considerando su precio actual y volumen de clientes
- Mensajes de comunicacion listos para usar tal cual
- Maximo 2500 tokens`;

  const llamarAPI = async () => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 2500,
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
    const reporte = await llamarAPI();
    return Response.json({ ok: true, reporte, nivel: nivelPrecio });
  } catch (e) {
    console.log("Error:", e.message);
    return Response.json({ ok: false, error: "Error generando el reporte" });
  }
}