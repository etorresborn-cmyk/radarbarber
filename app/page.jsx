'use client';
import { useState } from "react";

const CREMA = "#FAF7F0";
const CREMA2 = "#F2EDE0";
const CREMA3 = "#E8E0CC";
const VERDE = "#1B4332";
const VERDE2 = "#2D6A4F";
const VERDE_SUAVE = "#D8EAE0";
const VERDE_CLARO = "#B7D9C6";
const ORO = "#9A7B3A";
const ORO_SUAVE = "#F5EDD6";
const CARBON = "#1A1A1A";
const GRIS = "#6B6B6B";
const GRIS_BORDE = "#DDD8CC";
const ROJO = "#8B2E2E";
const ROJO_SUAVE = "#F5E0E0";
const NARANJA = "#8B5E2E";
const NARANJA_SUAVE = "#F5EAE0";
const BLANCO = "#FFFFFF";

const preguntas = [
  {
    id: "clientes",
    pregunta: "¿Cuántos clientes atienden al día en total?",
    icono: "✂️",
    opciones: [
      { label: "Menos de 5", value: "menos_5", desc: "Estamos comenzando" },
      { label: "Entre 5 y 10", value: "5_10", desc: "Flujo moderado" },
      { label: "Entre 11 y 20", value: "11_20", desc: "Buen volumen" },
      { label: "Más de 20", value: "mas_20", desc: "Alta demanda" },
    ],
  },
  {
    id: "resenas",
    pregunta: "¿Cuántas reseñas tienen en Google?",
    icono: "⭐",
    opciones: [
      { label: "Ninguna", value: "ninguna", desc: "Sin perfil activo" },
      { label: "Menos de 10", value: "menos_10", desc: "Recién empezando" },
      { label: "Entre 10 y 30", value: "10_30", desc: "Presencia básica" },
      { label: "Más de 30", value: "mas_30", desc: "Buena reputación" },
    ],
  },
  {
    id: "dolor",
    pregunta: "¿Cuál es tu mayor problema ahora mismo?",
    icono: "🎯",
    opciones: [
      { label: "Conseguir clientes nuevos", value: "clientes_nuevos", desc: "Necesito más flujo" },
      { label: "Que los clientes vuelvan", value: "retencion", desc: "Se van y no regresan" },
      { label: "Cobrar más por mis servicios", value: "precios", desc: "Sé que valgo más" },
      { label: "Manejar mejor mi equipo", value: "equipo", desc: "Problemas internos" },
      { label: "No sé qué me está frenando", value: "no_se", desc: "Necesito un diagnóstico" },
    ],
  },
];

function calcularReporte(r) {
  const clientesData = {
    menos_5:  { inMin: 12000, inMax: 28000, benchmark: "15–25/día", scoreClientes: 18, label: "Menos de 5 clientes/día" },
    "5_10":   { inMin: 32000, inMax: 60000, benchmark: "15–25/día", scoreClientes: 42, label: "5–10 clientes/día" },
    "11_20":  { inMin: 65000, inMax: 115000, benchmark: "15–25/día", scoreClientes: 72, label: "11–20 clientes/día" },
    mas_20:   { inMin: 120000, inMax: 200000, benchmark: "En benchmark ✓", scoreClientes: 95, label: "Más de 20 clientes/día" },
  }[r.clientes];

  const resenasData = {
    ninguna:   { scoreRep: 12, textoRep: "Sin presencia en Google", accionRep: "Tu barbería es invisible para cualquier cliente que busque online. Estás perdiendo clientes nuevos todos los días sin saberlo." },
    menos_10:  { scoreRep: 35, textoRep: "Presencia muy débil", accionRep: "Con menos de 10 reseñas, los clientes nuevos prefieren ir a la competencia. Necesitas un sistema activo para generar reseñas esta semana." },
    "10_30":   { scoreRep: 62, textoRep: "Presencia básica", accionRep: "Tienes base pero no es suficiente. Una barbería con 4.5+ estrellas y 50+ reseñas recibe 3 veces más clientes nuevos que tú ahora mismo." },
    mas_30:    { scoreRep: 88, textoRep: "Buena reputación online", accionRep: "Buen trabajo. El siguiente nivel es responder el 100% de las reseñas en menos de 24 horas para mejorar tu posición en Google Maps." },
  }[r.resenas];

  const dolorData = {
    clientes_nuevos: { fuga1Titulo: "Sin sistema de adquisición digital", fuga1Desc: "El boca a boca es tu único canal. Es impredecible y no escala. Sin presencia activa en Instagram y Google Maps optimizado, eres invisible para el 76% de clientes que buscan barbería online.", fuga1Impacto: "15–25 clientes nuevos/mes que van a la competencia", scoreMkt: 22 },
    retencion: { fuga1Titulo: "Clientes que vienen una vez y no regresan", fuga1Desc: "Sin recordatorios ni seguimiento, tus clientes olvidan volver. Un cliente que viene 2 veces al mes en vez de 1 duplica su valor sin que gastes nada extra en conseguirlo.", fuga1Impacto: "$2,400–$4,800 MXN/año perdidos por cliente no retenido", scoreMkt: 30 },
    precios: { fuga1Titulo: "Precios desactualizados que erosionan tu margen", fuga1Desc: "Si no has subido precios en más de un año, la inflación te comió el margen silenciosamente. Una suba de $30–50 MXN por corte puede aumentar tu utilidad neta en un 20%.", fuga1Impacto: "Margen 15–25% más bajo de lo que debería ser", scoreMkt: 35 },
    equipo: { fuga1Titulo: "Problemas de equipo que ahuyentan clientes", fuga1Desc: "Un conflicto de equipo visible destruye la experiencia del cliente. Los problemas internos se perciben — y el cliente no regresa. Un barbero sin contrato claro es una bomba de tiempo.", fuga1Impacto: "Hasta 30% de clientela en riesgo si un barbero se va", scoreMkt: 28 },
    no_se: { fuga1Titulo: "Sin datos para tomar decisiones", fuga1Desc: "No saber qué te frena es el problema más costoso. Cualquier inversión puede ir en la dirección equivocada sin un diagnóstico claro primero.", fuga1Impacto: "Decisiones basadas en intuición, no en datos reales", scoreMkt: 20 },
  }[r.dolor];

  const scoreServicios = 38;
  const scoreTotal = Math.round((clientesData.scoreClientes + resenasData.scoreRep + dolorData.scoreMkt + scoreServicios) / 4);
  const brechaMin = Math.max(0, 65000 - clientesData.inMin);
  const brechaMax = Math.max(0, 120000 - clientesData.inMax);

  return { ...clientesData, ...resenasData, ...dolorData, scoreClientes: clientesData.scoreClientes, scoreRep: resenasData.scoreRep, scoreMkt: dolorData.scoreMkt, scoreServicios, scoreTotal, brechaMin, brechaMax };
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 34, height: 34, background: VERDE, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✂️</div>
      <div>
        <div style={{ color: VERDE, fontWeight: 800, fontSize: 15, letterSpacing: "0.08em", lineHeight: 1 }}>RADAR</div>
        <div style={{ color: ORO, fontSize: 9, letterSpacing: "0.25em" }}>BARBER</div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value }) {
  const color = value >= 70 ? VERDE2 : value >= 40 ? ORO : ROJO;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: CARBON, fontSize: 13 }}>{label}</span>
        <span style={{ color: color, fontSize: 13, fontWeight: 700 }}>{value}/100</span>
      </div>
      <div style={{ background: CREMA3, borderRadius: 999, height: 8 }}>
        <div style={{ background: color, height: "100%", borderRadius: 999, width: `${value}%`, transition: "width 1.2s ease" }} />
      </div>
    </div>
  );
}

function Chip({ texto, color, bg }) {
  return (
    <span style={{ background: bg, color: color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block" }}>
      {texto}
    </span>
  );
}

function BtnPrimario({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", background: disabled ? CREMA3 : VERDE,
      color: disabled ? GRIS : BLANCO, border: "none",
      borderRadius: 12, padding: "15px", fontSize: 14, fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s",
    }}>{children}</button>
  );
}

function BtnSecundario({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", background: "transparent", color: GRIS,
      border: "none", fontSize: 13, cursor: "pointer", padding: "10px",
    }}>{children}</button>
  );
}

export default function Home() {
  const [pantalla, setPantalla] = useState("inicio");
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [seleccion, setSeleccion] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [diagnosticoIA, setDiagnosticoIA] = useState("");
  const [pagina, setPagina] = useState(1);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [planSel, setPlanSel] = useState(null);

  const pregunta = preguntas[paso];

  async function siguiente() {
    if (!seleccion) return;
    const nuevas = { ...respuestas, [pregunta.id]: seleccion };
    setRespuestas(nuevas);
    if (paso < preguntas.length - 1) {
      setPaso(paso + 1);
      setSeleccion(null);
    } else {
      setPantalla("cargando");
      try {
        const res = await fetch("/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevas),
        });
        const data = await res.json();
        setDiagnosticoIA(data.diagnostico);
        setReporte(calcularReporte(nuevas));
        setPagina(1);
        setPantalla("reporte");
      } catch (e) {
        setReporte(calcularReporte(nuevas));
        setDiagnosticoIA("Tu barbería tiene oportunidades claras de crecimiento que no estás aprovechando. Los números del sector indican que podrías estar dejando entre $30,000 y $60,000 MXN sobre la mesa cada mes.");
        setPagina(1);
        setPantalla("reporte");
      }
    }
  }

  function volver() {
    setPaso(paso - 1);
    setSeleccion(respuestas[preguntas[paso - 1].id] || null);
  }

  if (pantalla === "inicio") return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "Georgia, serif", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "24px 24px 28px" }}>
        <Logo />
        <h1 style={{ color: BLANCO, fontSize: 24, fontWeight: 700, lineHeight: 1.3, margin: "20px 0 10px" }}>
          ¿Por qué tu competencia tiene más clientes?
        </h1>
        <p style={{ color: VERDE_CLARO, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Responde 3 preguntas y recibe un reporte gratuito con el diagnóstico real de tu barbería.
        </p>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 18, border: `1px solid ${GRIS_BORDE}` }}>
          <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "system-ui", marginBottom: 14 }}>TU REPORTE GRATUITO INCLUYE</div>
          {[
            ["📊", "Página 1 — Radiografía financiera", "Tu ingreso estimado vs el benchmark del sector en México"],
            ["🔴", "Página 2 — Tus 3 fugas de dinero", "Dónde pierdes dinero y cuánto, en pesos concretos"],
            ["🏆", "Página 3 — Tu score de salud", "4 dimensiones evaluadas con acciones concretas"],
          ].map(([ic, t, d]) => (
            <div key={t} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{ic}</span>
              <div>
                <div style={{ color: CARBON, fontSize: 12, fontWeight: 700, fontFamily: "system-ui", marginBottom: 2 }}>{t}</div>
                <div style={{ color: GRIS, fontSize: 11, lineHeight: 1.5, fontFamily: "system-ui" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <BtnPrimario onClick={() => setPantalla("formulario")}>Ver mi reporte gratis →</BtnPrimario>
        <p style={{ color: GRIS, fontSize: 11, textAlign: "center", marginTop: 10, fontFamily: "system-ui" }}>Sin spam · Sin tarjeta · 30 segundos</p>
      </div>
    </div>
  );

  if (pantalla === "formulario") return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "Georgia, serif", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: BLANCO, padding: "16px 24px 14px", borderBottom: `1px solid ${GRIS_BORDE}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Logo />
          <span style={{ color: GRIS, fontSize: 12, fontFamily: "system-ui" }}>{paso + 1} de {preguntas.length}</span>
        </div>
        <div style={{ background: CREMA3, borderRadius: 999, height: 5, overflow: "hidden" }}>
          <div style={{ background: VERDE, height: "100%", width: `${((paso + 1) / preguntas.length) * 100}%`, borderRadius: 999, transition: "width 0.4s ease" }} />
        </div>
      </div>
      <div style={{ padding: "28px 24px" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>{pregunta.icono}</div>
        <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, lineHeight: 1.3, margin: "0 0 22px" }}>{pregunta.pregunta}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {pregunta.opciones.map((op) => {
            const sel = seleccion === op.value;
            return (
              <button key={op.value} onClick={() => setSeleccion(op.value)} style={{
                background: sel ? VERDE_SUAVE : BLANCO,
                border: `1.5px solid ${sel ? VERDE2 : GRIS_BORDE}`,
                borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center",
                justifyContent: "space-between", transition: "all 0.15s",
              }}>
                <div>
                  <div style={{ color: sel ? VERDE : CARBON, fontSize: 14, fontWeight: 700, fontFamily: "system-ui" }}>{op.label}</div>
                  <div style={{ color: GRIS, fontSize: 12, marginTop: 2, fontFamily: "system-ui" }}>{op.desc}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: `2px solid ${sel ? VERDE : GRIS_BORDE}`,
                  background: sel ? VERDE : BLANCO, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {sel && <div style={{ width: 8, height: 8, background: BLANCO, borderRadius: "50%" }} />}
                </div>
              </button>
            );
          })}
        </div>
        <BtnPrimario onClick={siguiente} disabled={!seleccion}>
          {paso < preguntas.length - 1 ? "Siguiente →" : "Generar mi reporte gratis →"}
        </BtnPrimario>
        {paso > 0 && <BtnSecundario onClick={volver}>← Volver</BtnSecundario>}
      </div>
    </div>
  );

  if (pantalla === "cargando") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24, maxWidth: 480, margin: "0 auto" }}>
      <div style={{ width: 64, height: 64, background: VERDE, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>✂️</div>
      <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>GENERANDO TU REPORTE</div>
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 260 }}>
        Analizando tu barbería con datos reales del sector en México...
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 9, height: 9, background: VERDE, borderRadius: "50%", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.25;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}`}</style>
    </div>
  );

  if (pantalla === "reporte" && reporte) {
    const r = reporte;

    const Header = () => (
      <div style={{ background: BLANCO, padding: "14px 24px 12px", borderBottom: `1px solid ${GRIS_BORDE}`, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <Logo />
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3].map((p) => (
              <button key={p} onClick={() => setPagina(p)} style={{
                width: 30, height: 30, borderRadius: 8, cursor: "pointer",
                background: pagina === p ? VERDE : CREMA2,
                color: pagina === p ? BLANCO : GRIS,
                border: `1px solid ${pagina === p ? VERDE : GRIS_BORDE}`,
                fontSize: 12, fontWeight: 700, fontFamily: "system-ui",
              }}>{p}</button>
            ))}
          </div>
        </div>
        <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", fontFamily: "system-ui" }}>
          REPORTE GRATUITO · PÁGINA {pagina} DE 3
        </div>
      </div>
    );

    if (pagina === 1) return (
      <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
        <Header />
        <div style={{ padding: "22px 24px" }}>
          <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>📊 Tu radiografía financiera</h2>
          <p style={{ color: GRIS, fontSize: 12, margin: "0 0 20px", lineHeight: 1.6 }}>Así se ve tu barbería comparada con el benchmark del sector en México.</p>

          <div style={{ background: VERDE_SUAVE, borderRadius: 14, padding: "16px", marginBottom: 14, border: `1px solid ${VERDE_CLARO}` }}>
            <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>🤖 DIAGNÓSTICO DE TU BARBERÍA</div>
            <p style={{ color: CARBON, fontSize: 13, margin: 0, lineHeight: 1.8, fontStyle: "italic" }}>"{diagnosticoIA}"</p>
          </div>

          <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 14, border: `1px solid ${GRIS_BORDE}` }}>
            <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 16 }}>TUS NÚMEROS VS EL SECTOR</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>Clientes actuales</div>
                <div style={{ color: CARBON, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{r.label}</div>
              </div>
              <div>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>Benchmark del sector</div>
                <div style={{ color: VERDE2, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{r.benchmark}</div>
              </div>
              <div>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>Ingreso mensual est.</div>
                <div style={{ color: CARBON, fontSize: 13, fontWeight: 700 }}>${r.inMin.toLocaleString()}–${r.inMax.toLocaleString()} MXN</div>
              </div>
              <div>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>Benchmark saludable</div>
                <div style={{ color: VERDE2, fontSize: 13, fontWeight: 700 }}>$65,000–$120,000 MXN</div>
              </div>
            </div>
          </div>

          {r.brechaMin > 0 && (
            <div style={{ background: ROJO_SUAVE, borderRadius: 14, padding: "16px", marginBottom: 14, border: `1px solid ${CREMA3}` }}>
              <div style={{ color: ROJO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>⚠️ TU BRECHA FINANCIERA MENSUAL</div>
              <div style={{ color: ROJO, fontSize: 26, fontWeight: 800, marginBottom: 6 }}>${r.brechaMin.toLocaleString()}–${r.brechaMax.toLocaleString()} MXN</div>
              <p style={{ color: CARBON, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                Es lo que una barbería similar bien gestionada genera por encima de tus números. Al año eso equivale a <strong>${(r.brechaMin * 12).toLocaleString()}–${(r.brechaMax * 12).toLocaleString()} MXN</strong>.
              </p>
            </div>
          )}

          <BtnPrimario onClick={() => setPagina(2)}>Ver página 2: Tus 3 fugas de dinero →</BtnPrimario>
        </div>
      </div>
    );

    if (pagina === 2) return (
      <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
        <Header />
        <div style={{ padding: "22px 24px" }}>
          <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>🔴 Tus 3 fugas de dinero</h2>
          <p style={{ color: GRIS, fontSize: 12, margin: "0 0 20px", lineHeight: 1.6 }}>Estas son las razones por las que tu barbería no llega al benchmark del sector.</p>

          {[
            { num: "FUGA 1", bg: ROJO_SUAVE, color: ROJO, titulo: r.fuga1Titulo, desc: r.fuga1Desc, impacto: r.fuga1Impacto },
            { num: "FUGA 2", bg: NARANJA_SUAVE, color: NARANJA, titulo: "Servicios adicionales sin explotar", desc: "Las barberías que solo ofrecen cortes básicos pierden el 30–45% de sus ingresos potenciales. El arreglo de barba sube el ticket un 40–60%. Cada cliente que sale sin servicio adicional es dinero que quedó en la silla.", impacto: "30–45% de ingresos por cliente no capturados" },
            { num: "FUGA 3", bg: ORO_SUAVE, color: ORO, titulo: r.scoreRep >= 80 ? "Reputación que puede posicionarte como #1" : "Reputación online que te hace perder clientes", desc: r.accionRep, impacto: r.scoreRep >= 80 ? "Oportunidad de ser la barbería #1 de tu zona" : "Clientes nuevos que eligen a tu competencia sobre ti" },
          ].map((fuga, i) => (
            <div key={i} style={{ background: fuga.bg, borderRadius: 14, padding: "16px", marginBottom: 12, border: `1px solid ${CREMA3}` }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ background: BLANCO, color: fuga.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block" }}>{fuga.num}</span>
              </div>
              <div style={{ color: CARBON, fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{fuga.titulo}</div>
              <p style={{ color: CARBON, fontSize: 12, margin: "0 0 10px", lineHeight: 1.7 }}>{fuga.desc}</p>
              <div style={{ background: BLANCO, borderRadius: 8, padding: "8px 12px", display: "inline-block" }}>
                <span style={{ color: GRIS, fontSize: 11 }}>Impacto: </span>
                <span style={{ color: fuga.color, fontSize: 11, fontWeight: 700 }}>{fuga.impacto}</span>
              </div>
            </div>
          ))}

          <div style={{ background: VERDE_SUAVE, borderRadius: 14, padding: "14px 16px", marginBottom: 20, border: `1px solid ${VERDE_CLARO}` }}>
            <p style={{ color: VERDE, fontSize: 12, margin: 0, lineHeight: 1.7, fontWeight: 600 }}>La buena noticia: cada una de estas fugas tiene una solución concreta. No necesitas más clientes para ganar más — solo necesitas capturar mejor lo que ya tienes.</p>
          </div>

          <BtnPrimario onClick={() => setPagina(3)}>Ver página 3: Tu score de salud →</BtnPrimario>
          <BtnSecundario onClick={() => setPagina(1)}>← Volver a página 1</BtnSecundario>
        </div>
      </div>
    );

    if (pagina === 3) return (
      <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
        <Header />
        <div style={{ padding: "22px 24px" }}>
          <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>🏆 Tu score de salud</h2>
          <p style={{ color: GRIS, fontSize: 12, margin: "0 0 20px", lineHeight: 1.6 }}>Evaluamos 4 dimensiones clave de tu barbería vs el benchmark del sector.</p>

          <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 16, border: `1px solid ${GRIS_BORDE}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ color: GRIS, fontSize: 11, marginBottom: 6 }}>Score general</div>
                <span style={{
                  background: r.scoreTotal >= 70 ? VERDE_SUAVE : r.scoreTotal >= 45 ? ORO_SUAVE : ROJO_SUAVE,
                  color: r.scoreTotal >= 70 ? VERDE : r.scoreTotal >= 45 ? ORO : ROJO,
                  fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block"
                }}>
                  {r.scoreTotal >= 70 ? "Barbería sólida" : r.scoreTotal >= 45 ? "Oportunidad media-alta" : "Oportunidad alta de mejora"}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: VERDE, fontSize: 42, fontWeight: 800, lineHeight: 1 }}>{r.scoreTotal}</div>
                <div style={{ color: GRIS, fontSize: 11 }}>de 100</div>
              </div>
            </div>
            <ScoreBar label="Flujo de clientes" value={r.scoreClientes} />
            <ScoreBar label="Reputación online" value={r.scoreRep} />
            <ScoreBar label="Marketing activo" value={r.scoreMkt} />
            <ScoreBar label="Servicios adicionales" value={r.scoreServicios} />
          </div>

          <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 14 }}>¿Quieres saber exactamente cómo mejorar estos números?</div>

          {[
            { precio: "$7 USD", nombre: "Reporte Básico", desc: "Diagnóstico completo con plan de acción priorizado para tu barbería específica.", destacado: false },
            { precio: "$15 USD", nombre: "Plan de Marketing", desc: "Qué hacer esta semana para conseguir clientes nuevos + 3 posts listos para publicar.", destacado: true },
            { precio: "$39.99 USD", nombre: "Bundle Completo", desc: "Todo incluido: diagnóstico + servicios + precios + reputación + marketing + competidores.", destacado: false },
          ].map((plan) => (
            <div key={plan.nombre} style={{
              background: plan.destacado ? VERDE_SUAVE : BLANCO,
              borderRadius: 14, padding: "16px",
              border: `1.5px solid ${plan.destacado ? VERDE2 : GRIS_BORDE}`,
              marginBottom: 10,
            }}>
              {plan.destacado && (
                <div style={{ marginBottom: 8 }}>
                  <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block" }}>MÁS ELEGIDO</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ color: CARBON, fontSize: 14, fontWeight: 700, flex: 1, paddingRight: 12 }}>{plan.nombre}</div>
                <div style={{ color: VERDE, fontSize: 16, fontWeight: 800, flexShrink: 0 }}>{plan.precio}</div>
              </div>
              <p style={{ color: GRIS, fontSize: 12, margin: "0 0 12px", lineHeight: 1.6 }}>{plan.desc}</p>
              <button
                onClick={() => { setPlanSel(plan.nombre); setPantalla("interes"); }}
                style={{
                  width: "100%", background: plan.destacado ? VERDE : "transparent",
                  color: plan.destacado ? BLANCO : VERDE,
                  border: `1.5px solid ${VERDE}`, borderRadius: 8,
                  padding: "10px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}
              >Me interesa →</button>
            </div>
          ))}

          <BtnSecundario onClick={() => setPagina(2)}>← Volver a página 2</BtnSecundario>
        </div>
      </div>
    );
  }

  if (pantalla === "interes") return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: BLANCO, padding: "16px 24px 14px", borderBottom: `1px solid ${GRIS_BORDE}` }}>
        <Logo />
      </div>
      <div style={{ padding: "32px 24px" }}>
        {!emailOk ? (
          <>
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>🎯</div>
            <h2 style={{ color: CARBON, fontSize: 22, fontWeight: 700, textAlign: "center", margin: "0 0 8px", fontFamily: "Georgia, serif" }}>¡Excelente elección!</h2>
            <div style={{ background: VERDE_SUAVE, border: `1px solid ${VERDE_CLARO}`, borderRadius: 10, padding: "10px 16px", marginBottom: 20, textAlign: "center" }}>
              <span style={{ color: VERDE, fontSize: 13, fontWeight: 700 }}>{planSel}</span>
            </div>
            <p style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, margin: "0 0 28px" }}>
              Déjanos tu email y te avisamos en cuanto el plan esté disponible.
            </p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: GRIS, fontSize: 12, display: "block", marginBottom: 8 }}>Tu email</label>
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@email.com"
                style={{
                  width: "100%", background: BLANCO, border: `1.5px solid ${GRIS_BORDE}`,
                  borderRadius: 10, padding: "13px 16px", color: CARBON,
                  fontSize: 14, boxSizing: "border-box", outline: "none",
                }}
              />
            </div>
            <BtnPrimario onClick={() => setEmailOk(true)} disabled={!email}>Avisarme cuando esté listo →</BtnPrimario>
            <BtnSecundario onClick={() => setPantalla("reporte")}>← Volver al reporte</BtnSecundario>
          </>
        ) : (
          <>
            <div style={{ fontSize: 64, textAlign: "center", marginBottom: 24 }}>✅</div>
            <h2 style={{ color: CARBON, fontSize: 22, fontWeight: 700, textAlign: "center", margin: "0 0 12px", fontFamily: "Georgia, serif" }}>¡Quedaste registrado!</h2>
            <p style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, margin: "0 0 28px" }}>
              Te avisaremos a <strong style={{ color: VERDE }}>{email}</strong> en cuanto el plan esté disponible.
            </p>
            <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", border: `1px solid ${GRIS_BORDE}` }}>
              <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Acción para hoy — gratis</div>
              <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.7, margin: 0 }}>
                Entra a tu perfil de Google Business y responde la reseña más reciente. Es la acción de menor costo y mayor impacto que puedes hacer hoy mismo.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return null;
}