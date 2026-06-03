import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { MarketplacePreview } from "@/components/landing/MarketplacePreview";
import { SocialProof } from "@/components/landing/SocialProof";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <LandingNav />
    <main>
      <Hero />
      <HowItWorks />
      <FeatureBento />
      <MarketplacePreview />
      <SocialProof />
      <Pricing />
      <CTA />
    </main>
    <Footer />
  </div>
);

export default Index;
