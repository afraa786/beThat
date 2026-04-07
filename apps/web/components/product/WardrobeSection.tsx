"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FilterSidebar from "./FilterSidebar";

const verticalHeight = 119;

const cards = [
  { img: "/white.png",         alt: "White Hoodie"  },
  { img: "/black.png",         alt: "Black Hoodie"  },
  { img: "/yellow-hoodie.png", alt: "Yellow Hoodie" },
];

export default function WardrobeSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full bg-[#EFEFEF]">

      {/* Header */}
      <div className="px-[90px] pt-[80px] pb-0 flex items-end justify-between">
        <h2 className="text-heading-section">THE WARDROBE</h2>
        <p className="text-body-lowercase pb-3">browse the full collection</p>
      </div>

      {/* Product line — flush right */}
      <div className="flex justify-end">
        <Image src="/product-line.png" alt="product line" width={1039} height={6} className="object-contain" />
      </div>

      {/* Filter + Rack row */}
      <div style={{ display: "flex", width: "100%", paddingBottom: "80px", marginTop: "-7px", paddingLeft: "90px", gap: "60px" }}>

        <FilterSidebar />

        {/* Rack — cards */}
        <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: "80px", marginTop: 0 }}>
          {cards.map((card, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              {/* Hanger line — top touches product-line.png */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/line-below.svg" alt="hanger line" style={{ width: "3px", height: `${verticalHeight}px` }} />

              {/* Card */}
              <div style={{
                position: "relative",
                width: "324px",
                height: "396px",
                marginTop: "10px",
                flexShrink: 0,
                cursor: "pointer",
              }}>
                <Image src="/yellow-card.png" alt="Card Background" fill style={{ objectFit: "cover", zIndex: 0 }} />

                <div style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "260px",
                  height: "389px",
                  zIndex: 1,
                }}>
                  <Image src="/hero-carousel.webp" alt="Hero" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
                </div>

                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  zIndex: 2,
                }}>
                  <Image src={card.img} alt={card.alt} width={324} height={305} />
                </div>
              </div>

            </div>
          ))}
        </div>
        </div>
      </div>

    </section>
  );
}
