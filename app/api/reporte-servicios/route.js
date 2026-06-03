export async function POST(request) {
  const { clientes, resenas, dolor, servicios_actuales } = await request.json();

  const nivelClientes = {
    menos_5: { texto: "menos de 5 clientes al dia", volumen: "bajo", contexto: "cada cliente es critico — maximizar ticket es urgente" },
    "5_10": { texto: "entre 5 y 10 clientes al dia", volumen: "medio-bajo", contexto: "agregar servicios puede duplicar ingresos sin nuevos clientes" },
    "11_20": { texto: "entre 11 y 20 clientes al dia", volumen: "medio-alto", contexto: "buen volumen para introducir servicios premium con alto impacto" },
    mas_20: { texto: "mas de 20 clientes al dia", volumen: "alto", contexto: "alto volumen — pequeña mejora de ticket genera grandes ingresos" },
  }[clientes];

  const serviciosActuales = Array.isArray(servicios_actuales) ? servicios_actuales : [];
  const soloCorteBasico = serviciosActuales.length === 0 || (serviciosActuales.length === 1 && serviciosActuales.includes("solo_basico"));

  const serviciosFaltantes = [];
  if (!serviciosActuales.includes("barba")) serviciosFaltantes.push("arreglo de barba");
  if (!serviciosActuales.includes("afeitado")) serviciosFaltantes.push("afeitado con navaja");
  if (!serviciosActuales.includes("masaje")) serviciosFaltantes.push("masaje de cuero cabelludo");
  if (!serviciosActuales.includes("coloracion")) serviciosFaltantes.push("coloracion de barba");
  if (!serviciosActuales.includes("tratamiento")) serviciosFaltantes.push("tratamientos capilares");
  if (!serviciosActuales.includes("productos")) serviciosFaltantes.push("venta de productos grooming");

  const nivelDolor = {
    clientes_nuevos: { enfoque: "los servicios adicionales no solo suben el ticket — hacen que los clientes vuelvan mas seguido por la experiencia" },
    retencion: { enfoque: "una experiencia mas completa (masaje, arreglo de barba) crea habito y aumenta frecuencia de visita" },
    precios: { enfoque: "agregar servicios premium justifica cobrar mas — el paquete completo puede valer 2-3x el corte basico" },
    equipo: { enfoque: "nuevos servicios dan mas trabajo y satisfaccion al equipo — reduce rotacion y conflictos" },
    no_se: { enfoque: "los servicios adicionales son la palanca de mayor impacto con menor inversion de esta barberia" },
  }[dolor];

  const prompt = `Eres el experto #1 en desarrollo de servicios para barberias en Mexico.

DATOS DE ESTA BARBERIA:
- Clientes por dia: ${nivelClientes.texto} (volumen ${nivelClientes.volumen})
- Contexto: ${nivelClientes.contexto}
- Servicios que YA OFRECE: ${serviciosActuales.length > 0 ? serviciosActuales.join(", ") : "solo corte basico"}
- Servicios que NO TIENE AUN: ${serviciosFaltantes.length > 0 ? serviciosFaltantes.join(", ") : "ya tiene variedad de servicios"}
- Solo corte basico: ${soloCorteBasico ? "SI — oportunidad maxima" : "NO — tiene algunos servicios"}
- Enfoque segun su problema: ${nivelDolor.enfoque}

INTERPRETACION ESTRATEGICA:
- Esta barberia ${soloCorteBasico ? "esta dejando el 30-45% de sus ingresos potenciales sobre la mesa" : "tiene base pero puede optimizar y agregar servicios premium"}
- Prioridad: recomendar los 3 servicios de MAYOR impacto que NO tiene aun
- NO recomendar servicios que ya ofrece
- Ordenar por: facilidad de implementacion y rapidez de retorno

BENCHMARKS DEL SECTOR:
- Arreglo de barba: sube ticket 40-60%, costo marginal casi cero, 10-15 min adicionales
- Afeitado con toalla caliente: sube ticket 50-80%, inversion inicial $500 MXN, experiencia premium
- Masaje cuero cabelludo: sube ticket 15-25%, 10 min extra, costo cero, fideliza clientes
- Coloracion de barba: sube ticket 100-150%, margen 55-65%, alta percepcion de valor
- Tratamientos capilares: sube ticket 40-60%, productos $300-500 MXN de inversion
- Venta de productos grooming: margen 40-60%, se vende mientras cortas, ingreso pasivo
- Membresia mensual: 2 cortes $450 MXN, estabiliza flujo de caja
- Paquetes para eventos: $500-900 MXN, cero inversion adicional

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "diagnostico": {
    "ticket_actual_estimado": "estimacion del ticket actual en MXN basado en sus servicios",
    "ticket_potencial": "ticket potencial si agrega los 3 servicios recomendados en MXN",
    "incremento_mensual": "cuanto mas puede ganar al mes con sus clientes actuales",
    "resumen": "diagnostico directo en max 35 palabras con numeros concretos"
  },
  "servicios_recomendados": [
    {
      "nombre": "nombre del servicio #1 — el de mayor impacto",
      "por_que": "por que este servicio especificamente para esta barberia en max 20 palabras",
      "precio_sugerido": "precio en MXN",
      "tiempo_adicional": "minutos adicionales al servicio actual",
      "inversion_inicial": "inversion en pesos MXN o cero si no necesita",
      "incremento_ticket": "porcentaje de incremento al ticket",
      "script_upsell": "texto exacto que dice el barbero para ofrecerlo naturalmente mientras trabaja"
    },
    {
      "nombre": "nombre del servicio #2",
      "por_que": "razon especifica en max 20 palabras",
      "precio_sugerido": "precio en MXN",
      "tiempo_adicional": "minutos adicionales",
      "inversion_inicial": "inversion en MXN o cero",
      "incremento_ticket": "porcentaje",
      "script_upsell": "texto exacto del barbero para ofrecerlo naturalmente"
    },
    {
      "nombre": "nombre del servicio #3",
      "por_que": "razon especifica en max 20 palabras",
      "precio_sugerido": "precio en MXN",
      "tiempo_adicional": "minutos adicionales",
      "inversion_inicial": "inversion en MXN o cero",
      "incremento_ticket": "porcentaje",
      "script_upsell": "texto exacto del barbero para ofrecerlo naturalmente"
    }
  ],
  "menu_sugerido": {
    "descripcion": "como presentar el nuevo menu visualmente en max 20 palabras",
    "estructura": [
      "opcion 1 del menu con precio",
      "opcion 2 del menu con precio",
      "opcion 3 del menu con precio",
      "opcion combo/paquete con precio"
    ]
  },
  "plan_implementacion": [
    {
      "semana": "Semana 1",
      "accion": "que hacer primero en max 25 palabras"
    },
    {
      "semana": "Semana 2",
      "accion": "que hacer en semana 2 en max 25 palabras"
    },
    {
      "semana": "Semana 3",
      "accion": "que hacer en semana 3 en max 25 palabras"
    }
  ]
}

REGLAS:
- Solo JSON valido, sin texto extra, sin backticks
- Todo en espanol
- NO recomendar servicios que ya ofrece la barberia
- Scripts de upsell listos para usar tal cual — naturales, no agresivos
- Precios especificos en MXN considerando el nivel de la barberia
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
    return Response.json({ ok: true, reporte });
  } catch (e) {
    console.log("Error:", e.message);
    return Response.json({ ok: false, error: "Error generando el reporte" });
  }
}