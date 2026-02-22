"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const FashionSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    // Track whether the user has hovered at least once this session
    const hasHoveredRef = useRef(false);

    // On mount, always start in "zoomed in" state (image zoomed, paragraph hidden)
    // This resets on every page reload naturally since state is fresh

    const handleMouseEnter = () => {
        if (!hasHoveredRef.current) {
            hasHoveredRef.current = true;
        }
        setHovered(true);
    };

    const handleMouseLeave = () => {
        // Once hovered, keep in "hovered" state (don't reset back)
        // i.e. the animation only plays once per page load, on first hover
        // If you want it to toggle every hover, remove the hasHoveredRef check
        // Per request: "keep it as it is unless the user reloads"
        // So once hovered, stay hovered
        setHovered(true); // lock it
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex items-center justify-end pr-[80px]"
            style={{ aspectRatio: "1440/621" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background image: right side (paragraph area) zoomed in on load, zooms out on hover giving hoodie-slides-left effect */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src="/hoodie2.svg"
                    alt="Luxury Fashion Hoodie"
                    fill
                    priority={true}
                    style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        transform: hovered ? "scale(1)" : "scale(1.2)",
                        transformOrigin: "left center",
                        transition: hovered
                            ? "transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                            : "none",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-xl flex flex-col items-end text-right">

                <div className="text-[#D4FF00] font-sans text-4xl font-bold select-none leading-none pr-[150px]">
                    %
                </div>

                <div className="mt-[7px] text-[#373737] text-right">
                    <h2 className="font-[family-name:var(--font-poppins)] text-[26px] font-bold leading-[31px] uppercase">
                        THE PERCENT IS NOT A NUMBER
                    </h2>
                    <h2 className="font-[family-name:Times_New_Roman,serif] text-[36px] font-bold italic leading-[31px] lowercase mt-[7px]">
                        it is a choice
                    </h2>
                </div>

                <div className="mt-[25px] flex items-center justify-end gap-4 text-[#373737] font-[family-name:Times_New_Roman,serif] italic text-[16px] font-normal leading-normal w-full">
                    <span>empowering</span>
                    <div className="h-[1px] bg-[#373737] w-[130px]"></div>
                    <span>modesty</span>
                </div>

                {/* Paragraph: hidden (translated right) by default, slides in on hover */}
                <p
                    className="mt-[252px] text-[#373737] font-[family-name:Times_New_Roman,serif] italic text-[16px] font-bold leading-normal lowercase text-right max-w-md"
                    style={{
                        transform: hovered ? "translateX(0)" : "translateX(120%)",
                        opacity: hovered ? 1 : 0,
                        transition: hovered
                            ? "transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s, opacity 0.85s ease 0.1s"
                            : "none",
                    }}
                >
                    we are based in the uae, built with a global perspective,
                    and grounded in responsibility — socially, culturally, and ethically.
                    <br /><br />
                    every detail is considered. every silhouette has intent.
                    every decision is made with care.
                    <br />
                    this is just the surface.
                </p>

                {/* "read our story" also slides in, slightly delayed */}
                <div
                    className="mt-[12px] text-right"
                    style={{
                        transform: hovered ? "translateX(0)" : "translateX(120%)",
                        opacity: hovered ? 1 : 0,
                        transition: hovered
                            ? "transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s, opacity 0.85s ease 0.2s"
                            : "none",
                    }}
                >
                    <a
                        href="#"
                        className="text-black font-[family-name:Times_New_Roman,serif] italic text-[20px] font-bold leading-normal lowercase underline decoration-solid decoration-[from-font] underline-offset-[4.1px] decoration-[0.8px]"
                    >
                        read our story
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FashionSection;