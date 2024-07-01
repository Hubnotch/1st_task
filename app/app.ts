import express, { Express } from "express";
import { publicRoute } from "../routes/publicRoutes";

export const app:Express = express();
app.set("trust proxy", true);
app.use(express.json());
app.use('/api/hello',publicRoute)

// module.exports = app;