import { AlertTriangle } from "lucide-react";
import { getAQICategory, getHealthAdvice } from "@/utils/aqiUtils";

interface AQIBannerProps {
  aqi: number;
  location: string;
}

const AQIBanner = ({ aqi, location }: AQIBannerProps) => {
  const category = getAQICategory(aqi);
  const advice = getHealthAdvice(aqi);

  const getBgColor = () => {
    switch (category.color) {
      case "aqi-good": return "bg-aqi-good";
      case "aqi-satisfactory": return "bg-aqi-satisfactory";
      case "aqi-moderate": return "bg-aqi-moderate";
      case "aqi-poor": return "bg-aqi-poor";
      case "aqi-verypoor": return "bg-aqi-verypoor";
      case "aqi-severe": return "bg-aqi-severe";
      default: return "bg-aqi-severe";
    }
  };

  return (
    <div className={`w-full ${getBgColor()} text-white py-4 px-6 shadow-lg`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">{aqi}</span>
              <span className="text-xl font-semibold">{category.label}</span>
            </div>
            <p className="text-sm opacity-90 mt-1">{location}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{category.description}</p>
          <p className="text-xs opacity-90 mt-1">💡 {advice}</p>
        </div>
      </div>
    </div>
  );
};

export default AQIBanner;
