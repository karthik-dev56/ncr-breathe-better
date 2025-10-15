export const getAQICategory = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "aqi-good", description: "Air quality is satisfactory" };
  if (aqi <= 100) return { label: "Satisfactory", color: "aqi-satisfactory", description: "Acceptable air quality" };
  if (aqi <= 200) return { label: "Moderate", color: "aqi-moderate", description: "May cause breathing discomfort" };
  if (aqi <= 300) return { label: "Poor", color: "aqi-poor", description: "May cause breathing issues" };
  if (aqi <= 400) return { label: "Very Poor", color: "aqi-verypoor", description: "May cause respiratory illness" };
  return { label: "Severe", color: "aqi-severe", description: "Health emergency" };
};

export const getHealthAdvice = (aqi: number) => {
  if (aqi <= 50) return "Enjoy outdoor activities";
  if (aqi <= 100) return "Sensitive individuals should limit prolonged outdoor exertion";
  if (aqi <= 200) return "Limit prolonged outdoor activities";
  if (aqi <= 300) return "Avoid prolonged outdoor activities";
  if (aqi <= 400) return "Stay indoors and keep activity levels low";
  return "Avoid all outdoor activities. Keep windows closed";
};

export const mockStations = [
  { id: 1, name: "Anand Vihar", lat: 28.6469, lng: 77.3166, aqi: 412, pm25: 310, pm10: 445 },
  { id: 2, name: "RK Puram", lat: 28.5636, lng: 77.1841, aqi: 385, pm25: 285, pm10: 410 },
  { id: 3, name: "Dwarka", lat: 28.5921, lng: 77.0460, aqi: 368, pm25: 268, pm10: 395 },
  { id: 4, name: "Gurugram Sector 29", lat: 28.4595, lng: 77.0266, aqi: 425, pm25: 325, pm10: 465 },
  { id: 5, name: "Noida Sector 62", lat: 28.6277, lng: 77.3641, aqi: 398, pm25: 295, pm10: 430 },
  { id: 6, name: "Rohini", lat: 28.7481, lng: 77.1169, aqi: 356, pm25: 258, pm10: 380 },
  { id: 7, name: "ITO", lat: 28.6289, lng: 77.2426, aqi: 405, pm25: 305, pm10: 450 },
  { id: 8, name: "Faridabad", lat: 28.4089, lng: 77.3178, aqi: 418, pm25: 318, pm10: 458 },
];

export const calculateAverageAQI = (stations: typeof mockStations) => {
  const sum = stations.reduce((acc, station) => acc + station.aqi, 0);
  return Math.round(sum / stations.length);
};
