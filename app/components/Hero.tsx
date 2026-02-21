"use client";

import Image from "next/image";
import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

const Hero = () => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showEllipses, setShowEllipses] = useState(false);
  const [showBottomImages, setShowBottomImages] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const triggeredRef = useRef(false);

  const [yellowScope, animateYellow] = useAnimate();
  const [ladyScope, animateLady] = useAnimate();

  const runIntroAnimation = async () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setHasTriggered(true);

    // Yellow shrink + lady scale up — perfectly in sync
    await Promise.all([
      animateYellow(
        yellowScope.current,
        {
          top: "180px",
          left: "236px",
          right: "236px",
          height: "470px",
        },
        {
          duration: 1.6,
          ease: CINEMATIC_EASE,
        }
      ),
      animateLady(
        ladyScope.current,
        { scale: 1, transformOrigin: "bottom center" },
        {
          duration: 1.6,
          ease: CINEMATIC_EASE,
        }
      ),
    ]);

    // After both settle — reveal everything together
    setShowNavbar(true);
    setShowEllipses(true);
    setShowBottomImages(true);
  };

  // Fade in COLLECTION text at ~65% of yellow shrink
  useEffect(() => {
    if (!hasTriggered) return;
    const timer = setTimeout(() => setShowCollection(true), 1050);
    return () => clearTimeout(timer);
  }, [hasTriggered]);

  // One-time scroll/touch/wheel listener
  useEffect(() => {
    const trigger = () => {
      if (!triggeredRef.current) runIntroAnimation();
    };

    window.addEventListener("wheel", trigger, { passive: true, once: true });
    window.addEventListener("touchmove", trigger, { passive: true, once: true });
    window.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "PageDown", " "].includes(e.key)) trigger();
    }, { once: true });

    return () => {
      window.removeEventListener("wheel", trigger);
      window.removeEventListener("touchmove", trigger);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <Navbar isVisible={showNavbar} />

      <section className="relative w-full aspect-[1440/856] overflow-hidden">

        {/* ── Background image ── */}
        <Image
          src="/bg-image.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />

        {/* ── YELLOW OVERLAY ── */}
        <div
          ref={yellowScope}
          className="absolute bg-[#EEFF4E] overflow-visible"
          style={{
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            zIndex: 30,
          }}
        >
          <AnimatePresence>
            {showCollection && (
              <motion.h1
                className="absolute left-[49px] right-[49px] bottom-[-20px] z-10
                           text-center text-white uppercase font-bold leading-none"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "140px" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                COLLECTION
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* ── LADY IMAGE ──
            Outer div: position COMPLETELY UNCHANGED
            motion.div inside: starts scale(0.6), animates to scale(1) via useAnimate ref
        ── */}
        <div
          className="absolute z-50"
          style={{
            left: "50%",
            top: "46%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            ref={ladyScope}
            initial={{ scale: 0.6
            }}
            style={{ transformOrigin: "center" }}
          >
            <img
              src="/lady.png"
              alt="Lady"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* ── ELLIPSE 1 ── */}
        <div
          className="absolute"
          style={{ left: "159px", top: "320px", zIndex: showEllipses ? 40 : 20 }}
        >
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={showEllipses ? { y: -80, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 3.8, ease: [0.25, 0.8, 0.25, 1], delay: 0.1 }}
          >
            <Image src="/ellipse1.svg" alt="Sphere 1" width={155} height={155} className="w-[155px] h-[155px]" priority />
          </motion.div>
        </div>

        {/* ── ELLIPSE 2 ── */}
        <div
          className="absolute"
          style={{ left: "1255px", top: "670px", zIndex: showEllipses ? 40 : 20 }}
        >
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={showEllipses ? { y: -110, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 4.5, ease: [0.25, 0.8, 0.25, 1], delay: 0.5 }}
          >
            <Image src="/ellipse2.png" alt="Sphere 2" width={271} height={271} priority />
          </motion.div>
        </div>

        {/* ── BOTTOM 3 IMAGES ── */}
        <motion.div
          className="absolute"
          style={{ top: "670px", left: "0px", zIndex: 40 }}
          initial={{ x: -180, opacity: 0 }}
          animate={showBottomImages ? { x: 0, opacity: 1 } : { x: -180, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <Image src="/export3.png" alt="Model" width={225} height={213} priority />
        </motion.div>

        <motion.div
          className="absolute"
          style={{ top: "670px", left: "236px", zIndex: 40 }}
          initial={{ x: -180, opacity: 0 }}
          animate={showBottomImages ? { x: 0, opacity: 1 } : { x: -180, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
        >
          <Image src="/export2.png" alt="Model" width={142} height={213} priority />
        </motion.div>

        <motion.div
          className="absolute"
          style={{ top: "670px", left: "398px", zIndex: 40 }}
          initial={{ x: -180, opacity: 0 }}
          animate={showBottomImages ? { x: 0, opacity: 1 } : { x: -180, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        >
          <Image src="/export1.png" alt="Model" width={142} height={214} priority />
        </motion.div>

      </section>

      {/* Gray bar */}
      <div className="w-full h-[209px] bg-[#EFEFEF] -mt-[120px]" />
    </>
  );
};

export default Hero;