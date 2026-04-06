import Hero from "@/components/Hero/Hero";
import FashionSection from "@/components/Hero/FashionSection";
import CategoryShowcase from "@/components/Hero/CategoryShowcase";
import CategorySection from "@/components/Hero/CategorySection";
import CollectionSection from "@/components/Hero/CollectionSection";
import Marquee from "@/components/Hero/Marquee";

export default function Home() {
  return (
    <main className="h-auto">
      {/* Hero section with cinematic intro animation */}
      <Hero />

      {/* "The percent is not a number / it is a choice" — hoodie zoom section */}
      <FashionSection />
      

      {/* Hanging rack carousel + "Why We Exist" white-fabric section */}
      <CategoryShowcase />

      {/* Pants / Blazers / Hoodies category grid */}

      {/* White Collection + Scarf Collection two-panel grid */}
      <CollectionSection />
      <CategorySection />

      {/* Scrolling marquee bar */}
      <Marquee />
    </main>
  );
}
