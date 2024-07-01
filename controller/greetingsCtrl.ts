import { Request,Response } from "express"
import requestIp from 'request-ip'
import { getLocation, getTemperature } from "../utils/checkWeather";

export const  greetingCtrl = async (request:Request, response:Response) =>{
// console.log(request.socket.remoteAddress)

console.log(request.ip);

  const visitorName = request.query.visitor_name || "Guest";
  const clientIp = requestIp.getClientIp(request) || "127.0.0.1";
  const locationData = await getLocation(clientIp);
  if (!locationData || !locationData.city) {
    return response.status(500).json({ error: "Unable to fetch location data" });
  }
const temperature = await getTemperature(locationData.city);
if (temperature === null) {
  return response.status(500).json({ error: "Unable to fetch temperature data" });
}
  response.json({
    client_ip: clientIp,
    location: locationData.city,
    greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${locationData.city}`,
  });
}