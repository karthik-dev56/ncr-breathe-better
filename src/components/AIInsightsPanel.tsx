import { Brain, TrendingUp, Wind, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    icon: TrendingUp,
    title: "Stubble burning spike detected",
    description: "Stubble burning in Punjab increased 40% today → Expected AQI spike in Noida by 8 PM",
    severity: "high",
  },
  {
    icon: Wind,
    title: "Wind patterns changing",
    description: "Western winds expected to reduce AQI by 15% in next 6 hours",
    severity: "medium",
  },
  {
    icon: AlertTriangle,
    title: "GRAP Stage 4 recommended",
    description: "Current conditions meet Stage 4 criteria. Consider implementing restrictions",
    severity: "high",
  },
];

const AIInsightsPanel = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <CardTitle>AI Insights & Predictions</CardTitle>
        </div>
        <CardDescription>Real-time analysis powered by machine learning</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
              >
                <div className={`p-2 rounded-lg ${
                  insight.severity === "high" 
                    ? "bg-aqi-poor/20 text-aqi-poor" 
                    : "bg-primary/20 text-primary"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge variant={insight.severity === "high" ? "destructive" : "secondary"}>
                      {insight.severity === "high" ? "High Priority" : "Info"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
