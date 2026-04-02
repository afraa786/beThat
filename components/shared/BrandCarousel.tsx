"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconTiktok() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}
function IconWhatsapp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const SOCIAL = [
  { icon: <IconInstagram />, href: "#", label: "Instagram" },
  { icon: <IconFacebook />,  href: "#", label: "Facebook" },
  { icon: <IconTiktok />,    href: "#", label: "TikTok" },
  { icon: <IconWhatsapp />,  href: "#", label: "WhatsApp" },
];

function FoldedHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ position: "relative", width: 340, height: 460, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute", inset: 0, overflow: "hidden",
          clipPath: "polygon(16% 0%, 84% 0%, 100% 9%, 100% 100%, 0% 100%, 0% 9%)",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, width: "16%", height: 56, background: "linear-gradient(135deg, #c0bbb4 0%, #a8a39c 100%)", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 28%)", zIndex: 2 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "16%", height: 56, background: "linear-gradient(225deg, #c0bbb4 0%, #a8a39c 100%)", clipPath: "polygon(0 0, 100% 0, 100% 28%, 0 100%)", zIndex: 2 }} />
      <div style={{ position: "absolute", top: 52, left: 0, right: 0, height: 6, background: "linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)", zIndex: 3 }} />
    </div>
  );
}

const CAROUSEL_IMAGES = [
  { src: "/split.png",         alt: "Model look 1" },
  { src: "/white.png",         alt: "White hoodie" },
  { src: "/black.png",         alt: "Black hoodie" },
  { src: "/pink.png",          alt: "Pink hoodie" },
  { src: "/yellow-hoodie.png", alt: "Yellow hoodie" },
];

export function BrandCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3500);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (idx: number) => {
    if (idx === activeIdx || animating) return;
    setAnimating(true);
    setActiveIdx(idx);
    startAuto();
    setTimeout(() => setAnimating(false), 500);
  };

  const sideImages = CAROUSEL_IMAGES.map((img, i) => ({ ...img, origIdx: i })).filter((_, i) => i !== activeIdx);

  const thumbStyle: React.CSSProperties = {
    position: "relative", borderRadius: 4, overflow: "hidden", cursor: "pointer", flexShrink: 0,
    transition: "transform 250ms ease, box-shadow 250ms ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  };

  return (
    <section style={{ width: "100%", background: "#EFEFEF", minHeight: 560, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 48px", boxSizing: "border-box", gap: 36, position: "relative" }}>
      <div style={{ position: "absolute", left: 48, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12, zIndex: 10 }}>
        {SOCIAL.map(({ icon, href, label }) => (
          <a key={label} href={href} aria-label={label}
            style={{ width: 42, height: 42, borderRadius: "50%", background: "#D9E87C", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1a1a", textDecoration: "none", flexShrink: 0, transition: "transform 200ms ease, background 200ms ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.12)"; (e.currentTarget as HTMLAnchorElement).style.background = "#c8d96a"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.background = "#D9E87C"; }}
          >
            {icon}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginLeft: 80, flexShrink: 0 }}>
        {sideImages.slice(0, 2).map(({ src, alt, origIdx }) => (
          <div key={origIdx} onClick={() => handleClick(origIdx)} style={{ ...thumbStyle, width: 130, height: 175 }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
          >
            <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        ))}
      </div>

      <div style={{ transition: "opacity 300ms ease", opacity: animating ? 0.7 : 1, flexShrink: 0 }}>
        <FoldedHeroImage src={CAROUSEL_IMAGES[activeIdx].src} alt={CAROUSEL_IMAGES[activeIdx].alt} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, flexShrink: 0, maxWidth: 340 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {sideImages.slice(2).map(({ src, alt, origIdx }) => (
            <div key={origIdx} onClick={() => handleClick(origIdx)} style={{ ...thumbStyle, width: 120, height: 175 }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
            >
              <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
          ))}
        </div>
        <div>
          <h2 style={{ color: "#9a9a9a", fontFamily: "Poppins, sans-serif", fontSize: "26px", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.15, margin: "0 0 14px 0", letterSpacing: "0.02em" }}>
            More Than<br />What You See
          </h2>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", color: "#7a7a7a", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
            <strong style={{ fontStyle: "normal", color: "#555" }}>to be that percent</strong>{" "}
            is to choose individuality over uniformity. to belong to a smaller circle that values intention, inclusivity, and impact.
          </p>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
        {CAROUSEL_IMAGES.map((_, i) => (
          <button key={i} onClick={() => handleClick(i)} aria-label={`Go to image ${i + 1}`}
            style={{ width: i === activeIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === activeIdx ? "#373737" : "#b0b0b0", border: "none", cursor: "pointer", padding: 0, transition: "width 300ms ease, background 300ms ease" }}
          />
        ))}
      </div>
    </section>
  );
}

export default BrandCarousel;
