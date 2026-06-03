'use client';
import { useState } from "react";

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

const OPCIONES_SERVICIOS = [
  { label: "Arreglo de barba", value: "barba" },
  { label: "Afeitado con navaja", value: "afeitado" },
  { label: "Masaje de cuero cabelludo", value: "masaje" },
  { label: "Coloración de barba", value: "coloracion" },
  { label: "Tratamientos capilares", value: "tratamiento" },
  { label: "Venta de productos grooming", value: "productos" },
  { label: "Solo corte básico por ahora", value: "solo_basico" },
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

async function generarPDFServicios(r) {
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
    doc.text('RadarBarber  |  Plan de Servicios', M, FOOTER_Y + 8);
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
    doc.text('Plan de Servicios', M + 16, 15);
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

  // ══ PORTADA ══════════════════════════════════════════════════════════
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
  doc.text('Servicios', M, 155);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(...VC);
  doc.text('Aumenta tu ticket sin necesitar mas clientes', M, 168);
  doc.setFillColor(20, 52, 38); doc.roundedRect(M, 182, PW, 68, 4, 4, 'F');
  doc.setFillColor(...OR); doc.rect(M, 182, 3.5, 68, 'F');
  doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...OS);
  doc.text('ESTE PLAN INCLUYE:', M + 10, 193);
  const items = [
    '01  Diagnostico de tu ticket actual vs potencial',
    '02  Los 3 servicios que debes agregar primero',
    '03  Script de upsell para cada servicio',
    '04  Tu nuevo menu de servicios sugerido',
    '05  Plan de implementacion semana a semana',
  ];
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...BL);
  items.forEach((item, i) => doc.text(item, M + 10, 203 + i * 9));
  doc.setFontSize(8); doc.setTextColor(60, 120, 90);
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${limpiar(fecha)}`, M, 268);
  doc.setTextColor(45, 106, 79);
  doc.text('radarbarber.vercel.app', 210 - M, 268, { align: 'right' });

  // ══ CONTENIDO ══════════════════════════════════════════════════════════
  doc.addPage(); numPag = 2; dibujarHeader(); y = 28;

  // S1 — Diagnóstico
  seccionHeader('01', 'DIAGNOSTICO DE TU TICKET ACTUAL');
  parr(r.diagnostico.resumen);
  esp(4);

  const wM = (PW - 4) / 2;
  const vals = [
    { label: 'TICKET ACTUAL', val: r.diagnostico.ticket_actual_estimado, col: RJ, bg: RS, borde: [221, 180, 180] },
    { label: 'TICKET POTENCIAL', val: r.diagnostico.ticket_potencial, col: VM, bg: VS, borde: VC },
  ];
  const hVals = vals.map(v => altH(v.val, wM - 8, 9) + 20);
  const hD = Math.max(...hVals, 28);
  chk(hD + 2);
  vals.forEach((v, i) => {
    const x = M + i * (wM + 4);
    doc.setFillColor(...v.bg); doc.setDrawColor(...v.borde); doc.setLineWidth(0.3);
    doc.roundedRect(x, y, wM, hD, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...v.col);
    doc.text(v.label, x + 4, y + 7);
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...CA);
    const linVal = doc.splitTextToSize(limpiar(v.val), wM - 8);
    doc.text(linVal, x + 4, y + 14);
  });
  y += hD + 4;

  chk(12);
  doc.setFillColor(...VS); doc.roundedRect(M, y, PW, 10, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...VD);
  const linInc = doc.splitTextToSize(`Incremento mensual potencial: ${limpiar(r.diagnostico.incremento_mensual)}`, PW - 12);
  doc.text(linInc, M + 6, y + 7);
  y += Math.max(linInc.length * 5, 10) + 6;
  esp(4);

  // S2 — Servicios recomendados
  seccionHeader('02', 'LOS 3 SERVICIOS QUE DEBES AGREGAR');
  r.servicios_recomendados.forEach((srv, i) => {
    // Calcular altura total del bloque antes de dibujarlo
    const hPorQue = altH(srv.por_que, PW - 12, 9) + 4;
    const hGrid = 22;
    const hScript = altH(srv.script_upsell, PW - 16) + 14;
    const hEtq = 10;
    const hTotal = 14 + hPorQue + hGrid + hEtq + hScript + 10;
    chk(hTotal);

    const colores = [VD, OR, [45, 100, 80]];
    const bgs = [VS, OS, [220, 240, 230]];
    const bordes = [VC, [...OR], [150, 200, 170]];

    // Header servicio
    doc.setFillColor(...bgs[i]); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFillColor(...colores[i]); doc.rect(M, y, 4, 12, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colores[i]);
    doc.text(`${i + 1}. ${limpiar(srv.nombre)}`, M + 8, y + 8);
    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text(limpiar(srv.precio_sugerido), M + PW - 4, y + 8, { align: 'right' });
    y += 14;

    // Por qué
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...CA);
    const linPQ = doc.splitTextToSize(limpiar(srv.por_que), PW - 8);
    doc.text(linPQ, M + 4, y);
    y += linPQ.length * 5 + 5;

    // Grid de datos
    const gridItems = [
      { label: 'Tiempo extra', val: srv.tiempo_adicional },
      { label: 'Inversion inicial', val: srv.inversion_inicial },
      { label: 'Sube ticket', val: srv.incremento_ticket },
    ];
    const wG = (PW - 8) / 3;
    chk(hGrid);
    gridItems.forEach((g, j) => {
      const x = M + j * (wG + 4);
      doc.setFillColor(...CR); doc.setDrawColor(...CB); doc.setLineWidth(0.3);
      doc.roundedRect(x, y, wG, hGrid - 2, 1, 1, 'FD');
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...GR);
      doc.text(limpiar(g.label.toUpperCase()), x + 3, y + 5);
      doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...CA);
      const linG = doc.splitTextToSize(limpiar(g.val), wG - 6);
      doc.text(linG, x + 3, y + 12);
    });
    y += hGrid + 3;

    // Script upsell
    etq('Script de upsell — lo que dices mientras cortas:');
    cajaDestacada(
      srv.script_upsell,
      i === 0 ? VS : i === 1 ? OS : [220, 240, 230],
      i === 0 ? VC : i === 1 ? [200, 170, 100] : [150, 200, 170],
      colores[i]
    );

    if (i < r.servicios_recomendados.length - 1) { esp(2); sep(); }
  });
  esp(6);

  // S3 — Menú sugerido
  seccionHeader('03', 'TU NUEVO MENU DE SERVICIOS');
  parr(r.menu_sugerido.descripcion);
  esp(4);
  r.menu_sugerido.estructura.forEach((opcion, i) => {
    const esUltimo = i === r.menu_sugerido.estructura.length - 1;
    const hOp = altH(opcion, PW - 14, 9.5) + 10;
    chk(hOp + 2);
    const bg = esUltimo ? VS : i % 2 === 0 ? CR : [245, 245, 240];
    doc.setFillColor(...bg);
    doc.roundedRect(M, y - 2, PW, hOp, 1, 1, 'F');
    if (esUltimo) {
      doc.setFillColor(...VD);
      doc.rect(M, y - 2, 3.5, hOp, 'F');
    }
    doc.setFontSize(9.5);
    doc.setFont('helvetica', esUltimo ? 'bold' : 'normal');
    doc.setTextColor(...(esUltimo ? VD : CA));
    const linOp = doc.splitTextToSize(limpiar(opcion), PW - 14);
    doc.text(linOp, esUltimo ? M + 7 : M + 6, y + 4);
    y += hOp + 2;
  });
  esp(6);

  // S4 — Plan implementación
  seccionHeader('04', 'PLAN DE IMPLEMENTACION');
  r.plan_implementacion.forEach((sem, i) => {
    const hAcc = altH(sem.accion, PW - 20, 9.5) + 14;
    chk(hAcc + 4);
    doc.setFillColor(...OS); doc.roundedRect(M, y, PW, hAcc, 2, 2, 'F');
    doc.setFillColor(...OR); doc.rect(M, y, 4, hAcc, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...OR);
    doc.text(limpiar(sem.semana), M + 8, y + 7);
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...CA);
    const linAcc = doc.splitTextToSize(limpiar(sem.accion), PW - 20);
    doc.text(linAcc, M + 8, y + 13);
    y += hAcc + 5;
  });

  dibujarFooter();
  doc.save('RadarBarber-Plan-Servicios.pdf');
}

export default function ReporteServicios() {
  const [estado, setEstado] = useState("pregunta");
  const [serviciosActuales, setServiciosActuales] = useState([]);
  const [reporte, setReporte] = useState(null);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [mostrarEmail, setMostrarEmail] = useState(false);

  function toggleServicio(value) {
    setServiciosActuales(prev =>
      prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  }

  async function generarReporte() {
    setEstado("cargando");
    try {
      const datos = sessionStorage.getItem("radarbarber_respuestas");
      const respuestas = datos ? JSON.parse(datos) : {};
      const res = await fetch("/api/reporte-servicios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...respuestas, servicios_actuales: serviciosActuales }),
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
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>PLAN DE SERVICIOS</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Una pregunta antes de tu plan
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Selecciona los servicios que ya ofreces para recomendarte solo lo que te falta.
          </p>
        </div>
      </div>
      <div style={{ padding: "28px 24px" }}>
        <h2 style={{ color: CARBON, fontSize: 18, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
          ✂️ ¿Qué servicios ofreces actualmente?
        </h2>
        <p style={{ color: GRIS, fontSize: 12, margin: "0 0 20px" }}>Puedes elegir varios</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {OPCIONES_SERVICIOS.map((op) => {
            const sel = serviciosActuales.includes(op.value);
            return (
              <button key={op.value} onClick={() => toggleServicio(op.value)} style={{
                background: sel ? VERDE_SUAVE : BLANCO,
                border: `1.5px solid ${sel ? VERDE2 : GRIS_BORDE}`,
                borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center",
                justifyContent: "space-between", transition: "all 0.15s",
              }}>
                <div style={{ color: sel ? VERDE : CARBON, fontSize: 14, fontWeight: sel ? 700 : 400 }}>
                  {op.label}
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 4,
                  border: `2px solid ${sel ? VERDE : GRIS_BORDE}`,
                  background: sel ? VERDE : BLANCO, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {sel && <div style={{ color: BLANCO, fontSize: 12, fontWeight: 700 }}>✓</div>}
                </div>
              </button>
            );
          })}
        </div>
        <button onClick={generarReporte} style={{
          width: "100%", background: VERDE, color: BLANCO, border: "none",
          borderRadius: 12, padding: "15px", fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>
          Generar mi Plan de Servicios →
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
      <div style={{ width: 64, height: 64, background: VERDE, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>✂️</div>
      <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>ANALIZANDO TUS SERVICIOS</div>
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 260 }}>Calculando tu plan de servicios personalizado...</div>
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
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>PLAN DE SERVICIOS</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Aumenta tu ticket sin nuevos clientes
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>Basado en benchmarks reales del sector en Mexico</p>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>

        <Seccion titulo="📊 DIAGNOSTICO DE TU TICKET ACTUAL">
          <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>{r.diagnostico.resumen}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ background: ROJO_SUAVE, borderRadius: 10, padding: "10px 12px", border: `1px solid ${CREMA3}` }}>
              <div style={{ color: ROJO, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>TICKET ACTUAL</div>
              <div style={{ color: CARBON, fontSize: 14, fontWeight: 800, lineHeight: 1.3 }}>{r.diagnostico.ticket_actual_estimado}</div>
            </div>
            <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "10px 12px", border: `1px solid ${VERDE_CLARO}` }}>
              <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>TICKET POTENCIAL</div>
              <div style={{ color: CARBON, fontSize: 14, fontWeight: 800, lineHeight: 1.3 }}>{r.diagnostico.ticket_potencial}</div>
            </div>
          </div>
          <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "10px 14px", border: `1px solid ${VERDE_CLARO}` }}>
            <span style={{ color: VERDE, fontSize: 12, fontWeight: 700 }}>💰 Incremento mensual potencial: </span>
            <span style={{ color: CARBON, fontSize: 12 }}>{r.diagnostico.incremento_mensual}</span>
          </div>
        </Seccion>

        <Seccion titulo="✂️ LOS 3 SERVICIOS QUE DEBES AGREGAR">
          {r.servicios_recomendados.map((srv, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, background: VERDE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: BLANCO, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ color: CARBON, fontSize: 14, fontWeight: 700 }}>{srv.nombre}</span>
                </div>
                <span style={{ color: VERDE, fontSize: 16, fontWeight: 800 }}>{srv.precio_sugerido}</span>
              </div>
              <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.5, margin: "0 0 10px" }}>{srv.por_que}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                {[
                  ["⏱", "Tiempo extra", srv.tiempo_adicional],
                  ["💵", "Inversión", srv.inversion_inicial],
                  ["📈", "Sube ticket", srv.incremento_ticket],
                ].map(([ic, label, val]) => (
                  <div key={label} style={{ background: CREMA, borderRadius: 8, padding: "8px 10px", border: `1px solid ${GRIS_BORDE}` }}>
                    <div style={{ fontSize: 14, marginBottom: 3 }}>{ic}</div>
                    <div style={{ color: GRIS, fontSize: 9, marginBottom: 2 }}>{label}</div>
                    <div style={{ color: CARBON, fontSize: 11, fontWeight: 700 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: CREMA3, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 5 }}>LO QUE DICES MIENTRAS CORTAS:</div>
                <p style={{ color: CARBON, fontSize: 12, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{srv.script_upsell}"</p>
              </div>
              {i < 2 && <div style={{ height: 1, background: GRIS_BORDE, margin: "16px 0" }} />}
            </div>
          ))}
        </Seccion>

        <Seccion titulo="📋 TU NUEVO MENU DE SERVICIOS">
          <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.5, margin: "0 0 12px" }}>{r.menu_sugerido.descripcion}</p>
          {r.menu_sugerido.estructura.map((opcion, i) => (
            <div key={i} style={{
              padding: "10px 12px", marginBottom: 4,
              background: i === r.menu_sugerido.estructura.length - 1 ? VERDE_SUAVE : i % 2 === 0 ? BLANCO : CREMA,
              borderRadius: 8,
              border: `1px solid ${i === r.menu_sugerido.estructura.length - 1 ? VERDE_CLARO : GRIS_BORDE}`,
              borderLeft: i === r.menu_sugerido.estructura.length - 1 ? `3px solid ${VERDE}` : undefined,
            }}>
              <span style={{ color: i === r.menu_sugerido.estructura.length - 1 ? VERDE : CARBON, fontSize: 13, fontWeight: i === r.menu_sugerido.estructura.length - 1 ? 700 : 400 }}>{opcion}</span>
            </div>
          ))}
        </Seccion>

        <Seccion titulo="🗓 PLAN DE IMPLEMENTACION">
          {r.plan_implementacion.map((sem, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < r.plan_implementacion.length - 1 ? 12 : 0 }}>
              <div style={{ background: ORO_SUAVE, borderRadius: 8, padding: "6px 10px", flexShrink: 0, height: "fit-content", border: `1px solid ${CREMA3}` }}>
                <div style={{ color: ORO, fontSize: 10, fontWeight: 700 }}>{sem.semana}</div>
              </div>
              <div style={{ color: CARBON, fontSize: 13, lineHeight: 1.6, paddingTop: 6 }}>{sem.accion}</div>
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
            <button onClick={() => { if (email) { setEmailOk(true); generarPDFServicios(r); } }} disabled={!email}
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