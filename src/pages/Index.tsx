import { useEffect, useState } from "react";
import AQIBanner from "@/components/AQIBanner";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AQIChart from "@/components/AQIChart";
import PollutantBreakdown from "@/components/PollutantBreakdown";
import SourceAttribution from "@/components/SourceAttribution";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Activity, Bell, Users, User } from "lucide-react";
import { calculateAverageAQI, mockStations, getHealthAdvice } from "@/utils/aqiUtils";

const Index = () => {
  const [averageAQI, setAverageAQI] = useState(0);

  useEffect(() => {
    setAverageAQI(calculateAverageAQI(mockStations));
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh opacity-5 pointer-events-none"></div>
      
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section - Removed old hero, kept stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
          <Card className="glass-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-primary/20 group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary group-hover:animate-bounce" />
                Active Stations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient">{mockStations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Monitoring Delhi-NCR</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-aqi-severe/20 group" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-aqi-severe group-hover:animate-pulse" />
                Peak PM2.5
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-orange-500 to-red-600">325 μg/m³</div>
              <p className="text-xs text-muted-foreground mt-1">Gurugram Sector 29</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-aqi-poor/20 group" style={{ animationDelay: "200ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bell className="w-4 h-4 text-aqi-poor group-hover:animate-wiggle" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-yellow-500 to-orange-600">12</div>
              <p className="text-xs text-muted-foreground mt-1">Severe AQI warnings</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-primary/20 group" style={{ animationDelay: "300ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary group-hover:animate-pulse" />
                Reports Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient">47</div>
              <p className="text-xs text-muted-foreground mt-1">Citizen contributions</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <div className="mb-8">
          <AIInsightsPanel />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in-up">
          <div className="glass-card rounded-xl p-1 hover:shadow-glow transition-shadow">
            <AQIChart />
          </div>
          <div className="glass-card rounded-xl p-1 hover:shadow-glow transition-shadow">
            <PollutantBreakdown />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in">
          <div className="glass-card rounded-xl p-1 hover:shadow-glow transition-shadow">
            <SourceAttribution />
          </div>
          
          <Card className="glass-card hover:shadow-glow transition-all border-2 border-primary/10">
            <CardHeader>
              <CardTitle>Health Recommendations</CardTitle>
              <CardDescription>Based on current AQI levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-aqi-severe/10 border border-aqi-severe/20 rounded-lg">
                <h4 className="font-semibold text-aqi-severe mb-2">⚠️ Emergency Measures</h4>
                <p className="text-sm">{getHealthAdvice(averageAQI)}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Recommended Actions:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Wear N95 masks outdoors</li>
                  <li>✓ Use air purifiers indoors</li>
                  <li>✓ Avoid morning/evening outdoor exercise</li>
                  <li>✓ Keep children and elderly indoors</li>
                  <li>✓ Close windows and doors</li>
                </ul>
              </div>
              <Button className="w-full" variant="outline">
                Get Personalized Health Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-primary via-primary-light to-primary-glow text-primary-foreground animate-scale-in hover:shadow-glow transition-all shadow-elevated relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-20"></div>
          <CardContent className="pt-6 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Help Monitor Your Community</h2>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                Report pollution incidents, access personalized alerts, and contribute to cleaner air 
                by creating a free account.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="secondary" size="lg" className="shadow-lg hover:scale-105 transition-transform group">
                  <User className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Create Account
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20 shadow-lg hover:scale-105 transition-transform">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Delhi-NCR Air Quality Intelligence Platform</p>
          <p className="mt-2">Powered by AI • Real-time monitoring • Citizen-driven</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
