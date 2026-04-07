"use client";

import Image from "next/image";
import AnimatedNav from "@/components/layout/AnimatedNav";

export default function AboutHero() {
  return (
    <>
      <AnimatedNav isVisible={true} />

      <section className="relative w-full aspect-[1440/800] bg-[#EFEFEF] overflow-hidden flex items-center justify-start">
        <div className="w-[1280px] h-[1280px] relative shrink-0">
          <Image
            src="/about-us-hero.png"
            alt="About Us"
            fill
            className="object-contain object-left"
            priority
            quality={100}
          />
        </div>

        <div className="absolute bottom-[141px] left-[200px] z-10">
          <Image
            src="/about-us-header.webp"
            alt="About Us Header"
            width={490}
            height={460}
            className="w-[490px] h-[460px] object-contain"
            priority
            quality={100}
          />
        </div>

        <div className="absolute inset-x-0 top-[141px] bottom-[141px] flex items-center justify-center z-10">
          <Image
            src="/about-us-hero-image1.webp"
            alt="About Us Hero Image"
            fill
            className="object-contain"
            priority
            quality={100}
          />
        </div>

        <div className="absolute bottom-[120px] right-[120px] z-20 flex flex-col w-[400px]">
          <h2 className="text-heading-primary mb-0 -translate-y-3">EMPOWERING MEN AND WOMEN</h2>
          <Image
            src="/lady.png"
            alt="Lady"
            width={400}
            height={420}
            className="w-[400px] h-[420px] object-contain object-top mt-2"
            priority
            quality={100}
          />
          <p className="text-body-italic mt-4 mb-0">
            Born at the intersection of modesty and modernity, the brand explores strength through structure, restraint through design, and individuality through silhouette. Each piece is intentional, unapologetic, and made to be lived in.
          </p>
          
        </div>
      </section>

      <div className="w-full h-[209px] bg-[#EFEFEF] -mt-[120px]" />
    </>
  );
}
