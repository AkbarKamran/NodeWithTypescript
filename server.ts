import app from "./app";
const http = require("http");
import { config } from "dotenv";
config();
const Apps = new app().app;

var httpsServer = http.createServer(Apps);

const start = () => {
  httpsServer.listen(process.env.PORT_NUMBER, () => {
    console.log("Server is running:  https://localhost:8080");
  });
};

start();
