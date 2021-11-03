import express, { Application, Request, Response, NextFunction } from "express";
import getCountry from "./routes/country";
import cors from "cors";

class APP {
  public app: Application;
  public serviceName: String = "/api/get";

  constructor() {
    this.app = express();

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware() {
    this.app.use(cors({ credentials: true, origin: true }));
    // this.app.use({ limit: "5mb" });
  }

  private initializeRoutes() {
    this.app.use(express.json());
    this.app.use(`${this.serviceName}`, getCountry);
  }

  private initializeErrorHandling() {
    this.app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        response.status(500).send({ error: error.message });
      }
    );
  }
}

export default APP;
