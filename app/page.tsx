import Hero from "./components/Hero";
import FashionSection from "./components/FashionSection";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="h-auto">
      <Navbar />
      {/* 
        Scroll Locking Wrapper:
        The container is taller than the viewport (100vh + 400px).
        The Hero component inside will be sticky (pinned to top).
        This forces the user to scroll through the 400px "buffer" to play the animation
        before the page content actually moves down to the next section.
      */}
      <div className="relative h-[calc(100vh+400px)]">
        <Hero />
      </div>

      <FashionSection />
    </main>
  );
}
