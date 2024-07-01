import express, { Express } from "express";
import { greetingCtrl } from "../controller/greetingsCtrl";

export const publicRoute = express.Router();

publicRoute.get('/',greetingCtrl);
