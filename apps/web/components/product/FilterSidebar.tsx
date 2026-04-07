"use client";

import { useState } from "react";

const SIZES = ["S", "M", "L", "XL"];
const CATEGORIES = ["HOODIES", "PANTS", "SCARFS"];
const MIN = 0;
const MAX = 2000;

interface FilterState {
  size: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface FilterSidebarProps {
  onChange?: (filters: FilterState) => void;
}

export default function FilterSidebar({ onChange }: FilterSidebarProps) {
  const [size, setSize] = useState("S");
  const [category, setCategory] = useState("HOODIES");
  const [minPrice, setMinPrice] = useState(576);
  const [maxPrice, setMaxPrice] = useState(576);

  function update(patch: Partial<FilterState>) {
    const next = { size, category, minPrice, maxPrice, ...patch };
    if (patch.size !== undefined) setSize(patch.size);
    if (patch.category !== undefined) setCategory(patch.category);
    if (patch.minPrice !== undefined) setMinPrice(patch.minPrice);
    if (patch.maxPrice !== undefined) setMaxPrice(patch.maxPrice);
    onChange?.(next);
  }

  const radioStyle = (selected: boolean) => ({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: selected ? "6px solid #EEFF4E" : "1.5px solid #B0B0B0",
    background: "white",
    cursor: "pointer",
    flexShrink: 0,
    transition: "border 0.2s",
  });

  return (
    <div style={{ width: "240px", flexShrink: 0, fontFamily: "Poppins, sans-serif" }}>

      {/* Title */}
      <h3 style={{ fontSize: "22px", fontWeight: 700, textTransform: "uppercase", marginBottom: "24px", color: "#111" }}>
        FILTER
      </h3>

      {/* Size */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "15px", fontWeight: 400, color: "#111", marginBottom: "12px" }}>Size</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {SIZES.map((s) => (
            <label key={s} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => update({ size: s })}>
              <div style={radioStyle(size === s)} />
              <span style={{ fontSize: "14px", fontWeight: size === s ? 700 : 400, color: "#111", textTransform: "uppercase" }}>{s}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "15px", fontWeight: 400, color: "#111", marginBottom: "12px" }}>Category</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {CATEGORIES.map((c) => (
            <label key={c} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => update({ category: c })}>
              <div style={radioStyle(category === c)} />
              <span style={{ fontSize: "14px", fontWeight: category === c ? 700 : 400, color: "#111", textTransform: "uppercase" }}>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p style={{ fontSize: "18px", fontWeight: 600, color: "#111", marginBottom: "20px" }}>Price Range</p>

        {/* Inputs */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "13px", fontWeight: 400, color: "#111", marginBottom: "8px" }}>Min Price</p>
            <div style={{ border: "2px solid #111", borderRadius: "12px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500 }}>AED</span>
              <input
                type="number"
                value={minPrice}
                min={MIN}
                max={maxPrice}
                onChange={(e) => update({ minPrice: Number(e.target.value) })}
                style={{ border: "none", outline: "none", width: "40px", fontSize: "13px", fontWeight: 500, background: "transparent" }}
              />
            </div>
          </div>
          <span style={{ fontSize: "20px", color: "#555", marginTop: "20px" }}>—</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "13px", fontWeight: 400, color: "#111", marginBottom: "8px" }}>Max Price</p>
            <div style={{ border: "2px solid #111", borderRadius: "12px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500 }}>AED</span>
              <input
                type="number"
                value={maxPrice}
                min={minPrice}
                max={MAX}
                onChange={(e) => update({ maxPrice: Number(e.target.value) })}
                style={{ border: "none", outline: "none", width: "40px", fontSize: "13px", fontWeight: 500, background: "transparent" }}
              />
            </div>
          </div>
        </div>

        {/* Dual range slider */}
        <div style={{ position: "relative", height: "24px" }}>
          {/* Full track */}
          <div style={{ position: "absolute", top: "10px", left: 0, right: 0, height: "4px", background: "#E0E0E0", borderRadius: "2px" }} />
          {/* Active track — dark */}
          <div style={{
            position: "absolute", top: "10px", height: "4px", background: "#111", borderRadius: "2px",
            left: `${(minPrice / MAX) * 100}%`,
            right: `${100 - (maxPrice / MAX) * 100}%`,
          }} />
          <input
            type="range" min={MIN} max={MAX} value={minPrice}
            onChange={(e) => update({ minPrice: Math.min(Number(e.target.value), maxPrice) })}
            style={{ position: "absolute", width: "100%", opacity: 0, cursor: "pointer", height: "24px", top: 0, zIndex: 2 }}
          />
          <input
            type="range" min={MIN} max={MAX} value={maxPrice}
            onChange={(e) => update({ maxPrice: Math.max(Number(e.target.value), minPrice) })}
            style={{ position: "absolute", width: "100%", opacity: 0, cursor: "pointer", height: "24px", top: 0, zIndex: 2 }}
          />
          {/* Yellow thumbs */}
          <div style={{ position: "absolute", top: "2px", left: `${(minPrice / MAX) * 100}%`, transform: "translateX(-50%)", width: "22px", height: "22px", borderRadius: "50%", background: "#EEFF4E", pointerEvents: "none", zIndex: 1 }} />
          <div style={{ position: "absolute", top: "2px", left: `${(maxPrice / MAX) * 100}%`, transform: "translateX(-50%)", width: "22px", height: "22px", borderRadius: "50%", background: "#EEFF4E", pointerEvents: "none", zIndex: 1 }} />
        </div>
      </div>

    </div>
  );
}
