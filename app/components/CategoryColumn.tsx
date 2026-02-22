"use client";

import CategoryCard from "./CategoryCard";

export default function CategoryColumn() {
  return (
    <div
      style={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <CategoryCard
        src="/white1.png"
        label="PANTS"
        labelPosition="bottom"
      />

      <CategoryCard
        src="/white2.png"
        label="BLAZERS"
        labelPosition="top"
      />
    </div>
  );
}