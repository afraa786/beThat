import Hero from "./components/Hero";
import FashionSection from "./components/FashionSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="h-auto">
      <Navbar />
  
      <div className="relative h-[calc(100vh+400px)]">
        <Hero />
      </div>

      <FashionSection />
      <Footer />
    </main>
  );
}
