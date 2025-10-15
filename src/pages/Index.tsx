import { useEffect, useState } from "react";
import AQIBanner from "@/components/AQIBanner";
import Navigation from "@/components/Navigation";
import AQIChart from "@/components/AQIChart";
import PollutantBreakdown from "@/components/PollutantBreakdown";
import SourceAttribution from "@/components/SourceAttribution";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Activity, Bell, Users } from "lucide-react";
import { calculateAverageAQI, mockStations, getHealthAdvice } from "@/utils/aqiUtils";

const Index = () => {
  const [averageAQI, setAverageAQI] = useState(0);

  useEffect(() => {
    setAverageAQI(calculateAverageAQI(mockStations));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Real-Time Air Quality Monitoring
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AI-powered pollution tracking for Delhi-NCR. Get real-time updates, health recommendations, 
            and contribute to cleaner air through citizen reporting.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Active Stations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Monitoring Delhi-NCR</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-aqi-severe" />
                Peak PM2.5
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">325 μg/m³</div>
              <p className="text-xs text-muted-foreground mt-1">Gurugram Sector 29</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "200ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bell className="w-4 h-4 text-aqi-poor" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">Severe AQI warnings</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "300ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Reports Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
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
          <AQIChart />
          <PollutantBreakdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in">
          <SourceAttribution />
          
          <Card className="hover:shadow-lg transition-shadow">
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
        <Card className="bg-primary text-primary-foreground animate-scale-in hover:shadow-2xl transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Help Monitor Your Community</h2>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                Report pollution incidents, access personalized alerts, and contribute to cleaner air 
                by creating a free account.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="secondary" size="lg">
                  Create Account
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
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
