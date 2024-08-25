import { Appbar } from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import { ZapSection } from "@/components/ZapSection";

export default function Home() {
  return (
    <main className="pb-2">
      <Appbar />
      <div className="pt-16 px-4 sm:px-6 md:px-8">
        <Hero />
        <div className="pt-8">
          <HeroVideo />
        </div>
        <div className="pt-8">
          <ZapSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}
