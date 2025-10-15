import { Button } from "@/components/ui/button";
import { Wind, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/delhi-pollution-hero.jpg";

const HeroSection = () => {
  return (
    <div className="relative min-h-[600px] overflow-hidden rounded-2xl mb-12 animate-fade-in">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60"></div>
        <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[600px] px-8 md:px-16">
        <div className="max-w-3xl space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-white animate-bounce-in">
            <Shield className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">AI-Powered Monitoring</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Delhi-NCR<br />
            <span className="text-gradient bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300">
              Air Quality
            </span><br />
            Intelligence
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            Real-time pollution tracking powered by artificial intelligence. 
            Get instant AQI updates, health alerts, and contribute to cleaner air through citizen reporting.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-white">8</div>
              <div className="text-sm text-white/80">Monitoring Stations</div>
            </div>
            <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform" style={{ animationDelay: "700ms" }}>
              <div className="text-3xl font-bold text-white">2.8K</div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform" style={{ animationDelay: "800ms" }}>
              <div className="text-3xl font-bold text-white">87%</div>
              <div className="text-sm text-white/80">AI Accuracy</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "900ms" }}>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated group">
              <TrendingUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              View Live Data
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 glass">
              <Wind className="w-5 h-5 mr-2" />
              Check Forecast
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
    </div>
  );
};

export default HeroSection;
