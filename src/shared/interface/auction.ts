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
}

export interface ICustomer {
  name: string;
  inn: string;
  ogrn: string;
  supplierId: number;
  customerId: number;
  id: number;
}
