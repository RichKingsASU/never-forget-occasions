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
import { AnimatedSection } from "@/components/AnimatedSection";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SkipToContent } from "@/components/SkipToContent";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

const Index = () => (
  <div className="relative min-h-screen bg-mesh">
    <SkipToContent />
    <NoiseOverlay />
    <LandingNav />
    <main id="main-content">
      <Hero />
      <AnimatedSection animation="fade-up" delay={0}><HowItWorks /></AnimatedSection>
      <AnimatedSection animation="fade-up" delay={75}><FeatureBento /></AnimatedSection>
      <AnimatedSection animation="fade-up" delay={75}><MarketplacePreview /></AnimatedSection>
      <AnimatedSection animation="fade-up" delay={75}><SocialProof /></AnimatedSection>
      <AnimatedSection animation="scale" delay={75}><Pricing /></AnimatedSection>
      <AnimatedSection animation="fade-up" delay={75}><FAQ /></AnimatedSection>
      <AnimatedSection animation="scale" delay={75}><CTA /></AnimatedSection>
    </main>
    <AnimatedSection animation="fade-up"><Footer /></AnimatedSection>
    <StickyMobileCTA />
  </div>
);

export default Index;
