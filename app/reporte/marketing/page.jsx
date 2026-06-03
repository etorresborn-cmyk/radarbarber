'use client';
import { useState, useEffect } from "react";

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
    const respuestas = JSON.parse(datos);
    generarReporte(respuestas);
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
      <div style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.7, maxWidth: 260 }}>
        Creando tu plan de marketing personalizado...
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 9, height: 9, background: VERDE, borderRadius: "50%", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.25;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}`}</style>
    </div>
  );

  if (estado === "sin_datos") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>Primero completa el diagnostico</h2>
      <p style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.6, marginBottom: 24 }}>Necesitamos tus respuestas para personalizar este reporte.</p>
      <a href="/" style={{ background: VERDE, color: BLANCO, padding: "14px 28px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
        Ir al diagnostico →
      </a>
    </div>
  );

  if (estado === "error") return (
    <div style={{ background: CREMA, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
      <h2 style={{ color: CARBON, fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>Algo salio mal</h2>
      <p style={{ color: GRIS, fontSize: 13, textAlign: "center", lineHeight: 1.6, marginBottom: 24 }}>No pudimos generar tu reporte. Por favor intenta de nuevo.</p>
      <button onClick={() => window.location.reload()} style={{ background: VERDE, color: BLANCO, padding: "14px 28px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
        Intentar de nuevo
      </button>
    </div>
  );

  const r = reporte;

  return (
    <div style={{ background: CREMA, minHeight: "100vh", fontFamily: "system-ui", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: VERDE, padding: "16px 24px 20px" }}>
        <Logo />
        <div style={{ marginTop: 16 }}>
          <Tag texto="PLAN DE MARKETING" color={VERDE} bg={VERDE_CLARO} />
          <h1 style={{ color: BLANCO, fontSize: 20, fontWeight: 700, margin: "10px 0 6px", lineHeight: 1.3, fontFamily: "Georgia, serif" }}>
            Tu plan personalizado para conseguir mas clientes
          </h1>
          <p style={{ color: VERDE_CLARO, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Basado en datos reales del sector de barberias en Mexico
          </p>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>

        <Seccion titulo="👤 TU CLIENTE IDEAL">
          <p style={{ color: CARBON, fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>
            {r.cliente_ideal.descripcion}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["Edad", r.cliente_ideal.edad],
              ["Como te encuentra", r.cliente_ideal.comportamiento],
              ["Por que vuelve", r.cliente_ideal.motivacion],
            ].map(([label, valor]) => (
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
                  <div style={{ width: 24, height: 24, background: VERDE_SUAVE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: VERDE, flexShrink: 0 }}>
                    {j + 1}
                  </div>
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
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
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

        {!mostrarEmail ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Quieres guardar este plan?</div>
            <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>
              Descarga el PDF completo para tenerlo siempre a mano.
            </p>
            <button onClick={() => setMostrarEmail(true)} style={{
              width: "100%", background: VERDE, color: BLANCO, border: "none",
              borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>
              Descargar PDF gratis →
            </button>
          </div>
        ) : !emailOk ? (
          <div style={{ background: BLANCO, borderRadius: 14, padding: "20px", border: `1px solid ${GRIS_BORDE}`, marginBottom: 20 }}>
            <div style={{ color: VERDE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Un ultimo paso</div>
            <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>
              Deja tu email para descargar el PDF.
            </p>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@email.com"
              style={{
                width: "100%", background: CREMA, border: `1.5px solid ${GRIS_BORDE}`,
                borderRadius: 10, padding: "13px 16px", color: CARBON,
                fontSize: 14, boxSizing: "border-box", outline: "none", marginBottom: 12,
              }}
            />
            <button
              onClick={() => { if (email) { setEmailOk(true); generarPDF(); } }}
              disabled={!email}
              style={{
                width: "100%", background: email ? VERDE : CREMA3,
                color: email ? BLANCO : GRIS, border: "none",
                borderRadius: 12, padding: "14px", fontSize: 14,
                fontWeight: 700, cursor: email ? "pointer" : "not-allowed",
              }}
            >
              Descargar mi PDF →
            </button>
          </div>
        ) : (
          <div style={{ background: VERDE_SUAVE, borderRadius: 14, padding: "20px", border: `1px solid ${VERDE_CLARO}`, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
            <div style={{ color: VERDE, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>PDF descargandose!</div>
            <p style={{ color: GRIS, fontSize: 12, lineHeight: 1.6, margin: 0 }}>
              Revisa tus descargas. Copia guardado en <strong>{email}</strong>
            </p>
          </div>
        )}

        <p style={{ color: GRIS, fontSize: 10, textAlign: "center", lineHeight: 1.6 }}>
          RadarBarber · Plan basado en datos reales del sector de barberias en Mexico
        </p>
      </div>
    </div>
  );

  async function generarPDF() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const VD = [27, 67, 50];
    const VM = [45, 106, 79];
    const VS = [216, 234, 224];
    const VC = [183, 217, 198];
    const OR = [154, 123, 58];
    const OS = [245, 237, 214];
    const CR = [250, 247, 240];
    const CB = [221, 216, 204];
    const CA = [26, 26, 26];
    const GR = [107, 107, 107];
    const BL = [255, 255, 255];

    const M = 15;
    const PW = 180;
    const FOOTER_Y = 283;
    let y = 0;
    let numPag = 0;

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
      return doc.splitTextToSize(limpiar(texto), ancho);
    }

    function altH(texto, ancho, size = 9.5, lineH = 5.2) {
      return getLineas(texto, ancho, size).length * lineH;
    }

    function chk(h) {
      if (y + h > FOOTER_Y - 5) {
        dibujarFooter();
        doc.addPage();
        numPag++;
        dibujarHeader();
        y = 26;
      }
    }

    function dibujarFooter() {
      doc.setFillColor(...VD);
      doc.rect(0, FOOTER_Y, 210, 14, 'F');
      doc.setFillColor(...OR);
      doc.rect(0, FOOTER_Y, 210, 1, 'F');
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...VC);
      doc.text('RadarBarber  |  Plan de Marketing Personalizado', M, FOOTER_Y + 8);
      doc.text(`Pagina ${numPag} de 5`, 210 - M, FOOTER_Y + 8, { align: 'right' });
    }

    function dibujarHeader() {
      doc.setFillColor(...VD);
      doc.rect(0, 0, 210, 20, 'F');
      doc.setFillColor(...OR);
      doc.rect(0, 20, 210, 1.2, 'F');
      doc.setFillColor(...VM);
      doc.roundedRect(M, 4, 12, 12, 2, 2, 'F');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...BL);
      doc.text('RB', M + 6, 12, { align: 'center' });
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...BL);
      doc.text('RADARBARBER', M + 16, 9);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...VC);
      doc.text('Plan de Marketing Personalizado', M + 16, 15);
    }

    function escribir(texto, x, yPos, maxW, size = 9.5, bold = false, color = CA, lineH = 5.2) {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setTextColor(...color);
      const lineas = doc.splitTextToSize(limpiar(texto), maxW);
      doc.text(lineas, x, yPos);
      return lineas.length * lineH;
    }

    function seccionHeader(num, titulo) {
      const h = 12;
      chk(h + 6);
      doc.setFillColor(...VD);
      doc.roundedRect(M, y, PW, h, 2, 2, 'F');
      doc.setFillColor(...OR);
      doc.circle(M + 8, y + 6, 5, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...BL);
      doc.text(num, M + 8, y + 8.5, { align: 'center' });
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...BL);
      doc.text(limpiar(titulo), M + 18, y + 8);
      y += h + 6;
    }

    function etq(texto) {
      chk(8);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...OR);
      doc.text(limpiar(texto.toUpperCase()), M, y);
      y += 5;
    }

    function parr(texto, indent = 0, size = 9.5) {
      const h = altH(texto, PW - indent, size) + 3;
      chk(h);
      escribir(texto, M + indent, y, PW - indent, size);
      y += h;
    }

    function sep() {
      chk(8);
      doc.setDrawColor(...CB);
      doc.setLineWidth(0.3);
      doc.line(M, y, M + PW, y);
      y += 6;
    }

    function esp(n = 5) { y += n; }

    function cajaNormal(texto, bgColor = CR, borde = CB) {
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      const lineas = doc.splitTextToSize(limpiar(texto), PW - 12);
      const lineH = 5.2;
      const h = lineas.length * lineH + 12;
      chk(h + 2);
      doc.setFillColor(...bgColor);
      doc.setDrawColor(...borde);
      doc.setLineWidth(0.4);
      doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
      doc.setTextColor(...CA);
      doc.text(lineas, M + 6, y + 7);
      y += h + 4;
    }

    function cajaCaption(texto) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const lineas = doc.splitTextToSize(limpiar(texto), PW - 16);
      const lineH = 5.2;
      const h = lineas.length * lineH + 14;
      chk(h + 2);
      doc.setFillColor(235, 248, 241);
      doc.setDrawColor(...VC);
      doc.setLineWidth(0.5);
      doc.roundedRect(M, y, PW, h, 2, 2, 'FD');
      doc.setFillColor(...VM);
      doc.rect(M, y, 3.5, h, 'F');
      doc.setTextColor(...CA);
      doc.text(lineas, M + 7, y + 7);
      y += h + 5;
    }

    function dosCajas(l1, v1, l2, v2) {
      const w = (PW - 4) / 2;
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      const lin1 = doc.splitTextToSize(limpiar(v1), w - 8);
      const lin2 = doc.splitTextToSize(limpiar(v2), w - 8);
      const lineH = 5;
      const h = Math.max(lin1.length, lin2.length) * lineH + 16;
      chk(h + 2);
      [0, 1].forEach(i => {
        const x = M + i * (w + 4);
        const label = i === 0 ? l1 : l2;
        const lineas = i === 0 ? lin1 : lin2;
        doc.setFillColor(...CR);
        doc.setDrawColor(...CB);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, y, w, h, 2, 2, 'FD');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...GR);
        doc.text(limpiar(label.toUpperCase()), x + 4, y + 6);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...CA);
        doc.text(lineas.slice(0, 4), x + 4, y + 12);
      });
      y += h + 5;
    }

    function dosCajasPost(l1, v1, l2, v2) {
      const w = (PW - 4) / 2;
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      const lin1 = doc.splitTextToSize(limpiar(v1), w - 8);
      const lin2 = doc.splitTextToSize(limpiar(v2), w - 8);
      const lineH = 5;
      const h = Math.max(lin1.length, lin2.length) * lineH + 18;
      chk(h + 2);
      [0, 1].forEach(i => {
        const x = M + i * (w + 4);
        const label = i === 0 ? l1 : l2;
        const lineas = i === 0 ? lin1 : lin2;
        doc.setFillColor(...CR);
        doc.setDrawColor(...CB);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, y, w, h, 2, 2, 'FD');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...GR);
        doc.text(limpiar(label.toUpperCase()), x + 4, y + 6);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...CA);
        doc.text(lineas.slice(0, 5), x + 4, y + 13);
      });
      y += h + 5;
    }

    // ══ PORTADA ══════════════════════════════════════════════════════════
    doc.setFillColor(...VD);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setDrawColor(45, 106, 79);
    doc.setLineWidth(0.3);
    for (let i = 0; i < 8; i++) doc.line(0, 30 + i * 35, 210, 30 + i * 35);

    doc.setFillColor(...VM);
    doc.roundedRect(M, 28, 22, 22, 4, 4, 'F');
    doc.setFillColor(...OR);
    doc.roundedRect(M, 28, 22, 3, 1, 1, 'F');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BL);
    doc.text('RB', M + 11, 44, { align: 'center' });

    doc.setFontSize(44);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BL);
    doc.text('RADAR', M, 95);
    doc.setTextColor(...OS);
    doc.text('BARBER', M, 118);

    doc.setFillColor(...OR);
    doc.rect(M, 125, 90, 1.5, 'F');

    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...BL);
    doc.text('Plan de Marketing', M, 142);
    doc.setFont('helvetica', 'bold');
    doc.text('Personalizado', M, 155);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...VC);
    doc.text('Basado en datos reales del sector de barberias en Mexico', M, 168);

    doc.setFillColor(20, 52, 38);
    doc.roundedRect(M, 182, PW, 68, 4, 4, 'F');
    doc.setFillColor(...OR);
    doc.rect(M, 182, 3.5, 68, 'F');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...OS);
    doc.text('ESTE REPORTE INCLUYE:', M + 10, 193);

    const items = [
      '01  Tu cliente ideal definido con precision',
      '02  Tus 2 canales prioritarios con acciones concretas',
      '03  Calendario de accion para 30 dias',
      '04  3 posts listos para copiar y publicar',
      '05  Tu promocion de esta semana',
    ];
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...BL);
    items.forEach((item, i) => doc.text(item, M + 10, 203 + i * 9));

    doc.setFontSize(8);
    doc.setTextColor(60, 120, 90);
    const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Generado el ${limpiar(fecha)}`, M, 268);
    doc.setTextColor(45, 106, 79);
    doc.text('radarbarber.vercel.app', 210 - M, 268, { align: 'right' });

    // ══ CONTENIDO ══════════════════════════════════════════════════════════
    doc.addPage();
    numPag = 2;
    dibujarHeader();
    y = 28;

    // SECCIÓN 1 — Cliente ideal
    seccionHeader('01', 'TU CLIENTE IDEAL');
    parr(r.cliente_ideal.descripcion);
    esp(3);
    dosCajas('Edad', r.cliente_ideal.edad, 'Como te encuentra', r.cliente_ideal.comportamiento);
    etq('Por que vuelve:');
    cajaNormal(r.cliente_ideal.motivacion, VS, VC);
    esp(6);

    // SECCIÓN 2 — Canales
    seccionHeader('02', 'TUS 2 CANALES PRIORITARIOS');
    r.canales.forEach((canal, i) => {
      chk(50);
      doc.setFillColor(...VM);
      doc.roundedRect(M, y, PW, 10, 2, 2, 'F');
      doc.setFillColor(...OR);
      doc.rect(M, y, 3.5, 10, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...BL);
      doc.text(`Canal ${i + 1}: ${limpiar(canal.nombre)}`, M + 7, y + 7);
      y += 14;
      parr(canal.por_que);
      esp(2);
      etq('Acciones concretas:');
      canal.acciones.forEach(a => {
        const h = altH(a, PW - 10) + 4;
        chk(h);
        doc.setFillColor(...OR);
        doc.circle(M + 2.5, y + 1.5, 1.5, 'F');
        escribir(a, M + 7, y, PW - 10);
        y += h;
      });
      if (i < r.canales.length - 1) { esp(6); sep(); }
    });
    esp(8);

    // SECCIÓN 3 — Calendario
    seccionHeader('03', 'CALENDARIO DE ACCION - 30 DIAS');
    r.calendario.forEach((sem) => {
      chk(50);
      doc.setFillColor(...OS);
      doc.setDrawColor(...OR);
      doc.setLineWidth(0.5);
      doc.roundedRect(M, y, PW, 16, 2, 2, 'FD');
      doc.setFillColor(...OR);
      doc.rect(M, y, 3.5, 16, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 75, 30);
      doc.text(limpiar(sem.semana), M + 8, y + 7);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...GR);
      doc.text(`Foco: ${limpiar(sem.foco)}`, M + 8, y + 13);
      y += 20;
      sem.acciones.forEach((a, j) => {
        const h = altH(a, PW - 12) + 4;
        chk(h);
        doc.setFillColor(...VS);
        doc.circle(M + 3.5, y + 1.5, 3.5, 'F');
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...VD);
        doc.text(`${j + 1}`, M + 3.5, y + 3.5, { align: 'center' });
        escribir(a, M + 10, y, PW - 12);
        y += h + 1;
      });
      esp(7);
    });

    // SECCIÓN 4 — Posts
    seccionHeader('04', '3 POSTS LISTOS PARA PUBLICAR');
    r.posts.forEach((post, i) => {
      chk(20);
      // Header post
      doc.setFillColor(...CR);
      doc.setDrawColor(...VS);
      doc.setLineWidth(0.8);
      doc.roundedRect(M, y, PW, 10, 2, 2, 'FD');
      doc.setFillColor(...VD);
      doc.rect(M, y, 4, 10, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...VD);
      doc.text(`Post ${i + 1}: ${limpiar(post.titulo || '')}`, M + 8, y + 7);
      y += 13;

      // Tag tipo
      const tagW = doc.getTextWidth(limpiar(post.tipo || '')) + 8;
      doc.setFillColor(...VS);
      doc.roundedRect(M, y - 3, tagW, 7, 1, 1, 'F');
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...VM);
      doc.text(limpiar(post.tipo || ''), M + 4, y + 1);
      y += 9;

      // Caption
      etq('Caption listo para copiar y pegar:');
      cajaCaption(post.caption || '');

      // Qué grabar y CTA
      dosCajasPost('Que grabar', post.imagen || '', 'CTA', post.cta || '');

      if (i < r.posts.length - 1) { esp(3); sep(); }
    });
    esp(8);

    // SECCIÓN 5 — Promoción
    const promH = altH(r.promocion.descripcion || '', PW - 10) +
                  altH(r.promocion.como_comunicarla || '', PW - 10) +
                  altH(r.promocion.cuando_lanzarla || '', PW - 10) + 70;
    chk(promH);

    seccionHeader('05', 'TU PROMOCION DE ESTA SEMANA');

    doc.setFillColor(...VD);
    doc.roundedRect(M, y, PW, 14, 2, 2, 'F');
    doc.setFillColor(...OR);
    doc.rect(M, y, 4, 14, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BL);
    doc.text(limpiar(r.promocion.nombre || ''), M + 8, y + 10);
    y += 18;

    parr(r.promocion.descripcion || '');
    esp(3);
    etq('Como comunicarla:');
    cajaNormal(r.promocion.como_comunicarla || '', CR, CB);
    etq('Cuando lanzarla:');
    cajaNormal(r.promocion.cuando_lanzarla || '', OS, [...OR]);

    dibujarFooter();
    doc.save('RadarBarber-Plan-Marketing.pdf');
  }
}