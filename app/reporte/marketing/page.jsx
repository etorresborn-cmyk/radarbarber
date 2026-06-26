'use client';
import { useState, useEffect } from "react";
import { track } from "@vercel/analytics";

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

function Tag({ texto, color = VERDE, bg = VERDE_SUAVE }) {
  return (
    <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block" }}>
      {texto}
    </span>
  );
}

async function generarPDFMarketing(r) {
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
    doc.text('RadarBarber  |  Reporte de Marketing', M, FOOTER_Y + 8);
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
    doc.setTextColor(VC[0], VC[1], VC[2]); doc.text('Reporte de Marketing', M + 16, 15);
  }

  function escribir(texto, x, yPos, maxW, size = 9.5, bold = false, colorArr = CA) {
    doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
    const lineas = doc.splitTextToSize(limpiar(texto), maxW);
    doc.text(lineas, x, yPos);
    return lineas.length * 5.2;
  }

  function seccionHeader(num, titulo) {
    chk(18);
    doc.setFillColor(VD[0], VD[1], VD[2]); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.circle(M + 8, y + 6, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text(num, M + 8, y + 8.5, { align: 'center' });
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text(limpiar(titulo), M + 18, y + 8);
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

  function cajaNormal(texto, bgArr = CR, bordeArr = CB) {
    const lineas = getLineas(texto, PW - 12);
    const h = lineas.length * 5.2 + 12; chk(h + 2);
    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.setDrawColor(bordeArr[0], bordeArr[1], bordeArr[2]);
    doc.setLineWidth(0.4); doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(lineas, M + 6, y + 7); y += h + 4;
  }

  function cajaCaption(texto) {
    const lineas = getLineas(texto, PW - 16, 9);
    const h = lineas.length * 5.2 + 14; chk(h + 2);
    doc.setFillColor(235, 248, 241);
    doc.setDrawColor(VC[0], VC[1], VC[2]);
    doc.setLineWidth(0.5); doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setFillColor(VM[0], VM[1], VM[2]); doc.rect(M, y, 3.5, h, 'F');
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(lineas, M + 7, y + 7); y += h + 5;
  }

  function bloqueAccion(acciones, bgArr, colorArr, titulo) {
    const hTitulo = 9 + 4;
    const hAcciones = acciones.reduce((acc, a) => acc + altH(a, PW - 12) + 5, 0);
    chk(hTitulo + hAcciones + 4);
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
    const hTitulo = 9 + 4;
    const hItems = resultados.reduce((acc, r) => acc + altH(r, PW - 12) + 5, 0);
    chk(hTitulo + hItems);
    doc.setFillColor(VS[0], VS[1], VS[2]);
    doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VD[0], VD[1], VD[2]);
    doc.text('EN 30 DIAS DEBERIAS VER', M + 6, y + 6); y += 13;
    resultados.forEach((resultado) => {
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

  function esp(n = 5) { y += n; }
  function sep() {
    chk(8); doc.setDrawColor(CB[0], CB[1], CB[2]); doc.setLineWidth(0.3);
    doc.line(M, y, M + PW, y); y += 6;
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
  doc.setTextColor(BL[0], BL[1], BL[2]); doc.text('Reporte de', M, 142);
  doc.setFont('helvetica', 'bold'); doc.text('Marketing', M, 155);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  doc.setTextColor(VC[0], VC[1], VC[2]);
  doc.text('Tu plan para conseguir mas clientes esta semana', M, 168);
  doc.setFillColor(20, 52, 38); doc.roundedRect(M, 182, PW, 76, 4, 4, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, 182, 3.5, 76, 'F');
  doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
  doc.setTextColor(OS[0], OS[1], OS[2]); doc.text('ESTE REPORTE INCLUYE:', M + 10, 193);
  const portadaItems = [
    '01  Tu cliente ideal definido con precision',
    '02  Tus 2 canales prioritarios con acciones',
    '03  Calendario de accion para 30 dias',
    '04  3 posts listos para publicar',
    '05  Tu promocion de esta semana',
    '06  Tu plan de accion — proximos 30 dias',
  ];
  doc.setFont('helvetica', 'normal'); doc.setTextColor(BL[0], BL[1], BL[2]);
  portadaItems.forEach((item, i) => doc.text(item, M + 10, 203 + i * 9));
  doc.setFontSize(8); doc.setTextColor(60, 120, 90);
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${limpiar(fecha)}`, M, 268);
  doc.setTextColor(45, 106, 79);
  doc.text('radarbarber.vercel.app', 210 - M, 268, { align: 'right' });

  // ══ CONTENIDO ══════════════════════════════════════════════════════════
  doc.addPage(); numPag = 2; dibujarHeader(); y = 28;

  // S1 — Cliente ideal
  seccionHeader('01', 'TU CLIENTE IDEAL');
  parr(r.cliente_ideal.descripcion); esp(3);
  const wM = (PW - 4) / 2;
  const gridCI = [
    { label: 'Edad', val: r.cliente_ideal.edad },
    { label: 'Como te encuentra', val: r.cliente_ideal.comportamiento },
  ];
  const hCI = Math.max(...gridCI.map(g => altH(g.val, wM - 8, 8.5) + 18), 22);
  chk(hCI + 2);
  gridCI.forEach((g, i) => {
    const x = M + i * (wM + 4);
    doc.setFillColor(CR[0], CR[1], CR[2]);
    doc.setDrawColor(CB[0], CB[1], CB[2]);
    doc.setLineWidth(0.3); doc.roundedRect(x, y, wM, hCI, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(GR[0], GR[1], GR[2]); doc.text(limpiar(g.label.toUpperCase()), x + 4, y + 6);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const ls = doc.splitTextToSize(limpiar(g.val), wM - 8);
    doc.text(ls, x + 4, y + 12);
  });
  y += hCI + 5;
  etq('Por que vuelve:', OR);
  cajaNormal(r.cliente_ideal.motivacion, VS, VC);
  esp(5);

  // S2 — Canales
  seccionHeader('02', 'TUS 2 CANALES PRIORITARIOS');
  r.canales.forEach((canal, i) => {
    const hHeader = 10;
    const hPQ = altH(canal.por_que, PW - 8, 9) + 4;
    const hAcciones = canal.acciones.reduce((acc, a) => acc + altH(a, PW - 10) + 3, 0);
    const hTotal = hHeader + 5 + hPQ + 5 + 6 + hAcciones + 10;
    chk(hTotal);

    doc.setFillColor(VM[0], VM[1], VM[2]); doc.roundedRect(M, y, PW, hHeader, 2, 2, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, y, 3.5, hHeader, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text(`Canal ${i + 1}: ${limpiar(canal.nombre)}`, M + 7, y + 7);
    y += hHeader + 5;

    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const linPQ = doc.splitTextToSize(limpiar(canal.por_que), PW - 8);
    doc.text(linPQ, M, y); y += linPQ.length * 5 + 5;

    etq('Acciones concretas:', OR);
    canal.acciones.forEach(a => {
      const h = altH(a, PW - 10) + 3;
      doc.setFillColor(OR[0], OR[1], OR[2]); doc.circle(M + 2.5, y + 1.5, 1.5, 'F');
      escribir(a, M + 7, y, PW - 10);
      y += h;
    });
    if (i < r.canales.length - 1) { esp(6); sep(); }
  });
  esp(8);

  // S3 — Calendario
  seccionHeader('03', 'CALENDARIO DE ACCION — 30 DIAS');
  r.calendario.forEach((sem) => {
    const hSem = 16;
    const hAcciones = sem.acciones.reduce((acc, a) => acc + altH(a, PW - 12) + 4, 0);
    const hTotal = hSem + 5 + hAcciones + 6;
    chk(hTotal);

    doc.setFillColor(OS[0], OS[1], OS[2]);
    doc.setDrawColor(OR[0], OR[1], OR[2]);
    doc.setLineWidth(0.5); doc.roundedRect(M, y, PW, hSem, 2, 2, 'FD');
    doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, y, 3.5, hSem, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 75, 30); doc.text(limpiar(sem.semana), M + 8, y + 7);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.setTextColor(GR[0], GR[1], GR[2]);
    doc.text(`Foco: ${limpiar(sem.foco)}`, M + 8, y + 13);
    y += hSem + 5;

    sem.acciones.forEach((a, j) => {
      const h = altH(a, PW - 12) + 4;
      doc.setFillColor(VS[0], VS[1], VS[2]); doc.circle(M + 3.5, y + 1.5, 3.5, 'F');
      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
      doc.setTextColor(VD[0], VD[1], VD[2]); doc.text(`${j + 1}`, M + 3.5, y + 3.5, { align: 'center' });
      escribir(a, M + 10, y, PW - 12);
      y += h + 1;
    });
    esp(7);
  });

  // S4 — Posts
  seccionHeader('04', '3 POSTS LISTOS PARA PUBLICAR');
  r.posts.forEach((post, i) => {
    const hHeader = 10;
    const hTag = 8;
    const hCaption = altH(post.caption, PW - 16, 9) + 14;
    const wMitad = (PW - 4) / 2;
    const hImg = altH(post.imagen, wMitad - 8, 8.5) + 18;
    const hCta = altH(post.cta, wMitad - 8, 8.5) + 18;
    const hDoble = Math.max(hImg, hCta, 22);
    const hTotal = hHeader + hTag + 8 + hCaption + hDoble + 10;
    chk(hTotal);

    doc.setFillColor(CR[0], CR[1], CR[2]);
    doc.setDrawColor(VS[0], VS[1], VS[2]);
    doc.setLineWidth(0.8); doc.roundedRect(M, y, PW, hHeader, 2, 2, 'FD');
    doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(M, y, 4, hHeader, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VD[0], VD[1], VD[2]);
    doc.text(`Post ${i + 1}: ${limpiar(post.titulo || '')}`, M + 8, y + 7);
    y += hHeader + 3;

    const tagW = doc.getTextWidth(limpiar(post.tipo || '')) + 8;
    doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y - 3, tagW, 7, 1, 1, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VM[0], VM[1], VM[2]); doc.text(limpiar(post.tipo || ''), M + 4, y + 1);
    y += 9;

    etq('Caption listo para copiar y pegar:', OR);
    cajaCaption(post.caption || '');

    [0, 1].forEach(idx => {
      const x = M + idx * (wMitad + 4);
      const label = idx === 0 ? 'Que grabar' : 'CTA';
      const val = idx === 0 ? post.imagen : post.cta;
      const lineas = doc.splitTextToSize(limpiar(val || ''), wMitad - 8);
      const h = Math.max(lineas.length * 5 + 18, 22);
      doc.setFillColor(CR[0], CR[1], CR[2]);
      doc.setDrawColor(CB[0], CB[1], CB[2]);
      doc.setLineWidth(0.3); doc.roundedRect(x, y, wMitad, h, 2, 2, 'FD');
      doc.setFontSize(7); doc.setFont('helvetica', 'bold');
      doc.setTextColor(GR[0], GR[1], GR[2]); doc.text(limpiar(label.toUpperCase()), x + 4, y + 6);
      doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
      doc.setTextColor(CA[0], CA[1], CA[2]); doc.text(lineas.slice(0, 5), x + 4, y + 13);
    });
    y += Math.max(altH(post.imagen || '', wMitad - 8, 8.5) + 18, altH(post.cta || '', wMitad - 8, 8.5) + 18, 22) + 5;

    if (i < r.posts.length - 1) { esp(3); sep(); }
  });
  esp(8);

  // S5 — Promoción
  seccionHeader('05', 'TU PROMOCION DE ESTA SEMANA');
  const nomH = 14;
  chk(nomH + 15);
  doc.setFillColor(VD[0], VD[1], VD[2]); doc.roundedRect(M, y, PW, nomH, 2, 2, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, y, 4, nomH, 'F');
  doc.setFontSize(12); doc.setFont('helvetica', 'bold');
  doc.setTextColor(BL[0], BL[1], BL[2]);
  doc.text(limpiar(r.promocion.nombre || ''), M + 8, y + 10);
  y += nomH + 6;
  parr(r.promocion.descripcion || ''); esp(3);
  etq('Como comunicarla:', OR);
  cajaNormal(r.promocion.como_comunicarla || '', CR, CB);
  etq('Cuando lanzarla:', OR);
  cajaNormal(r.promocion.cuando_lanzarla || '', OS, OR);
  esp(6);

  // S6 — Plan de acción
  seccionHeader('06', 'TU PLAN DE ACCION — PROXIMOS 30 DIAS');
  bloqueAccion(r.plan_accion.esta_semana, RS, RJ, 'ESTA SEMANA');
  bloqueAccion(r.plan_accion.este_mes, OS, OR, 'ESTE MES');
  bloqueResultados(r.plan_accion.resultados_30_dias);

  dibujarFooter();
  doc.save('RadarBarber-Reporte-Marketing.pdf');
}

export default function ReporteMarketing() {
  const [estado, setEstado] = useState("cargando");
  const [reporte, setReporte] = useState(null);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [postActivo, setPostActivo] = useState(0);
  const [semanaActiva, setSemanaActiva] = useState(0);

  useEffect(() => {
    const datos = sessionStorage.getItem("radarbarber_respuestas");
    if (!datos) { setEstado("sin_datos"); return; }
    generarReporte(JSON.parse(datos));
  }, []);

  async function generarReporte(respuestas) {
    try {
      const res = await fetch("/api/reporte-marketing", {
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
      <div style={{ width: 64, height: 64, background: VERDE, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>✂️</div>
      <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>GENERANDO TU PLAN</div>
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 260 }}>Creando tu plan de marketing personalizado...</div>
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

  return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
        <Logo />
        <div style={{ marginTop: 16 }}>
          <Tag texto="REPORTE DE MARKETING" color={VERDE} bg={VERDE_CLARO} />
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "10px 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Tu plan para conseguir mas clientes
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Basado en datos reales del sector de barberias en Mexico
          </p>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>

        <Seccion titulo="👤 TU CLIENTE IDEAL">
          <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>{r.cliente_ideal.descripcion}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["Edad", r.cliente_ideal.edad], ["Como te encuentra", r.cliente_ideal.comportamiento], ["Por que vuelve", r.cliente_ideal.motivacion]].map(([label, valor]) => (
              <div key={label} style={{ background: CREMA, borderRadius: 10, padding: "10px 12px", border: `1px solid ${GRIS_BORDE}` }}>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>{label}</div>
                <div style={{ color: CARBON, fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{valor}</div>
              </div>
            ))}
          </div>
        </Seccion>

        <Seccion titulo="📣 TUS 2 CANALES PRIORITARIOS">
          {r.canales.map((canal, i) => (
            <div key={i} style={{ marginBottom: i < r.canales.length - 1 ? 16 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Tag texto={`#${i + 1}`} color={BLANCO} bg={VERDE} />
                <span style={{ color: CARBON, fontSize: 14, fontWeight: 700 }}>{canal.nombre}</span>
              </div>
              <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: "0 0 10px" }}>{canal.por_que}</p>
              <div style={{ background: VERDE_SUAVE, borderRadius: 10, padding: "12px" }}>
                <div style={{ color: VERDE, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>ACCIONES CONCRETAS</div>
                {canal.acciones.map((accion, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ color: VERDE, fontSize: 12, flexShrink: 0 }}>→</span>
                    <span style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{accion}</span>
                  </div>
                ))}
              </div>
              {i < r.canales.length - 1 && <div style={{ height: 1, background: GRIS_BORDE, margin: "16px 0" }} />}
            </div>
          ))}
        </Seccion>

        <Seccion titulo="📅 CALENDARIO DE ACCION — 30 DIAS">
          <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
            {r.calendario.map((sem, i) => (
              <button key={i} onClick={() => setSemanaActiva(i)} style={{
                background: semanaActiva === i ? VERDE : CREMA3,
                color: semanaActiva === i ? BLANCO : GRIS,
                border: `1px solid ${semanaActiva === i ? VERDE : GRIS_BORDE}`,
                borderRadius: 8, padding: "6px 14px", fontSize: 12,
                fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "system-ui",
              }}>{sem.semana}</button>
            ))}
          </div>
          {r.calendario[semanaActiva] && (
            <div>
              <div style={{ background: ORO_SUAVE, borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: `1px solid ${CREMA3}` }}>
                <div style={{ color: ORO, fontSize: 10, fontWeight: 700, marginBottom: 3 }}>FOCO DE LA SEMANA</div>
                <div style={{ color: CARBON, fontSize: 13, fontWeight: 600 }}>{r.calendario[semanaActiva].foco}</div>
              </div>
              {r.calendario[semanaActiva].acciones.map((accion, j) => (
                <div key={j} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 24, height: 24, background: VERDE_SUAVE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: VERDE, flexShrink: 0 }}>{j + 1}</div>
                  <span style={{ color: CARBON, fontSize: 13, lineHeight: 1.5 }}>{accion}</span>
                </div>
              ))}
            </div>
          )}
        </Seccion>

        <Seccion titulo="📱 3 POSTS LISTOS PARA PUBLICAR">
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {r.posts.map((post, i) => (
              <button key={i} onClick={() => setPostActivo(i)} style={{
                background: postActivo === i ? VERDE : CREMA3,
                color: postActivo === i ? BLANCO : GRIS,
                border: `1px solid ${postActivo === i ? VERDE : GRIS_BORDE}`,
                borderRadius: 8, padding: "6px 14px", fontSize: 12,
                fontWeight: 700, cursor: "pointer", fontFamily: "system-ui",
              }}>Post {i + 1}</button>
            ))}
          </div>
          {r.posts[postActivo] && (
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <Tag texto={r.posts[postActivo].tipo} color={VERDE} bg={VERDE_SUAVE} />
              </div>
              <div style={{ color: GRIS, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>CAPTION (copia y pega)</div>
              <div style={{ background: CREMA, borderRadius: 10, padding: "14px", marginBottom: 12, border: `1px solid ${GRIS_BORDE}` }}>
                <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{r.posts[postActivo].caption}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: CREMA, borderRadius: 10, padding: "10px 12px", border: `1px solid ${GRIS_BORDE}` }}>
                  <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>📸 Que grabar</div>
                  <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.4 }}>{r.posts[postActivo].imagen}</div>
                </div>
                <div style={{ background: CREMA, borderRadius: 10, padding: "10px 12px", border: `1px solid ${GRIS_BORDE}` }}>
                  <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>🎯 CTA</div>
                  <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.4 }}>{r.posts[postActivo].cta}</div>
                </div>
              </div>
            </div>
          )}
        </Seccion>

        <Seccion titulo="🎁 TU PROMOCION DE ESTA SEMANA">
          <div style={{ background: VERDE_SUAVE, borderRadius: 12, padding: "16px", marginBottom: 12, border: `1px solid ${VERDE_CLARO}` }}>
            <div style={{ color: VERDE, fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{r.promocion.nombre}</div>
            <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>{r.promocion.descripcion}</p>
            <div style={{ display: "grid", gap: 8 }}>
              <div>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 3 }}>COMO COMUNICARLA</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{r.promocion.como_comunicarla}</div>
              </div>
              <div style={{ height: 1, background: VERDE_CLARO }} />
              <div>
                <div style={{ color: GRIS, fontSize: 10, marginBottom: 3 }}>CUANDO LANZARLA</div>
                <div style={{ color: CARBON, fontSize: 12, lineHeight: 1.5 }}>{r.promocion.cuando_lanzarla}</div>
              </div>
            </div>
          </div>
        </Seccion>

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
                <div style={{ width: 20, height: 20, background: VERDE, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: BLANCO, flexShrink: 0 }}>OK</div>
                <span style={{ color: CARBON, fontSize: 13, lineHeight: 1.5 }}>{resultado}</span>
              </div>
            ))}
          </div>
        </Seccion>

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
            <button onClick={async () => { if (email) { setEmailOk(true); try { await fetch("/api/guardar-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, reporte: "marketing" }) }); } catch (_) {} track("pdf_descargado", { reporte: "marketing" }); generarPDFMarketing(r); } }} disabled={!email}
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