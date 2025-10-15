import Navigation from "@/components/Navigation";
import AQIBanner from "@/components/AQIBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { calculateAverageAQI, mockStations, getAQICategory } from "@/utils/aqiUtils";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Wind } from "lucide-react";

const forecastData = [
  { time: "Now", aqi: 412, temp: 18, humidity: 65 },
  { time: "6h", aqi: 425, temp: 20, humidity: 60 },
  { time: "12h", aqi: 438, temp: 24, humidity: 55 },
  { time: "18h", aqi: 445, temp: 22, humidity: 58 },
  { time: "24h", aqi: 432, temp: 19, humidity: 62 },
  { time: "30h", aqi: 418, temp: 18, humidity: 64 },
  { time: "36h", aqi: 405, temp: 17, humidity: 67 },
  { time: "42h", aqi: 395, temp: 19, humidity: 63 },
  { time: "48h", aqi: 388, temp: 21, humidity: 59 },
  { time: "54h", aqi: 375, temp: 23, humidity: 56 },
  { time: "60h", aqi: 368, temp: 22, humidity: 58 },
  { time: "66h", aqi: 358, temp: 20, humidity: 61 },
  { time: "72h", aqi: 352, temp: 18, humidity: 64 },
];

const Forecast = () => {
  const averageAQI = calculateAverageAQI(mockStations);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh opacity-5 pointer-events-none"></div>
      
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-primary via-primary-glow to-primary-light mb-2">
            72-Hour AI Forecast
          </h1>
          <p className="text-muted-foreground text-lg">Predicted air quality trends powered by machine learning</p>
        </div>

        {/* Forecast Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-aqi-poor group-hover:animate-bounce" />
                Peak AQI Expected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-orange-500 to-red-600 animate-pulse">445</div>
              <p className="text-xs text-muted-foreground mt-1">In 18 hours (Tomorrow 2 PM)</p>
              <Badge className="mt-2 bg-aqi-severe text-white">Severe</Badge>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-aqi-good/20 group" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-aqi-good group-hover:animate-pulse" />
                Best Air Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-green-500 to-teal-600">352</div>
              <p className="text-xs text-muted-foreground mt-1">In 72 hours (Day 3)</p>
              <Badge className="mt-2 bg-aqi-verypoor text-white">Very Poor</Badge>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-primary/20 group" style={{ animationDelay: "200ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wind className="w-4 h-4 text-primary group-hover:animate-spin-slow" />
                Improvement Factor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-cyan-600">-14.6%</div>
              <p className="text-xs text-muted-foreground mt-1">Expected reduction over 72h</p>
              <Badge className="mt-2" variant="outline">Western winds</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Forecast Chart */}
        <Card className="mb-8 glass-card hover:shadow-glow transition-all duration-500 animate-scale-in border-2 border-primary/10 overflow-hidden group">
          <CardHeader>
            <CardTitle>AQI Forecast Trend</CardTitle>
            <CardDescription>AI-predicted air quality index for next 3 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--aqi-severe))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--aqi-severe))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="hsl(var(--aqi-severe))" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#aqiGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weather Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
          <Card className="glass-card hover:shadow-glow transition-all duration-500 border-2 border-primary/10 hover:scale-105">
            <CardHeader>
              <CardTitle>Temperature Correlation</CardTitle>
              <CardDescription>How temperature affects AQI</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-glow transition-all duration-500 border-2 border-primary/10 hover:scale-105" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle>Humidity Levels</CardTitle>
              <CardDescription>Moisture content in air</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="hsl(var(--aqi-moderate))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--aqi-moderate))", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mt-8 glass-card hover:shadow-glow transition-all border-2 border-primary/10 animate-fade-in">
          <CardHeader>
            <CardTitle>Forecast Insights</CardTitle>
            <CardDescription>AI-analyzed predictions and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-aqi-poor/10 border border-aqi-poor/20 rounded-lg">
              <h4 className="font-semibold text-aqi-poor mb-2">⚠️ Critical Period Alert</h4>
              <p className="text-sm">AQI expected to reach 445 (Severe) in 18 hours due to increased stubble burning activity and stagnant wind conditions.</p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">💨 Improvement Expected</h4>
              <p className="text-sm">Western winds forecast to arrive in 48 hours will help disperse pollutants, reducing AQI by approximately 60 points.</p>
            </div>
            <div className="p-4 bg-accent border border-border rounded-lg">
              <h4 className="font-semibold mb-2">📊 Model Confidence</h4>
              <p className="text-sm">Prediction accuracy: 87% based on historical data and current atmospheric conditions.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Forecast;
