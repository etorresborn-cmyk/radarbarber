export async function POST(request) {
  const { clientes, resenas, dolor, precio_actual, servicios_actuales } = await request.json();

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
    menos_5: { nivel: "critico", brecha: "muy por debajo del benchmark de 15-25 clientes/dia", prioridad: "aumentar volumen urgentemente antes que cualquier otra cosa", contexto: "barberia en etapa inicial — cada cliente es critico para sobrevivir" },
    "5_10": { nivel: "bajo", brecha: "por debajo del benchmark de 15-25 clientes/dia", prioridad: "aumentar volumen de clientes nuevos", contexto: "barberia en crecimiento — agregar servicios puede duplicar ingresos sin nuevos clientes" },
    "11_20": { nivel: "medio", brecha: "cerca del benchmark con margen de mejora", prioridad: "optimizar ticket promedio y retencion", contexto: "barberia con buen flujo — pequena mejora de ticket genera grandes ingresos" },
    mas_20: { nivel: "bueno", brecha: "en benchmark o por encima", prioridad: "aumentar ticket promedio y fidelizar", contexto: "barberia solida — alto volumen significa que pequenas mejoras de ticket tienen impacto masivo" },
  }[clientes];

  const nivelResenas = {
    ninguna: { nivel: "critico", score: 8, impacto: "invisible para el 76% de clientes nuevos que buscan online — pierdes 15-25 clientes nuevos al mes", accion: "Google Business es prioridad #1 absoluta — cada dia sin resenas es dinero perdido" },
    menos_10: { nivel: "bajo", score: 28, impacto: "credibilidad muy baja — clientes nuevos eligen competencia con mas resenas", accion: "generar resenas es urgente esta semana — necesitas minimo 30 para ser competitivo" },
    "10_30": { nivel: "medio", score: 58, impacto: "visible pero insuficiente — barberia con 4.6 estrellas y 50+ resenas recibe 3x mas clientes", accion: "acelerar ritmo de resenas nuevas para superar el promedio de la zona" },
    mas_30: { nivel: "bueno", score: 82, impacto: "buena reputacion online — hay margen para ser el #1 de la zona", accion: "responder 100% de resenas en menos de 24h para mejorar posicion en Google Maps" },
  }[resenas];

  const nivelDolor = {
    clientes_nuevos: { enfoque: "ADQUISICION", estrategia: "el plan debe centrarse 80% en conseguir clientes nuevos — Google Business + Instagram Reels son los canales prioritarios", impacto_financiero: "sillas vacias es dinero evaporado ese mismo dia" },
    retencion: { enfoque: "RETENCION", estrategia: "el plan debe centrarse en que clientes actuales vuelvan mas seguido — de 1 vez al mes a 2 veces", impacto_financiero: "cliente fiel que viene 2 veces/mes durante 18 meses vale $10,080 MXN de LTV" },
    precios: { enfoque: "TICKET PROMEDIO", estrategia: "el plan debe centrarse en cobrar mas con mejor posicionamiento y servicios premium", impacto_financiero: "34% de barberias opera con margenes menores al 8% por precios desactualizados" },
    equipo: { enfoque: "OPERACION", estrategia: "el plan debe centrarse en estabilizar el negocio internamente antes de escalar marketing", impacto_financiero: "barbero estrella sin contrato puede llevarse 50%+ de la clientela si se va" },
    no_se: { enfoque: "DIAGNOSTICO", estrategia: "el plan debe atacar las 3 areas mas debiles simultaneamente con acciones simples y medibles", impacto_financiero: "decisiones sin datos cuestan mas que cualquier inversion en marketing" },
  }[dolor];

  const nivelPrecio = {
    menos_100: { rango: "menos de $100 MXN", nivel: "muy_bajo", urgencia: "CRITICA — precio tan bajo destruye percepcion de calidad", vs_benchmark: "60-70% por debajo del benchmark saludable de $250-400 MXN", potencial: "subir a $150-180 MXN en primera etapa sin perder clientes", margen_perdido: "pierdes $150-300 MXN por cliente en la mesa" },
    "100_180": { rango: "$100-180 MXN", nivel: "bajo", urgencia: "ALTA — inflacion acumulada 2022-2025 de 20-25% comio el margen", vs_benchmark: "por debajo del benchmark saludable de $250-400 MXN", potencial: "subir a $200-230 MXN con justificacion correcta sin perder clientes", margen_perdido: "pierdes $70-220 MXN por cliente" },
    "181_280": { rango: "$181-280 MXN", nivel: "medio", urgencia: "MEDIA — estas en rango medio pero hay margen de mejora", vs_benchmark: "en rango medio del benchmark del sector", potencial: "subir a $280-320 MXN agregando experiencia y servicios adicionales", margen_perdido: "puedes capturar $50-120 MXN mas por cliente" },
    mas_280: { rango: "mas de $280 MXN", nivel: "bueno", urgencia: "BAJA — bien posicionado en precio", vs_benchmark: "en benchmark premium del sector", potencial: "crear paquetes premium $500-900 MXN para eventos especiales", margen_perdido: "oportunidad en servicios adicionales y paquetes, no en corte base" },
  }[precio_actual] || { rango: "no especificado", nivel: "medio", urgencia: "MEDIA", vs_benchmark: "necesita benchmark de zona", potencial: "analizar competencia local", margen_perdido: "potencial sin cuantificar" };

  const serviciosActuales = Array.isArray(servicios_actuales) ? servicios_actuales : [];
  const serviciosFaltantes = [];
  if (!serviciosActuales.includes("barba")) serviciosFaltantes.push("arreglo de barba — sube ticket 40-60%");
  if (!serviciosActuales.includes("afeitado")) serviciosFaltantes.push("afeitado con navaja — sube ticket 50-80%");
  if (!serviciosActuales.includes("masaje")) serviciosFaltantes.push("masaje de cuero cabelludo — $80-150 MXN con costo cero");
  if (!serviciosActuales.includes("coloracion")) serviciosFaltantes.push("coloracion de barba — sube ticket 100-150%");
  if (!serviciosActuales.includes("tratamiento")) serviciosFaltantes.push("tratamientos capilares — margen 65-75%");
  if (!serviciosActuales.includes("productos")) serviciosFaltantes.push("venta productos grooming — margen 40-60%");

  const contexto = `
=== CONOCIMIENTO EXPERTO DEL SECTOR DE BARBERIAS EN MEXICO ===

MERCADO:
- Mexico tiene 190,000-250,000 barberias registradas (INEGI 2025)
- El sector crecio 5 veces entre 2017 y 2022
- Mercado grooming masculino en Mexico supera $30,000 millones MXN anuales
- El 96% de clientes van a la barberia 1-2 veces al mes
- Mexico ocupa el segundo lugar mundial en consumo de productos de cuidado masculino

BENCHMARKS FINANCIEROS:
- Barberia basica: ticket $100-180 MXN, 6-10 clientes/dia, ingreso mensual $15K-$40K MXN, margen 5-10%
- Barberia media: ticket $200-350 MXN, 12-18 clientes/dia, ingreso mensual $50K-$90K MXN, margen 12-20%
- Barberia premium: ticket $400-700 MXN, 15-22 clientes/dia, ingreso mensual $100K-$180K MXN, margen 20-30%
- Benchmark ticket saludable: $250-$400 MXN — Alerta: menos de $180 MXN
- Benchmark retencion: 60-75% de clientes vuelven — Alerta: menos del 45%
- Benchmark ocupacion: mas del 65% — Alerta: menos del 40%
- Benchmark servicios adicionales: 25-45% del total — Alerta: menos del 10%
- Ecuacion fundamental: INGRESOS = sillas x turnos/dia x ticket x dias trabajados
- El 77% de duenos de barberias gana menos que sus propios barberos

ESTRUCTURA DE COSTOS:
- Nomina y comisiones: 40-55% de ingresos (el mayor costo)
- Renta del local: 10-20% (regla de oro: nunca superar 20%)
- Productos e insumos: 5-10% ($20-70 MXN por cliente)
- Marketing: 2-5% (barberias exitosas invierten consistentemente)
- El margen bruto en servicios es 60-80% — el problema son los costos fijos

DOLORES DOCUMENTADOS DEL SECTOR:
1. CRITICO: No saber conseguir clientes nuevos — el boca a boca no escala
2. CRITICO: Precios desactualizados — 34% opera con margenes menores al 8%
3. ALTO: Clientes que no vuelven — sin sistema de seguimiento ni recordatorios
4. ALTO: No explotar servicios adicionales — 80% solo vende cortes basicos
5. ALTO: Gestion del personal caotica — barbero sin contrato es bomba de tiempo
6. MEDIO: Sin presencia en Google Maps — 76% de clientes nuevos busca online
7. MEDIO: Mezcla de finanzas personales y del negocio

ERRORES MAS COSTOSOS:
- Depender de un solo barbero estrella sin contrato (si mas del 50% de clientes lo piden, es riesgo critico)
- No pedir resenas sistematicamente — barberia con 4.6 estrellas recibe 3x mas llamadas que una con 4.1
- Hacer descuentos en vez de mejorar el valor percibido
- No invertir en marketing cuando el negocio esta bien
- Fijar precios mirando al vecino sin analizar costos propios

SERVICIOS Y SU IMPACTO EN TICKET:
- Arreglo de barba: +$100-180 MXN, sube ticket 40-60%, costo marginal casi cero, 10-15 min adicionales
- Afeitado con toalla caliente: +$250-400 MXN, sube ticket 50-80%, experiencia premium
- Masaje cuero cabelludo: +$80-150 MXN, 10 min extra, costo cero, fideliza clientes
- Coloracion de barba: sube ticket 100-150%, margen 55-65%, alta percepcion de valor
- Tratamientos capilares: margen 65-75%, productos $300-500 MXN de inversion
- Venta productos grooming: margen 40-60%, se vende mientras cortas
- Membresia mensual: 2 cortes $450 MXN — con 50 miembros = $22,500 MXN recurrentes garantizados

CLAVES DE LAS BARBERIAS EXITOSAS:
- Disenan una experiencia completa: aroma, musica, bebida, ritual de bienvenida
- Sistema activo de resenas: QR en espejo + WhatsApp 24h = 3-5 resenas nuevas por semana
- El upsell es parte natural del servicio: "tu barba esta crecida, te la arreglo?"
- Revisan numeros semanalmente: clientes, ticket promedio, retencion
- Publican 3-5 veces por semana en Instagram (Reels > fotos)
- Programa de referidos: genera 30-40% de nuevos clientes sin costo

FIDELIZACION Y LTV:
- Adquirir cliente nuevo cuesta 5-7 veces mas que retener uno existente
- LTV cliente fiel: ticket x visitas/mes x meses activo (ejemplo: $280 x 2 x 18 = $10,080 MXN)
- Recordatorios WhatsApp reducen no-shows del 20-30% al 5-8%
- Sin recordatorios, barberia con 200 citas/mes pierde ~24 citas recuperables

MARKETING DIGITAL:
- Google Business: 76% de clientes nuevos busca online — canal de mayor impacto con menor inversion
- Instagram Reels: 10x mas alcance que fotos — transformaciones antes/despues son el contenido de mayor engagement
- WhatsApp Business: canal preferido en Latam para recordatorios y seguimiento
- Barberias con reservas online 24/7 aumentan volumen de clientes un 30%
- Un Reel viral puede traer 5-10 nuevos clientes sin pagar publicidad

PRICING:
- Subir $30-50 MXN por corte sin perder clientes aumenta el margen neto 20-30%
- Estrategia Good/Better/Best: clientes tienden a elegir el precio del medio
- El ambiente del local puede justificar diferencia de precio del 25-40%
- Comunicar subida con 3-4 semanas de anticipacion pierde menos del 5% de clientes

TENDENCIAS 2025-2026:
- Grooming masculino como bienestar: mercado crecera de $47B a $64B USD globalmente
- Personalizacion absoluta: el barbero moderno es asesor de imagen
- Reservas online como estandar — cliente joven no llama por telefono
- Contenido como canal de adquisicion principal

=== DATOS ESPECIFICOS DE ESTA BARBERIA ===
- Clientes por dia: ${clientesTexto} (nivel ${nivelClientes.nivel})
- Contexto del negocio: ${nivelClientes.contexto}
- Situacion vs benchmark: ${nivelClientes.brecha}
- Prioridad #1: ${nivelClientes.prioridad}
- Resenas en Google: ${resenasTexto} (score aproximado: ${nivelResenas.score}/100)
- Impacto de resenas: ${nivelResenas.impacto}
- Accion urgente reputacion: ${nivelResenas.accion}
- Problema principal declarado: ${dolorTexto}
- Enfoque estrategico: ${nivelDolor.enfoque}
- Estrategia central: ${nivelDolor.estrategia}
- Impacto financiero del problema: ${nivelDolor.impacto_financiero}
- Precio actual corte basico: ${nivelPrecio.rango}
- Situacion de precios vs benchmark: ${nivelPrecio.vs_benchmark}
- Urgencia de precios: ${nivelPrecio.urgencia}
- Potencial de precios: ${nivelPrecio.potencial}
- Dinero perdido por precio: ${nivelPrecio.margen_perdido}
- Servicios que YA ofrece: ${serviciosActuales.length > 0 ? serviciosActuales.join(", ") : "solo corte basico"}
- Servicios que NO tiene aun: ${serviciosFaltantes.length > 0 ? serviciosFaltantes.join(", ") : "ya tiene variedad de servicios"}`;

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
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    if (!data.content || !data.content[0]) throw new Error("Error API");
    const texto = data.content[0].text;
    const limpio = texto.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(limpio);
  };

  const promptReputacion = `Eres el experto #1 en reputacion online para barberias en Mexico con 15 anos de experiencia.
${contexto}

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "score_actual": ${nivelResenas.score},
  "resumen": "diagnostico directo en max 35 palabras usando datos concretos del sector",
  "impacto_mensual": "impacto en pesos MXN especifico considerando sus clientes actuales",
  "meta_30_dias": "meta especifica y medible para esta barberia en 30 dias",
  "sistema_resenas": {
    "paso1_script": "texto exacto palabra por palabra que dice el barbero cuando cliente se mira en el espejo",
    "paso2_qr": "3 pasos exactos para crear y colocar el QR hoy mismo",
    "paso3_whatsapp": "mensaje completo de WhatsApp 24h despues listo para copiar y pegar"
  },
  "respuesta_positiva": "respuesta modelo completa para resena positiva lista para copiar",
  "respuesta_negativa": "respuesta modelo completa para resena negativa lista para copiar",
  "acciones_google": ["accion urgente #1 en max 15 palabras", "accion urgente #2 en max 15 palabras", "accion urgente #3 en max 15 palabras"],
  "plan_accion": {
    "esta_semana": ["accion concreta #1 en max 20 palabras", "accion concreta #2 en max 20 palabras"],
    "este_mes": ["accion concreta #3 en max 20 palabras", "accion concreta #4 en max 20 palabras"],
    "resultados_30_dias": ["resultado medible #1 especifico", "resultado medible #2", "resultado medible #3"]
  }
}
REGLAS: Solo JSON valido, sin backticks, todo en espanol, contenido especifico para esta barberia`;

  const promptPrecios = `Eres el experto #1 en pricing para barberias en Mexico con 15 anos de experiencia.
${contexto}

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "resumen": "diagnostico de precios en max 35 palabras con numeros concretos en MXN",
  "impacto_anual": "cuanto dinero se pierde al ano con precio actual vs recomendado en pesos MXN",
  "precio_basico_recomendado": "precio en MXN con justificacion en max 15 palabras",
  "precio_premium_recomendado": "precio en MXN con que incluye en max 15 palabras",
  "precio_paquete_recomendado": "precio en MXN con que incluye en max 15 palabras",
  "incremento_mensual_estimado": "cuanto mas al mes con precios recomendados en MXN",
  "mensaje_subida_etapa1": "mensaje exacto para anunciar primera subida a clientes — listo para usar",
  "mensaje_subida_etapa2": "mensaje exacto para anunciar segunda subida — listo para usar",
  "cuando_subir_etapa1": "cuando hacer la primera subida en terminos relativos — sin fechas especificas",
  "cuando_subir_etapa2": "cuando hacer la segunda subida relativo a la primera",
  "membresia_precio": "precio mensual en MXN",
  "membresia_incluye": "que incluye la membresia en max 20 palabras",
  "membresia_argumento": "como presentarla al cliente en max 20 palabras",
  "objecion1": "objecion comun del cliente",
  "respuesta1": "respuesta exacta lista para usar",
  "objecion2": "segunda objecion comun",
  "respuesta2": "respuesta exacta lista para usar",
  "plan_accion": {
    "esta_semana": ["accion concreta #1 en max 20 palabras", "accion concreta #2 en max 20 palabras"],
    "este_mes": ["accion concreta #3 en max 20 palabras", "accion concreta #4 en max 20 palabras"],
    "resultados_30_dias": ["resultado medible #1 en pesos MXN", "resultado medible #2", "resultado medible #3"]
  }
}
REGLAS: Solo JSON valido, sin backticks, todo en espanol, precios especificos en MXN, sin fechas especificas`;

  const promptServicios = `Eres el experto #1 en desarrollo de servicios para barberias en Mexico con 15 anos de experiencia.
${contexto}

IMPORTANTE: NO recomendar servicios que ya ofrece esta barberia.
Solo recomendar de los que NO tiene: ${serviciosFaltantes.length > 0 ? serviciosFaltantes.join(", ") : "ya tiene variedad — recomendar optimizacion y paquetes"}.

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "ticket_actual": "estimacion del ticket actual en MXN",
  "ticket_potencial": "ticket potencial con los 3 servicios nuevos en MXN",
  "incremento_mensual": "cuanto mas puede ganar al mes con sus clientes actuales en MXN",
  "servicios_recomendados": [
    {
      "nombre": "nombre del servicio #1 de mayor impacto",
      "precio": "precio en MXN",
      "tiempo_extra": "minutos adicionales",
      "inversion": "inversion inicial en MXN o cero",
      "sube_ticket": "porcentaje de incremento",
      "script": "texto exacto que dice el barbero para ofrecerlo naturalmente mientras corta"
    },
    {
      "nombre": "nombre del servicio #2",
      "precio": "precio en MXN",
      "tiempo_extra": "minutos adicionales",
      "inversion": "inversion en MXN o cero",
      "sube_ticket": "porcentaje",
      "script": "texto exacto del barbero para ofrecerlo naturalmente"
    },
    {
      "nombre": "nombre del servicio #3",
      "precio": "precio en MXN",
      "tiempo_extra": "minutos adicionales",
      "inversion": "inversion en MXN o cero",
      "sube_ticket": "porcentaje",
      "script": "texto exacto del barbero para ofrecerlo naturalmente"
    }
  ],
  "menu_nuevo": ["opcion 1 del menu con precio", "opcion 2 con precio", "opcion 3 con precio", "paquete combo con precio y ahorro"],
  "plan_accion": {
    "esta_semana": ["accion concreta #1 en max 20 palabras", "accion concreta #2 en max 20 palabras"],
    "este_mes": ["accion concreta #3 en max 20 palabras", "accion concreta #4 en max 20 palabras"],
    "resultados_30_dias": ["resultado medible #1 especifico en MXN", "resultado medible #2", "resultado medible #3"]
  }
}
REGLAS: Solo JSON valido, sin backticks, todo en espanol, scripts listos para usar, NO repetir servicios que ya tiene`;

  const promptMarketing = `Eres el experto #1 en marketing para barberias en Mexico con 15 anos de experiencia.
${contexto}

Genera JSON con esta estructura exacta, sin texto extra, sin backticks:
{
  "cliente_ideal": "descripcion especifica del cliente ideal para esta barberia en max 30 palabras",
  "canal_principal": "canal mas importante para esta barberia segun su situacion",
  "canal_principal_razon": "por que este canal en max 20 palabras usando sus datos especificos",
  "canal_principal_acciones": ["accion concreta #1 en max 15 palabras", "accion concreta #2 en max 15 palabras", "accion concreta #3 en max 15 palabras"],
  "canal_secundario": "segundo canal prioritario",
  "canal_secundario_razon": "por que este canal en max 20 palabras",
  "canal_secundario_acciones": ["accion concreta #1 en max 15 palabras", "accion concreta #2 en max 15 palabras", "accion concreta #3 en max 15 palabras"],
  "post_caption": "caption completo con emojis listo para publicar en Instagram en max 70 palabras",
  "post_tipo": "tipo de post recomendado",
  "post_que_grabar": "descripcion de que grabar en max 20 palabras",
  "promocion_nombre": "nombre de la promocion especifica para esta barberia",
  "promocion_descripcion": "descripcion en max 25 palabras alineada con su problema principal",
  "plan_accion": {
    "esta_semana": ["accion concreta #1 en max 20 palabras", "accion concreta #2 en max 20 palabras"],
    "este_mes": ["accion concreta #3 en max 20 palabras", "accion concreta #4 en max 20 palabras"],
    "resultados_30_dias": ["resultado medible #1 especifico", "resultado medible #2", "resultado medible #3"]
  }
}
REGLAS: Solo JSON valido, sin backticks, todo en espanol, contenido 100% especifico para esta barberia`;

  try {
    const [reputacion, precios, servicios, marketing] = await Promise.all([
      llamarAPI(promptReputacion),
      llamarAPI(promptPrecios),
      llamarAPI(promptServicios),
      llamarAPI(promptMarketing),
    ]);

    return Response.json({
      ok: true,
      reporte: { reputacion, precios, servicios, marketing },
      meta: { clientesTexto, resenasTexto, dolorTexto, nivelPrecio, serviciosActuales },
    });
  } catch (e) {
    console.log("Error bundle:", e.message);
    return Response.json({ ok: false, error: "Error generando el bundle" });
  }
}