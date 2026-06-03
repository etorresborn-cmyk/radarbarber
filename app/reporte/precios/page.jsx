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

  // ── COLORES (arrays para spread, nunca pasar array directo a setTextColor) ──
  const VD = [27, 67, 50]; const VM = [45, 106, 79]; const VS = [216, 234, 224];
  const VC = [183, 217, 198]; const OR = [154, 123, 58]; const OS = [245, 237, 214];
  const CR = [250, 247, 240]; const CB = [221, 216, 204]; const CA = [26, 26, 26];
  const GR = [107, 107, 107]; const BL = [255, 255, 255]; const RJ = [139, 46, 46];
  const RS = [245, 224, 224];

  const M = 15; const PW = 180; const FOOTER_Y = 283;
  let y = 0; let numPag = 0;

  // ── LIMPIAR TEXTO (elimina acentos y caracteres especiales) ──────────────
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

  // ── UTILIDADES DE TEXTO ──────────────────────────────────────────────────
  function getLineas(texto, ancho, size = 9.5) {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'normal');
    return doc.splitTextToSize(limpiar(texto), ancho);
  }

  function altH(texto, ancho, size = 9.5, lh = 5.2) {
    return getLineas(texto, ancho, size).length * lh;
  }

  // ── CHK: verificar espacio ANTES de dibujar ──────────────────────────────
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
    doc.text('RadarBarber  |  Reporte de Precios', M, FOOTER_Y + 8);
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
    doc.setTextColor(VC[0], VC[1], VC[2]); doc.text('Reporte de Precios', M + 16, 15);
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

  function cajaDestacada(texto, bgArr = VS, bordeArr = VC, lineArr = VM) {
    const lineas = getLineas(texto, PW - 16);
    const h = lineas.length * 5.2 + 14; chk(h + 2);
    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.setDrawColor(bordeArr[0], bordeArr[1], bordeArr[2]);
    doc.setLineWidth(0.4); doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
    doc.setFillColor(lineArr[0], lineArr[1], lineArr[2]);
    doc.rect(M, y, 3.5, h, 'F');
    doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(lineas, M + 7, y + 8); y += h + 5;
  }

  // ── BLOQUE DE ACCIONES: calcula altura total antes de dibujar ────────────
  function bloqueAccion(acciones, bgArr, colorArr, titulo) {
    // Calcular altura total del bloque completo antes de empezar
    const hTitulo = 9 + 4;
    const hAcciones = acciones.reduce((acc, a) => acc + altH(a, PW - 12) + 5, 0);
    const hTotal = hTitulo + hAcciones + 4;
    chk(hTotal);

    doc.setFillColor(bgArr[0], bgArr[1], bgArr[2]);
    doc.roundedRect(M, y, PW, 9, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(colorArr[0], colorArr[1], colorArr[2]);
    doc.text(titulo, M + 6, y + 6); y += 13;

    acciones.forEach((accion, i) => {
      const h = altH(accion, PW - 12) + 4;
      // No necesita chk() aquí porque ya verificamos espacio arriba
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

  // ── BLOQUE RESULTADOS: usa cuadrado verde en vez de ✓ ────────────────────
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
      // Cuadrado verde con "OK" en vez de ✓ (evita problema de encoding)
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
  doc.setFont('helvetica', 'bold'); doc.text('Precios y Tarifas', M, 155);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  doc.setTextColor(VC[0], VC[1], VC[2]);
  doc.text('Cuanto cobrar y como subir sin perder clientes', M, 168);
  doc.setFillColor(20, 52, 38); doc.roundedRect(M, 182, PW, 68, 4, 4, 'F');
  doc.setFillColor(OR[0], OR[1], OR[2]); doc.rect(M, 182, 3.5, 68, 'F');
  doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
  doc.setTextColor(OS[0], OS[1], OS[2]); doc.text('ESTE REPORTE INCLUYE:', M + 10, 193);
  const portadaItems = [
    '01  Diagnostico de tus precios actuales',
    '02  Precios recomendados por servicio',
    '03  Plan de subida en 2 etapas',
    '04  Tu membresia mensual sugerida',
    '05  Como manejar objeciones de clientes',
    '06  Tu plan de accion — proximos 30 dias',
  ];
  doc.setFont('helvetica', 'normal'); doc.setTextColor(BL[0], BL[1], BL[2]);
  portadaItems.forEach((item, i) => doc.text(item, M + 10, 200 + i * 8));
  doc.setFontSize(8); doc.setTextColor(60, 120, 90);
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${limpiar(fecha)}`, M, 268);
  doc.setTextColor(45, 106, 79);
  doc.text('radarbarber.vercel.app', 210 - M, 268, { align: 'right' });

  // ══ CONTENIDO ══════════════════════════════════════════════════════════
  doc.addPage(); numPag = 2; dibujarHeader(); y = 28;

  // S1 — Diagnóstico
  seccionHeader('01', 'DIAGNOSTICO DE TUS PRECIOS');
  parr(r.diagnostico.resumen); esp(4);
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
    const col = i === 0 ? RJ : VM;
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.setDrawColor(borde[0], borde[1], borde[2]);
    doc.setLineWidth(0.3); doc.roundedRect(x, y, wM, hD, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.setTextColor(col[0], col[1], col[2]); doc.text(label, x + 4, y + 7);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    const ls = doc.splitTextToSize(limpiar(val), wM - 8);
    doc.text(ls, x + 4, y + 13);
  });
  y += hD + 8;

  // S2 — Precios recomendados
  seccionHeader('02', 'TUS PRECIOS RECOMENDADOS');
  [
    { data: r.precios_recomendados.corte_basico, titulo: 'Corte Basico', detalle: r.precios_recomendados.corte_basico.justificacion, bg: VS, colorH: VD },
    { data: r.precios_recomendados.corte_premium, titulo: 'Corte Premium', detalle: r.precios_recomendados.corte_premium.que_incluye, bg: OS, colorH: OR },
    { data: r.precios_recomendados.paquete_completo, titulo: 'Paquete Completo', detalle: r.precios_recomendados.paquete_completo.que_incluye, bg: RS, colorH: RJ },
  ].forEach(({ data, titulo, detalle, bg, colorH }, i) => {
    // Calcular altura total antes de dibujar
    const linDet = doc.splitTextToSize(limpiar(detalle), PW - 8);
    const linInc = doc.splitTextToSize(`+ ${limpiar(data.incremento_mensual)} adicionales al mes`, PW - 16);
    const hTotal = 14 + linDet.length * 5 + 4 + linInc.length * 4.8 + 10;
    chk(hTotal);

    doc.setFillColor(bg[0], bg[1], bg[2]); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(colorH[0], colorH[1], colorH[2]); doc.text(limpiar(titulo), M + 6, y + 8);
    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text(limpiar(data.precio_sugerido), M + PW - 4, y + 8, { align: 'right' });
    y += 14;

    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(linDet, M + 4, y); y += linDet.length * 5 + 4;

    const hIncReal = linInc.length * 4.8 + 8;
    doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M + 4, y - 2, PW - 8, hIncReal, 1, 1, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VD[0], VD[1], VD[2]); doc.text(linInc, M + 8, y + 3);
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
    // Calcular altura total del bloque antes de dibujar
    const linMsg = doc.splitTextToSize(limpiar(data.como_comunicarlo), PW - 16);
    const hMsg = linMsg.length * 5.2 + 14;
    const hTotal = 14 + 6 + hMsg + 10;
    chk(hTotal);

    doc.setFillColor(VD[0], VD[1], VD[2]); doc.circle(M + 5, y + 4, 5, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(BL[0], BL[1], BL[2]); doc.text(num, M + 5, y + 6.5, { align: 'center' });
   doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(CA[0], CA[1], CA[2]);
    doc.text(`${limpiar(titulo)} — ${limpiar(data.cuando)}`, M + 14, y + 5);
    y += 7;
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(VD[0], VD[1], VD[2]);
    const linCuanto = doc.splitTextToSize(limpiar(data.cuanto_subir), PW - 16);
    doc.text(linCuanto, M + 14, y);
    y += linCuanto.length * 5 + 3;
    etq('MENSAJE PARA TUS CLIENTES:', OR);
    cajaDestacada(data.como_comunicarlo);
    if (i === 0) { esp(2); sep(); }
  });
  esp(4);

  // S4 — Membresía
  seccionHeader('04', 'TU MEMBRESIA MENSUAL');
  chk(14);
  doc.setFillColor(VS[0], VS[1], VS[2]); doc.roundedRect(M, y, PW, 12, 2, 2, 'F');
  doc.setFillColor(VD[0], VD[1], VD[2]); doc.rect(M, y, 4, 12, 'F');
  doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  doc.setTextColor(VD[0], VD[1], VD[2]);
  doc.text(limpiar(r.membresia.precio_sugerido), M + 8, y + 9);
  y += 16;
  parr(r.membresia.que_incluye); esp(3);
  etq('COMO PRESENTARLA:', OR);
  cajaNormal(r.membresia.argumento_venta, VS, VC);
  const linGar = doc.splitTextToSize(`Con 30 miembros: ${limpiar(r.membresia.ingreso_garantizado)}`, PW - 12);
  const hGar = linGar.length * 5 + 10;
  chk(hGar);
  doc.setFillColor(OS[0], OS[1], OS[2]); doc.roundedRect(M, y, PW, hGar, 2, 2, 'F');
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.setTextColor(CA[0], CA[1], CA[2]); doc.text(linGar, M + 6, y + 7);
  y += hGar + 5; esp(2);

  // S5 — Objeciones (máximo 3, altura calculada antes de dibujar)
  seccionHeader('05', 'COMO MANEJAR OBJECIONES');
  const objeciones = r.como_manejar_objeciones.slice(0, 3);
  objeciones.forEach((obj, j) => {
    const linObj = doc.splitTextToSize(limpiar(obj.objecion), PW - 30);
    const hObj = linObj.length * 5 + 12;
    const linResp = doc.splitTextToSize(limpiar(obj.respuesta), PW - 16);
    const hResp = linResp.length * 5.2 + 14;
    const hTotal = hObj + 3 + 6 + hResp + 10;
    chk(hTotal);

    doc.setFillColor(RS[0], RS[1], RS[2]); doc.roundedRect(M, y, PW, hObj, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(RJ[0], RJ[1], RJ[2]); doc.text('Cliente dice:', M + 4, y + 6);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(CA[0], CA[1], CA[2]); doc.text(linObj, M + 28, y + 6);
    y += hObj + 3;
    etq('Tu respuesta:', VM);
    cajaDestacada(obj.respuesta);
    if (j < objeciones.length - 1) { esp(2); sep(); }
  });
  esp(6);

  // S6 — Plan de acción
  seccionHeader('06', 'TU PLAN DE ACCION — PROXIMOS 30 DIAS');
  bloqueAccion(r.plan_accion.esta_semana, RS, RJ, 'ESTA SEMANA');
  bloqueAccion(r.plan_accion.este_mes, OS, OR, 'ESTE MES');
  bloqueResultados(r.plan_accion.resultados_30_dias);

  dibujarFooter();
  doc.save('RadarBarber-Reporte-Precios.pdf');
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
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>REPORTE DE PRECIOS</span>
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Una pregunta antes de tu reporte
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
          Generar mi Reporte de Precios →
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
          <span style={{ background: VERDE_CLARO, color: VERDE, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, display: "inline-block", marginBottom: 10 }}>REPORTE DE PRECIOS</span>
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