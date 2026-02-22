import Hero from "./components/Hero";
import FashionSection from "./components/FashionSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhiteBackground from "./components/collections";
import Category from "./components/category";
import Marquee from "./components/Marquee";
import BrandCarousel from "./components/BrandCarousel";


export default function Home() {
  return (
    <main className="h-auto">
      <Navbar isVisible={false} />
      <Hero />
      <FashionSection />
                <BrandCarousel />
      <Category />

      <WhiteBackground />
      <Marquee />
      <Footer />
    </main>
  );
}
