import { useState } from "react";
import Navigation from "@/components/Navigation";
import AQIBanner from "@/components/AQIBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockStations, getAQICategory, calculateAverageAQI } from "@/utils/aqiUtils";
import { MapPin } from "lucide-react";

const MapView = () => {
  const [selectedStation, setSelectedStation] = useState(mockStations[0]);
  const averageAQI = calculateAverageAQI(mockStations);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh opacity-5 pointer-events-none"></div>
      
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-primary-glow mb-2">
            Interactive AQI Heatmap
          </h1>
          <p className="text-muted-foreground">Real-time air quality across Delhi-NCR region</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Map Placeholder */}
          <Card className="lg:col-span-2 glass-card hover:shadow-glow transition-all duration-500 border-2 border-primary/10 overflow-hidden group">
            <CardHeader>
              <CardTitle>Delhi-NCR Region</CardTitle>
              <CardDescription>Click on stations to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/5 via-primary-glow/5 to-primary/10 rounded-lg overflow-hidden group-hover:shadow-glow transition-shadow">
                {/* Simulated map background with animated overlay */}
                <div className="absolute inset-0 gradient-mesh opacity-10 animate-gradient-shift"></div>
                
                {/* Station markers */}
                {mockStations.map((station) => {
                  const category = getAQICategory(station.aqi);
                  return (
                      <button
                      key={station.id}
                      onClick={() => setSelectedStation(station)}
                      className={`absolute w-14 h-14 rounded-full flex items-center justify-center 
                        text-white font-bold shadow-elevated hover:scale-125 hover:shadow-glow
                        transition-all duration-300 cursor-pointer border-2 border-white/50 hover:border-white
                        animate-bounce-in group/marker
                        ${category.color === 'aqi-good' ? 'bg-aqi-good hover:bg-aqi-good/90' : 
                          category.color === 'aqi-satisfactory' ? 'bg-aqi-satisfactory hover:bg-aqi-satisfactory/90' : 
                          category.color === 'aqi-moderate' ? 'bg-aqi-moderate hover:bg-aqi-moderate/90' : 
                          category.color === 'aqi-poor' ? 'bg-aqi-poor hover:bg-aqi-poor/90' : 
                          category.color === 'aqi-verypoor' ? 'bg-aqi-verypoor hover:bg-aqi-verypoor/90' : 'bg-aqi-severe hover:bg-aqi-severe/90'}`}
                      style={{
                        animationDelay: `${station.id * 100}ms`,
                        left: `${((station.lng - 76.9) / 0.5) * 100}%`,
                        top: `${((28.8 - station.lat) / 0.4) * 100}%`,
                      }}
                    >
                      {station.aqi}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <Badge className="bg-aqi-good text-white">0-50 Good</Badge>
                <Badge className="bg-aqi-satisfactory text-white">51-100 Satisfactory</Badge>
                <Badge className="bg-aqi-moderate text-white">101-200 Moderate</Badge>
                <Badge className="bg-aqi-poor text-white">201-300 Poor</Badge>
                <Badge className="bg-aqi-verypoor text-white">301-400 Very Poor</Badge>
                <Badge className="bg-aqi-severe text-white">401+ Severe</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Station Details */}
          <div className="space-y-4 animate-slide-in-right">
            <Card className="glass-card hover:shadow-glow transition-all duration-500 border-2 border-primary/10 overflow-hidden group">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <CardTitle>{selectedStation.name}</CardTitle>
                </div>
                <CardDescription>Real-time monitoring data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">AQI</span>
                    <span className="text-5xl font-bold text-gradient bg-gradient-to-r from-primary to-primary-glow animate-pulse">{selectedStation.aqi}</span>
                  </div>
                  <Badge 
                    className={`text-white w-full justify-center
                      ${getAQICategory(selectedStation.aqi).color === 'aqi-good' ? 'bg-aqi-good' : 
                        getAQICategory(selectedStation.aqi).color === 'aqi-satisfactory' ? 'bg-aqi-satisfactory' : 
                        getAQICategory(selectedStation.aqi).color === 'aqi-moderate' ? 'bg-aqi-moderate' : 
                        getAQICategory(selectedStation.aqi).color === 'aqi-poor' ? 'bg-aqi-poor' : 
                        getAQICategory(selectedStation.aqi).color === 'aqi-verypoor' ? 'bg-aqi-verypoor' : 'bg-aqi-severe'}`}
                  >
                    {getAQICategory(selectedStation.aqi).label}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">PM2.5</span>
                    <span className="font-semibold">{selectedStation.pm25} μg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">PM10</span>
                    <span className="font-semibold">{selectedStation.pm10} μg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Coordinates</span>
                    <span className="font-mono text-xs">{selectedStation.lat.toFixed(4)}, {selectedStation.lng.toFixed(4)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-glow transition-all border-2 border-primary/10 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary animate-pulse" />
                  All Stations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {mockStations.map((station) => (
                    <button
                      key={station.id}
                      onClick={() => setSelectedStation(station)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-300 hover:scale-105 hover:shadow-md ${
                        selectedStation.id === station.id
                          ? "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-glow"
                          : "glass hover:glass-card"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{station.name}</span>
                        <Badge 
                          className={`text-white
                            ${getAQICategory(station.aqi).color === 'aqi-good' ? 'bg-aqi-good' : 
                              getAQICategory(station.aqi).color === 'aqi-satisfactory' ? 'bg-aqi-satisfactory' : 
                              getAQICategory(station.aqi).color === 'aqi-moderate' ? 'bg-aqi-moderate' : 
                              getAQICategory(station.aqi).color === 'aqi-poor' ? 'bg-aqi-poor' : 
                              getAQICategory(station.aqi).color === 'aqi-verypoor' ? 'bg-aqi-verypoor' : 'bg-aqi-severe'}`}
                        >
                          {station.aqi}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapView;
