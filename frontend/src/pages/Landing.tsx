import Features from "@/components/Features";
import { featuresData } from "../features";
import FooterHero from "@/components/FooterHero";
import Hero from "@/components/Hero";
import { GoalsGrid } from "@/components/Goals";
import ToolsGrid from "@/components/Tools";

function Landing() {
  return (
    <main className="flex-1  p-4">
      <Hero />
      <GoalsGrid />
      <Features features={featuresData} />
      <ToolsGrid />
      <FooterHero />
    </main>
  );
}

export default Landing;
