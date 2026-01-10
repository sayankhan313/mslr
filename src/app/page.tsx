import HeroSection from "@/components/HeroSection";
import ReferendumSection from "@/components/ReferendumSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="w-full" id="top">
      <main className="w-full">
        <HeroSection />
        <ReferendumSection />
      </main>
      <Footer />
    </div>
  );
}
