export async function POST(request) {
  const { clientes, resenas, dolor } = await request.json();

  const clientesTexto = {
    menos_5: "menos de 5 clientes al día",
    "5_10": "entre 5 y 10 clientes al día",
    "11_20": "entre 11 y 20 clientes al día",
    mas_20: "más de 20 clientes al día",
  }[clientes];

  const resenasTexto = {
    ninguna: "ninguna reseña en Google",
    menos_10: "menos de 10 reseñas en Google",
    "10_30": "entre 10 y 30 reseñas en Google",
    mas_30: "más de 30 reseñas en Google",
  }[resenas];

  const dolorTexto = {
    clientes_nuevos: "conseguir clientes nuevos",
    retencion: "que los clientes vuelvan más seguido",
    precios: "cobrar más por sus servicios",
    equipo: "manejar mejor su equipo",
    no_se: "no saber exactamente qué les está frenando",
  }[dolor];

  const prompt = `Eres un consultor experto en barberías en México con 20 años de experiencia. 
Analizas el negocio de un dueño de barbería con estos datos:
- Volumen de clientes: ${clientesTexto}
- Reseñas en Google: ${resenasTexto}  
- Mayor problema declarado: ${dolorTexto}

Genera un diagnóstico breve y directo de máximo 3 líneas. 
Debe sonar como un experto que conoce su negocio específico.
Menciona un número concreto o dato del sector mexicano.
No uses saludos ni presentaciones. Ve directo al diagnóstico.
Termina con una pregunta o afirmación que genere curiosidad por saber más.
Responde solo en español.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const texto = data.content[0].text;

  return Response.json({ diagnostico: texto });
}