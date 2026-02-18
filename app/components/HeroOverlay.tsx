"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroOverlay() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ANIMATION_DISTANCE = 150;
  const progress = Math.min(scrollY / ANIMATION_DISTANCE, 1);

  // Yellow scale animation
  const yellowScale = 1 - progress * 0.3; // shrinks smoothly

  // Lady scale animation
  const ladyScale = 1 + progress * 1.2; // grows smoothly

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden flex items-center justify-center">
      
      {/* Yellow Background */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `scale(${yellowScale})`,
          transition: "transform 0.1s linear",
        }}
      >
        <Image
          src="/yellow.png"
          alt="Yellow Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Lady */}
      <div
        className="relative z-10"
        style={{
          width: "352px",
          height: "527px",
          transform: `scale(${ladyScale})`,
          transition: "transform 0.1s linear",
        }}
      >
        <Image
          src="/lady.png"
          alt="Lady"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
