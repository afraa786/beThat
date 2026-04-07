import type { Metadata } from "next";
import ProductHero from "@/components/product/ProductHero";

export const metadata: Metadata = {
  title: "Contact Us | Be That Percent",
  description: "Get in touch with Be That Percent.",
};

export default function ContactPage() {
  return (
    <main className="w-full">
      <ProductHero title="CONTACT US" />
    </main>
  );
}
