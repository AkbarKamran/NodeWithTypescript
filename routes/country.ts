import { Router } from "express";

const router = Router();
import { CountryController } from "../controller/Country.controller";

const countryController = new CountryController();

router.get("/countries", countryController.GetCountries);

// router.post("/countries/:number", countryController.PostCountriesByParams);

// router.post("/countries", countryController.PostCountriesByBody);

export default router;
