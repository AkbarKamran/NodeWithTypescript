import { Dblayer } from "../DAL/DbLayer";
const DblayerInstance = Dblayer.getinstance();

export class ManagerLayer {
  private static instance: ManagerLayer;

  private constructor() {}

  public static getinstance(): ManagerLayer {
    if (!ManagerLayer.instance) {
      ManagerLayer.instance = new ManagerLayer();
    }
    return ManagerLayer.instance;
  }

  public CountryList = async () => {
    return new Promise((resolve, reject) => {
      DblayerInstance.getCountryList()
        .then((data: any) => {
          resolve(data.recordset);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  public PostCountryListByParams(countryNumber: any) {
    return new Promise((resolve, reject) => {
      let number: number = +countryNumber;
      DblayerInstance.getSpecificCountryListByParams(number)
        .then((data: any) => {
          resolve(data.recordset[0]);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public PostCountryListByBody(countryName: any) {
    return new Promise((resolve, reject) => {
      let name: String = countryName;
      DblayerInstance.getSpecificCountryListByBody(name)
        .then((data: any) => {
          resolve(data.recordset[0]);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public getCountryByIdAndName(countryNumber: any, countryName: any) {
    return new Promise((resolve, reject) => {
      let number: number = +countryNumber;
      let name: any = countryName;
      DblayerInstance.getSpecificCountryListByIdAndName(number, name)
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // public getCountryByIdAndName(countryId: any, countryName: any) {
  //   return new Promise((resolve, reject) => {
  //     DblayerInstance.getCountryByIdAndName(countryId, countryName)
  //       .then((data: any) => {
  //         resolve(data);
  //       })
  //       .catch((error: any) => {
  //         reject(error);
  //       });
  //   });
  // }
}
