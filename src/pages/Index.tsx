import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Video, Users, Calendar, Star, Check, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Videos",
      description: "Generate personalized video greetings with cutting-edge AI technology"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Never miss another birthday or anniversary with automated reminders"
    },
    {
      icon: Users,
      title: "Contact Management",
      description: "Organize friends and family with their special dates and preferences"
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Send videos via email, SMS, or WhatsApp at the perfect moment"
    },
    {
      icon: Video,
      title: "Template Gallery",
      description: "Choose from hundreds of professionally designed video templates"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and secure with enterprise-grade protection"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 videos per month",
        "Basic templates",
        "Email delivery",
        "Contact management"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$12",
      period: "month",
      description: "For the thoughtful communicator",
      features: [
        "Unlimited videos",
        "Premium templates",
        "SMS & WhatsApp delivery",
        "Advanced scheduling",
        "Custom branding",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Family",
      price: "$20",
      period: "month",
      description: "Perfect for large families",
      features: [
        "Everything in Pro",
        "Up to 5 family accounts",
        "Shared contact lists",
        "Family calendar view",
        "Bulk scheduling",
        "Admin controls"
      ],
      cta: "Start Free Trial",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Never Forget AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-smooth">Pricing</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-smooth">About</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Never Miss a
                <span className="bg-gradient-hero bg-clip-text text-transparent block">
                  Special Moment
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Automate personalized AI-generated video greetings for birthdays, anniversaries, and special occasions. Stay connected with zero effort.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="hero" className="text-lg px-8" asChild>
                <Link to="/dashboard">
                  Start Free Trial
                  <Sparkles className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
                <Video className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background"></div>
                ))}
              </div>
              <span>Join 10,000+ users who never forget special moments</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-20 blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="AI Video Greetings Platform" 
              className="relative rounded-3xl shadow-glow w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need to stay connected
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features that make remembering special moments effortless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-card transition-smooth border-0 shadow-soft group">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-spring">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose your plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free and upgrade as you grow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`p-8 relative hover:shadow-card transition-smooth border-0 ${
                plan.popular 
                  ? 'shadow-glow ring-2 ring-primary/20 bg-gradient-secondary scale-105' 
                  : 'shadow-soft'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link to="/dashboard">{plan.cta}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Never Forget AI
            </span>
          </div>
          <p className="text-muted-foreground mb-8">
            Making every special moment memorable with AI-powered video greetings
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
            <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
            <a href="#" className="hover:text-foreground transition-smooth">Support</a>
            <a href="#" className="hover:text-foreground transition-smooth">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
