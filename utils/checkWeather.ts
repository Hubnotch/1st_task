import axios from 'axios';
import requestIp from 'request-ip';


export const getTemperature = async (city: any) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    console.log(response)
    return response.data.main.temp;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};;


export const getLocation = async (ip: any) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};;
