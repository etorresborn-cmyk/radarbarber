export async function POST(request) {
  const { clientes, resenas, dolor } = await request.json();

  const nivelResenas = {
    ninguna: {
      nivel: "critico",
      score: 8,
      texto: "Sin presencia en Google",
      impacto: "invisible para el 76% de clientes nuevos que buscan online",
      clientes_perdidos: "15-25 clientes nuevos al mes que van a la competencia",
      urgencia: "MAXIMA — cada dia sin resenas es dinero perdido",
      estrategia: "construir presencia desde cero con sistema agresivo de captacion de resenas esta semana",
    },
    menos_10: {
      nivel: "bajo",
      score: 28,
      texto: "Presencia muy debil",
      impacto: "credibilidad muy baja, pierdes clientes ante competencia con mas resenas",
      clientes_perdidos: "8-15 clientes nuevos al mes que eligen otra barberia",
      urgencia: "ALTA — necesitas minimo 30 resenas para ser competitivo",
      estrategia: "acelerar captacion de resenas con sistema activo para llegar a 30+ en 30 dias",
    },
    "10_30": {
      nivel: "medio",
      score: 58,
      texto: "Presencia basica",
      impacto: "visible pero insuficiente para destacar sobre competencia con mas resenas",
      clientes_perdidos: "3-8 clientes nuevos al mes que prefieren barberia con mas resenas",
      urgencia: "MEDIA — estas en el promedio pero no destacas",
      estrategia: "optimizar calidad de resenas y consistencia para llegar a 4.6+ estrellas y 50+ resenas",
    },
    mas_30: {
      nivel: "bueno",
      score: 82,
      texto: "Buena reputacion online",
      impacto: "buena base pero hay margen para ser el #1 de tu zona",
      clientes_perdidos: "oportunidad de capturar 5-10 clientes mas al mes siendo el #1",
      urgencia: "BAJA — mantener y optimizar para dominar tu zona",
      estrategia: "mantener flujo constante de resenas y responder todas en 24h para dominar Google Maps",
    },
  }[resenas];

  const nivelClientes = {
    menos_5: { texto: "menos de 5 clientes al dia", contexto: "barberia en etapa inicial — la reputacion online es critica para crecer" },
    "5_10": { texto: "entre 5 y 10 clientes al dia", contexto: "barberia en crecimiento — la reputacion puede duplicar el flujo de clientes" },
    "11_20": { texto: "entre 11 y 20 clientes al dia", contexto: "barberia con buen flujo — la reputacion puede llevarla al siguiente nivel" },
    mas_20: { texto: "mas de 20 clientes al dia", contexto: "barberia solida — la reputacion puede convertirla en la #1 de la zona" },
  }[clientes];

  const nivelDolor = {
    clientes_nuevos: { enfoque: "la reputacion es el canal de adquisicion mas barato — cada resena nueva trae clientes sin pagar publicidad" },
    retencion: { enfoque: "clientes que vuelven dejan resenas espontaneas — el sistema de resenas refuerza el habito de volver" },
    precios: { enfoque: "una reputacion de 4.6+ estrellas justifica precios 20-30% mas altos que la competencia" },
    equipo: { enfoque: "las resenas revelan problemas de servicio antes de que sean crisis — son feedback gratuito del equipo" },
    no_se: { enfoque: "la reputacion online es el diagnostico mas objetivo del negocio — lo que dicen los clientes es la verdad" },
  }[dolor];

  const prompt = `Eres el experto #1 en reputacion online para barberias en Mexico con 15 anos de experiencia.

DATOS DE ESTA BARBERIA:
- Clientes por dia: ${nivelClientes.texto}
- Contexto del negocio: ${nivelClientes.contexto}
- Resenas en Google: ${nivelResenas.texto} (score: ${nivelResenas.score}/100)
- Impacto actual: ${nivelResenas.impacto}
- Clientes perdidos estimados: ${nivelResenas.clientes_perdidos}
- Nivel de urgencia: ${nivelResenas.urgencia}
- Estrategia central: ${nivelResenas.estrategia}
- Enfoque segun su problema principal: ${nivelDolor.enfoque}

INTERPRETACION ESTRATEGICA:
- Esta barberia necesita: ${nivelResenas.estrategia}
- El plan debe ser: ${nivelResenas.nivel === "critico" ? "100% enfocado en generar las primeras resenas esta semana" : nivelResenas.nivel === "bajo" ? "agresivo en captacion de resenas con sistema diario" : nivelResenas.nivel === "medio" ? "consistente para superar el promedio y destacar" : "de mantenimiento y optimizacion para dominar la zona"}
- Prioridad #1: ${nivelResenas.nivel === "critico" || nivelResenas.nivel === "bajo" ? "conseguir resenas nuevas ESTA SEMANA" : "mantener flujo y mejorar calidad de respuestas"}

CONTEXTO DEL SECTOR:
- El 84% de clientes nuevos consulta Google antes de elegir barberia
- Una barberia con 4.6 estrellas recibe 3x mas llamadas que una con 4.1
- Barberias que responden resenas tienen 35% mas conversion de clientes nuevos
- 3-5 resenas nuevas por semana pueden pasar de 4.1 a 4.7 estrellas en 2 meses
- El momento exacto para pedir resena: cuando el cliente se mira al espejo y dice "me encanto"
- Un QR en el espejo genera 2-3x mas resenas que pedirlo verbalmente solo
- Mensaje de WhatsApp 24h despues genera 40% mas resenas que pedirlo en el momento
- Responder resenas negativas profesionalmente convierte lectores en clientes

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "diagnostico": {
    "score_actual": ${nivelResenas.score},
    "nivel": "${nivelResenas.nivel}",
    "resumen": "diagnostico directo en max 35 palabras usando datos concretos del sector",
    "impacto_mensual": "impacto en pesos MXN especifico considerando sus clientes actuales",
    "meta_30_dias": "meta especifica y medible para esta barberia en 30 dias"
  },
  "sistema_resenas": {
    "paso1": {
      "titulo": "El momento exacto",
      "descripcion": "cuando y como pedir la resena en max 25 palabras",
      "script": "texto exacto palabra por palabra que debe decir el barbero — listo para memorizar y usar hoy"
    },
    "paso2": {
      "titulo": "El QR en el espejo",
      "descripcion": "como usar el QR en max 20 palabras",
      "instrucciones": "3 pasos exactos para crear y colocar el QR hoy mismo"
    },
    "paso3": {
      "titulo": "El WhatsApp 24 horas despues",
      "descripcion": "el mensaje de seguimiento en max 20 palabras",
      "mensaje": "texto completo del WhatsApp listo para copiar — personalizado para este nivel de barberia"
    }
  },
  "gestion_semanal": {
    "tiempo_requerido": "X minutos por semana",
    "acciones": [
      "accion lunes en max 20 palabras",
      "accion miercoles en max 20 palabras",
      "accion viernes en max 20 palabras",
      "accion domingo en max 20 palabras"
    ]
  },
  "respuestas_modelo": {
    "positiva": {
      "contexto": "cuando usar esta respuesta en max 10 palabras",
      "texto": "respuesta modelo completa lista para copiar y personalizar con nombre del cliente"
    },
    "negativa": {
      "contexto": "cuando usar esta respuesta en max 10 palabras",
      "texto": "respuesta modelo completa lista para copiar — profesional y que recupera al cliente"
    }
  },
  "google_business": {
    "acciones_urgentes": [
      "accion urgente especifica #1 en max 15 palabras",
      "accion urgente especifica #2 en max 15 palabras",
      "accion urgente especifica #3 en max 15 palabras"
    ]
  }
}

REGLAS:
- Solo JSON valido, sin texto extra, sin backticks
- Todo en español
- Contenido 100% especifico para el nivel de resenas de esta barberia
- Los scripts y mensajes listos para usar tal cual sin edicion
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
    return Response.json({ ok: true, reporte, nivel: nivelResenas });
  } catch (e) {
    console.log("Error:", e.message);
    return Response.json({ ok: false, error: "Error generando el reporte" });
  }
}