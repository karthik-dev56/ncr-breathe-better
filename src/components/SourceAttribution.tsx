import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Vehicles", value: 35 },
  { name: "Industry", value: 25 },
  { name: "Construction", value: 18 },
  { name: "Stubble Burning", value: 15 },
  { name: "Waste Burning", value: 7 },
];

const COLORS = [
  "hsl(var(--aqi-poor))",
  "hsl(var(--aqi-verypoor))",
  "hsl(var(--primary))",
  "hsl(var(--aqi-moderate))",
  "hsl(var(--muted-foreground))",
];

const SourceAttribution = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pollution Source Attribution</CardTitle>
        <CardDescription>AI-analyzed contribution by source</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} 
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SourceAttribution;
