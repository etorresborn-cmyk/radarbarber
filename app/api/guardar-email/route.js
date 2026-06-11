export async function POST(request) {
  try {
    const { email, clientes, resenas, dolor } = await request.json();

    if (!email) {
      return Response.json({ ok: false, error: "Email requerido" }, { status: 400 });
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      // Si no hay URL configurada, no falla — solo omite el guardado
      console.warn("GOOGLE_SCRIPT_URL no configurado");
      return Response.json({ ok: true, guardado: false });
    }

    const payload = {
      email,
      clientes: clientes || "",
      resenas: resenas || "",
      dolor: dolor || "",
      fecha: new Date().toISOString(),
    };

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("Error al guardar en Google Sheets:", res.status);
      return Response.json({ ok: true, guardado: false });
    }

    return Response.json({ ok: true, guardado: true });
  } catch (error) {
    console.error("Error en guardar-email:", error);
    // No bloquea la experiencia del usuario aunque falle
    return Response.json({ ok: true, guardado: false });
  }
}
