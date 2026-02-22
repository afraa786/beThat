import Image from "next/image";

const FashionSection = () => {
    return (
        <section className="relative w-full flex items-center justify-end pr-[80px]"
            style={{ aspectRatio: "1440/621" }}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hoodie.svg"
                    alt="Luxury Fashion Hoodie"
                    fill
                    className="object-contain object-center"
                    priority={true}
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

                <p className="mt-[252px] text-[#373737] font-[family-name:Times_New_Roman,serif] italic text-[16px] font-bold leading-normal lowercase text-right max-w-md">
                    we are based in the uae, built with a global perspective,
                    and grounded in responsibility — socially, culturally, and ethically.
                    <br /><br />
                    every detail is considered. every silhouette has intent.
                    every decision is made with care.
                    <br />
                    this is just the surface.
                </p>

                <div className="mt-[12px] text-right">
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