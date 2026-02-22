"use client";

import { useState, useEffect } from "react";

export default function FashionCategorySection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Syncopate:wght@700&display=swap');
        .fashion-section, .fashion-section * { box-sizing: border-box; }
        .image-card:hover img { transform: scale(1.04); filter: saturate(1.05); }
        .image-card img { transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s ease; filter: saturate(0.9); }
        .fade-in { opacity: 0; transform: translateY(14px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.05s; }
        .delay-2 { transition-delay: 0.18s; }
        .delay-3 { transition-delay: 0.32s; }
      `}</style>

      <section style={{
        width: "100%",
        background: "#EFEFEF",
        padding: "60px 80px",
        overflow: "hidden",
      }}>

        {/* ── HEADER ── */}
        <header
          className={`fade-in ${mounted ? "visible" : ""}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "10px",
          }}
        >
          {/* Empty spacer — same width as pants + blazers + gap + marginLeft */}
          <div style={{ width: "calc(302px + 302px + 16px + 16px)", flexShrink: 0 }} />

          {/* BE THAT % — left side above hoodies */}
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#C7C7C7",
            lineHeight: "normal",
            textTransform: "uppercase",
            margin: 0,
            letterSpacing: "0.05em",
            flex: 1,
          }}>
            BE THAT %
          </h2>

          {/* CATEGORY — far right */}
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#C7C7C7",
            lineHeight: "normal",
            textTransform: "uppercase",
            margin: 0,
            letterSpacing: "0.05em",
          }}>
            CATEGORY
          </h2>
        </header>

        {/* ── IMAGE GRID ── */}
        <div style={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-end",
        }}>

          {/* ── PANTS ── */}
          <div
            className={`image-card fade-in delay-1 ${mounted ? "visible" : ""}`}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              width: "302px",
              height: "371px",
              flexShrink: 0,
            }}
          >
            <img
              src="/white3.png"
              alt="Pants collection"
              style={{
                position: "absolute",
                width: "302px",
                height: "371px",
                top: "0px",
                left: "0px",
              }}
            />
            <span style={{ position: "absolute", bottom: "18px", left: "18px", fontFamily: "'Syncopate', monospace", fontSize: "11px", letterSpacing: "3px", fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", zIndex: 2 }}>
              PANTS
            </span>
          </div>

          {/* ── BLAZERS ── */}
          <div
            className={`image-card fade-in delay-2 ${mounted ? "visible" : ""}`}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              width: "302px",
              height: "371px",
              flexShrink: 0,
            }}
          >
            <img
              src="/white2.png"
              alt="Blazers collection"
              style={{
                position: "absolute",
                width: "302px",
                height: "371px",
                top: "0px",
                left: "0px",
              }}
            />
            <span style={{ position: "absolute", top: "18px", left: "18px", fontFamily: "'Syncopate', monospace", fontSize: "11px", letterSpacing: "3px", fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", zIndex: 2 }}>
              BLAZERS
            </span>
          </div>

          {/* ── HOODIES ── */}
          <div
            className={`image-card fade-in delay-3 ${mounted ? "visible" : ""}`}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              flex: 1,
              height: "640px",       // ← increased from 540px so jawline isn't cut
            }}
          >
            <img
              src="/white1.png"
              alt="Hoodies collection"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0px",
                left: "0px",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
            <span style={{ position: "absolute", bottom: "18px", left: "18px", fontFamily: "'Syncopate', monospace", fontSize: "11px", letterSpacing: "3px", fontWeight: 700, color: "#1a1a1a", textTransform: "uppercase", zIndex: 2 }}>
              HOODIES
            </span>
          </div>

        </div>
      </section>
    </>
  );
}