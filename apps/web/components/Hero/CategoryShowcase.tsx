"use client";

import Image from "next/image";
import { useState, useRef } from "react";

// ─── SplitImage ───────────────────────────────────────────────────────────────

function SplitImage({
  src = "/split.png",
  alt = "Split Image",
  splitGap = 18,
  splitAxis = "horizontal" as "horizontal" | "vertical",
  duration = 500,
  zoomScale = 1.18,
}) {
  const [hovered, setHovered] = useState(false);
  const [hoveredHalf, setHoveredHalf] = useState<null | "top" | "bottom">(null);
  const easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const transition = `transform ${duration}ms ${easing}`;
  const clipTop    = splitAxis === "horizontal" ? "inset(0 0 70% 0)" : "inset(0 70% 0 0)";
  const clipBottom = splitAxis === "horizontal" ? "inset(30% 0 0 0)" : "inset(0 0 0 30%)";
  const translateTop = splitAxis === "horizontal" ? `translateY(${hovered ? -splitGap : 0}px)` : `translateX(${hovered ? -splitGap : 0}px)`;
  const translateBottom = splitAxis === "horizontal" ? `translateY(${hovered ? splitGap : 0}px)` : `translateX(${hovered ? splitGap : 0}px)`;
  const halfWrapStyle = (clip: string, translate: string): React.CSSProperties => ({
    position: "absolute", inset: 0, clipPath: clip, transform: translate,
    transition, lineHeight: 0, width: "100%", overflow: "hidden",
  });
  const imgStyle = (isThisHalfHovered: boolean): React.CSSProperties => ({
    display: "block",
    transform: hovered && isThisHalfHovered ? `scale(${zoomScale})` : "scale(1)",
    transformOrigin: "center center", transition,
  });
  const bottomHalfTopPercent = 70;
  const labelTextStyle: React.CSSProperties = {
    color: "#373737", fontFamily: "Poppins, sans-serif", fontSize: "16px",
    fontStyle: "normal", fontWeight: 700, lineHeight: "normal", textTransform: "uppercase",
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block", cursor: "pointer", lineHeight: 0, overflow: "visible" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setHoveredHalf(null); }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ display: "block", visibility: "hidden" }} aria-hidden="true" />
      <div style={halfWrapStyle(clipTop, translateTop)} onMouseEnter={() => setHoveredHalf("top")} onMouseLeave={() => setHoveredHalf(null)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={imgStyle(hoveredHalf === "top")} />
      </div>
      <div style={halfWrapStyle(clipBottom, translateBottom)} onMouseEnter={() => setHoveredHalf("bottom")} onMouseLeave={() => setHoveredHalf(null)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" aria-hidden="true" style={imgStyle(hoveredHalf === "bottom")} />
      </div>
      <div style={{ position: "absolute", top: `${bottomHalfTopPercent - 68}%`, transform: "translateY(-50%)", left: "calc(100% + 24px)", opacity: hoveredHalf === "top" ? 1 : 0, translate: hoveredHalf === "top" ? "0 0" : "-12px 0", transition: `opacity 350ms ${easing}, translate 350ms ${easing}`, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "flex-start", whiteSpace: "nowrap", zIndex: 10 }}>
        <span style={labelTextStyle}>Scarf</span>
        <span style={{ ...labelTextStyle, marginTop: "6px" }}>AED. 267.00</span>
      </div>
      <div style={{ position: "absolute", top: `${bottomHalfTopPercent - 28}%`, transform: "translateY(-50%)", right: "calc(100% + 24px)", opacity: hoveredHalf === "bottom" ? 1 : 0, translate: hoveredHalf === "bottom" ? "0 0" : "12px 0", transition: `opacity 350ms ${easing}, translate 350ms ${easing}`, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", whiteSpace: "nowrap", zIndex: 10 }}>
        <span style={labelTextStyle}>White Pant Suit</span>
        <span style={{ ...labelTextStyle, marginTop: "6px" }}>AED. 1567.00</span>
      </div>
    </div>
  );
}

// ─── CategoryShowcase ─────────────────────────────────────────────────────────

export default function CategoryShowcase() {
  const horizontalTop    = 25;
  const horizontalHeight = 10;
  const verticalHeight   = 119;
  const trackRef = useRef<HTMLDivElement>(null);

  const hoodieImages = [
    "/white.png",
    "/black.png",
    "/pink.png",
    "/yellow-hoodie.png",
  ];

  const pauseCarousel = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };

  const resumeCarousel = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };

  return (
    <>
      <div style={{ width: "100%", minHeight: "2000px", background: "#EFEFEF", position: "relative" }}>

        {/* Horizontal rack bar */}
        <div style={{ width: "100%", height: `${horizontalHeight}px`, borderRadius: "8px", position: "absolute", background: "linear-gradient(270deg, #B0B0B0 0%, #D9D9D9 100%)", top: `${horizontalTop}px`, left: 0, zIndex: 2 }} />

        {/* Scrolling rack */}
        <div style={{ position: "absolute", top: `${horizontalTop}px`, width: "100%" }}>
          <div className="rack-track" ref={trackRef}>
            {[...hoodieImages, ...hoodieImages].map((img, index) => (
              <div key={index} className="hanger-unit">
                <div className="hanger-line" />

                {/* Card — yellow card size: 324×396 */}
                <div
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={resumeCarousel}
                  style={{
                    position: "relative",
                    width: "324px",
                    height: "396px",
                    marginTop: "10px",
                    flexShrink: 0,
                    cursor: "pointer",
    
                  }}
                >
                  {/* Layer 1 — Yellow card background fills 324×396 */}
                  <Image
                    src="/yellow-card.png"
                    alt="Yellow Card"
                    fill
                    style={{ objectFit: "cover", zIndex: 0 }}
                  />

                  {/* Layer 2 — hero-carousel.webp at 260×389, centered, pinned to bottom */}
                   <div style={{
                    position: "absolute",
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "260px",
                    height: "389px",
                    zIndex: 1,
                  }}>
                    <Image
                      src="/hero-carousel.webp"
                      alt="Hero"
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>

                  {/* Layer 3 — Hoodie on top */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    zIndex: 2,
                  }}>
                    <Image src={img} alt="Hoodie" width={324} height={305} />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .rack-track {
            display: flex; gap: 80px; width: max-content;
            animation: scroll 25s linear infinite;
          }
          .hanger-unit { display: flex; flex-direction: column; align-items: center; }
          .hanger-line {
            width: 3px; height: ${verticalHeight}px;
            background: linear-gradient(180deg, #b0b0b0 0%, #d9d9d9 100%);
            border-radius: 0 0 2px 2px;
          }
          @keyframes scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* White Fabric Section */}
      <div style={{ position: "absolute", top: `${horizontalTop + 1900}px`, left: 0, width: "100%", minHeight: "1700px", backgroundImage: "url('/white-fabric.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "200px", left: "10%", width: "80%" }}>
          <div style={{ position: "absolute", top: "1000px", left: "-60px", maxWidth: "700px" }}>
            <h1 style={{ color: "#373737", fontFamily: "Poppins, sans-serif", fontSize: "70px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>
              WHY WE EXIST
            </h1>
            <p style={{ marginTop: "25px", fontFamily: "Poppins, sans-serif", fontSize: "18px", color: "#555", lineHeight: "1.6" }}>
              because modest women deserve to be seen differently. not softened. not simplified. not overlooked.
              we create pieces that reframe modesty through structure, silhouette, and scale — allowing women to take space,
              hold presence, and express themselves without compromise.
            </p>
          </div>
        </div>

        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
          <SplitImage src="/split.png" alt="Feature image" splitAxis="horizontal" splitGap={18} duration={900} zoomScale={1.18} />
        </div>
      </div>
    </>
  );
}