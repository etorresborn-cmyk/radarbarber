'use client';
import { useState, useEffect } from "react";

const CREMA = "#FAF7F0";
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
const BLANCO = "#FFFFFF";

const OPCIONES_PRECIO = [
  { label: "Menos de $100 MXN", value: "menos_100", desc: "Precio muy bajo" },
  { label: "$100 – $180 MXN", value: "100_180", desc: "Por debajo del mercado" },
  { label: "$181 – $280 MXN", value: "181_280", desc: "Precio promedio" },
  { label: "Más de $280 MXN", value: "mas_280", desc: "Precio premium" },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 30, height: 30, background: VERDE, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✂️</div>
      <div>
        <div style={{ color: VERDE, fontWeight: 800, fontSize: 14, letterSpacing: "0.08em", lineHeight: 1 }}>RADAR</div>
        <div style={{ color: ORO, fontSize: 9, letterSpacing: "0.25em" }}>BARBER</div>
      </div>
    </div>
  );
}

function Seccion({ titulo, children }) {
  return (
    <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 14, border: `1px solid ${GRIS_BORDE}` }}>
      <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 14 }}>{titulo}</div>
      {children}
    </div>
  );
}

async function generarPDFPrecios(r) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const VD = [27, 67, 50]; const VM = [45, 106, 79]; const VS = [216, 234, 224];
  const VC = [183, 217, 198]; const OR = [154, 123, 58]; const OS = [245, 237, 214];
  const CR = [250, 247, 240]; const CB = [221, 216, 204]; const CA = [26, 26, 26];
  const GR = [107, 107, 107]; const BL = [255, 255, 255]; const RJ = [139, 46, 46];
  const RS = [245, 224, 224];

  const M = 15; const PW = 180; const FOOTER_Y = 283;
  let y = 0; let numPag = 0;

  function limpiar(t = '') {
    return String(t)
      .replace(/\u00e1/g,'a').replace(/\u00e9/g,'e').replace(/\u00ed/g,'i')
      .replace(/\u00f3/g,'o').replace(/\u00fa/g,'u').replace(/\u00fc/g,'u')
      .replace(/\u00c1/g,'A').replace(/\u00c9/g,'E').replace(/\u00cd/g,'I')
      .replace(/\u00d3/g,'O').replace(/\u00da/g,'U').replace(/\u00dc/g,'U')
      .replace(/\u00f1/g,'n').replace(/\u00d1/g,'N')
      .replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"')
      .replace(/[\u2013\u2014]/g,'-').replace(/\u2026/g,'...')
      .replace(/[^\x00-\x7F]/g,'');
  }

  function altH(texto, ancho, size = 9.5, lh = 5.2) {
    doc.setFontSize(size);
    return doc.splitTextToSize(limpiar(texto), ancho).length * lh;
  }

  function chk(h) {
    if (y + h > FOOTER_Y - 5) {
      dibujarFooter(); doc.addPage(); numPag++; dibujarHeader(); y = 26;
    }
  }

  function dibujarFooter() {
    doc.setFillColor(...VD); doc.rect(0, FOOTER_Y, 210, 14, 'F');
    doc.setFillColor(...OR); doc.rect(0, FOOTER_Y, 210, 1, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...VC);
    doc.text('RadarBarber  |  Plan de Precios', M, FOOTER_Y + 8);
    doc.text(`Pagina ${numPag}`, 210 - M, FOOTER_Y + 8, { align: 'right' });
  }

  function dibujarHeader() {
    doc.setFillColor(...VD); doc.rect(0, 0, 210, 20, 'F');
    doc.setFillColor(...OR); doc.rect(0, 20, 210, 1.2, 'F');
    doc.setFillColor(...VM); doc.roundedRect(M, 4, 12, 12, 2, 2, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...BL);
    doc.text('RB', M + 6, 12, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...BL);
    doc.text('RADARBARBER', M + 16, 9);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...VC);
    doc.text('Plan de Precios', M + 16, 15);
  }

  function escribir(texto, x, yPos, maxW, size = 9.5, bold = false, color = CA, lh = 5.2) {
    doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(...color);
    const lineas = doc.splitTextToSize(limpiar(texto), maxW);
    doc.text(lineas, x, yPos);
    return lineas.length * lh;
  }

  function seccionHeader(num, titulo) {
    chk(18);
    doc.setFillColor(...VD); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFillColor(...OR); doc.circle(M + 8, y + 6, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...BL);
    doc.text(num, M + 8, y + 8.5, { align: 'center' });
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(...BL);
    doc.text(limpiar(titulo), M + 18, y + 8);
    y += 18;
  }

  function etq(texto, color = OR) {
    chk(8); doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...color); doc.text(limpiar(texto.toUpperCase()), M, y); y += 5;
  }

  function parr(texto, indent = 0, size = 9.5) {
    const h = altH(texto, PW - indent, size) + 3; chk(h);
    escribir(texto, M + indent, y, PW - indent, size); y += h;
  }

  function cajaNormal(texto, bgColor = CR, borde = CB) {
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    const lineas = doc.splitTextToSize(limpiar(texto), PW - 12);
    const h = lineas.length * 5.2 + 12; chk(h + 2);
    doc.setFillColor(...bgColor); doc.setDrawColor(...borde); doc.setLineWidth(0.4);
    doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setTextColor(...CA); doc.text(lineas, M + 6, y + 7); y += h + 4;
  }

  function cajaDestacada(texto, bgColor = VS, borde = VC, lineLeft = VM) {
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    const lineas = doc.splitTextToSize(limpiar(texto), PW - 16);
    const h = lineas.length * 5.2 + 14; chk(h + 2);
    doc.setFillColor(...bgColor); doc.setDrawColor(...borde); doc.setLineWidth(0.4);
    doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setFillColor(...lineLeft); doc.rect(M, y, 3.5, h, 'F');
    doc.setTextColor(...CA); doc.text(lineas, M + 7, y + 8); y += h + 5;
  }

  function esp(n = 5) { y += n; }
  function sep() {
    chk(8); doc.setDrawColor(...CB); doc.setLineWidth(0.3);
    doc.line(M, y, M + PW, y); y += 6;
  }

  // PORTADA
  doc.setFillColor(...VD); doc.rect(0, 0, 210, 297, 'F');
  doc.setDrawColor(45, 106, 79); doc.setLineWidth(0.3);
  for (let i = 0; i < 8; i++) doc.line(0, 30 + i * 35, 210, 30 + i * 35);
  doc.setFillColor(...VM); doc.roundedRect(M, 28, 22, 22, 4, 4, 'F');
  doc.setFillColor(...OR); doc.roundedRect(M, 28, 22, 3, 1, 1, 'F');
  doc.setFontSize(13); doc.setFont('helvetica', 'bold'); doc.setTextColor(...BL);
  doc.text('RB', M + 11, 44, { align: 'center' });
  doc.setFontSize(44); doc.setFont('helvetica', 'bold'); doc.setTextColor(...BL);
  doc.text('RADAR', M, 95); doc.setTextColor(...OS); doc.text('BARBER', M, 118);
  doc.setFillColor(...OR); doc.rect(M, 125, 90, 1.5, 'F');
  doc.setFontSize(18); doc.setFont('helvetica', 'normal'); doc.setTextColor(...BL);
  doc.text('Plan de', M, 142); doc.setFont('helvetica', 'bold');
  doc.text('Precios y Tarifas', M, 155);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(...VC);
  doc.text('Cuanto cobrar y como subir sin perder clientes', M, 168);
  doc.setFillColor(20, 52, 38); doc.roundedRect(M, 182, PW, 68, 4, 4, 'F');
  doc.setFillColor(...OR); doc.rect(M, 182, 3.5, 68, 'F');
  doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...OS);
  doc.text('ESTE PLAN INCLUYE:', M + 10, 193);
  const items = [
    '01  Diagnostico de tus precios actuales',
    '02  Precios recomendados por servicio',
    '03  Plan de subida en 2 etapas',
    '04  Tu membresia mensual sugerida',
    '05  Como manejar objeciones de clientes',
  ];
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...BL);
  items.forEach((item, i) => doc.text(item, M + 10, 203 + i * 9));
  doc.setFontSize(8); doc.setTextColor(60, 120, 90);
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${limpiar(fecha)}`, M, 268);
  doc.setTextColor(45, 106, 79);
  doc.text('radarbarber.vercel.app', 210 - M, 268, { align: 'right' });

  // CONTENIDO
  doc.addPage(); numPag = 2; dibujarHeader(); y = 28;

  // S1 — Diagnóstico
  seccionHeader('01', 'DIAGNOSTICO DE TUS PRECIOS');
  parr(r.diagnostico.resumen);
  esp(4);
  const wM = (PW - 4) / 2;
  const hI = altH(r.diagnostico.impacto_anual, wM - 8, 8.5) + 18;
  const hO = altH(r.diagnostico.oportunidad, wM - 8, 8.5) + 18;
  const hD = Math.max(hI, hO, 26);
  chk(hD + 2);
  [0, 1].forEach(i => {
    const x = M + i * (wM + 4);
    const label = i === 0 ? 'IMPACTO ANUAL' : 'OPORTUNIDAD';
    const val = i === 0 ? r.diagnostico.impacto_anual : r.diagnostico.oportunidad;
    const bg = i === 0 ? RS : VS;
    const borde = i === 0 ? [221, 180, 180] : VC;
    doc.setFillColor(...bg); doc.setDrawColor(...borde); doc.setLineWidth(0.3);
    doc.roundedRect(x, y, wM, hD, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...(i === 0 ? RJ : VM));
    doc.text(label, x + 4, y + 7);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...CA);
    const ls = doc.splitTextToSize(limpiar(val), wM - 8);
    doc.text(ls, x + 4, y + 13);
  });
  y += hD + 8;

  // S2 — Precios recomendados
  seccionHeader('02', 'TUS PRECIOS RECOMENDADOS');
  [
    { data: r.precios_recomendados.corte_basico, titulo: 'Corte Basico', detalle: r.precios_recomendados.corte_basico.justificacion, bg: VS, color: VD },
    { data: r.precios_recomendados.corte_premium, titulo: 'Corte Premium', detalle: r.precios_recomendados.corte_premium.que_incluye, bg: OS, color: OR },
    { data: r.precios_recomendados.paquete_completo, titulo: 'Paquete Completo', detalle: r.precios_recomendados.paquete_completo.que_incluye, bg: RS, color: RJ },
  ].forEach(({ data, titulo, detalle, bg, color }, i) => {
    const hDetalle = altH(detalle, PW - 12, 9) + 4;
    const hInc = altH(`+ ${data.incremento_mensual} adicionales al mes`, PW - 16, 8) + 10;
    const hTotal = 14 + hDetalle + hInc + 8;
    chk(hTotal);
    doc.setFillColor(...bg); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(...color);
    doc.text(limpiar(titulo), M + 6, y + 8);
    doc.setFontSize(13); doc.setFont('helvetica', 'bold'); doc.setTextColor(...color);
    doc.text(limpiar(data.precio_sugerido), M + PW - 4, y + 8, { align: 'right' });
    y += 14;
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...CA);
    const linDet = doc.splitTextToSize(limpiar(detalle), PW - 8);
    doc.text(linDet, M + 4, y);
    y += linDet.length * 5 + 4;
    const incrementoTexto = `+ ${limpiar(data.incremento_mensual)} adicionales al mes`;
    const linInc = doc.splitTextToSize(incrementoTexto, PW - 16);
    const hIncReal = linInc.length * 4.8 + 8;
    doc.setFillColor(...VS); doc.roundedRect(M + 4, y - 2, PW - 8, hIncReal, 1, 1, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...VD);
    doc.text(linInc, M + 8, y + 3);
    y += hIncReal + 4;
    if (i < 2) { esp(3); sep(); }
  });
  esp(6);

  // S3 — Estrategia subida
  seccionHeader('03', 'PLAN DE SUBIDA EN 2 ETAPAS');
  [
    { data: r.estrategia_subida.etapa1, num: '1', titulo: 'Primera Subida' },
    { data: r.estrategia_subida.etapa2, num: '2', titulo: 'Segunda Subida' },
  ].forEach(({ data, num, titulo }, i) => {
    const hMsg = altH(data.como_comunicarlo, PW - 16) + 14;
    const hTotal = 14 + 6 + hMsg + 10;
    chk(hTotal);
    doc.setFillColor(...VD); doc.circle(M + 5, y + 4, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...BL);
    doc.text(num, M + 5, y + 6.5, { align: 'center' });
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(...CA);
    doc.text(`${limpiar(titulo)} — ${limpiar(data.cuando)}`, M + 14, y + 5);
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(...VD);
    doc.text(limpiar(data.cuanto_subir), M + PW, y + 5, { align: 'right' });
    y += 12;
    etq('MENSAJE PARA TUS CLIENTES:');
    cajaDestacada(data.como_comunicarlo);
    if (i === 0) { esp(2); sep(); }
  });
  esp(4);

  // S4 — Membresía
  seccionHeader('04', 'TU MEMBRESIA MENSUAL');
  chk(14);
  doc.setFillColor(...VS); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
  doc.setFillColor(...VD); doc.rect(M, y, 4, 12, 'F');
  doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(...VD);
  doc.text(limpiar(r.membresia.precio_sugerido), M + 8, y + 9);
  y += 16;
  parr(r.membresia.que_incluye);
  esp(3);
  etq('COMO PRESENTARLA:');
  cajaNormal(r.membresia.argumento_venta, VS, VC);
  chk(14);
  doc.setFillColor(...OS); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...CA);
  doc.text(`Con 30 miembros: ${limpiar(r.membresia.ingreso_garantizado)}`, M + 6, y + 8);
  y += 16; esp(4);

  // S5 — Objeciones (máximo 3)
  seccionHeader('05', 'COMO MANEJAR OBJECIONES');
  const objeciones = r.como_manejar_objeciones.slice(0, 3);
  objeciones.forEach((obj, j) => {
    const hObj = altH(obj.objecion, PW - 30, 8.5) + 12;
    const hResp = altH(obj.respuesta, PW - 16) + 14;
    const hTotal = hObj + hResp + 14;
    chk(hTotal);
    doc.setFillColor(...RS); doc.roundedRect(M, y, PW, hObj, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...RJ);
    doc.text('Cliente dice:', M + 4, y + 6);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...CA);
    const lObj = doc.splitTextToSize(limpiar(obj.objecion), PW - 30);
    doc.text(lObj, M + 28, y + 6);
    y += hObj + 3;
    etq('Tu respuesta:', VM);
    cajaDestacada(obj.respuesta);
    if (j < objeciones.length - 1) { esp(2); sep(); }
  });

  dibujarFooter();
  doc.save('RadarBarber-Plan-Precios.pdf');
}

export default function ReportePrecios() {
  const [estado, setEstado] = useState("pregunta");
  const [precioActual, setPrecioActual] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [mostrarEmail, setMostrarEmail] = useState(false);

  async function generarReporte() {
    if (!precioActual) return;
    setEstado("cargando");
    try {
      const datos = sessionStorage.getItem("radarbarber_respuestas");
      const respuestas = datos ? JSON.parse(datos) : {};
      const res = await fetch("/api/reporte-precios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...respuestas, precio_actual: precioActual }),
      });
      const data = await res.json();
      if (data.ok) { setReporte(data.reporte); setEstado("listo"); }
      else setEstado("error");
    } catch { setEstado("error"); }
  }

  if (estado === "pregunta") return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
        <Logo />
        <div style={{ marginTop: 16 }}>
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>PLAN DE PRECIOS</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Una pregunta antes de tu plan
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Necesitamos saber tu precio actual para darte recomendaciones exactas en pesos.
          </p>
        </div>
      </div>
      <div style={{ padding: "28px 24px" }}>
        <h2 style={{ color: CARBON, fontSize: 18, fontWeight: 700, margin: "0 0 20px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
          💰 ¿Cuánto cobras por un corte básico?
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {OPCIONES_PRECIO.map((op) => {
            const sel = precioActual === op.value;
            return (
              <button key={op.value} onClick={() => setPrecioActual(op.value)} style={{
                background: sel ? VERDE_SUAVE : BLANCO,
                border: `1.5px solid ${sel ? VERDE2 : GRIS_BORDE}`,
                borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center",
                justifyContent: "space-between", transition: "all 0.15s",
              }}>
                <div>
                  <div style={{ color: sel ? VERDE : CARBON, fontSize: 14, fontWeight: 700 }}>{op.label}</div>
                  <div style={{ color: GRIS, fontSize: 12, marginTop: 2 }}>{op.desc}</div>
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
        <button onClick={generarReporte} disabled={!precioActual} style={{
          width: "100%", background: precioActual ? VERDE : CREMA3,
          color: precioActual ? BLANCO : GRIS, border: "none",
          borderRadius: 12, padding: "15px", fontSize: 14, fontWeight: 700,
          cursor: precioActual ? "pointer" : "not-allowed",
        }}>
          Generar mi Plan de Precios →
        </button>
        <button onClick={() => window.history.back()} style={{
          width: "100%", background: "transparent", color: GRIS,
          border: "none", fontSize: 13, cursor: "pointer", padding: "10px", marginTop: 8,
        }}>← Volver</button>
      </div>
    </div>
  );

  if (estado === "cargando") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ width: 64, height: 64, background: VERDE, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>💰</div>
      <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>ANALIZANDO TUS PRECIOS</div>
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 260 }}>Calculando tu estrategia de precios personalizada...</div>
      <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 9, height: 9, background: VERDE, borderRadius: "50%", animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.25;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}`}</style>
    </div>
  );

  if (estado === "error") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
      <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>Algo salio mal</h2>
      <button onClick={() => setEstado("pregunta")} style={{ background: VERDE, color: BLANCO, padding: "14px 28px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Intentar de nuevo</button>
    </div>
  );

  const r = reporte;

  return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
        <Logo />
        <div style={{ marginTop: 16 }}>
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>PLAN DE PRECIOS</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Cuanto cobrar y como subir sin perder clientes
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>Basado en benchmarks reales del sector en Mexico</p>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <Seccion titulo="💰 DIAGNOSTICO DE TUS PRECIOS">
          <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>{r.diagnostico.resumen}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: ROJO_SUAVE, borderRadius: 10, padding: "10px 12px", border: `1px solid ${CREMA3}` }}>
              <div style={{ color: ROJO, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>IMPACTO ANUAL</div>
              <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.4 }}>{r.diagnostico.impacto_anual}</div>
            </div>
            <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "10px 12px", border: `1px solid ${VERDE_CLARO}` }}>
              <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>OPORTUNIDAD</div>
              <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.4 }}>{r.diagnostico.oportunidad}</div>
            </div>
          </div>
        </Seccion>

        <Seccion titulo="📊 TUS PRECIOS RECOMENDADOS">
          {[
            { data: r.precios_recomendados.corte_basico, titulo: "Corte Básico", icon: "✂️", detalle: r.precios_recomendados.corte_basico.justificacion },
            { data: r.precios_recomendados.corte_premium, titulo: "Corte Premium", icon: "⭐", detalle: r.precios_recomendados.corte_premium.que_incluye },
            { data: r.precios_recomendados.paquete_completo, titulo: "Paquete Completo", icon: "🎯", detalle: r.precios_recomendados.paquete_completo.que_incluye },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ color: CARBON, fontSize: 14, fontWeight: 700 }}>{item.titulo}</span>
                </div>
                <span style={{ color: VERDE, fontSize: 18, fontWeight: 800 }}>{item.data.precio_sugerido}</span>
              </div>
              <div style={{ color: GRIS, fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{item.detalle}</div>
              <div style={{ background: VERDE_SUAVE, borderRadius: 8, padding: "6px 10px" }}>
                <span style={{ color: VERDE, fontSize: 11, fontWeight: 700 }}>+{item.data.incremento_mensual} adicionales/mes</span>
              </div>
              {i < 2 && <div style={{ height: 1, background: GRIS_BORDE, margin: "14px 0" }} />}
            </div>
          ))}
        </Seccion>

        <Seccion titulo="📅 PLAN DE SUBIDA DE PRECIOS">
          {[
            { data: r.estrategia_subida.etapa1, num: "1", titulo: "Primera subida" },
            { data: r.estrategia_subida.etapa2, num: "2", titulo: "Segunda subida" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? 16 : 0 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, background: VERDE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: BLANCO, flexShrink: 0 }}>{item.num}</div>
                <div>
                  <div style={{ color: CARBON, fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.titulo}</div>
                  <div style={{ color: GRIS, fontSize: 12 }}>{item.data.cuando} · <strong style={{ color: VERDE }}>{item.data.cuanto_subir}</strong></div>
                </div>
              </div>
              <div style={{ background: CREMA3, borderRadius: 10, padding: "12px 14px", marginLeft: 40 }}>
                <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>MENSAJE PARA TUS CLIENTES:</div>
                <p style={{ color: CARBON, fontSize: 12, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{item.data.como_comunicarlo}</p>
              </div>
              {i === 0 && <div style={{ height: 1, background: GRIS_BORDE, margin: "16px 0" }} />}
            </div>
          ))}
        </Seccion>

        <Seccion titulo="🔄 TU MEMBRESIA MENSUAL">
          <div style={{ background: VERDE_SUAVE, borderRadius: 12, padding: "16px", marginBottom: 12, border: `1px solid ${VERDE_CLARO}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ color: VERDE, fontSize: 15, fontWeight: 800 }}>{r.membresia.precio_sugerido}</div>
              <span style={{ background: VERDE, color: BLANCO, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 5 }}>RECURRENTE</span>
            </div>
            <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{r.membresia.que_incluye}</div>
            <div style={{ height: 1, background: VERDE_CLARO, marginBottom: 10 }} />
            <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>COMO PRESENTARLA:</div>
            <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{r.membresia.argumento_venta}</div>
            <div style={{ background: BLANCO, borderRadius: 8, padding: "8px 12px" }}>
              <span style={{ color: GRIS, fontSize: 11 }}>Con 30 miembros: </span>
              <span style={{ color: VERDE, fontSize: 11, fontWeight: 700 }}>{r.membresia.ingreso_garantizado}</span>
            </div>
          </div>
        </Seccion>

        <Seccion titulo="💬 COMO MANEJAR OBJECIONES">
          {r.como_manejar_objeciones.slice(0, 3).map((obj, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
              <div style={{ background: ROJO_SUAVE, borderRadius: 8, padding: "8px 12px", marginBottom: 8, border: `1px solid ${CREMA3}` }}>
                <span style={{ color: ROJO, fontSize: 11, fontWeight: 700 }}>Cliente: </span>
                <span style={{ color: CARBON, fontSize: 12 }}>{obj.objecion}</span>
              </div>
              <div style={{ background: VERDE_SUAVE, borderRadius: 8, padding: "8px 12px", marginLeft: 12, border: `1px solid ${VERDE_CLARO}` }}>
                <span style={{ color: VERDE, fontSize: 11, fontWeight: 700 }}>Tu respuesta: </span>
                <span style={{ color: CARBON, fontSize: 12 }}>{obj.respuesta}</span>
              </div>
              {i < 2 && <div style={{ height: 1, background: GRIS_BORDE, margin: "14px 0" }} />}
            </div>
          ))}
        </Seccion>

        {!mostrarEmail ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>¿Quieres guardar este plan?</div>
            <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>Descarga el PDF para tenerlo siempre a mano.</p>
            <button onClick={() => setMostrarEmail(true)} style={{ width: "100%", background: VERDE, color: BLANCO, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Descargar PDF gratis →
            </button>
          </div>
        ) : !emailOk ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Un ultimo paso</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@email.com"
              style={{ width: "100%", background: CREMA, border: `1.5px solid ${GRIS_BORDE}`, borderRadius: 10, padding: "13px 16px", color: CARBON, fontSize: 14, boxSizing: "border-box", outline: "none", marginBottom: 12 }} />
            <button onClick={() => { if (email) { setEmailOk(true); generarPDFPrecios(r); } }} disabled={!email}
              style={{ width: "100%", background: email ? VERDE : CREMA3, color: email ? BLANCO : GRIS, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: email ? "pointer" : "not-allowed" }}>
              Descargar mi PDF →
            </button>
          </div>
        ) : (
          <div style={{ background: VERDE_SUAVE, borderRadius: 14, padding: "20px", border: `1px solid ${VERDE_CLARO}`, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
            <div style={{ color: VERDE, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>PDF descargandose!</div>
            <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: 0 }}>Revisa tus descargas. Copia guardada en <strong>{email}</strong></p>
          </div>
        )}

        <p style={{ color: GRIS, fontSize: 10, textAlign: "center", lineHeight: 1.6 }}>
          RadarBarber · Plan basado en datos reales del sector de barberias en Mexico
        </p>
      </div>
    </div>
  );
}