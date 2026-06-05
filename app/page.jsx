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

async function generarPDFReporte(reporte, diagnosticoIA) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const VD = [27, 67, 50]; const VM = [45, 106, 79]; const VS = [216, 234, 224];
  const VC = [183, 217, 198]; const OR = [154, 123, 58]; const OS = [245, 237, 214];
  const CR = [250, 247, 240]; const CB = [221, 216, 204]; const CA = [26, 26, 26];
  const GR = [107, 107, 107]; const BL = [255, 255, 255]; const RJ = [139, 46, 46];
  const RS = [245, 224, 224]; const NA = [139, 94, 46]; const NS = [245, 234, 224];

  const M = 15; const PW = 180; const FOOTER_Y = 283;
  let y = 0; let numPag = 0;
  const r = reporte;

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
    doc.setFillColor(VD[0], VD[1], VD[2]);
    doc.rect(0, FOOTER_Y, 210, 14, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]);
    doc.rect(0, FOOTER_Y, 210, 1, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(VC[0], VC[1], VC[2]);
    doc.text('RadarBarber  |  Reporte Sin Costo', M, FOOTER_Y + 8);
    doc.text(`Pagina ${numPag}`, 210 - M, FOOTER_Y + 8, { align: 'right' });
  }

  function dibujarHeader() {
    doc.setFillColor(VD[0], VD[1], VD[2]);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]);
    doc.rect(0, 20, 210, 1.2, 'F');
    doc.setFillColor(VM[0], VM[1], VM[2]);
    doc.roundedRect(M, 4, 12, 12, 2, 2, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text('RB', M + 6, 12, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text('RADARBARBER', M + 16, 9);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(VC[0], VC[1], VC[2]);
    doc.text('Reporte Sin Costo', M + 16, 15);
  }

  function seccionHeader(num, titulo) {
    chk(18);
    doc.setFillColor(VD[0], VD[1], VD[2]);
    doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFillColor(OR[0], OR[1], OR[2]);
    doc.circle(M + 8, y + 6, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text(num, M + 8, y + 8.5, { align: 'center' });
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]);
    doc.text(limpiar(titulo), M + 18, y + 8);
    y += 18;
  }

  function scoreBar(label, value) {
    chk(14);
    const color = value >= 70 ? VM : value >= 40 ? OR : RJ;
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(limpiar(label), M, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(`${value}/100`, M + PW, y, { align: 'right' });
    y += 5;
    doc.setFillColor(CB[0], CB[1], CB[2]);
    doc.roundedRect(M, y, PW, 5, 1, 1, 'F');
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(M, y, PW * (value / 100), 5, 1, 1, 'F');
    y += 9;
  }

  function esp(n = 5) { y += n; }

  // ══ PORTADA ══════════════════════════════════════════════════════════
  doc.setFillColor(VD[0], VD[1], VD[2]);
  doc.rect(0, 0, 210, 297, 'F');
  doc.setDrawColor(45, 106, 79);
  doc.setLineWidth(0.3);
  for (let i = 0; i < 8; i++) doc.line(0, 30 + i * 35, 210, 30 + i * 35);

  doc.setFillColor(VM[0], VM[1], VM[2]);
  doc.roundedRect(M, 28, 22, 22, 4, 4, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]);
  doc.roundedRect(M, 28, 22, 3, 1, 1, 'F');
  doc.setFontSize(13); doc.setFont('helvetica', 'bold');
  doc.setTextColor(BL[0], BL[1], BL[2]);
  doc.text('RB', M + 11, 44, { align: 'center' });

  doc.setFontSize(44); doc.setFont('helvetica', 'bold');
  doc.setTextColor(BL[0], BL[1], BL[2]);
  doc.text('RADAR', M, 95);
  doc.setTextColor(OS[0], OS[1], OS[2]);
  doc.text('BARBER', M, 118);
  doc.setFillColor(OR[0], OR[1], OR[2]);
  doc.rect(M, 125, 90, 1.5, 'F');

  doc.setFontSize(18); doc.setFont('helvetica', 'normal');
  doc.setTextColor(BL[0], BL[1], BL[2]);
  doc.text('Reporte', M, 142);
  doc.setFont('helvetica', 'bold');
  doc.text('Sin Costo', M, 155);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  doc.setTextColor(VC[0], VC[1], VC[2]);
  doc.text('Diagnostico completo de tu barberia', M, 168);

  doc.setFillColor(20, 52, 38);
  doc.roundedRect(M, 182, PW, 68, 4, 4, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]);
  doc.rect(M, 182, 3.5, 68, 'F');
  doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
  doc.setTextColor(OS[0], OS[1], OS[2]);
  doc.text('ESTE REPORTE INCLUYE:', M + 10, 193);
  const portadaItems = [
    '01  Diagnostico con IA de tu barberia',
    '02  Tu radiografia financiera vs benchmark',
    '03  Tus 3 fugas de dinero con impacto en pesos',
    '04  Tu score de salud en 4 dimensiones',
  ];
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BL[0], BL[1], BL[2]);
  portadaItems.forEach((item, i) => doc.text(item, M + 10, 203 + i * 9));
  doc.setFontSize(8);
  doc.setTextColor(60, 120, 90);
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${limpiar(fecha)}`, M, 268);
  doc.setTextColor(45, 106, 79);
  doc.text('radarbarber.vercel.app', 210 - M, 268, { align: 'right' });

  // ══ CONTENIDO ══════════════════════════════════════════════════════════
  doc.addPage(); numPag = 2; dibujarHeader(); y = 28;

  // S1 — Diagnóstico IA
  seccionHeader('01', 'DIAGNOSTICO DE TU BARBERIA');
  const diaLineas = getLineas(diagnosticoIA, PW - 14);
  const diaH = diaLineas.length * 5.2 + 14;
  chk(diaH + 2);
  doc.setFillColor(VS[0], VS[1], VS[2]);
  doc.setDrawColor(VC[0], VC[1], VC[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(M, y, PW, diaH, 2, 2, 'FD');
  doc.setFillColor(VM[0], VM[1], VM[2]);
  doc.rect(M, y, 3.5, diaH, 'F');
  doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
  doc.setTextColor(CA[0], CA[1], CA[2]);
  doc.text(diaLineas, M + 7, y + 8);
  y += diaH + 8;

  // S2 — Radiografía financiera
  seccionHeader('02', 'TU RADIOGRAFIA FINANCIERA');
  const wM = (PW - 4) / 2;
  const gridVals = [
    { label: 'Clientes actuales', val: r.label, col: CA },
    { label: 'Benchmark del sector', val: r.benchmark, col: VM },
    { label: 'Ingreso mensual est.', val: `$${r.inMin.toLocaleString()}-$${r.inMax.toLocaleString()} MXN`, col: CA },
    { label: 'Benchmark saludable', val: '$65,000-$120,000 MXN', col: VM },
  ];
  const hGrid = 20;
  chk(hGrid * 2 + 10);
  gridVals.forEach((g, i) => {
    const col = i % 2 === 0 ? M : M + wM + 4;
    const row = i < 2 ? y : y + hGrid + 4;
    doc.setFillColor(CR[0], CR[1], CR[2]);
    doc.setDrawColor(CB[0], CB[1], CB[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(col, row, wM, hGrid, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(GR[0], GR[1], GR[2]);
    doc.text(limpiar(g.label), col + 4, row + 6);
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(g.col[0], g.col[1], g.col[2]);
    const linG = doc.splitTextToSize(limpiar(g.val), wM - 8);
    doc.text(linG, col + 4, row + 13);
  });
  y += hGrid * 2 + 10;

  if (r.brechaMin > 0) {
    const brechaTexto = `Estas dejando entre $${r.brechaMin.toLocaleString()} y $${r.brechaMax.toLocaleString()} MXN al mes respecto al benchmark. Al ano eso equivale a $${(r.brechaMin * 12).toLocaleString()}-$${(r.brechaMax * 12).toLocaleString()} MXN sin capturar.`;
    const brechaLineas = getLineas(brechaTexto, PW - 14);
    const brechaH = brechaLineas.length * 5.2 + 14;
    chk(brechaH + 2);
    doc.setFillColor(RS[0], RS[1], RS[2]);
    doc.setDrawColor(220, 180, 180);
    doc.setLineWidth(0.4);
    doc.roundedRect(M, y, PW, brechaH, 2, 2, 'FD');
    doc.setFillColor(RJ[0], RJ[1], RJ[2]);
    doc.rect(M, y, 3.5, brechaH, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(RJ[0], RJ[1], RJ[2]);
    doc.text('BRECHA FINANCIERA MENSUAL', M + 7, y + 6);
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(brechaLineas, M + 7, y + 12);
    y += brechaH + 8;
  }

  // S3 — 3 fugas
  seccionHeader('03', 'TUS 3 FUGAS DE DINERO');
  const fugas = [
    { num: 'FUGA 1', titulo: r.fuga1Titulo, desc: r.fuga1Desc, impacto: r.fuga1Impacto, bg: RS, borde: [220, 180, 180], lineC: RJ },
    { num: 'FUGA 2', titulo: 'Servicios adicionales sin explotar', desc: 'Las barberias que solo ofrecen cortes basicos pierden el 30-45% de sus ingresos potenciales. El arreglo de barba sube el ticket un 40-60%. Cada cliente que sale sin servicio adicional es dinero que quedo en la silla.', impacto: '30-45% de ingresos por cliente no capturados', bg: NS, borde: [220, 200, 170], lineC: NA },
    { num: 'FUGA 3', titulo: r.scoreRep >= 80 ? 'Reputacion que puede posicionarte como #1' : 'Reputacion online que te hace perder clientes', desc: r.accionRep, impacto: r.scoreRep >= 80 ? 'Oportunidad de ser la barberia #1 de tu zona' : 'Clientes nuevos que eligen a tu competencia', bg: OS, borde: [210, 190, 140], lineC: OR },
  ];

  fugas.forEach((fuga, i) => {
    const linTit = getLineas(fuga.titulo, PW - 20, 9.5);
    const linDesc = getLineas(fuga.desc, PW - 14, 9);
    const linImp = getLineas(fuga.impacto, PW - 30, 7.5);
    const hTotal = linTit.length * 5.2 + linDesc.length * 5 + linImp.length * 4.8 + 32;
    chk(hTotal);

    doc.setFillColor(fuga.bg[0], fuga.bg[1], fuga.bg[2]);
    doc.setDrawColor(fuga.borde[0], fuga.borde[1], fuga.borde[2]);
    doc.setLineWidth(0.4);
    doc.roundedRect(M, y, PW, hTotal, 2, 2, 'FD');
    doc.setFillColor(fuga.lineC[0], fuga.lineC[1], fuga.lineC[2]);
    doc.rect(M, y, 3.5, hTotal, 'F');

    // Badge
    doc.setFillColor(BL[0], BL[1], BL[2]);
    doc.roundedRect(M + 7, y + 5, 22, 7, 1, 1, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(fuga.lineC[0], fuga.lineC[1], fuga.lineC[2]);
    doc.text(fuga.num, M + 18, y + 10, { align: 'center' });

    // Título
    doc.setFontSize(9.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const yTit = y + 17;
    doc.text(linTit, M + 7, yTit);

    // Desc
    const yDesc = yTit + linTit.length * 5.2 + 2;
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text(linDesc, M + 7, yDesc);

    // Impacto
    const yImp = yDesc + linDesc.length * 5 + 4;
    const hImp = linImp.length * 4.8 + 6;
    doc.setFillColor(BL[0], BL[1], BL[2]);
    doc.roundedRect(M + 7, yImp, PW - 14, hImp, 1, 1, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(fuga.lineC[0], fuga.lineC[1], fuga.lineC[2]);
    doc.text('Impacto: ', M + 10, yImp + 5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(linImp, M + 28, yImp + 5);

    y += hTotal + 5;
  });

  // S4 — Score de salud
  seccionHeader('04', 'TU SCORE DE SALUD');
  const scoreColor = r.scoreTotal >= 70 ? VM : r.scoreTotal >= 45 ? OR : RJ;
  const scoreBgCol = r.scoreTotal >= 70 ? VS : r.scoreTotal >= 45 ? OS : RS;
  const scoreLabel = r.scoreTotal >= 70 ? 'Barberia solida' : r.scoreTotal >= 45 ? 'Oportunidad media-alta' : 'Oportunidad alta de mejora';

  chk(30);
  doc.setFillColor(scoreBgCol[0], scoreBgCol[1], scoreBgCol[2]);
  doc.roundedRect(M, y, PW, 24, 2, 2, 'F');
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.rect(M, y, 4, 24, 'F');
  doc.setFontSize(22); doc.setFont('helvetica', 'bold');
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(String(r.scoreTotal), M + 18, y + 17);
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.setTextColor(GR[0], GR[1], GR[2]);
  doc.text('/ 100', M + 32, y + 17);
  doc.setFontSize(10); doc.setFont('helvetica', 'bold');
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(limpiar(scoreLabel), M + 55, y + 17);
  y += 30;

  scoreBar('Flujo de clientes', r.scoreClientes);
  scoreBar('Reputacion online', r.scoreRep);
  scoreBar('Marketing activo', r.scoreMkt);
  scoreBar('Servicios adicionales', r.scoreServicios);
  esp(8);

  // Mensaje cierre
  const cierreTexto = 'Cada una de estas areas tiene un reporte especifico con acciones concretas, scripts listos y PDF descargable. Los reportes de lanzamiento estan disponibles sin costo.';
  const cierreLineas = getLineas(cierreTexto, PW - 14);
  const cierreH = cierreLineas.length * 5.2 + 14;
  chk(cierreH + 2);
  doc.setFillColor(VS[0], VS[1], VS[2]);
  doc.setDrawColor(VC[0], VC[1], VC[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(M, y, PW, cierreH, 2, 2, 'FD');
  doc.setFillColor(VD[0], VD[1], VD[2]);
  doc.rect(M, y, 3.5, cierreH, 'F');
  doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
  doc.setTextColor(CA[0], CA[1], CA[2]);
  doc.text(cierreLineas, M + 7, y + 8);
  y += cierreH + 5;

  dibujarFooter();
  doc.save('RadarBarber-Reporte-Sin-Costo.pdf');
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
        <span style={{ color, fontSize: 13, fontWeight: 700 }}>{value}/100</span>
      </div>
      <div style={{ background: CREMA3, borderRadius: 999, height: 8 }}>
        <div style={{ background: color, height: "100%", borderRadius: 999, width: `${value}%`, transition: "width 1.2s ease" }} />
      </div>
    </div>
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

const reportes = [
  { precioReal: "$7 USD", nombre: "Reporte de Servicios", desc: "Los 3 servicios que debes agregar para aumentar tu ticket sin nuevos clientes.", ruta: "/reporte/servicios" },
  { precioReal: "$7 USD", nombre: "Reporte de Precios", desc: "Cuánto cobrar exactamente y cómo subir precios sin perder clientes.", ruta: "/reporte/precios" },
  { precioReal: "$7 USD", nombre: "Reporte de Reputación", desc: "Sistema de 3 pasos para generar reseñas constantes en Google.", ruta: "/reporte/reputacion" },
  { precioReal: "$15 USD", nombre: "Reporte de Marketing", desc: "Clientes nuevos esta semana + 3 posts listos para publicar.", destacado: true, ruta: "/reporte/marketing" },
  { precioReal: "$29 USD", nombre: "Bundle Completo ⭐", desc: "Todos los reportes juntos. Ahorro de $7 vs obtener por separado.", ruta: "/reporte/bundle" },
];

export default function Home() {
  const [pantalla, setPantalla] = useState("inicio");
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [seleccion, setSeleccion] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [diagnosticoIA, setDiagnosticoIA] = useState("");
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [mostrarReportes, setMostrarReportes] = useState(false);

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
        sessionStorage.setItem("radarbarber_respuestas", JSON.stringify(nuevas));
        setPantalla("reporte");
      } catch {
        setReporte(calcularReporte(nuevas));
        setDiagnosticoIA("Tu barberia tiene oportunidades claras de crecimiento que no estas aprovechando.");
        sessionStorage.setItem("radarbarber_respuestas", JSON.stringify(nuevas));
        setPantalla("reporte");
      }
    }
  }

  function volver() {
    setPaso(paso - 1);
    setSeleccion(respuestas[preguntas[paso - 1].id] || null);
  }

  // ── INICIO ───────────────────────────────────────────────────────────────────
  if (pantalla === "inicio") return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "Georgia, serif", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "24px 24px 28px" }}>
        <Logo />
        <h1 style={{ color: BLANCO, fontSize: 24, fontWeight: 700, lineHeight: 1.3, margin: "20px 0 10px" }}>
          ¿Por qué tu competencia tiene más clientes?
        </h1>
        <p style={{ color: VERDE_CLARO, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Responde 3 preguntas y recibe un reporte sin costo con el diagnóstico real de tu barbería.
        </p>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 18, border: `1px solid ${GRIS_BORDE}` }}>
          <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", fontFamily: "system-ui", marginBottom: 14 }}>TU REPORTE SIN COSTO INCLUYE</div>
          {[
            ["🤖", "Diagnóstico con IA", "Análisis basado en datos reales del sector en México"],
            ["📊", "Radiografía financiera", "Tu ingreso estimado vs el benchmark del sector"],
            ["🔴", "Tus 3 fugas de dinero", "Dónde pierdes dinero y cuánto, en pesos concretos"],
            ["🏆", "Tu score de salud", "4 dimensiones evaluadas con acciones concretas"],
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
        <BtnPrimario onClick={() => setPantalla("formulario")}>Ver mi reporte sin costo →</BtnPrimario>
        <p style={{ color: GRIS, fontSize: 11, textAlign: "center", marginTop: 10, fontFamily: "system-ui" }}>Sin spam · Sin tarjeta · 30 segundos</p>
      </div>
    </div>
  );

  // ── FORMULARIO ───────────────────────────────────────────────────────────────
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
          {paso < preguntas.length - 1 ? "Siguiente →" : "Generar mi reporte →"}
        </BtnPrimario>
        {paso > 0 && <BtnSecundario onClick={volver}>← Volver</BtnSecundario>}
      </div>
    </div>
  );

  // ── CARGANDO ─────────────────────────────────────────────────────────────────
  if (pantalla === "cargando") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24, maxWidth: 480, margin: "0 auto" }}>
      <div style={{ width: 64, height: 64, background: VERDE, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 24 }}>✂️</div>
      <div style={{ color: VERDE, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 14 }}>GENERANDO TU REPORTE</div>
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 260 }}>
        Analizando tu barbería con datos reales del sector en México...
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{ width: 9, height: 9, background: VERDE, borderRadius: "50%", animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.25;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}`}</style>
    </div>
  );

  // ── REPORTE ───────────────────────────────────────────────────────────────────
  if (pantalla === "reporte" && reporte) {
    const r = reporte;

    return (
      <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>

        <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
          <Logo />
          <div style={{ marginTop: 14 }}>
            <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>REPORTE SIN COSTO</span>
            <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
              El diagnóstico de tu barbería
            </h1>
            <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
              Basado en datos reales del sector de barberías en México
            </p>
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>

          {/* S1 — Diagnóstico IA */}
          <div style={{ background: VERDE_SUAVE, borderRadius: 14, padding: "16px", marginBottom: 14, border: `1px solid ${VERDE_CLARO}` }}>
            <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>🤖 DIAGNÓSTICO DE TU BARBERÍA</div>
            <p style={{ color: CARBON, fontSize: 13, margin: 0, lineHeight: 1.8, fontStyle: "italic" }}>"{diagnosticoIA}"</p>
          </div>

          {/* S2 — Radiografía */}
          <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 14, border: `1px solid ${GRIS_BORDE}` }}>
            <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 14 }}>📊 TU RADIOGRAFÍA FINANCIERA</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: r.brechaMin > 0 ? 12 : 0 }}>
              {[
                ["Clientes actuales", r.label, CARBON],
                ["Benchmark del sector", r.benchmark, VERDE2],
                ["Ingreso mensual est.", `$${r.inMin.toLocaleString()}–$${r.inMax.toLocaleString()} MXN`, CARBON],
                ["Benchmark saludable", "$65,000–$120,000 MXN", VERDE2],
              ].map(([label, val, color]) => (
                <div key={label} style={{ background: CREMA, borderRadius: 10, padding: "10px 12px", border: `1px solid ${GRIS_BORDE}` }}>
                  <div style={{ color: GRIS, fontSize: 10, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: color, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{val}</div>
                </div>
              ))}
            </div>
            {r.brechaMin > 0 && (
              <div style={{ background: ROJO_SUAVE, borderRadius: 10, padding: "12px 14px", border: `1px solid ${CREMA3}` }}>
                <div style={{ color: ROJO, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>⚠️ TU BRECHA FINANCIERA MENSUAL</div>
                <div style={{ color: ROJO, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>${r.brechaMin.toLocaleString()}–${r.brechaMax.toLocaleString()} MXN</div>
                <p style={{ color: CARBON, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                  Al año eso equivale a <strong>${(r.brechaMin * 12).toLocaleString()}–${(r.brechaMax * 12).toLocaleString()} MXN</strong> sin capturar.
                </p>
              </div>
            )}
          </div>

          {/* S3 — 3 fugas */}
          <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 14, border: `1px solid ${GRIS_BORDE}` }}>
            <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 14 }}>🔴 TUS 3 FUGAS DE DINERO</div>
            {[
              { num: "FUGA 1", bg: ROJO_SUAVE, color: ROJO, titulo: r.fuga1Titulo, desc: r.fuga1Desc, impacto: r.fuga1Impacto },
              { num: "FUGA 2", bg: NARANJA_SUAVE, color: NARANJA, titulo: "Servicios adicionales sin explotar", desc: "Las barberías que solo ofrecen cortes básicos pierden el 30–45% de sus ingresos potenciales. El arreglo de barba sube el ticket un 40–60%. Cada cliente que sale sin servicio adicional es dinero que quedó en la silla.", impacto: "30–45% de ingresos por cliente no capturados" },
              { num: "FUGA 3", bg: ORO_SUAVE, color: ORO, titulo: r.scoreRep >= 80 ? "Reputación que puede posicionarte como #1" : "Reputación online que te hace perder clientes", desc: r.accionRep, impacto: r.scoreRep >= 80 ? "Oportunidad de ser la barbería #1 de tu zona" : "Clientes nuevos que eligen a tu competencia sobre ti" },
            ].map((fuga, i) => (
              <div key={i} style={{ background: fuga.bg, borderRadius: 12, padding: "14px", marginBottom: i < 2 ? 10 : 0, border: `1px solid ${CREMA3}` }}>
                <span style={{ background: BLANCO, color: fuga.color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 5, display: "inline-block", marginBottom: 8 }}>{fuga.num}</span>
                <div style={{ color: CARBON, fontSize: 13, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{fuga.titulo}</div>
                <p style={{ color: CARBON, fontSize: 12, margin: "0 0 8px", lineHeight: 1.7 }}>{fuga.desc}</p>
                <div style={{ background: BLANCO, borderRadius: 6, padding: "6px 10px", display: "inline-block" }}>
                  <span style={{ color: GRIS, fontSize: 10 }}>Impacto: </span>
                  <span style={{ color: fuga.color, fontSize: 10, fontWeight: 700 }}>{fuga.impacto}</span>
                </div>
              </div>
            ))}
          </div>

          {/* S4 — Score */}
          <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 16, border: `1px solid ${GRIS_BORDE}` }}>
            <div style={{ color: VERDE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 16 }}>🏆 TU SCORE DE SALUD</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{
                background: r.scoreTotal >= 70 ? VERDE_SUAVE : r.scoreTotal >= 45 ? ORO_SUAVE : ROJO_SUAVE,
                color: r.scoreTotal >= 70 ? VERDE : r.scoreTotal >= 45 ? ORO : ROJO,
                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6,
              }}>
                {r.scoreTotal >= 70 ? "Barbería sólida" : r.scoreTotal >= 45 ? "Oportunidad media-alta" : "Oportunidad alta de mejora"}
              </span>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: VERDE, fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{r.scoreTotal}</div>
                <div style={{ color: GRIS, fontSize: 11 }}>de 100</div>
              </div>
            </div>
            <ScoreBar label="Flujo de clientes" value={r.scoreClientes} />
            <ScoreBar label="Reputación online" value={r.scoreRep} />
            <ScoreBar label="Marketing activo" value={r.scoreMkt} />
            <ScoreBar label="Servicios adicionales" value={r.scoreServicios} />
          </div>

          {/* DESCARGA PDF */}
          {!emailOk ? (
            <div style={{ background: BLANCO, borderRadius: 14, padding: "18px", marginBottom: 14, border: `1px solid ${GRIS_BORDE}` }}>
              <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>📥 Descarga tu reporte en PDF</div>
              <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: "0 0 12px" }}>
                Guárdalo en tu celular o imprímelo para tenerlo siempre a mano.
              </p>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tucorreo@email.com"
                style={{ width: "100%", background: CREMA, border: `1.5px solid ${GRIS_BORDE}`, borderRadius: 10, padding: "12px 16px", color: CARBON, fontSize: 14, boxSizing: "border-box", outline: "none", marginBottom: 10, fontFamily: "system-ui" }}
              />
              <BtnPrimario onClick={() => { if (email) { setEmailOk(true); generarPDFReporte(reporte, diagnosticoIA); } }} disabled={!email}>
                Descargar PDF sin costo →
              </BtnPrimario>
            </div>
          ) : (
            <div style={{ background: VERDE_SUAVE, borderRadius: 14, padding: "16px", marginBottom: 14, border: `1px solid ${VERDE_CLARO}`, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <div style={{ color: VERDE, fontSize: 13, fontWeight: 700 }}>PDF descargándose</div>
              <p style={{ color: GRIS, fontSize: 12, margin: "4px 0 0" }}>Revisa tus descargas</p>
            </div>
          )}

          {/* SEPARADOR */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 16px" }}>
            <div style={{ flex: 1, height: 1, background: GRIS_BORDE }} />
            <div style={{ color: GRIS, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>¿QUIERES RESOLVER CADA FUGA?</div>
            <div style={{ flex: 1, height: 1, background: GRIS_BORDE }} />
          </div>

          {/* CAJA FUGAS — llama a la acción */}
          <div style={{ background: CARBON, borderRadius: 14, padding: "20px", marginBottom: 16, border: "1px solid #333" }}>
            <div style={{ color: VERDE_CLARO, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 10 }}>
              LO QUE ENCONTRAMOS EN TU BARBERÍA
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {[
                { icon: "🔴", texto: r.fuga1Titulo, urgencia: "Crítico" },
                { icon: "🟠", texto: "Servicios adicionales sin explotar", urgencia: "Alto" },
                { icon: "🟡", texto: r.scoreRep >= 80 ? "Reputación que puede posicionarte como #1" : "Reputación online débil", urgencia: "Medio" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#ffffff10", borderRadius: 8, padding: "10px 12px" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: BLANCO, fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{item.texto}</div>
                  </div>
                  <span style={{ background: "#ffffff15", color: "#aaa", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, flexShrink: 0 }}>{item.urgencia}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "#ffffff15", marginBottom: 14 }} />
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>
              Cada reporte tiene pasos exactos, precios en pesos y PDF descargable. Durante el lanzamiento todos están sin costo.
            </p>
            <button
              onClick={() => setMostrarReportes(!mostrarReportes)}
              style={{ width: "100%", background: VERDE, color: BLANCO, border: "none", borderRadius: 10, padding: "13px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              {mostrarReportes ? "Ocultar reportes ▲" : "Ver cómo resolver cada fuga →"}
            </button>
          </div>

          {/* REPORTES */}
          {mostrarReportes && reportes.map((rep) => (
            <div key={rep.nombre} style={{
              background: rep.destacado ? VERDE_SUAVE : BLANCO,
              borderRadius: 14, padding: "16px",
              border: `1.5px solid ${rep.destacado ? VERDE2 : GRIS_BORDE}`,
              marginBottom: 10,
            }}>
              {rep.destacado && (
                <div style={{ marginBottom: 8 }}>
                  <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block" }}>MÁS SOLICITADO</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ color: CARBON, fontSize: 14, fontWeight: 700, flex: 1, paddingRight: 12 }}>{rep.nombre}</div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: GRIS, fontSize: 11, textDecoration: "line-through", marginBottom: 2 }}>{rep.precioReal}</div>
                  <div style={{ color: VERDE, fontSize: 12, fontWeight: 800 }}>Lanzamiento: $0</div>
                </div>
              </div>
              <p style={{ color: GRIS, fontSize: 12, margin: "0 0 12px", lineHeight: 1.6 }}>{rep.desc}</p>
              <button
                onClick={() => {
                  sessionStorage.setItem("radarbarber_respuestas", JSON.stringify(respuestas));
                  window.location.href = rep.ruta;
                }}
                style={{
                  width: "100%",
                  background: rep.destacado ? VERDE : "transparent",
                  color: rep.destacado ? BLANCO : VERDE,
                  border: `1.5px solid ${VERDE}`, borderRadius: 8,
                  padding: "10px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                  fontFamily: "system-ui",
                }}
              >
                Ver mi reporte →
              </button>
            </div>
          ))}

          <p style={{ color: GRIS, fontSize: 10, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
            RadarBarber · Diagnóstico basado en datos reales del sector de barberías en México
          </p>
        </div>
      </div>
    );
  }

  return null;
}