import Hero from "@/components/shared/Hero";
import FashionSection from "@/components/shared/FashionSection";
import CategoryShowcase from "@/components/shared/CategoryShowcase";
import CategorySection from "@/components/shared/CategorySection";
import CollectionSection from "@/components/shared/CollectionSection";
import Marquee from "@/components/shared/Marquee";

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
      <CategorySection />

      {/* White Collection + Scarf Collection two-panel grid */}
      <CollectionSection />

      {/* Scrolling marquee bar */}
      <Marquee />
    </main>
  );
}
