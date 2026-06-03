import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { MarketplacePreview } from "@/components/landing/MarketplacePreview";
import { SocialProof } from "@/components/landing/SocialProof";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
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
      <FAQ />
      <CTA />
    </main>
    <Footer />
  </div>
);

export default Index;
