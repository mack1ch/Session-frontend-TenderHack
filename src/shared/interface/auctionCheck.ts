import { IAuction } from "./auction";

export enum EAuctionCheckResult {
  checkName = "Неверное наименования",
  isCorrectCategory = "Неверная категория товара",
  checkCompanyDetails = "Неверные реквизиты",
  checkContactExistsIfNeed = "Отсутствует обеспечения контракта",
  coincidenceOfSchedulesAndDates = "Графики и даты не совпадают",
  certificatesAndLicenses = "Отсутствует сертификат/лицензия",
}

export interface IAuctionCheckResult {
  status: boolean;
  text: string;
}

export interface IAuctionCheck {
  result: {
    checkName?: IAuctionCheckResult;
    isCorrectCategory?: IAuctionCheckResult;
    checkCompanyDetails?: IAuctionCheckResult;
    checkContactExistsIfNeed?: IAuctionCheckResult;
    coincidenceOfSchedulesAndDates?: IAuctionCheckResult;
    certificatesAndLicenses?: IAuctionCheckResult;
  };
  auction: IAuction;
}
