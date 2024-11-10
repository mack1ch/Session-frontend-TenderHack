import { IAuction } from "./auction";

export enum EAuctionCheckResult {
  checkName = "Неверное наименования",
  isCorrectCategory = "Неверная категория товара",
  checkCompanyDetails = "Неверные реквизиты",
  checkContactExistsIfNeed = "Отсутствует обеспечения контракта",
  coincidenceOfSchedulesAndDates = "Графики и даты не совпадают",
  certificatesAndLicenses = "Отсутствует сертификат/лицензия",
}

export interface IAuctionCheck {
  result: {
    checkName?: boolean;
    isCorrectCategory?: boolean;
    checkCompanyDetails?: boolean;
    checkContactExistsIfNeed?: boolean;
    coincidenceOfSchedulesAndDates?: boolean;
    certificatesAndLicenses?: boolean;
  };
  auction: IAuction;
}
