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

const OPCIONES_PRECIO = [
  { label: "Menos de $100 MXN", value: "menos_100", desc: "Precio muy bajo" },
  { label: "$100 – $180 MXN", value: "100_180", desc: "Por debajo del mercado" },
  { label: "$181 – $280 MXN", value: "181_280", desc: "Precio promedio" },
  { label: "Más de $280 MXN", value: "mas_280", desc: "Precio premium" },
];

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

function Seccion({ titulo, emoji, children }) {
  return (
    <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 14, border: `1px solid ${GRIS_BORDE}` }}>
      <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 14 }}>{emoji} {titulo}</div>
      {children}
    </div>
  );
}

function PlanAccion({ plan }) {
  return (
    <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${GRIS_BORDE}` }}>
      <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>🎯 PLAN DE ACCION</div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ background: ROJO_SUAVE, borderRadius: 6, padding: "4px 10px", marginBottom: 8, display: "inline-block" }}>
          <span style={{ color: ROJO, fontSize: 10, fontWeight: 700 }}>ESTA SEMANA</span>
        </div>
        {plan.esta_semana.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 18, height: 18, background: ROJO_SUAVE, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: ROJO, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{a}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ background: ORO_SUAVE, borderRadius: 6, padding: "4px 10px", marginBottom: 8, display: "inline-block" }}>
          <span style={{ color: ORO, fontSize: 10, fontWeight: 700 }}>ESTE MES</span>
        </div>
        {plan.este_mes.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 18, height: 18, background: ORO_SUAVE, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: ORO, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{a}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ background: VERDE_SUAVE, borderRadius: 6, padding: "4px 10px", marginBottom: 8, display: "inline-block" }}>
          <span style={{ color: VERDE, fontSize: 10, fontWeight: 700 }}>EN 30 DIAS DEBERIAS VER</span>
        </div>
        {plan.resultados_30_dias.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 18, height: 18, background: VERDE, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: BLANCO, flexShrink: 0 }}>OK</div>
            <span style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

async function generarPDFBundle(reporte, meta) {
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
    doc.text('RadarBarber  |  Bundle Completo', M, FOOTER_Y + 8);
    doc.text(`Pagina ${numPag}`, 210 - M, FOOTER_Y + 8, { align: 'right' });
  }

  function dibujarHeader() {
    doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(0, 0, 210, 20, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(0, 20, 210, 1.2, 'F');
    doc.setFillColor(VM[0], VM[1], VM[2]); doc.roundedRect(M, 4, 12, 12, 2, 2, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('RB', M + 6, 12, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('RADARBARBER', M + 16, 9);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(VC[0], VC[1], VC[2]); doc.text('Bundle Completo', M + 16, 15);
  }

  function escribir(texto, x, yPos, maxW, size = 9.5, bold = false, colorArr = CA) {
    doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
    const lineas = doc.splitTextToSize(limpiar(texto), maxW);
    doc.text(lineas, x, yPos);
    return lineas.length * 5.2;
  }

  function seccionHeader(num, titulo, colorArr = VD) {
    chk(18);
    doc.setFillColor(colorArr[0], colorArr[1], colorArr[2]);
    doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.circle(M + 8, y + 6, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text(num, M + 8, y + 8.5, { align: 'center' });
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text(limpiar(titulo), M + 18, y + 8);
    y += 18;
  }

  function subSeccion(titulo, colorArr = VM) {
    chk(12);
    doc.setFillColor(colorArr[0], colorArr[1], colorArr[2]);
    doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text(limpiar(titulo), M + 6, y + 6);
    y += 13;
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

  function cajaNormal(texto, bgArr = CR, bordeArr = CB) {
    const lineas = getLineas(texto, PW - 12);
    const h = lineas.length * 5.2 + 12; chk(h + 2);
    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.setDrawColor(bordeArr[0], bordeArr[1], bordeArr[2]);
    doc.setLineWidth(0.4); doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(lineas, M + 6, y + 7); y += h + 4;
  }

  function cajaDestacada(texto, bgArr = VS, bordeArr = VC, lineArr = VM) {
    const lineas = getLineas(texto, PW - 16);
    const h = lineas.length * 5.2 + 14; chk(h + 2);
    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.setDrawColor(bordeArr[0], bordeArr[1], bordeArr[2]);
    doc.setLineWidth(0.4); doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setFillColor(lineArr[0], lineArr[1], lineArr[2]); doc.rect(M, y, 3.5, h, 'F');
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(lineas, M + 7, y + 8); y += h + 5;
  }

  function bloqueAccion(acciones, bgArr, colorArr, titulo) {
    const hTotal = 9 + 4 + acciones.reduce((acc, a) => acc + altH(a, PW - 12) + 5, 0) + 4;
    chk(hTotal);
    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
    doc.text(titulo, M + 6, y + 6); y += 13;
    acciones.forEach((accion, i) => {
      const h = altH(accion, PW - 12) + 4;
      doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
      doc.circle(M + 3.5, y + 1.5, 3.5, 'F');
      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
      doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
      doc.text(`${i + 1}`, M + 3.5, y + 3.5, { align: 'center' });
      escribir(accion, M + 10, y, PW - 12);
      y += h + 1;
    });
    y += 5;
  }

  function bloqueResultados(resultados) {
    const hTotal = 9 + 4 + resultados.reduce((acc, r) => acc + altH(r, PW - 12) + 5, 0);
    chk(hTotal);
    doc.setFillColor(VS[0], VS[1], VS[2]);
    doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VD[0], VD[1], VD[2]);
    doc.text('EN 30 DIAS DEBERIAS VER', M + 6, y + 6); y += 13;
    resultados.forEach(resultado => {
      const h = altH(resultado, PW - 12) + 4;
      doc.setFillColor(VM[0], VM[1], VM[2]);
      doc.roundedRect(M, y - 1, 6, 6, 1, 1, 'F');
      doc.setFontSize(6); doc.setFont('helvetica', 'bold');
      doc.setTextColor(BL[0], BL[1], BL[2]);
      doc.text('OK', M + 3, y + 3, { align: 'center' });
      escribir(resultado, M + 10, y, PW - 12);
      y += h + 1;
    });
    y += 4;
  }

  function separadorSeccion() {
    y += 4;
    doc.setFillColor(OR[0], OR[1], OR[2]);
    doc.rect(M, y, PW, 1.5, 'F');
    y += 8;
  }

  function esp(n = 5) { y += n; }

  const r = reporte;

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
  doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('Bundle', M, 142);
  doc.setFont('helvetica', 'bold'); doc.text('Completo', M, 155);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  doc.setTextColor(VC[0], VC[1], VC[2]);
  doc.text('El plan completo para transformar tu barberia', M, 168);

  doc.setFillColor(20, 52, 38); doc.roundedRect(M, 178, PW, 80, 4, 4, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, 178, 3.5, 80, 'F');
  doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
  doc.setTextColor(OS[0], OS[1], OS[2]); doc.text('ESTE BUNDLE INCLUYE:', M + 10, 190);
  const portadaItems = [
    'PARTE 1  Reputacion — Sistema de resenas en 3 pasos',
    'PARTE 2  Precios — Como subir sin perder clientes',
    'PARTE 3  Servicios — Los 3 que mas suben tu ticket',
    'PARTE 4  Marketing — Clientes nuevos esta semana',
    'PARTE 5  Plan de accion unificado — 30 dias',
  ];
  doc.setFont('helvetica', 'normal'); doc.setTextColor(BL[0], BL[1], BL[2]);
  portadaItems.forEach((item, i) => doc.text(item, M + 10, 200 + i * 10));
  doc.setFontSize(8); doc.setTextColor(60, 120, 90);
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${limpiar(fecha)}`, M, 270);
  doc.setTextColor(45, 106, 79);
  doc.text('radarbarber.vercel.app', 210 - M, 270, { align: 'right' });

  // ══ CONTENIDO ══════════════════════════════════════════════════════════
  doc.addPage(); numPag = 2; dibujarHeader(); y = 28;

  // ── PARTE 1: REPUTACION ───────────────────────────────────────────────
  seccionHeader('1', 'REPUTACION ONLINE', VD);

  // Score
  const rep = r.reputacion;
  const scoreCol = rep.score_actual >= 70 ? VM : rep.score_actual >= 40 ? OR : RJ;
  const scoreBg = rep.score_actual >= 70 ? VS : rep.score_actual >= 40 ? OS : RS;
  chk(30);
  doc.setFillColor(scoreBg[0], scoreBg[1], scoreBg[2]);
  doc.roundedRect(M, y, PW, 22, 2, 2, 'F');
  doc.setFillColor(scoreCol[0], scoreCol[1], scoreCol[2]);
  doc.rect(M, y, 4, 22, 'F');
  doc.setFontSize(20); doc.setFont('helvetica', 'bold');
  doc.setTextColor(scoreCol[0], scoreCol[1], scoreCol[2]);
  doc.text(String(rep.score_actual), M + 16, y + 15);
  doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.setTextColor(GR[0], GR[1], GR[2]); doc.text('/ 100', M + 30, y + 15);
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(CA[0], CA[1], CA[2]);
  const linResumen = doc.splitTextToSize(limpiar(rep.resumen), PW - 55);
  doc.text(linResumen, M + 50, y + 8);
  y += 26; esp(3);

  // Sistema reseñas
  subSeccion('SISTEMA DE RESENAS EN 3 PASOS');
  etq('Paso 1 — Lo que dices al cliente:');
  cajaDestacada(rep.sistema_resenas.paso1_script, VS, VC, VM);
  etq('Paso 2 — El QR en el espejo:');
  cajaNormal(rep.sistema_resenas.paso2_qr, CR, CB);
  etq('Paso 3 — WhatsApp 24h despues:');
  cajaDestacada(rep.sistema_resenas.paso3_whatsapp, VS, VC, VM);
  esp(3);

  // Respuestas modelo
  subSeccion('RESPUESTAS MODELO PARA COPIAR');
  etq('Resena positiva:', VM);
  cajaDestacada(rep.respuesta_positiva, VS, VC, VM);
  etq('Resena negativa:', RJ);
  cajaDestacada(rep.respuesta_negativa, RS, [220, 180, 180], RJ);
  esp(3);

  // Acciones Google
  etq('Acciones urgentes en Google Business:');
  rep.acciones_google.forEach(accion => {
    const h = altH(accion, PW - 10) + 4; chk(h);
    doc.setFillColor(RJ[0], RJ[1], RJ[2]); doc.circle(M + 2.5, y + 1.5, 2, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('!', M + 2.5, y + 3.5, { align: 'center' });
    escribir(accion, M + 8, y, PW - 10);
    y += h + 1;
  });
  esp(4);
  bloqueAccion(rep.plan_accion.esta_semana, RS, RJ, 'ESTA SEMANA');
  bloqueAccion(rep.plan_accion.este_mes, OS, OR, 'ESTE MES');
  bloqueResultados(rep.plan_accion.resultados_30_dias);

  separadorSeccion();

  // ── PARTE 2: PRECIOS ──────────────────────────────────────────────────
  seccionHeader('2', 'PRECIOS Y TARIFAS', VD);
  const pre = r.precios;
  parr(pre.resumen); esp(4);

  // Precios recomendados
  const wM = (PW - 8) / 3;
  const preciosGrid = [
    { label: 'Corte Basico', val: pre.precio_basico_recomendado, col: VD, bg: VS },
    { label: 'Corte Premium', val: pre.precio_premium_recomendado, col: OR, bg: OS },
    { label: 'Paquete Completo', val: pre.precio_paquete_recomendado, col: RJ, bg: RS },
  ];
  chk(30);
  preciosGrid.forEach((p, i) => {
    const x = M + i * (wM + 4);
    doc.setFillColor(p.bg[0], p.bg[1], p.bg[2]);
    doc.roundedRect(x, y, wM, 22, 2, 2, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(GR[0], GR[1], GR[2]); doc.text(limpiar(p.label), x + 3, y + 6);
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.setTextColor(p.col[0], p.col[1], p.col[2]);
    doc.text(limpiar(p.val), x + 3, y + 16);
  });
  y += 26; esp(3);

  // Mensajes de subida
  subSeccion('COMO SUBIR PRECIOS SIN PERDER CLIENTES');
  etq('Primera subida — ' + limpiar(pre.cuando_subir_etapa1 || 'proxima semana') + ':');
  cajaDestacada(pre.mensaje_subida_etapa1 || '', VS, VC, VM);
  etq('Segunda subida — ' + limpiar(pre.cuando_subir_etapa2 || '4 semanas despues') + ':');
  cajaDestacada(pre.mensaje_subida_etapa2 || '', OS, OR, OR);
  esp(3);

  // Membresía
  subSeccion('TU MEMBRESIA MENSUAL');
  chk(12);
  doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y, PW, 10, 2, 2, 'F');
  doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(M, y, 4, 10, 'F');
  doc.setFontSize(12); doc.setFont('helvetica', 'bold');
  doc.setTextColor(VD[0], VD[1], VD[2]);
  doc.text(limpiar(pre.membresia_precio || ''), M + 8, y + 7);
  y += 14;
  parr(pre.membresia_incluye || ''); esp(3);
  etq('Como presentarla:'); cajaNormal(pre.membresia_argumento || '', VS, VC);

  // Objeciones
  esp(3);
  subSeccion('COMO MANEJAR OBJECIONES');
  [[pre.objecion1, pre.respuesta1], [pre.objecion2, pre.respuesta2]].forEach(([obj, resp], i) => {
    if (!obj) return;
    const hObj = altH(obj, PW - 25, 8.5) + 10;
    const hResp = altH(resp || '', PW - 16) + 14;
    chk(hObj + hResp + 10);
    doc.setFillColor(RS[0], RS[1], RS[2]); doc.roundedRect(M, y, PW, hObj, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(RJ[0], RJ[1], RJ[2]); doc.text('Cliente:', M + 4, y + 6);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const lObj = doc.splitTextToSize(limpiar(obj), PW - 25);
    doc.text(lObj, M + 22, y + 6); y += hObj + 3;
    etq('Tu respuesta:', VM);
    cajaDestacada(resp || '');
    if (i === 0) esp(3);
  });
  esp(4);
  bloqueAccion(pre.plan_accion.esta_semana, RS, RJ, 'ESTA SEMANA');
  bloqueAccion(pre.plan_accion.este_mes, OS, OR, 'ESTE MES');
  bloqueResultados(pre.plan_accion.resultados_30_dias);

  separadorSeccion();

  // ── PARTE 3: SERVICIOS ────────────────────────────────────────────────
  seccionHeader('3', 'SERVICIOS ADICIONALES', VD);
  const srv = r.servicios;

  // Ticket actual vs potencial
  const wMitad = (PW - 4) / 2;
  const hTick = Math.max(altH(srv.ticket_actual || '', wMitad - 8, 9) + 18, altH(srv.ticket_potencial || '', wMitad - 8, 9) + 18, 24);
  chk(hTick + 2);
  [
    { label: 'TICKET ACTUAL', val: srv.ticket_actual || '', col: RJ, bg: RS, borde: [221, 180, 180] },
    { label: 'TICKET POTENCIAL', val: srv.ticket_potencial || '', col: VM, bg: VS, borde: VC },
  ].forEach((t, i) => {
    const x = M + i * (wMitad + 4);
    doc.setFillColor(t.bg[0], t.bg[1], t.bg[2]);
    doc.setDrawColor(t.borde[0], t.borde[1], t.borde[2]);
    doc.setLineWidth(0.3); doc.roundedRect(x, y, wMitad, hTick, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(t.col[0], t.col[1], t.col[2]); doc.text(t.label, x + 4, y + 6);
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const ls = doc.splitTextToSize(limpiar(t.val), wMitad - 8);
    doc.text(ls, x + 4, y + 13);
  });
  y += hTick + 5;

  const linIncrServ = doc.splitTextToSize(`Incremento mensual potencial: ${limpiar(srv.incremento_mensual || '')}`, PW - 12);
  const hIncrServ = linIncrServ.length * 5 + 10;
  chk(hIncrServ);
  doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y, PW, hIncrServ, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(VD[0], VD[1], VD[2]); doc.text(linIncrServ, M + 6, y + 7);
  y += hIncrServ + 6;

  // Servicios recomendados
  subSeccion('LOS 3 SERVICIOS QUE DEBES AGREGAR');
  (srv.servicios_recomendados || []).forEach((s, i) => {
    const colores = [VD, OR, [45, 100, 80]];
    const bgs = [VS, OS, [220, 240, 230]];
    const hScript = altH(s.script || '', PW - 16) + 14;
    const hTotal = 14 + 20 + 8 + hScript + 8;
    chk(hTotal);

    doc.setFillColor(bgs[i][0], bgs[i][1], bgs[i][2]);
    doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFillColor(colores[i][0], colores[i][1], colores[i][2]);
    doc.rect(M, y, 4, 12, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(colores[i][0], colores[i][1], colores[i][2]);
    doc.text(`${i + 1}. ${limpiar(s.nombre || '')}`, M + 8, y + 8);
    doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    doc.text(limpiar(s.precio || ''), M + PW - 4, y + 8, { align: 'right' });
    y += 14;

    // Grid datos
    const gridS = [
      { label: 'Tiempo extra', val: s.tiempo_extra || '' },
      { label: 'Inversion', val: s.inversion || '' },
      { label: 'Sube ticket', val: s.sube_ticket || '' },
    ];
    const wG = (PW - 8) / 3;
    chk(20);
    gridS.forEach((g, j) => {
      const x = M + j * (wG + 4);
      doc.setFillColor(CR[0], CR[1], CR[2]); doc.setDrawColor(CB[0], CB[1], CB[2]);
      doc.setLineWidth(0.3); doc.roundedRect(x, y, wG, 18, 1, 1, 'FD');
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold');
      doc.setTextColor(GR[0], GR[1], GR[2]); doc.text(limpiar(g.label.toUpperCase()), x + 3, y + 5);
      doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
      doc.setTextColor(CA[0], CA[1], CA[2]); doc.text(limpiar(g.val), x + 3, y + 13);
    });
    y += 22;

    etq('Lo que dices mientras cortas:', OR);
    cajaDestacada(s.script || '', VS, VC, colores[i]);
    if (i < (srv.servicios_recomendados || []).length - 1) esp(3);
  });

  // Nuevo menú
  esp(3);
  subSeccion('TU NUEVO MENU DE SERVICIOS');
  (srv.menu_nuevo || []).forEach((opcion, i) => {
    const esUltimo = i === (srv.menu_nuevo || []).length - 1;
    const hOp = altH(opcion, PW - 14, 9.5) + 10;
    chk(hOp + 2);
    doc.setFillColor(...(esUltimo ? VS : i % 2 === 0 ? CR : [245, 245, 240]));
    doc.roundedRect(M, y - 2, PW, hOp, 1, 1, 'F');
    if (esUltimo) { doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(M, y - 2, 3.5, hOp, 'F'); }
    doc.setFontSize(9.5); doc.setFont('helvetica', esUltimo ? 'bold' : 'normal');
    doc.setTextColor(...(esUltimo ? VD : CA));
    const linOp = doc.splitTextToSize(limpiar(opcion), PW - 14);
    doc.text(linOp, esUltimo ? M + 7 : M + 6, y + 4);
    y += hOp + 2;
  });
  esp(4);
  bloqueAccion(srv.plan_accion.esta_semana, RS, RJ, 'ESTA SEMANA');
  bloqueAccion(srv.plan_accion.este_mes, OS, OR, 'ESTE MES');
  bloqueResultados(srv.plan_accion.resultados_30_dias);

  separadorSeccion();

  // ── PARTE 4: MARKETING ────────────────────────────────────────────────
  seccionHeader('4', 'MARKETING DIGITAL', VD);
  const mkt = r.marketing;

  // Cliente ideal
  subSeccion('TU CLIENTE IDEAL');
  parr(mkt.cliente_ideal || ''); esp(4);

  // Canales
  subSeccion('TUS 2 CANALES PRIORITARIOS');
  [
    { nombre: mkt.canal_principal, razon: mkt.canal_principal_razon, acciones: mkt.canal_principal_acciones, num: '1' },
    { nombre: mkt.canal_secundario, razon: mkt.canal_secundario_razon, acciones: mkt.canal_secundario_acciones, num: '2' },
  ].forEach((canal, i) => {
    if (!canal.nombre) return;
    const hAcciones = (canal.acciones || []).reduce((acc, a) => acc + altH(a, PW - 10) + 3, 0);
    const hTotal = 12 + 5 + altH(canal.razon || '', PW - 8, 9) + 8 + hAcciones + 10;
    chk(hTotal);

    doc.setFillColor(VM[0], VM[1], VM[2]); doc.roundedRect(M, y, PW, 10, 2, 2, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, y, 3.5, 10, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text(`Canal ${canal.num}: ${limpiar(canal.nombre)}`, M + 7, y + 7);
    y += 14;

    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const linRazon = doc.splitTextToSize(limpiar(canal.razon || ''), PW - 8);
    doc.text(linRazon, M, y); y += linRazon.length * 5 + 5;

    etq('Acciones concretas:', OR);
    (canal.acciones || []).forEach(a => {
      const h = altH(a, PW - 10) + 3;
      doc.setFillColor(OR[0], OR[1], OR[2]); doc.circle(M + 2.5, y + 1.5, 1.5, 'F');
      escribir(a, M + 7, y, PW - 10);
      y += h;
    });
    if (i === 0) esp(6);
  });
  esp(4);

  // Post listo
  subSeccion('POST LISTO PARA PUBLICAR');
  const tagW = doc.getTextWidth(limpiar(mkt.post_tipo || '')) + 8;
  chk(10);
  doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y - 3, tagW, 7, 1, 1, 'F');
  doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
  doc.setTextColor(VM[0], VM[1], VM[2]); doc.text(limpiar(mkt.post_tipo || ''), M + 4, y + 1);
  y += 9;
  etq('Caption listo para copiar:', OR);
  const captLineas = getLineas(mkt.post_caption || '', PW - 16, 9);
  const captH = captLineas.length * 5.2 + 14; chk(captH + 2);
  doc.setFillColor(235, 248, 241); doc.setDrawColor(VC[0], VC[1], VC[2]);
  doc.setLineWidth(0.5); doc.roundedRect(M, y, PW, captH, 2, 2, 'FD');
  doc.setFillColor(VM[0], VM[1], VM[2]); doc.rect(M, y, 3.5, captH, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.setTextColor(CA[0], CA[1], CA[2]); doc.text(captLineas, M + 7, y + 7);
  y += captH + 5;
  etq('Que grabar:', OR); parr(mkt.post_que_grabar || '', 4, 9);
  esp(4);

  // Promoción
  subSeccion('TU PROMOCION DE ESTA SEMANA');
  chk(12);
  doc.setFillColor(VD[0], VD[1], VD[2]); doc.roundedRect(M, y, PW, 10, 2, 2, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, y, 4, 10, 'F');
  doc.setFontSize(10); doc.setFont('helvetica', 'bold');
  doc.setTextColor(BL[0], BL[1], BL[2]);
  doc.text(limpiar(mkt.promocion_nombre || ''), M + 8, y + 7);
  y += 14;
  parr(mkt.promocion_descripcion || ''); esp(4);
  bloqueAccion(mkt.plan_accion.esta_semana, RS, RJ, 'ESTA SEMANA');
  bloqueAccion(mkt.plan_accion.este_mes, OS, OR, 'ESTE MES');
  bloqueResultados(mkt.plan_accion.resultados_30_dias);

  separadorSeccion();

  // ── PARTE 5: PLAN UNIFICADO ───────────────────────────────────────────
  seccionHeader('5', 'TU PLAN UNIFICADO — PROXIMOS 30 DIAS', [20, 52, 38]);

  const areasAccion = [
    { area: 'REPUTACION', acciones_semana: rep.plan_accion.esta_semana, acciones_mes: rep.plan_accion.este_mes, bg: VS, col: VD },
    { area: 'PRECIOS', acciones_semana: pre.plan_accion.esta_semana, acciones_mes: pre.plan_accion.este_mes, bg: OS, col: OR },
    { area: 'SERVICIOS', acciones_semana: srv.plan_accion.esta_semana, acciones_mes: srv.plan_accion.este_mes, bg: RS, col: RJ },
    { area: 'MARKETING', acciones_semana: mkt.plan_accion.esta_semana, acciones_mes: mkt.plan_accion.este_mes, bg: [220, 240, 230], col: [30, 100, 60] },
  ];

  // Esta semana — todas las áreas
  chk(12);
  doc.setFillColor(RS[0], RS[1], RS[2]); doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(RJ[0], RJ[1], RJ[2]); doc.text('ESTA SEMANA — ACCIONES POR AREA', M + 6, y + 6);
  y += 13;

  areasAccion.forEach(area => {
    chk(12);
    doc.setFillColor(area.bg[0], area.bg[1], area.bg[2]);
    doc.roundedRect(M, y, 28, 7, 1, 1, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(area.col[0], area.col[1], area.col[2]);
    doc.text(area.area, M + 3, y + 5);
    y += 9;
    area.acciones_semana.forEach(a => {
      const h = altH(a, PW - 10) + 3; chk(h);
      doc.setFillColor(area.col[0], area.col[1], area.col[2]);
      doc.circle(M + 2.5, y + 1.5, 1.5, 'F');
      escribir(a, M + 7, y, PW - 10);
      y += h;
    });
    esp(3);
  });
  esp(4);

  // Este mes — todas las áreas
  chk(12);
  doc.setFillColor(OS[0], OS[1], OS[2]); doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(OR[0], OR[1], OR[2]); doc.text('ESTE MES — SISTEMAS A IMPLEMENTAR', M + 6, y + 6);
  y += 13;

  areasAccion.forEach(area => {
    chk(12);
    doc.setFillColor(area.bg[0], area.bg[1], area.bg[2]);
    doc.roundedRect(M, y, 28, 7, 1, 1, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(area.col[0], area.col[1], area.col[2]);
    doc.text(area.area, M + 3, y + 5);
    y += 9;
    area.acciones_mes.forEach(a => {
      const h = altH(a, PW - 10) + 3; chk(h);
      doc.setFillColor(area.col[0], area.col[1], area.col[2]);
      doc.circle(M + 2.5, y + 1.5, 1.5, 'F');
      escribir(a, M + 7, y, PW - 10);
      y += h;
    });
    esp(3);
  });
  esp(4);

  // Resultados esperados
  chk(12);
  doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(VD[0], VD[1], VD[2]); doc.text('EN 30 DIAS DEBERIAS VER', M + 6, y + 6);
  y += 13;

  const todosResultados = [
    ...rep.plan_accion.resultados_30_dias,
    ...pre.plan_accion.resultados_30_dias,
    ...srv.plan_accion.resultados_30_dias,
    ...mkt.plan_accion.resultados_30_dias,
  ];
  todosResultados.forEach(resultado => {
    const h = altH(resultado, PW - 12) + 4; chk(h);
    doc.setFillColor(VM[0], VM[1], VM[2]);
    doc.roundedRect(M, y - 1, 6, 6, 1, 1, 'F');
    doc.setFontSize(6); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text('OK', M + 3, y + 3, { align: 'center' });
    escribir(resultado, M + 10, y, PW - 12);
    y += h + 1;
  });

  dibujarFooter();
  doc.save('RadarBarber-Bundle-Completo.pdf');
}

export default function ReporteBundle() {
  const [estado, setEstado] = useState("preguntas");
  const [paso, setPaso] = useState(1);
  const [precioActual, setPrecioActual] = useState(null);
  const [serviciosActuales, setServiciosActuales] = useState([]);
  const [reporte, setReporte] = useState(null);
  const [meta, setMeta] = useState(null);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("reputacion");

  function toggleServicio(value) {
    setServiciosActuales(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    );
  }

  async function generarReporte() {
    setEstado("cargando");
    try {
      const datos = sessionStorage.getItem("radarbarber_respuestas");
      const respuestas = datos ? JSON.parse(datos) : {};
      const res = await fetch("/api/reporte-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...respuestas, precio_actual: precioActual, servicios_actuales: serviciosActuales }),
      });
      const data = await res.json();
      if (data.ok) { setReporte(data.reporte); setMeta(data.meta); setEstado("listo"); }
      else setEstado("error");
    } catch { setEstado("error"); }
  }

  // ── PREGUNTAS ─────────────────────────────────────────────────────────
  if (estado === "preguntas") return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
        <Logo />
        <div style={{ marginTop: 16 }}>
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>BUNDLE COMPLETO</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            {paso === 1 ? "Dos preguntas para personalizar tu bundle" : "¿Qué servicios ofreces actualmente?"}
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Pregunta {paso} de 2
          </p>
        </div>
      </div>

      <div style={{ background: CREMA3, height: 5, overflow: "hidden" }}>
        <div style={{ background: VERDE, height: "100%", width: paso === 1 ? "50%" : "100%", transition: "width 0.4s ease" }} />
      </div>

      <div style={{ padding: "28px 24px" }}>
        {paso === 1 ? (
          <>
            <h2 style={{ color: CARBON, fontSize: 18, fontWeight: 700, margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
              💰 ¿Cuánto cobras por un corte básico?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {OPCIONES_PRECIO.map(op => {
                const sel = precioActual === op.value;
                return (
                  <button key={op.value} onClick={() => setPrecioActual(op.value)} style={{
                    background: sel ? VERDE_SUAVE : BLANCO,
                    border: `1.5px solid ${sel ? VERDE2 : GRIS_BORDE}`,
                    borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                    textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ color: sel ? VERDE : CARBON, fontSize: 14, fontWeight: 700 }}>{op.label}</div>
                      <div style={{ color: GRIS, fontSize: 12, marginTop: 2 }}>{op.desc}</div>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${sel ? VERDE : GRIS_BORDE}`, background: sel ? VERDE : BLANCO, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {sel && <div style={{ width: 8, height: 8, background: BLANCO, borderRadius: "50%" }} />}
                    </div>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setPaso(2)} disabled={!precioActual} style={{
              width: "100%", background: precioActual ? VERDE : CREMA3,
              color: precioActual ? BLANCO : GRIS, border: "none",
              borderRadius: 12, padding: "15px", fontSize: 14, fontWeight: 700,
              cursor: precioActual ? "pointer" : "not-allowed",
            }}>
              Siguiente →
            </button>
          </>
        ) : (
          <>
            <h2 style={{ color: CARBON, fontSize: 18, fontWeight: 700, margin: "0 0 6px", fontFamily: "Georgia, serif" }}>
              ✂️ ¿Qué servicios ofreces actualmente?
            </h2>
            <p style={{ color: GRIS, fontSize: 12, margin: "0 0 20px" }}>Puedes elegir varios</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {OPCIONES_SERVICIOS.map(op => {
                const sel = serviciosActuales.includes(op.value);
                return (
                  <button key={op.value} onClick={() => toggleServicio(op.value)} style={{
                    background: sel ? VERDE_SUAVE : BLANCO,
                    border: `1.5px solid ${sel ? VERDE2 : GRIS_BORDE}`,
                    borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                    textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div style={{ color: sel ? VERDE : CARBON, fontSize: 14, fontWeight: sel ? 700 : 400 }}>{op.label}</div>
                    <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${sel ? VERDE : GRIS_BORDE}`, background: sel ? VERDE : BLANCO, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
              Generar mi Bundle Completo →
            </button>
            <button onClick={() => setPaso(1)} style={{ width: "100%", background: "transparent", color: GRIS, border: "none", fontSize: 13, cursor: "pointer", padding: "10px", marginTop: 8 }}>
              ← Volver
            </button>
          </>
        )}
      </div>
    </div>
  );

  // ── CARGANDO ──────────────────────────────────────────────────────────
  if (estado === "cargando") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ width: 64, height: 64, background: VERDE, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>⭐</div>
      <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>GENERANDO TU BUNDLE</div>
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 280 }}>
        Generando los 4 reportes en paralelo. Esto puede tomar 15-20 segundos...
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 9, height: 9, background: VERDE, borderRadius: "50%", animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.25;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}`}</style>
    </div>
  );

  // ── ERROR ─────────────────────────────────────────────────────────────
  if (estado === "error") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
      <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>Algo salio mal</h2>
      <button onClick={() => setEstado("preguntas")} style={{ background: VERDE, color: BLANCO, padding: "14px 28px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Intentar de nuevo</button>
    </div>
  );

  // ── REPORTE ───────────────────────────────────────────────────────────
  const r = reporte;
  const secciones = [
    { key: "reputacion", label: "Reputación", emoji: "⭐" },
    { key: "precios", label: "Precios", emoji: "💰" },
    { key: "servicios", label: "Servicios", emoji: "✂️" },
    { key: "marketing", label: "Marketing", emoji: "📣" },
  ];

  return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
        <Logo />
        <div style={{ marginTop: 16 }}>
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>BUNDLE COMPLETO</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            El plan completo para tu barbería
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>4 reportes completos en un solo documento</p>
        </div>
      </div>

      {/* Navegación por secciones */}
      <div style={{ background: BLANCO, padding: "12px 24px", borderBottom: `1px solid ${GRIS_BORDE}`, display: "flex", gap: 8, overflowX: "auto" }}>
        {secciones.map(s => (
          <button key={s.key} onClick={() => setSeccionActiva(s.key)} style={{
            background: seccionActiva === s.key ? VERDE : CREMA,
            color: seccionActiva === s.key ? BLANCO : GRIS,
            border: `1px solid ${seccionActiva === s.key ? VERDE : GRIS_BORDE}`,
            borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700,
            cursor: "pointer", whiteSpace: "nowrap",
          }}>
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 24px" }}>

        {/* REPUTACIÓN */}
        {seccionActiva === "reputacion" && (
          <>
            <Seccion titulo="TU SCORE DE REPUTACION" emoji="⭐">
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: r.reputacion.score_actual >= 70 ? VERDE_SUAVE : r.reputacion.score_actual >= 40 ? ORO_SUAVE : ROJO_SUAVE,
                  border: `3px solid ${r.reputacion.score_actual >= 70 ? VERDE : r.reputacion.score_actual >= 40 ? ORO : ROJO}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <div style={{ color: r.reputacion.score_actual >= 70 ? VERDE : r.reputacion.score_actual >= 40 ? ORO : ROJO, fontSize: 18, fontWeight: 800, lineHeight: 1 }}>{r.reputacion.score_actual}</div>
                  <div style={{ color: GRIS, fontSize: 8 }}>/ 100</div>
                </div>
                <div>
                  <p style={{ color: CARBON, fontSize: 12, margin: 0, lineHeight: 1.6 }}>{r.reputacion.resumen}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div style={{ background: ROJO_SUAVE, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: ROJO, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>IMPACTO MENSUAL</div>
                  <div style={{ color: CARBON, fontSize: 11, lineHeight: 1.4 }}>{r.reputacion.impacto_mensual}</div>
                </div>
                <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>META 30 DIAS</div>
                  <div style={{ color: CARBON, fontSize: 11, lineHeight: 1.4 }}>{r.reputacion.meta_30_dias}</div>
                </div>
              </div>
              <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>SISTEMA DE RESENAS EN 3 PASOS</div>
              {[
                { num: "1", label: "Lo que dices:", val: r.reputacion.sistema_resenas.paso1_script },
                { num: "2", label: "El QR:", val: r.reputacion.sistema_resenas.paso2_qr },
                { num: "3", label: "WhatsApp 24h:", val: r.reputacion.sistema_resenas.paso3_whatsapp },
              ].map(paso => (
                <div key={paso.num} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 22, height: 22, background: VERDE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: BLANCO, flexShrink: 0 }}>{paso.num}</div>
                  <div>
                    <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 3 }}>{paso.label}</div>
                    <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.6, fontStyle: "italic", background: CREMA3, borderRadius: 8, padding: "8px 10px" }}>{paso.val}</div>
                  </div>
                </div>
              ))}
              <PlanAccion plan={r.reputacion.plan_accion} />
            </Seccion>
          </>
        )}

        {/* PRECIOS */}
        {seccionActiva === "precios" && (
          <>
            <Seccion titulo="DIAGNOSTICO DE PRECIOS" emoji="💰">
              <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>{r.precios.resumen}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[
                  { label: "Corte Básico", val: r.precios.precio_basico_recomendado, color: VERDE },
                  { label: "Premium", val: r.precios.precio_premium_recomendado, color: ORO },
                  { label: "Paquete", val: r.precios.precio_paquete_recomendado, color: ROJO },
                ].map(p => (
                  <div key={p.label} style={{ background: CREMA, borderRadius: 10, padding: "10px 8px", border: `1px solid ${GRIS_BORDE}`, textAlign: "center" }}>
                    <div style={{ color: GRIS, fontSize: 9, marginBottom: 4 }}>{p.label}</div>
                    <div style={{ color: p.color, fontSize: 14, fontWeight: 800 }}>{p.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 6 }}>COMO COMUNICAR LA SUBIDA:</div>
              <div style={{ background: CREMA3, borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontStyle: "italic" }}>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>Primera subida — {r.precios.cuando_subir_etapa1}</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.6 }}>{r.precios.mensaje_subida_etapa1}</div>
              </div>
              <div style={{ background: CREMA3, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontStyle: "italic" }}>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>Segunda subida — {r.precios.cuando_subir_etapa2}</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.6 }}>{r.precios.mensaje_subida_etapa2}</div>
              </div>
              <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: `1px solid ${VERDE_CLARO}` }}>
                <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Membresía: {r.precios.membresia_precio}</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{r.precios.membresia_incluye}</div>
              </div>
              <PlanAccion plan={r.precios.plan_accion} />
            </Seccion>
          </>
        )}

        {/* SERVICIOS */}
        {seccionActiva === "servicios" && (
          <>
            <Seccion titulo="SERVICIOS ADICIONALES" emoji="✂️">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div style={{ background: ROJO_SUAVE, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: ROJO, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>TICKET ACTUAL</div>
                  <div style={{ color: CARBON, fontSize: 14, fontWeight: 800 }}>{r.servicios.ticket_actual}</div>
                </div>
                <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>TICKET POTENCIAL</div>
                  <div style={{ color: CARBON, fontSize: 14, fontWeight: 800 }}>{r.servicios.ticket_potencial}</div>
                </div>
              </div>
              {r.servicios.servicios_recomendados.map((srv, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 24, height: 24, background: VERDE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: BLANCO, flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ color: CARBON, fontSize: 13, fontWeight: 700 }}>{srv.nombre}</span>
                    </div>
                    <span style={{ color: VERDE, fontSize: 15, fontWeight: 800 }}>{srv.precio}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                    {[["⏱", "Tiempo", srv.tiempo_extra], ["💵", "Inversión", srv.inversion], ["📈", "Ticket", srv.sube_ticket]].map(([ic, l, v]) => (
                      <div key={l} style={{ background: CREMA, borderRadius: 8, padding: "6px 8px", border: `1px solid ${GRIS_BORDE}` }}>
                        <div style={{ fontSize: 12, marginBottom: 2 }}>{ic}</div>
                        <div style={{ color: GRIS, fontSize: 8, marginBottom: 2 }}>{l}</div>
                        <div style={{ color: CARBON, fontSize: 10, fontWeight: 700 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: CREMA3, borderRadius: 8, padding: "8px 12px" }}>
                    <div style={{ color: VERDE, fontSize: 9, fontWeight: 700, marginBottom: 4 }}>LO QUE DICES:</div>
                    <p style={{ color: CARBON, fontSize: 11, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>"{srv.script}"</p>
                  </div>
                  {i < 2 && <div style={{ height: 1, background: GRIS_BORDE, margin: "14px 0" }} />}
                </div>
              ))}
              <PlanAccion plan={r.servicios.plan_accion} />
            </Seccion>
          </>
        )}

        {/* MARKETING */}
        {seccionActiva === "marketing" && (
          <>
            <Seccion titulo="MARKETING DIGITAL" emoji="📣">
              <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: `1px solid ${VERDE_CLARO}` }}>
                <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>TU CLIENTE IDEAL</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.6 }}>{r.marketing.cliente_ideal}</div>
              </div>
              {[
                { nombre: r.marketing.canal_principal, razon: r.marketing.canal_principal_razon, acciones: r.marketing.canal_principal_acciones, num: "1" },
                { nombre: r.marketing.canal_secundario, razon: r.marketing.canal_secundario_razon, acciones: r.marketing.canal_secundario_acciones, num: "2" },
              ].map((canal, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ background: VERDE, color: BLANCO, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 5 }}>#{canal.num}</span>
                    <span style={{ color: CARBON, fontSize: 13, fontWeight: 700 }}>{canal.nombre}</span>
                  </div>
                  <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.5, margin: "0 0 8px" }}>{canal.razon}</p>
                  <div style={{ background: VERDE_SUAVE, borderRadius: 8, padding: "10px 12px" }}>
                    {(canal.acciones || []).map((a, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <span style={{ color: VERDE, fontSize: 12, flexShrink: 0 }}>→</span>
                        <span style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ background: CREMA3, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 6 }}>POST LISTO PARA PUBLICAR</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{r.marketing.post_caption}</div>
              </div>
              <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: `1px solid ${VERDE_CLARO}` }}>
                <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>PROMOCION DE ESTA SEMANA</div>
                <div style={{ color: CARBON, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{r.marketing.promocion_nombre}</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{r.marketing.promocion_descripcion}</div>
              </div>
              <PlanAccion plan={r.marketing.plan_accion} />
            </Seccion>
          </>
        )}

        {/* DESCARGA PDF */}
        {!mostrarEmail ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>¿Quieres guardar el bundle completo?</div>
            <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>
              Descarga el PDF con los 4 reportes + plan de acción unificado de 30 días.
            </p>
            <button onClick={() => setMostrarEmail(true)} style={{ width: "100%", background: VERDE, color: BLANCO, border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Descargar PDF completo →
            </button>
          </div>
        ) : !emailOk ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Un ultimo paso</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@email.com"
              style={{ width: "100%", background: CREMA, border: `1.5px solid ${GRIS_BORDE}`, borderRadius: 10, padding: "13px 16px", color: CARBON, fontSize: 14, boxSizing: "border-box", outline: "none", marginBottom: 12 }} />
            <button onClick={() => { if (email) { setEmailOk(true); generarPDFBundle(reporte, meta); } }} disabled={!email}
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
          RadarBarber · Bundle basado en datos reales del sector de barberias en Mexico
        </p>
      </div>
    </div>
  );
}