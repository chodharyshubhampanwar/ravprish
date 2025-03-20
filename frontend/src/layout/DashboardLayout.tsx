// import { BentoGridSecondDemo } from "@/components/Clients";
// import { DotBackgroundDemo } from "@/components/DotBackground";
import { FeaturesSectionDemo } from "@/components/FeaturesSection";
// import { GoogleGeminiEffectDemo } from "@/components/Gemini";
import Navbar from "@/components/Navbar";
import { SparklesPreview } from "@/components/Spotlight";

export function DashboardLayout() {
  return (
    <div className="w-full">
      <Navbar />
      {/* <GoogleGeminiEffectDemo /> */}
      <SparklesPreview />
      {/* <DotBackgroundDemo /> */}
      <FeaturesSectionDemo />
      {/* <BentoGridSecondDemo /> */}
    </div>
  );
}

export default DashboardLayout;
