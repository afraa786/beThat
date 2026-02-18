"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroOverlay() {
    const [scrollY, setScrollY] = useState(0);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

        const handleScroll = () => setScrollY(window.scrollY);

        handleResize();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const ANIMATION_DISTANCE = 150;
    const progress = Math.min(scrollY / ANIMATION_DISTANCE, 1);

    // ---------- YELLOW OVERLAY ----------
    const startYellowW = windowSize.width;
    const startYellowH = windowSize.height;

    const endYellowW = 968;
    const endYellowH = 470;

    const currentYellowW =
        startYellowW + (endYellowW - startYellowW) * progress;

    const currentYellowH =
        startYellowH + (endYellowH - startYellowH) * progress;

    // ---------- LADY IMAGE ----------
    const startLadyW = 352;
    const startLadyH = 527;

    const endLadyW = 900;
    const endLadyH = 1350;

    const currentLadyW =
        startLadyW + (endLadyW - startLadyW) * progress;

    const currentLadyH =
        startLadyH + (endLadyH - startLadyH) * progress;

    return (
        <div className="absolute inset-0 z-[10000] pointer-events-none flex items-center justify-center overflow-hidden">

            {/* Yellow Overlay - Restored Image */}
            <div
                className="relative flex items-center justify-center"
                style={{
                    width: windowSize.width === 0 ? "100vw" : `${currentYellowW}px`,
                    height: windowSize.height === 0 ? "100vh" : `${currentYellowH}px`,
                }}
            >
                <Image
                    src="/yellow.png"
                    alt="Yellow Background"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Lady Image */}
                <div
                    className="relative z-10"
                    style={{
                        width: `${currentLadyW}px`,
                        height: `${currentLadyH}px`,
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
        </div>
    );
}
