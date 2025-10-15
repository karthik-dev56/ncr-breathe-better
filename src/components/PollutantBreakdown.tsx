import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "PM2.5", value: 310, safe: 60 },
  { name: "PM10", value: 445, safe: 100 },
  { name: "NO₂", value: 85, safe: 80 },
  { name: "SO₂", value: 45, safe: 80 },
  { name: "CO", value: 1.8, safe: 2.0 },
  { name: "O₃", value: 68, safe: 100 },
];

const PollutantBreakdown = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pollutant Levels</CardTitle>
        <CardDescription>Current vs Safe Limits (μg/m³)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} 
            />
            <Legend />
            <Bar dataKey="value" fill="hsl(var(--aqi-poor))" name="Current" radius={[8, 8, 0, 0]} />
            <Bar dataKey="safe" fill="hsl(var(--aqi-good))" name="Safe Limit" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PollutantBreakdown;
