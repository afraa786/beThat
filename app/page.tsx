import Hero from "./components/Hero";
import FashionSection from "./components/FashionSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhiteBackground from "./components/collections";

export default function Home() {
  return (
    <main className="h-auto">
      <Navbar />
        <Hero />
      

      <FashionSection />
      <WhiteBackground />
      <Footer />
    </main>
  );
}
