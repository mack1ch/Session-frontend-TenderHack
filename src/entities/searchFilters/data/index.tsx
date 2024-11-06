import { MenuProps } from "antd";

export const DTimeOfSessionContinue: MenuProps["items"] = [
  {
    label: "Все",
    key: "3,6,24",
  },
  {
    label: "3 часа",
    key: "3",
  },
  {
    label: "6 часов",
    key: "6",
  },
  {
    label: "24 часа",
    key: "24",
  },
];

export const DThreeVariants: MenuProps["items"] = [
  {
    label: "Все варианты",
    key: "",
  },
  {
    label: "Да",
    key: "true",
  },
  {
    label: "Нет",
    key: "false",
  },
];
