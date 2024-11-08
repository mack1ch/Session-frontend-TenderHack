import { ISharedPurchaseBuyer } from "./auction";

export interface IAuctionDetail {
  customer: ICustomerDetail;
  createdByCustomer: ICustomerDetail;
  state: IState;
  startDate: string;
  initialDuration: number;
  endDate: string;
  startCost: number;
  nextCost: number | null;
  lastBetSupplier: string | null;
  lastBetCost: number | null;
  lastBetId: number | null;
  lastBet: IBet | null;
  step: number;
  auctionItem: IAuctionItem[];
  bets: IBet[];
  offerSignTime: string | null;
  uniqueSupplierCount: number;
  auctionRegion: IAuctionRegion[];
  repeatId: number | null;
  unpublishName: string | null;
  unpublishDate: string | null;
  federalLawName: string;
  conclusionReasonName: string;
  items: IItem[];
  deliveries: Delivery[];
  files: File[];
  //   licenseFiles: LicenseFile[];
  offersSigned: boolean;
  showPurchaseRequestMessageIfFailed: boolean;
  purchaseTypeId: number;
  contractCost: number | null;
  //   contracts: Contract[];
  unpublishComment: string | null;
  externalId: string | null;
  isElectronicContractExecutionRequired: boolean;
  isContractGuaranteeRequired: boolean;
  contractGuaranteeAmount: number | null;
  rowVersion: string;
  organizingTypeId: number;
  sharedPurchaseBuyers: ISharedPurchaseBuyer[] | null;
  //   suppliersAutobetSettings: AutobetSetting[];
  isLicenseProduction: boolean;
  uploadLicenseDocumentsComment: string | null;
  isExternalIntegration: boolean;
  name: string;
  id: number;
}

export interface ICustomerDetail {
  name: string;
  id: number;
}

export interface IState {
  name: string;
  id: number;
}

export interface IAuctionItem {
  currentValue: number;
  costPerUnit: number;
  okeiName: string;
  createdOfferId: number | null;
  skuId: number | null;
  imageId: number | null;
  defaultImageId: number | null;
  okpdName: string;
  productionDirectoryName: string;
  oksm: string | null;
  name: string;
  id: number;
}

interface IBet {
  id: number;
}

export interface IAuctionRegion {
  treePathId: string;
  socr: string;
  id: number;
  oktmo: string;
  code: string;
  name: string;
}

export interface IItem {
  currentValue: number;
  costPerUnit: number;
  okeiName: string;
  createdOfferId: number | null;
  skuId: number | null;
  imageId: number | null;
  defaultImageId: number | null;
  okpdName: string;
  productionDirectoryName: string;
  oksm: string | null;
  name: string;
  id: number;
}

export interface Delivery {
  periodDaysFrom: number | null;
  periodDaysTo: number | null;
  periodDateFrom: string;
  periodDateTo: string;
  deliveryPlace: string;
  quantity: number;
  items: IDeliveryItem[];
  id: number;
}

export interface IDeliveryItem {
  sum: number;
  costPerUnit: number;
  quantity: number;
  name: string;
  buyerId: number | null;
  isBuyerInvitationSent: boolean;
  isApprovedByBuyer: boolean | null;
}

export interface IFile {
  companyId: number | null;
  name: string;
  url: string;
  id: number;
}

export interface ISpecification {
  characteristics: {
    name: string;
    value: string;
  }[];
  auctionItemDelivery: {
    startDate: string;
    endDate: string;
    daysStart: string;
    daysEnd: string;
    workdays: string;
    deliverOnWorkDays: string;
    details: string;
    deliveryAddress: string;
    quantity: number;
    buyer: string;
    id: number;
  }[];
  okpd: {
    code: string;
    name: string;
    id: number;
  };
  production: {
    code: string;
    name: string;
    id: number;
  };
  skuModelName: string;
  skuManufacturerName: string;
  oksm: string;
  id: number; // Самый главный
}
