import Image from "next/image";
import HeroOverlay from "./HeroOverlay";


const Hero = () => {
    return (
        <section className="sticky top-0 w-full h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg-image.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
            </div>

            <div className="absolute inset-0 z-0 bg-black/20" />

            <HeroOverlay />



            <div className="relative z-10 flex items-center justify-center h-full">
                {/* Hero Content would go here */}
            </div>
        </section>
    );
};

export default Hero;
