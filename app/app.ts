import express, { Express } from "express";
import { publicRoute } from "../routes/publicRoutes";

export const app:Express = express();
// app.set("trust proxy", true);
// app.enable('trust proxy');
// app.enabled('trust proxy');
app.use(express.json());
app.use('/api/hello',publicRoute)

