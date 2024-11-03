import { IAuction } from "@/shared/interface/auction";
import { ReactNode } from "react";

export interface ISearchTabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
}

export interface IFetchAuctions {
  count: number;
  items: IAuction[];
}
