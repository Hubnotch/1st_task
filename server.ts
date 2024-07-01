require("dotenv").config();
// const http = require('http');
import http from "http";
import { app } from "./app/app";

const PORT = process.env.PORT || 2024;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
