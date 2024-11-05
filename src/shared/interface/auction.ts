export interface IAuction {
  auctionId: number;
  needId: number;
  tenderId: number;
  tradeType: number;
  number: string;
  name: string;
  customers: ICustomer[];
  regionName: string;
  regionPath: string;
  federalLawName: string;
  beginDate: string;
}

export interface ICustomer {
  name: string;
  inn: string;
  ogrn: string;
  supplierId: number;
  customerId: number;
  id: number;
}

export interface IRegion {
  id: string;
  name: string;
}
