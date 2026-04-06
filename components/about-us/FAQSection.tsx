"use client";

import Image from "next/image";
import { useState } from "react";

// TODO: replace with Firestore fetch from `faqs` collection (ordered by `order` field)
const FAQS = [
  {
    question: "What makes Be That Percent different?",
    answer:
      "Be That Percent is built for women who refuse to be simplified. Every piece is designed with intention — structured silhouettes, deliberate scale, and an ethical backbone. We don't soften modesty; we reframe it as presence.",
  },
  {
    question: "Where are you based?",
    answer:
      "We are based in the UAE, built with a global perspective and grounded in responsibility — socially, culturally, and ethically. Our collections are designed to travel.",
  },
  {
    question: "What sizes do you carry?",
    answer:
      "We carry a wide range of sizes to ensure every woman can find her fit. Size guides with model measurements are available on each product page so you can choose with confidence.",
  },
  {
    question: "How do I care for my garments?",
    answer:
      "Each piece includes detailed care instructions on the label and on the product page. As a general rule: gentle cycle, cold water, lay flat to dry. Iron inside-out on a low setting.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="w-full bg-[#EFEFEF]">

      {/* ── 4 Philosophy Images ── */}
      <div className="flex w-full px-[80px]">
        {["image1-philo.png", "image2-philo.png", "image3-philo.png", "image4-philo.png"].map((img) => (
          <div key={img} className="flex-1">
            <Image
              src={`/${img}`}
              alt={img}
              width={0}
              height={0}
              sizes="25vw"
              className="w-full h-auto"
              quality={100}
            />
          </div>
        ))}
      </div>

      {/* ── FAQ + Image Row ── */}
      <div className="flex px-[90px] py-[80px] gap-[60px]">

        {/* Left: FAQ */}
        <div className="w-1/2">

          {/* Accordion */}
          <div className="flex flex-col divide-y divide-[#d4d4d4] mt-[220px]">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-[22px] text-left group"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-heading-primary group-hover:text-black transition-colors pr-8">
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-[32px] h-[32px] rounded-full border border-[#373737] flex items-center justify-center transition-all duration-300 group-hover:bg-[#EEFF4E] group-hover:border-[#EEFF4E]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className={`transition-transform duration-300 ${openIndex === i ? "rotate-45" : "rotate-0"}`}
                    >
                      <line x1="7" y1="0" x2="7" y2="14" stroke="#373737" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="0" y1="7" x2="14" y2="7" stroke="#373737" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                    openIndex === i ? "max-h-[300px] opacity-100 pb-[24px]" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-body-poppins">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Heading + Image */}
        <div className="w-1/2 flex flex-col items-end">
          <h2 className="text-heading-section">
            OUR FAQs
          </h2>
        </div>

      </div>
    </section>
  );
}
