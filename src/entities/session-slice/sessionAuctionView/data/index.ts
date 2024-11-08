import { ColumnsType } from "antd/es/table";

export const TableGraphicsColumns: ColumnsType<{
  customer: number | null;
  name: string;
  cost: number;
  quantity: number;
  sum: string;
}> = [
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Цена за единицу	",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "Кол-во",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Сумма",
    dataIndex: "sum",
    key: "sum",
  },
];

export const TableSpecificationColumns: ColumnsType<{
  value: string;
  name: string;
}> = [
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Значение",
    dataIndex: "value",
    key: "value",
  },
];

export const TableSpecificationGraphicColumns: ColumnsType<{
  dates: string;
  quantity: string;
  address: string;
  details: string;
}> = [
  {
    title: "Даты поставки",
    dataIndex: "dates",
    key: "dates",
  },
  {
    title: "Кол-во",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Детали",
    dataIndex: "details",
    key: "details",
  },
];
