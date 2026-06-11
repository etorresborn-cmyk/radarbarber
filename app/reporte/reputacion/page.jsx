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

function ScoreCircle({ score }) {
  const color = score >= 70 ? VERDE2 : score >= 40 ? ORO : ROJO;
  const bg = score >= 70 ? VERDE_SUAVE : score >= 40 ? ORO_SUAVE : ROJO_SUAVE;
  const label = score >= 70 ? "Buena" : score >= 40 ? "Media" : "Critica";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: bg, border: `3px solid ${color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{score}</div>
        <div style={{ color, fontSize: 9, fontWeight: 700 }}>/ 100</div>
      </div>
      <div>
        <div style={{ color, fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{label}</div>
        <div style={{ color: GRIS, fontSize: 11, lineHeight: 1.5 }}>Score de reputacion online</div>
      </div>
    </div>
  );
}

async function generarPDFReputacion(r) {
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

  function getLineas(texto, ancho, size = 9.5) {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'normal');
    return doc.splitTextToSize(limpiar(texto), ancho);
  }

  function altH(texto, ancho, size = 9.5, lh = 5.2) {
    return getLineas(texto, ancho, size).length * lh;
  }

  function chk(h) {
    if (y + h > FOOTER_Y - 5) {
      dibujarFooter(); doc.addPage(); numPag++; dibujarHeader(); y = 26;
    }
  }

  function dibujarFooter() {
    doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(0, FOOTER_Y, 210, 14, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(0, FOOTER_Y, 210, 1, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(VC[0], VC[1], VC[2]);
    doc.text('RadarBarber  |  Plan de Reputacion', M, FOOTER_Y + 8);
    doc.text(`Pagina ${numPag}`, 210 - M, FOOTER_Y + 8, { align: 'right' });
  }

  function dibujarHeader() {
    doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(0, 0, 210, 20, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(0, 20, 210, 1.2, 'F');
    doc.setFillColor(VM[0], VM[1], VM[2]); doc.roundedRect(M, 4, 12, 12, 2, 2, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text('RB', M + 6, 12, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('RADARBARBER', M + 16, 9);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(VC[0], VC[1], VC[2]); doc.text('Plan de Reputacion', M + 16, 15);
  }

  function escribir(texto, x, yPos, maxW, size = 9.5, bold = false, color = CA, lh = 5.2) {
    doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    const lineas = doc.splitTextToSize(limpiar(texto), maxW);
    doc.text(lineas, x, yPos);
    return lineas.length * lh;
  }

  function seccionHeader(num, titulo) {
    chk(18);
    doc.setFillColor(VD[0], VD[1], VD[2]); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.circle(M + 8, y + 6, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text(num, M + 8, y + 8.5, { align: 'center' });
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text(limpiar(titulo), M + 18, y + 8);
    y += 18;
  }

  function etq(texto, colorArr = OR) {
    chk(8); doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
    doc.text(limpiar(texto.toUpperCase()), M, y); y += 5;
  }

  function parr(texto, indent = 0, size = 9.5) {
    const lineas = getLineas(texto, PW - indent, size);
    const h = lineas.length * 5.2 + 3; chk(h);
    doc.setFontSize(size); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(lineas, M + indent, y); y += h;
  }

  function cajaDestacada(texto, bgArr = VS, bordeArr = VC, lineArr = VM) {
    const lineas = getLineas(texto, PW - 16);
    const h = lineas.length * 5.2 + 14; chk(h + 2);
    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.setDrawColor(bordeArr[0], bordeArr[1], bordeArr[2]);
    doc.setLineWidth(0.4);
    doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setFillColor(lineArr[0], lineArr[1], lineArr[2]);
    doc.rect(M, y, 3.5, h, 'F');
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(lineas, M + 7, y + 8); y += h + 5;
  }

  function esp(n = 5) { y += n; }
  function sep() {
    chk(8); doc.setDrawColor(CB[0], CB[1], CB[2]); doc.setLineWidth(0.3);
    doc.line(M, y, M + PW, y); y += 6;
  }

  function bloqueAccion(acciones, bgArr, colorArr, titulo) {
    chk(14);
    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
    doc.text(titulo, M + 6, y + 6);
    y += 13;
    acciones.forEach((accion, i) => {
      const h = altH(accion, PW - 12) + 4; chk(h);
      doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
      doc.circle(M + 3.5, y + 1.5, 3.5, 'F');
      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
      doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
      doc.text(`${i + 1}`, M + 3.5, y + 3.5, { align: 'center' });
      escribir(accion, M + 10, y, PW - 12);
      y += h + 1;
    });
    esp(6);
  }

  // ══ PORTADA ══════════════════════════════════════════════════════════
  doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(0, 0, 210, 297, 'F');
  doc.setDrawColor(45, 106, 79); doc.setLineWidth(0.3);
  for (let i = 0; i < 8; i++) doc.line(0, 30 + i * 35, 210, 30 + i * 35);
  doc.setFillColor(VM[0], VM[1], VM[2]); doc.roundedRect(M, 28, 22, 22, 4, 4, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.roundedRect(M, 28, 22, 3, 1, 1, 'F');
  doc.setFontSize(13); doc.setFont('helvetica', 'bold');
  doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('RB', M + 11, 44, { align: 'center' });
  doc.setFontSize(44); doc.setFont('helvetica', 'bold');
  doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('RADAR', M, 95);
  doc.setTextColor(OS[0], OS[1], OS[2]); doc.text('BARBER', M, 118);
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, 125, 90, 1.5, 'F');
  doc.setFontSize(18); doc.setFont('helvetica', 'normal');
  doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('Plan de', M, 142);
  doc.setFont('helvetica', 'bold'); doc.text('Reputacion Online', M, 155);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  doc.setTextColor(VC[0], VC[1], VC[2]);
  doc.text('Sistema para dominar Google Maps', M, 168);
  doc.setFillColor(20, 52, 38); doc.roundedRect(M, 182, PW, 68, 4, 4, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, 182, 3.5, 68, 'F');
  doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
  doc.setTextColor(OS[0], OS[1], OS[2]); doc.text('ESTE PLAN INCLUYE:', M + 10, 193);
  const items = [
    '01  Tu score de reputacion actual',
    '02  Sistema de resenas en 3 pasos',
    '03  Gestion semanal en minutos',
    '04  Respuestas modelo para copiar',
    '05  Acciones urgentes en Google Business',
    '06  Tu plan de accion — proximos 30 dias',
  ];
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BL[0], BL[1], BL[2]);
  items.forEach((item, i) => doc.text(item, M + 10, 200 + i * 8));
  doc.setFontSize(8); doc.setTextColor(60, 120, 90);
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${limpiar(fecha)}`, M, 268);
  doc.setTextColor(45, 106, 79);
  doc.text('radarbarber.vercel.app', 210 - M, 268, { align: 'right' });

  // ══ CONTENIDO ══════════════════════════════════════════════════════════
  doc.addPage(); numPag = 2; dibujarHeader(); y = 28;

  // S1 — Score
  seccionHeader('01', 'TU SCORE DE REPUTACION ACTUAL');
  const scoreCol = r.diagnostico.score_actual >= 70 ? VM : r.diagnostico.score_actual >= 40 ? OR : RJ;
  const scoreBgCol = r.diagnostico.score_actual >= 70 ? VS : r.diagnostico.score_actual >= 40 ? OS : RS;
  doc.setFillColor(scoreBgCol[0], scoreBgCol[1], scoreBgCol[2]);
  doc.circle(M + 14, y + 14, 14, 'F');
  doc.setLineWidth(2); doc.setDrawColor(scoreCol[0], scoreCol[1], scoreCol[2]);
  doc.circle(M + 14, y + 14, 14, 'D');
  doc.setFontSize(16); doc.setFont('helvetica', 'bold');
  doc.setTextColor(scoreCol[0], scoreCol[1], scoreCol[2]);
  doc.text(String(r.diagnostico.score_actual), M + 14, y + 17, { align: 'center' });
  doc.setFontSize(7); doc.text('/ 100', M + 14, y + 23, { align: 'center' });
  escribir(r.diagnostico.resumen, M + 34, y + 8, PW - 36);
  y += 32; esp(3);

  const wMitad = (PW - 4) / 2;
  const hImp = altH(r.diagnostico.impacto_mensual, wMitad - 8, 8.5) + 16;
  const hMeta = altH(r.diagnostico.meta_30_dias, wMitad - 8, 8.5) + 16;
  const hDoble = Math.max(hImp, hMeta, 24);
  chk(hDoble + 2);
  [0, 1].forEach(i => {
    const x = M + i * (wMitad + 4);
    const label = i === 0 ? 'IMPACTO MENSUAL' : 'META 30 DIAS';
    const val = i === 0 ? r.diagnostico.impacto_mensual : r.diagnostico.meta_30_dias;
    const bg = i === 0 ? RS : VS; const borde = i === 0 ? [221, 180, 180] : VC;
    const col = i === 0 ? RJ : VM;
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.setDrawColor(borde[0], borde[1], borde[2]);
    doc.setLineWidth(0.3); doc.roundedRect(x, y, wMitad, hDoble, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(col[0], col[1], col[2]); doc.text(label, x + 4, y + 6);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const ls = doc.splitTextToSize(limpiar(i === 0 ? r.diagnostico.impacto_mensual : r.diagnostico.meta_30_dias), wMitad - 8);
    doc.text(ls, x + 4, y + 12);
  });
  y += hDoble + 8;

  // S2 — Sistema reseñas
  seccionHeader('02', 'TU SISTEMA DE RESENAS EN 3 PASOS');
  [
    { paso: r.sistema_resenas.paso1, num: '1', key: 'script', label: 'LO QUE DICES:' },
    { paso: r.sistema_resenas.paso2, num: '2', key: 'instrucciones', label: 'COMO HACERLO:' },
    { paso: r.sistema_resenas.paso3, num: '3', key: 'mensaje', label: 'MENSAJE WHATSAPP:' },
  ].forEach(({ paso, num, key, label }, i) => {
    chk(40);
    doc.setFillColor(VD[0], VD[1], VD[2]); doc.circle(M + 5, y + 4, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text(num, M + 5, y + 6.5, { align: 'center' });
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(CA[0], CA[1], CA[2]); doc.text(limpiar(paso.titulo), M + 14, y + 5);
    y += 12;
    parr(paso.descripcion, 4, 9); esp(2);
    etq(label, OR);
    cajaDestacada(paso[key]);
    if (i < 2) { esp(2); sep(); }
  });

  // S3 — Gestión semanal
  seccionHeader('03', 'GESTION SEMANAL EN MINUTOS');
  chk(12);
  doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y, PW, 10, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(VD[0], VD[1], VD[2]);
  doc.text(`Tiempo requerido: ${limpiar(r.gestion_semanal.tiempo_requerido)}`, M + 6, y + 7);
  y += 14;
  r.gestion_semanal.acciones.forEach((accion, j) => {
    const h = altH(accion, PW - 12) + 4; chk(h);
    doc.setFillColor(VS[0], VS[1], VS[2]); doc.circle(M + 3.5, y + 1.5, 3.5, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VD[0], VD[1], VD[2]); doc.text(`${j + 1}`, M + 3.5, y + 3.5, { align: 'center' });
    escribir(accion, M + 10, y, PW - 12); y += h + 1;
  });
  esp(6);

  // S4 — Respuestas modelo
  seccionHeader('04', 'RESPUESTAS MODELO PARA COPIAR');
  [
    { data: r.respuestas_modelo.positiva, label: 'RESENA POSITIVA', bg: VS, borde: VC, lineC: VM },
    { data: r.respuestas_modelo.negativa, label: 'RESENA NEGATIVA', bg: RS, borde: [221, 180, 180], lineC: RJ },
  ].forEach(({ data, label, bg, borde, lineC }, i) => {
    chk(40);
    doc.setFillColor(bg[0], bg[1], bg[2]); doc.roundedRect(M, y, PW, 8, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(lineC[0], lineC[1], lineC[2]); doc.text(label, M + 4, y + 5.5);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(GR[0], GR[1], GR[2]); doc.text(limpiar(data.contexto), M + 60, y + 5.5);
    y += 12;
    cajaDestacada(data.texto, bg, borde, lineC);
    if (i === 0) esp(3);
  });

  // S5 — Google Business
  seccionHeader('05', 'GOOGLE BUSINESS — ACCIONES URGENTES');
  r.google_business.acciones_urgentes.forEach((accion, j) => {
    const h = altH(accion, PW - 12) + 4; chk(h);
    doc.setFillColor(220, 60, 60); doc.circle(M + 3, y + 2, 2.5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('!', M + 3, y + 4, { align: 'center' });
    escribir(accion, M + 9, y, PW - 12); y += h + 2;
  });
  esp(6);

  // S6 — Plan de acción
  seccionHeader('06', 'TU PLAN DE ACCION — PROXIMOS 30 DIAS');
  bloqueAccion(r.plan_accion.esta_semana, RS, RJ, 'ESTA SEMANA');
  bloqueAccion(r.plan_accion.este_mes, OS, OR, 'ESTE MES');

  // Resultados en 30 días
  chk(14);
  doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
  doc.setFontSize(8); doc.setFont('helvetica', 'bold');
  doc.setTextColor(VD[0], VD[1], VD[2]); doc.text('EN 30 DIAS DEBERIAS VER', M + 6, y + 6);
  y += 13;
  r.plan_accion.resultados_30_dias.forEach((resultado) => {
    const h = altH(resultado, PW - 12) + 4; chk(h);
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VM[0], VM[1], VM[2]); doc.text('✓', M + 3, y + 3);
    escribir(resultado, M + 10, y, PW - 12); y += h + 1;
  });

  dibujarFooter();
  doc.save('RadarBarber-Plan-Reputacion.pdf');
}

export default function ReporteReputacion() {
  const [estado, setEstado] = useState("cargando");
  const [reporte, setReporte] = useState(null);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [mostrarEmail, setMostrarEmail] = useState(false);

  useEffect(() => {
    const datos = sessionStorage.getItem("radarbarber_respuestas");
    if (!datos) { setEstado("sin_datos"); return; }
    generarReporte(JSON.parse(datos));
  }, []);

  async function generarReporte(respuestas) {
    try {
      const res = await fetch("/api/reporte-reputacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respuestas),
      });
      const data = await res.json();
      if (data.ok) { setReporte(data.reporte); setEstado("listo"); }
      else setEstado("error");
    } catch { setEstado("error"); }
  }

  if (estado === "cargando") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ width: 64, height: 64, background: VERDE, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>⭐</div>
      <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>ANALIZANDO TU REPUTACION</div>
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 260 }}>Generando tu plan de reputacion personalizado...</div>
      <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 9, height: 9, background: VERDE, borderRadius: "50%", animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.25;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}`}</style>
    </div>
  );

  if (estado === "sin_datos") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>Primero completa el diagnostico</h2>
      <a href="/" style={{ background: VERDE, color: BLANCO, padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Ir al diagnostico →</a>
    </div>
  );

  if (estado === "error") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
      <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>Algo salio mal</h2>
      <button onClick={() => window.location.reload()} style={{ background: VERDE, color: BLANCO, padding: "14px 28px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Intentar de nuevo</button>
    </div>
  );

  const r = reporte;
  const scoreColor = r.diagnostico.score_actual >= 70 ? VERDE2 : r.diagnostico.score_actual >= 40 ? ORO : ROJO;

  return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
        <Logo />
        <div style={{ marginTop: 16 }}>
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>REPORTE DE REPUTACION</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Tu sistema para dominar Google Maps
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>Basado en datos reales del sector de barberias en Mexico</p>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>

        <Seccion titulo="⭐ TU SCORE DE REPUTACION ACTUAL">
          <ScoreCircle score={r.diagnostico.score_actual} />
          <div style={{ height: 1, background: GRIS_BORDE, margin: "14px 0" }} />
          <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>{r.diagnostico.resumen}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: ROJO_SUAVE, borderRadius: 10, padding: "10px 12px", border: `1px solid ${CREMA3}` }}>
              <div style={{ color: ROJO, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>IMPACTO MENSUAL</div>
              <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.4 }}>{r.diagnostico.impacto_mensual}</div>
            </div>
            <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "10px 12px", border: `1px solid ${VERDE_CLARO}` }}>
              <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>META 30 DIAS</div>
              <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.4 }}>{r.diagnostico.meta_30_dias}</div>
            </div>
          </div>
        </Seccion>

        <Seccion titulo="🔄 TU SISTEMA DE RESENAS EN 3 PASOS">
          {[
            { data: r.sistema_resenas.paso1, num: "1", contenidoKey: "script", contenidoLabel: "LO QUE DICES:" },
            { data: r.sistema_resenas.paso2, num: "2", contenidoKey: "instrucciones", contenidoLabel: "COMO HACERLO:" },
            { data: r.sistema_resenas.paso3, num: "3", contenidoKey: "mensaje", contenidoLabel: "MENSAJE WHATSAPP:" },
          ].map(({ data, num, contenidoKey, contenidoLabel }, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, background: VERDE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: BLANCO, flexShrink: 0 }}>{num}</div>
                <div>
                  <div style={{ color: CARBON, fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{data.titulo}</div>
                  <div style={{ color: GRIS, fontSize: 12, lineHeight: 1.5 }}>{data.descripcion}</div>
                </div>
              </div>
              <div style={{ background: CREMA3, borderRadius: 10, padding: "12px 14px", marginLeft: 40 }}>
                <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>{contenidoLabel}</div>
                <p style={{ color: CARBON, fontSize: 12, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{data[contenidoKey]}</p>
              </div>
              {i < 2 && <div style={{ height: 1, background: GRIS_BORDE, margin: "16px 0" }} />}
            </div>
          ))}
        </Seccion>

        <Seccion titulo="📅 GESTION SEMANAL EN MINUTOS">
          <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: `1px solid ${VERDE_CLARO}` }}>
            <span style={{ color: VERDE, fontSize: 12, fontWeight: 700 }}>⏱ Tiempo requerido: </span>
            <span style={{ color: CARBON, fontSize: 12 }}>{r.gestion_semanal.tiempo_requerido}</span>
          </div>
          {r.gestion_semanal.acciones.map((accion, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, background: VERDE_SUAVE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: VERDE, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ color: CARBON, fontSize: 13, lineHeight: 1.5 }}>{accion}</span>
            </div>
          ))}
        </Seccion>

        <Seccion titulo="💬 RESPUESTAS MODELO PARA COPIAR">
          {[
            { data: r.respuestas_modelo.positiva, color: VERDE, bg: VERDE_SUAVE, borde: VERDE_CLARO, etiqueta: "RESEÑA POSITIVA" },
            { data: r.respuestas_modelo.negativa, color: ROJO, bg: ROJO_SUAVE, borde: CREMA3, etiqueta: "RESEÑA NEGATIVA" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? 14 : 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span style={{ background: item.bg, color: item.color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 5, display: "inline-block", border: `1px solid ${item.borde}` }}>{item.etiqueta}</span>
                <span style={{ color: GRIS, fontSize: 11 }}>{item.data.contexto}</span>
              </div>
              <div style={{ background: item.bg, borderRadius: 10, padding: "12px 14px", border: `1px solid ${item.borde}` }}>
                <p style={{ color: CARBON, fontSize: 12, lineHeight: 1.7, margin: 0 }}>{item.data.texto}</p>
              </div>
            </div>
          ))}
        </Seccion>

        <Seccion titulo="🗺️ GOOGLE BUSINESS — ACCIONES URGENTES">
          {r.google_business.acciones_urgentes.map((accion, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ color: ROJO, fontSize: 14, flexShrink: 0, fontWeight: 700 }}>!</span>
              <span style={{ color: CARBON, fontSize: 13, lineHeight: 1.5 }}>{accion}</span>
            </div>
          ))}
        </Seccion>

        {/* PLAN DE ACCIÓN */}
        <Seccion titulo="🎯 TU PLAN DE ACCION — PROXIMOS 30 DIAS">
          <div style={{ marginBottom: 14 }}>
            <div style={{ background: ROJO_SUAVE, borderRadius: 8, padding: "6px 12px", marginBottom: 10, display: "inline-block" }}>
              <span style={{ color: ROJO, fontSize: 11, fontWeight: 700 }}>ESTA SEMANA</span>
            </div>
            {r.plan_accion.esta_semana.map((accion, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 22, height: 22, background: ROJO_SUAVE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: ROJO, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ color: CARBON, fontSize: 13, lineHeight: 1.5 }}>{accion}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ background: ORO_SUAVE, borderRadius: 8, padding: "6px 12px", marginBottom: 10, display: "inline-block" }}>
              <span style={{ color: ORO, fontSize: 11, fontWeight: 700 }}>ESTE MES</span>
            </div>
            {r.plan_accion.este_mes.map((accion, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 22, height: 22, background: ORO_SUAVE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: ORO, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ color: CARBON, fontSize: 13, lineHeight: 1.5 }}>{accion}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: VERDE_SUAVE, borderRadius: 8, padding: "6px 12px", marginBottom: 10, display: "inline-block" }}>
              <span style={{ color: VERDE, fontSize: 11, fontWeight: 700 }}>EN 30 DÍAS DEBERÍAS VER</span>
            </div>
            {r.plan_accion.resultados_30_dias.map((resultado, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <span style={{ color: VERDE, fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ color: CARBON, fontSize: 13, lineHeight: 1.5 }}>{resultado}</span>
              </div>
            ))}
          </div>
        </Seccion>

        {/* BOTÓN DESCARGAR */}
        {!mostrarEmail ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>¿Quieres guardar este reporte?</div>
            <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>Descarga el PDF para tenerlo siempre a mano.</p>
            <button onClick={() => setMostrarEmail(true)} style={{ width: "100%", background: VERDE, color: BLANCO, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Descargar PDF →
            </button>
          </div>
        ) : !emailOk ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Un ultimo paso</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@email.com"
              style={{ width: "100%", background: CREMA, border: `1.5px solid ${GRIS_BORDE}`, borderRadius: 10, padding: "13px 16px", color: CARBON, fontSize: 14, boxSizing: "border-box", outline: "none", marginBottom: 12 }} />
            <button onClick={async () => { if (email) { setEmailOk(true); try { await fetch("/api/guardar-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, reporte: "reputacion" }) }); } catch (_) {} generarPDFReputacion(r); } }} disabled={!email}
              style={{ width: "100%", background: email ? VERDE : "#E8E0CC", color: email ? BLANCO : GRIS, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: email ? "pointer" : "not-allowed" }}>
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