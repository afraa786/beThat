"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
  isVisible: boolean;
}

const Navbar = ({ isVisible }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[9999] flex items-center transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`flex items-center w-full mx-[90px] mt-[25px] px-[40px] py-[16px] transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/20 backdrop-blur-md shadow-md rounded-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="shrink-0">
          <Link href="/" className="block relative w-[90px] h-[57px]">
            <Image src="/logoo.png" alt="Antigravity Logo" fill className="object-contain" priority />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-[24px] ml-[284px]">
          {["Categories", "Collection", "Our Story", "Contact"].map((item) => (
            <Link
              key={item}
              href="#"
              className="flex items-center gap-1 font-sans text-base font-medium text-black italic hover:text-gray-600 transition-colors"
            >
              {item}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-[24px] ml-auto">
          <button aria-label="Search" className="hover:opacity-80 transition-opacity">
            <Image src="/tabler-icon-search.png" alt="Search" width={24} height={24} />
          </button>
          <button aria-label="Heart" className="hover:opacity-80 transition-opacity">
            <Image src="/tabler-icon-heart.svg" alt="Heart" width={24} height={24} />
          </button>
          <button aria-label="User" className="hover:opacity-80 transition-opacity">
            <Image src="/tabler-icon-user.svg" alt="User" width={24} height={24} />
          </button>
          <button aria-label="Cart" className="hover:opacity-80 transition-opacity">
            <Image src="/tabler-icon-garden-cart.svg" alt="Cart" width={24} height={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;