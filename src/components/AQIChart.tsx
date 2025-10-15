import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { time: "00:00", aqi: 385 },
  { time: "04:00", aqi: 398 },
  { time: "08:00", aqi: 412 },
  { time: "12:00", aqi: 425 },
  { time: "16:00", aqi: 418 },
  { time: "20:00", aqi: 408 },
  { time: "Now", aqi: 412 },
];

const AQIChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AQI Trend - Last 24 Hours</CardTitle>
        <CardDescription>Real-time air quality index monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
              dataKey="aqi" 
              stroke="hsl(var(--aqi-severe))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--aqi-severe))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AQIChart;
