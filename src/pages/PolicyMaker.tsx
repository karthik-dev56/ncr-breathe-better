import { useState } from "react";
import Navigation from "@/components/Navigation";
import AQIBanner from "@/components/AQIBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { calculateAverageAQI, mockStations } from "@/utils/aqiUtils";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Scale, Target, TrendingDown, AlertCircle, CheckCircle2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PolicyMaker = () => {
  const averageAQI = calculateAverageAQI(mockStations);
  const { toast } = useToast();
  const [grapStage, setGrapStage] = useState(3);
  const [simulationValue, setSimulationValue] = useState([50]);

  const complianceData = [
    { area: "Delhi", compliance: 68, target: 100 },
    { area: "Gurugram", compliance: 45, target: 100 },
    { area: "Noida", compliance: 72, target: 100 },
    { area: "Faridabad", compliance: 58, target: 100 },
    { area: "Ghaziabad", compliance: 52, target: 100 },
  ];

  const impactData = [
    { hour: "0h", current: 412, withPolicy: 412 },
    { hour: "6h", current: 425, withPolicy: 390 },
    { hour: "12h", current: 438, withPolicy: 375 },
    { hour: "18h", current: 445, withPolicy: 365 },
    { hour: "24h", current: 432, withPolicy: 352 },
    { hour: "36h", current: 418, withPolicy: 335 },
    { hour: "48h", current: 405, withPolicy: 318 },
    { hour: "72h", current: 395, withPolicy: 295 },
  ];

  const handleGRAPActivation = () => {
    toast({
      title: `GRAP Stage ${grapStage} Activated`,
      description: `Emergency measures are now in effect. All departments notified.`,
    });
  };

  const handleSimulation = () => {
    const reduction = Math.round(simulationValue[0]);
    const newAQI = Math.max(50, averageAQI - reduction);
    toast({
      title: "Impact Simulation Complete",
      description: `Projected AQI reduction: ${averageAQI} → ${newAQI} (${reduction} point decrease)`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-8 h-8 text-primary animate-pulse-glow" />
            <h1 className="text-4xl font-bold text-primary">Policy Control Panel</h1>
          </div>
          <p className="text-muted-foreground">GRAP management and impact analysis</p>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2 border-aqi-severe">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-aqi-severe animate-pulse" />
                Current GRAP Stage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-aqi-severe">Stage 3</div>
              <p className="text-xs text-muted-foreground mt-1">Severe + Emergency</p>
              <Badge className="mt-2 bg-aqi-severe text-white">Active</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Avg Compliance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">59%</div>
              <p className="text-xs text-muted-foreground mt-1">Across Delhi-NCR</p>
              <Badge variant="outline" className="mt-2 text-aqi-moderate border-aqi-moderate">
                Below Target
              </Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-aqi-good" />
                Projected Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-aqi-good">-25%</div>
              <p className="text-xs text-muted-foreground mt-1">AQI reduction in 72h</p>
              <Badge className="mt-2 bg-aqi-good text-white">Positive</Badge>
            </CardContent>
          </Card>
        </div>

        {/* GRAP Control */}
        <Card className="mb-8 animate-fade-in-up hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              GRAP Stage Control
            </CardTitle>
            <CardDescription>Graded Response Action Plan activation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((stage) => (
                <button
                  key={stage}
                  onClick={() => setGrapStage(stage)}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    grapStage === stage
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl font-bold mb-2">Stage {stage}</div>
                  <div className="text-sm text-muted-foreground">
                    {stage === 1 && "AQI 201-300"}
                    {stage === 2 && "AQI 301-400"}
                    {stage === 3 && "AQI 401-450"}
                    {stage === 4 && "AQI 450+"}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-6 bg-accent rounded-lg space-y-3">
              <h4 className="font-semibold">Stage {grapStage} Measures:</h4>
              <ul className="space-y-2 text-sm">
                {grapStage >= 1 && (
                  <li className="flex items-center gap-2 animate-slide-in-right">
                    <CheckCircle2 className="w-4 h-4 text-aqi-good" />
                    Ban on coal/firewood use, mechanized road sweeping
                  </li>
                )}
                {grapStage >= 2 && (
                  <li className="flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: "100ms" }}>
                    <CheckCircle2 className="w-4 h-4 text-aqi-good" />
                    Parking fee hike, BS-III petrol/BS-IV diesel vehicle ban
                  </li>
                )}
                {grapStage >= 3 && (
                  <li className="flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: "200ms" }}>
                    <CheckCircle2 className="w-4 h-4 text-aqi-good" />
                    Non-essential construction ban, work-from-home mandates
                  </li>
                )}
                {grapStage === 4 && (
                  <li className="flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: "300ms" }}>
                    <CheckCircle2 className="w-4 h-4 text-aqi-severe animate-pulse" />
                    Truck entry ban, school closures, odd-even vehicle scheme
                  </li>
                )}
              </ul>
            </div>

            <Button 
              onClick={handleGRAPActivation} 
              className="w-full animate-pulse-glow"
              size="lg"
            >
              Activate Stage {grapStage} Emergency Measures
            </Button>
          </CardContent>
        </Card>

        {/* Impact Simulator */}
        <Card className="mb-8 animate-fade-in-up hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Policy Impact Simulator
            </CardTitle>
            <CardDescription>Predict AQI reduction with policy interventions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Intervention Intensity</Label>
                <Badge variant="outline">{simulationValue[0]} point reduction</Badge>
              </div>
              <Slider
                value={simulationValue}
                onValueChange={setSimulationValue}
                max={150}
                step={5}
                className="w-full"
              />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="current" 
                  stroke="hsl(var(--aqi-severe))" 
                  strokeWidth={3}
                  name="Without Policy"
                />
                <Line 
                  type="monotone" 
                  dataKey="withPolicy" 
                  stroke="hsl(var(--aqi-good))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="With Policy"
                />
              </LineChart>
            </ResponsiveContainer>

            <Button onClick={handleSimulation} className="w-full" variant="outline">
              Run Simulation
            </Button>
          </CardContent>
        </Card>

        {/* Compliance Tracker */}
        <Card className="animate-fade-in-up hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Compliance Tracker
            </CardTitle>
            <CardDescription>Policy adherence by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="area" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Legend />
                <Bar dataKey="compliance" fill="hsl(var(--primary))" name="Current Compliance" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--aqi-good))" name="Target" radius={[8, 8, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const Label = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={className}>{children}</div>
);

export default PolicyMaker;
