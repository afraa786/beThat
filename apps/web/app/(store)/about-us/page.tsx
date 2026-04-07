import type { Metadata } from "next";
import Image from "next/image";
import AboutHero from "@/components/about-us/AboutHero";
import FAQSection from "@/components/about-us/FAQSection";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Be That Percent — a brand built on intention, modesty, and identity. Learn who we are and what we stand for.",
};

export default function AboutPage() {
  return (
    <main className="w-full">
      <AboutHero />
      <section className="w-full h-[507px] bg-white pt-[39px] pl-[80px]">
        <h2 className="text-heading-display">Our Philosophy</h2>
        <p className="text-body-poppins mt-[127px]">
          Because modest women deserve to be seen differently. Not softened. Not simplified. Not overlooked.<br /><br />
          We create pieces that reframe modesty through structure, silhouette, and scale — allowing women to take space, hold presence, and express themselves without compromise.
        </p>
      </section>

      <FAQSection />
      <section className="w-full h-[800px] bg-white px-[80px] py-[67px]">
        <div className="relative w-full h-full">
          <Image
            src="/about-us-footer.png"
            alt="About Us Footer"
            fill
            className="object-cover"
            quality={100}
          />
        </div>
      </section>
    </main>
  );
}
