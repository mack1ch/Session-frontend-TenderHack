import { IAuction } from "./auction";

export interface IHistory {
  id: number;
  auctionId: number;
  createdAt: string;
}

export interface IDetailedHistory {
  count: number;
  items: IAuction[];
}
