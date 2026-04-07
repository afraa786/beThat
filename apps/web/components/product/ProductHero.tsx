"use client";

import AnimatedNav from "@/components/layout/AnimatedNav";
import Image from "next/image";

export default function ProductHero({ title = "STREET HOODIES" }: { title?: string }) {
  return (
    <>
      <AnimatedNav isVisible={true} />

      <section className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/bg-image.png"
          alt="Hero Background"
          fill
          className="object-cover"
          style={{ objectPosition: "center 10%" }}
          priority
          quality={100}
        />

        {/* Yellow screen — exact final state from home hero */}
        <div
          className="absolute bg-[#EEFF4E] z-30"
          style={{
            top: "160px",
            left: "50%",
            transform: "translateX(-50%)",
            height: "470px",
            width: "968px",
          }}
        >
          <h1
            className="absolute left-[49px] right-[49px] bottom-[-20px] z-10 text-center text-white uppercase font-bold leading-none"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "110px", whiteSpace: "nowrap" }}
          >
            {title}
          </h1>
        </div>

        {/* Product collection header image — centered inside yellow box with 51px top padding */}
        <div className="absolute z-50" style={{ top: "160px", left: "50%", transform: "translateX(-50%)", paddingTop: "59px" }}>
          <Image
            src="/product-collection-header.png"
            alt="Product Collection Header"
            width={503}
            height={350}
            priority
            quality={100}
          />
        </div>

        {/* Ellipse 1 — same position as home hero */}
        <div className="absolute z-40" style={{ left: "159px", top: "300px" }}>
          <Image src="/ellipse1.svg" alt="Sphere 1" width={155} height={155} className="w-[155px] h-[155px]" priority />
        </div>

        {/* Ellipse 2 */}
        <div className="absolute z-40" style={{ right: "50px", top: "470px" }}>
          <Image src="/ellipse6.svg" alt="Sphere 2" width={217} height={217} priority />
        </div>
      </section>
    </>
  );
}
