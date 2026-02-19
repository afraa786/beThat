"use client";
import Image from "next/image";
import { useState } from "react";

// ── SplitImage component ────────────────────────────────────────────────────
function SplitImage({
  src = "/split.png",
  alt = "Split Image",
  splitGap = 18,          // ← reduced gap between the two halves
  splitAxis = "horizontal" as "horizontal" | "vertical",
  duration = 500,         // ← slower overall animation
  zoomScale = 1.18,       // ← more zoom
}) {
  const [hovered, setHovered] = useState(false);
  const [hoveredHalf, setHoveredHalf] = useState<null | "top" | "bottom">(null);

  // soft ease-out — starts with momentum, decelerates gently
  const easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const transition = `transform ${duration}ms ${easing}`;

  const clipTop =
    splitAxis === "horizontal" ? "inset(0 0 70% 0)" : "inset(0 70% 0 0)";
  const clipBottom =
    splitAxis === "horizontal" ? "inset(30% 0 0 0)" : "inset(0 0 0 30%)";

  const translateTop =
    splitAxis === "horizontal"
      ? `translateY(${hovered ? -splitGap : 0}px)`
      : `translateX(${hovered ? -splitGap : 0}px)`;

  const translateBottom =
    splitAxis === "horizontal"
      ? `translateY(${hovered ? splitGap : 0}px)`
      : `translateX(${hovered ? splitGap : 0}px)`;

  const halfWrapStyle = (clip: string, translate: string): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    clipPath: clip,
    transform: translate,
    transition,
    lineHeight: 0,
    width: "100%",
    overflow: "hidden",
  });

  const imgStyle = (isThisHalfHovered: boolean): React.CSSProperties => ({
    display: "block",
    transform:
      hovered && isThisHalfHovered ? `scale(${zoomScale})` : "scale(1)",
    transformOrigin: "center center",
    transition,
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        lineHeight: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredHalf(null);
      }}
    >
      {/* Ghost — holds natural dimensions */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{ display: "block", visibility: "hidden" }}
        aria-hidden="true"
      />

      {/* ── Top half ── */}
      <div
        style={halfWrapStyle(clipTop, translateTop)}
        onMouseEnter={() => setHoveredHalf("top")}
        onMouseLeave={() => setHoveredHalf(null)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={imgStyle(hoveredHalf === "top")} />
      </div>

      {/* ── Bottom half ── */}
      <div
        style={halfWrapStyle(clipBottom, translateBottom)}
        onMouseEnter={() => setHoveredHalf("bottom")}
        onMouseLeave={() => setHoveredHalf(null)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          style={imgStyle(hoveredHalf === "bottom")}
        />
      </div>
    </div>
  );
}

// ── Categories component ────────────────────────────────────────────────────
export default function Categories() {
  const horizontalTop = 120;
  const horizontalHeight = 10;
  const verticalHeight = 119;

  const hoodieImages = [
    "/white.png",
    "/black.png",
    "/pink.png",
    "/yellow-hoodie.png",
  ];

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "2000px",
          background: "#EFEFEF",
          position: "relative",
        }}
      >
        {/* Horizontal rack bar */}
        <div
          style={{
            width: "100%",
            height: `${horizontalHeight}px`,
            borderRadius: "8px",
            position: "absolute",
            background: "linear-gradient(270deg, #B0B0B0 0%, #D9D9D9 100%)",
            top: `${horizontalTop}px`,
            left: 0,
            zIndex: 2,
          }}
        />

        {/* Scrolling rack */}
        <div
          style={{
            position: "absolute",
            top: `${horizontalTop}px`,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div className="rack-track">
            {[...hoodieImages, ...hoodieImages].map((img, index) => (
              <div key={index} className="hanger-unit">
                <div className="hanger-line" />

                <div className="hoodie-card">
                  <Image
                    src="/yellow-card.png"
                    alt="Yellow Card"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="hoodie-inner">
                    <Image
                      src={img}
                      alt="Hoodie"
                      width={220}
                      height={220}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .rack-track {
            display: flex;
            gap: 80px;
            width: max-content;
            animation: scroll 25s linear infinite;
          }
          .rack-track:hover {
            animation-play-state: paused;
          }
          .hanger-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hanger-line {
            width: 3px;
            height: ${verticalHeight}px;
            background: linear-gradient(180deg, #b0b0b0 0%, #d9d9d9 100%);
            border-radius: 0 0 2px 2px;
          }
          .hoodie-card {
            position: relative;
            width: 280px;
            height: 350px;
            margin-top: 20px;
            flex-shrink: 0;
          }
          .hoodie-inner {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* White Fabric Section */}
      <div
        style={{
          position: "absolute",
          top: `${horizontalTop + 1900}px`,
          left: 0,
          width: "100%",
          minHeight: "1500px",
          backgroundImage: "url('/white-fabric.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      >
        {/* WHY WE EXIST TEXT */}
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "10%",
            width: "80%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1000px",
              left: "-60px",
              maxWidth: "700px",
            }}
          >
            <h1
              style={{
                color: "#373737",
                fontFamily: "Poppins, sans-serif",
                fontSize: "70px",
                fontWeight: 700,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              WHY WE EXIST
            </h1>
            <p
              style={{
                marginTop: "25px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "18px",
                color: "#555",
                lineHeight: "1.6",
              }}
            >
              because modest women deserve to be seen differently.
              not softened. not simplified. not overlooked.
              we create pieces that reframe modesty through structure,
              silhouette, and scale — allowing women to take space,
              hold presence, and express themselves without compromise.
            </p>
          </div>
        </div>

        {/* ── Split Image ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <SplitImage
            src="/split.png"
            alt="Feature image"
            splitAxis="horizontal"
            splitGap={18}    // ← small refined gap
            duration={900}   // ← slow & smooth
            zoomScale={1.18} // ← noticeable but elegant zoom
          />
        </div>

        {/* Ellipse 3 */}
        <div
          style={{
            position: "absolute",
            top: "600px",
            left: "14%",
            transform: "translateX(-50%)",
            width: "108px",
            height: "108px",
          }}
        >
          <Image
            src="/ellipse3.svg"
            alt="Ellipse 3"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Ellipse 4 */}
        <div
          style={{
            position: "absolute",
            top: "1000px",
            right: "-3px",
            width: "259px",
            height: "259px",
          }}
        >
          <Image
            src="/ellipse4.png"
            alt="Ellipse 4"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
}