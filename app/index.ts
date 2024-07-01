import express, { Express } from "express";
require("dotenv").config();
import { publicRoute } from "../routes/publicRoutes";

export const app:Express = express();
app.set("trust proxy", true);
app.use(express.json());
app.use('/api/hello',publicRoute)
const PORT = process.env.PORT || 2024;
app.listen(PORT, () => console.log(`Server running on : localhost:${PORT}`));