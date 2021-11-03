const SQL_CONFIGURATION = require("../configuration");
const SQL = require("mssql");

export class Dblayer {
  private static instance: Dblayer;

  private constructor() {}

  public static getinstance(): Dblayer {
    if (!Dblayer.instance) {
      Dblayer.instance = new Dblayer();
    }
    return Dblayer.instance;
  }

  public getCountryList = async () => {
    return new Promise((resolve, reject) => {
      SQL.connect(SQL_CONFIGURATION).then((pool: any) => {
        let req = pool.request();

        req.execute("spne_GetAllCountries", (error: any, recordset: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(recordset);
          }
        });
      });
    });
  };

  public getSpecificCountryListByParams = async (countryNumber: number) => {
    return new Promise((resolve, reject) => {
      // console.log("Param DbLayer ======>", countryNumber);
      SQL.connect(SQL_CONFIGURATION).then((pool: any) => {
        let req = pool.request();

        req.query(
          " SELECT countryId, countryName FROM dbo.Countries WHERE countryId = " +
            countryNumber,
          (error: any, recordset: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(recordset);
            }
          }
        );
      });
    });
  };

  public getSpecificCountryListByBody = async (countryName: String) => {
    return new Promise((resolve, reject) => {
      console.log("Body DbLayer ======>", countryName);
      SQL.connect(SQL_CONFIGURATION).then((pool: any) => {
        let req = pool.request();

        req.input("countryParameter", SQL.VarChar(500), countryName);

        req.query(
          " SELECT countryId, countryName, latitude,longitude FROM dbo.Countries WHERE countryName = @countryParameter",
          (error: any, dataByName: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(dataByName);
            }
          }
        );
      });
    });
  };

  public getSpecificCountryListByIdAndName = async (
    countryNumber: number,
    countryName: any
  ) => {
    return new Promise((resolve, reject) => {
      // console.log("Param DbLayer ======>", countryNumber);
      SQL.connect(SQL_CONFIGURATION).then((pool: any) => {
        let req = pool.request();

        req.query(
          " SELECT countryId, countryName FROM dbo.Countries WHERE countryId = " +
            countryNumber,
          (error: any, recordset: any) => {
            if (error) {
              return reject(error);
            } else {
              if (recordset) {
                let obj: any = recordset.recordset[0];
                if (
                  obj.countryName.toLowerCase() === countryName.toLowerCase()
                ) {
                  return resolve(recordset.recordset[0]);
                } else return resolve([]);
              } else return resolve([]);
            }
          }
        );
      });
    });
  };
  // public getCountryByIdAndName = async (
  //   countryId: String,
  //   countryName: String
  // ) => {
  //   return new Promise((resolve, reject) => {
  //     console.log("Country ID And Name=========>>>>>>", countryId, countryName);
  //     let dataByName: String;
  //     let dataById: String;
  //     let arrayValues: any = [];
  //     SQL.connect(SQL_CONFIGURATION).then((pool: any) => {
  //       let req = pool.request();

  //       req.input("countryName", SQL.VarChar(500), countryName);
  //       req.query(
  //         "SELECT countryId, countryName, latitude,longitude FROM dbo.Countries WHERE countryName = @countryName",
  //         (error: any, recordSetByName: any) => {
  //           if (error) {
  //             reject(error);
  //           } else {
  //             arrayValues[0] = recordSetByName;
  //             // console.log("Data By Name======>>>>>>", dataByName);
  //           }
  //         }
  //       );

  //       req.query(
  //         "SELECT countryId, countryName FROM dbo.Countries WHERE countryId = " +
  //           countryId,
  //         (error: any, recordSetById: any) => {
  //           if (error) {
  //             reject(error);
  //           } else {
  //             arrayValues[1] = recordSetById;
  //              resolve([dataById, dataByName]);
  //     // }
  //           }
  //         }
  //       );
  //     });
  //     // if (dataById && dataByName) {
  //     //   resolve([dataById, dataByName]);
  //     // }
  //   });
  // };
}
