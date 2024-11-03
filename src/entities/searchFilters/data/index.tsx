import { Checkbox, MenuProps, Radio } from "antd";

interface ISearchFiltersComponent {
  title: string;
  items: MenuProps["items"];
  isMultiply?: boolean;
}

export const DSearchFiltersDropDown: ISearchFiltersComponent[] = [
  {
    title: "Тип сессии",
    items: [
      {
        label: <Checkbox>Скоро закончатся</Checkbox>,
        key: "0",
      },
      {
        label: <Checkbox>Есть потенциальные поставщики</Checkbox>,
        key: "1",
      },

      {
        label: <Checkbox>Нет потенциальных поставщиков</Checkbox>,
        key: "3",
      },
    ],
    isMultiply: true,
  },
  {
    title: "Тип торгов",
    items: [
      {
        label: <Radio>Любые торги</Radio>,
        key: "0",
      },
      {
        label: <Radio>44-ФЗ</Radio>,
        key: "1",
      },
      {
        label: <Radio>223-ФЗ</Radio>,
        key: "3",
      },
      {
        label: <Radio>611-ПП</Radio>,
        key: "4",
      },
      {
        label: <Radio>Коммерческие закупки</Radio>,
        key: "5",
      },
    ],
  },
  {
    title: "Категория ОКПД 2",
    items: [
      {
        label: "Продукция сельского хозяйства",
        key: "0",
      },
      {
        label: "Электроэнергия",
        key: "1",
      },
      {
        label: "Сооружение и строительные работы",
        key: "2",
      },
    ],
  },
  {
    title: "Регион заказчика",
    items: [
      {
        label: "Москва",
        key: "0",
      },
      {
        label: "Санкт-Петербург",
        key: "1",
      },
      {
        label: "Свердловская область",
        key: "2",
      },
    ],
  },
];
