"use client";

import Image from "next/image";

export default function Collection() {
  return (
    <section className="relative bg-white">
      <div className="px-[80px] py-[65px]">
        <div className="relative w-full h-[615px] overflow-hidden">
          <Image
            src="/collection.jpg"
            alt="Collection Background"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 flex items-start justify-center pt-[27px] pb-[27px]">
            <div className="flex items-start">
              
              <div className="relative w-[587px] h-[561px] pr-[31px] group overflow-hidden cursor-pointer">
                <Image
                  src="/collection1.png"
                  alt="Collection 1"
                  fill
className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-115 origin-top"
                />

                <span className="absolute top-[16px] left-[16px] text-[#373737] font-bold text-[16px] uppercase font-[Poppins]">
                  [1]
                </span>

                <span className="absolute top-[16px] left-[47px] text-[#373737] font-bold text-[16px] uppercase font-[Poppins]">
                  WHITE COLLECTION
                </span>

                <span className='absolute bottom-[12px] right-[28px] text-[#373737] text-center font-bold italic text-[20px] lowercase font-["Times_New_Roman"]'>
                  explore collection
                </span>
              </div>

              <div className="w-[42px]" />

              <div className="relative w-[587px] h-[561px] pl-[31px] group overflow-hidden cursor-pointer">
                <Image
                  src="/collection2.png"
                  alt="Collection 2"
                  fill
className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-120 origin-bottom"


                />

                <span className="absolute top-[16px] left-[28px] text-[#373737] font-bold text-[16px] uppercase font-[Poppins]">
                  [2]
                </span>

                <span className="absolute top-[16px] left-[62px] text-[#373737] font-bold text-[16px] uppercase font-[Poppins]">
                  SCARF COLLECTION
                </span>

                <span className='absolute bottom-[12px] right-[28px] text-[#373737] text-center font-bold italic text-[20px] lowercase font-["Times_New_Roman"]'>
                  explore collection
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
