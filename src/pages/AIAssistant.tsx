import { useState } from "react";
import Navigation from "@/components/Navigation";
import AQIBanner from "@/components/AQIBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateAverageAQI, mockStations } from "@/utils/aqiUtils";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant = () => {
  const averageAQI = calculateAverageAQI(mockStations);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Air Quality Assistant. Ask me anything about Delhi-NCR pollution, health recommendations, or forecasts.",
    },
  ]);
  const [input, setInput] = useState("");

  const dummyResponses = [
    "Based on current data, the high AQI is primarily due to stubble burning in Punjab (40% increase) and stagnant wind conditions. I recommend staying indoors with air purifiers running.",
    "The AQI in Gurugram is currently 425 (Severe). This is higher than Delhi average due to industrial emissions and construction activity. Expected to improve by 15% in next 6 hours due to western winds.",
    "For asthma patients, I strongly recommend: 1) Avoid all outdoor activities 2) Keep windows closed 3) Use N95 masks if you must go out 4) Run air purifiers on high setting 5) Keep rescue inhaler accessible.",
    "The forecast shows AQI peaking at 445 in 18 hours, then gradually improving to 352 over the next 72 hours. This improvement is due to expected western winds helping disperse pollutants.",
    "PM2.5 levels are currently 5x the safe limit. The main sources are: Vehicles (35%), Industry (25%), Construction (18%), Stubble burning (15%), and Waste burning (7%).",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response with dummy data
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput("");
  };

  const quickQuestions = [
    "Why is AQI high today?",
    "Health advice for asthma patients",
    "When will air quality improve?",
    "Best areas in Delhi-NCR?",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground">Get instant answers about air quality and health</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Chat with AI
            </CardTitle>
            <CardDescription>Powered by real-time pollution data and ML models</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask about AQI, health tips, forecasts..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What I Can Help With</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-accent rounded-lg">
                <h4 className="font-semibold mb-2">🔍 Real-time Analysis</h4>
                <p className="text-sm text-muted-foreground">Current AQI levels, pollutant breakdown, and source attribution</p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h4 className="font-semibold mb-2">📊 Forecasts</h4>
                <p className="text-sm text-muted-foreground">72-hour predictions with weather correlations</p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h4 className="font-semibold mb-2">💊 Health Advice</h4>
                <p className="text-sm text-muted-foreground">Personalized recommendations based on conditions</p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h4 className="font-semibold mb-2">📍 Location Insights</h4>
                <p className="text-sm text-muted-foreground">Compare areas and find cleaner zones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AIAssistant;
