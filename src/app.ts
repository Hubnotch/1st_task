import express, { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
// app.set("trust proxy", true);
app.use(express.json());
const getTemperature = async (city: any) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    return response.data.main.temp;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
const getLocation = async (ip: any) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};

app.use("/api/hello", async (request: Request, response: Response) => {
  const visitorName = request.query.visitor_name || "Guest";
  const clientIp =
    request.headers["x-forwarded-for"] || request.socket.remoteAddress;
  const locationData = await getLocation(clientIp);
  if (!locationData || !locationData.city) {
    return response
      .status(500)
      .json({ error: "Unable to fetch location data" });
  }
  const temperature = await getTemperature(locationData.city);
  if (temperature === null) {
    return response
      .status(500)
      .json({ error: "Unable to fetch temperature data" });
  }
  response.json({
    client_ip: clientIp,
    location: locationData.city,
    greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${locationData.city}`,
  });
});
// app.use('/api/hello',publicRoute)
const PORT = process.env.PORT || 2024;
app.listen(PORT, () => console.log(`Server running on : localhost:${PORT}`));
