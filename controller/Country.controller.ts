import { Request, Response, NextFunction } from "express";

import { ManagerLayer } from "../BLL/ManagerLayer";

const managerInstance = ManagerLayer.getinstance();

export class CountryController {
  GetCountries = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.query.id;
      const name = request.query.name;

      if (id && !name) {
        //console.log(request);
        try {
          const countryNumber = id; //  request.body.number for body request

          managerInstance
            .PostCountryListByParams(countryNumber)
            .then((data: any) => {
              response.status(200).send({
                status: 200,
                code: 1,
                message: "Success",
                version: "1.0.0",
                data: data,
              });
            });
        } catch (error) {
          response.status(200).send({
            status: 400,
            code: 0,
            message: "Invalid",
            version: "1.0.0",
            error: error,
          });
        }
      } else if (name && !id) {
        //console.log(request);

        try {
          const countryName = name; //  request.body.number for body request

          managerInstance
            .PostCountryListByBody(countryName)
            .then((data: any) => {
              response.status(200).send({
                status: 200,
                code: 1,
                message: "Success",
                version: "1.0.0",
                data: data,
              });
            });
        } catch (error) {
          response.status(200).send({
            status: 400,
            code: 0,
            message: "Invalid",
            version: "1.0.0",
            error: error,
          });
        }
      } else if (name && id) {
        try {
          // const countryNumber = id; //  request.body.number for body request
          const arrayValues1: any = [];

          managerInstance.getCountryByIdAndName(id, name).then((data: any) => {
            response.status(200).send({
              status: 200,
              code: 1,
              message: "Success",
              version: "1.0.0",
              data: data,
            });
          });
        } catch (error) {
          response.status(200).send({
            status: 400,
            code: 0,
            message: "Invalid",
            version: "1.0.0",
            error: error,
          });
        }
      } else {
        await managerInstance.CountryList().then((data: any) => {
          if (data != null) {
            response.status(200).send({
              status: 200,
              code: 1,
              message: "Success",
              version: "1.0.0",
              data: data,
            });
          } else {
            response.status(200).send({
              status: 400,
              code: 0,
              message: "Invalid",
              version: "1.0.0",
              error: "error",
            });
          }
        });
      }
    } catch (error) {
      response.status(200).send({
        status: 400,
        code: 0,
        message: "Invalid",
        version: "1.0.0",
        error: error,
      });
    }
  };

  PostCountriesByParams = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    //console.log(request);

    try {
      const countryNumber = request.params.number; //  request.body.number for body request

      managerInstance
        .PostCountryListByParams(countryNumber)
        .then((data: any) => {
          response.status(200).send({
            status: 200,
            code: 1,
            message: "Success",
            version: "1.0.0",
            data: data,
          });
        });
    } catch (error) {
      response.status(200).send({
        status: 400,
        code: 0,
        message: "Invalid",
        version: "1.0.0",
        error: error,
      });
    }
  };

  PostCountriesByBody = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    //console.log(request);

    try {
      const countryName = request.body.name; //  request.body.number for body request

      managerInstance.PostCountryListByBody(countryName).then((data: any) => {
        response.status(200).send({
          status: 200,
          code: 1,
          message: "Success",
          version: "1.0.0",
          data: data,
        });
      });
    } catch (error) {
      response.status(200).send({
        status: 400,
        code: 0,
        message: "Invalid",
        version: "1.0.0",
        error: error,
      });
    }
  };
}
