import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Target, Zap, ArrowRight, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Matching",
      description: "Smart algorithms that understand context, not just keywords"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Swipe to Shortlist",
      description: "Tinder-style candidate review for lightning-fast decisions"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Compatibility Tests",
      description: "Assess cultural fit and skill match with AI-proctored tests"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Summaries",
      description: "Get AI-generated profiles instead of scrolling forever"
    }
  ];

  const benefits = [
    "Reduce time-to-hire by 70%",
    "No more keyword guessing games",
    "AI summaries save hours of review",
    "Built-in compatibility testing",
    "Zero bias, pure data-driven matching"
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold gradient-text">HireMatch</span>
          </div>
          <Button 
            variant="glass" 
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Hiring Revolution</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stop Hunting.
            <br />
            <span className="gradient-text">Start Matching.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            The Gen-Z hiring platform that uses AI to find perfect candidates in seconds, not hours. 
            Swipe, match, and hire smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { value: "70%", label: "Faster Hiring" },
            { value: "10K+", label: "Candidates Matched" },
            { value: "95%", label: "Satisfaction Rate" },
            { value: "0", label: "Bias in Hiring" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="glass rounded-2xl p-6 text-center shadow-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Why HireMatch <span className="gradient-text">Hits Different</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for the modern hiring manager who values speed, accuracy, and vibes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            >
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="text-primary-foreground">{feature.icon}</div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 shadow-elevated">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                The Future of <span className="gradient-text">Hiring is Here</span>
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl gradient-primary opacity-10 absolute inset-0 animate-pulse-soft" />
              <div className="relative p-8 flex flex-col items-center justify-center text-center">
                <Sparkles className="w-16 h-16 text-primary mb-4 animate-bounce" />
                <p className="font-display text-2xl font-bold">Ready to transform your hiring?</p>
                <Button 
                  variant="coral" 
                  size="lg" 
                  className="mt-6"
                  onClick={() => navigate('/auth')}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">HireMatch</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HireMatch. Built with 💚 for Gen-Z hiring.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
