export interface IAuction {
  auctionId: number;
  needId: number;
  tenderId: number;
  tradeType: number;
  number: string;
  name: string;
  customers: ICustomer[];
  organizators: IOrganizator[];
  purchaseCreator: ICustomer;
  winner: IWinner;
  hasPublisher: boolean;
  stateName: string;
  stateId: number;
  startPrice: number;
  regionName: string;
  offerCount: number;
  auctionCurrentPrice: number;
  auctionNextPrice: number;
  beginDate: string;
  endDate: string;
  federalLawName: string;
  regionPath: string;
  isExternalIntegration: boolean;
  organizingTypeId: number;
  isB2B: boolean;
  isPtkr: boolean;
  isQuantityUnknown: boolean;
  initialDuration: number;
  sharedPurchaseBuyers: ISharedPurchaseBuyer[];
  externalNumber: string;
  externalUrl: string;
  externalSystemId: number;
  tenderTypeName: string;
  lotsCount: number;
  id: string;
}

export interface ICustomer {
  name: string;
  inn: string;
  ogrn: string;
  supplierId: number;
  customerId: number;
  id: number;
}

export interface IOrganizator {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface IWinner {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface ISharedPurchaseBuyer {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
