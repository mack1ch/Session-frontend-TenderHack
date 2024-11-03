import { ReactNode } from "react";

export interface ISearchTabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
}
