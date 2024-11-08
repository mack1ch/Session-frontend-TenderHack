import { SearchTab } from "@/features/search-slice/searchTab";
import { ISearchTabItem } from "../interface";
import {
  CarryOutOutlined,
  CheckCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CheckTab } from "@/features/search-slice/checkTab";

export const DSearchTabItems: ISearchTabItem[] = [
  {
    value: "check",
    label: "Проверка",
    icon: <CarryOutOutlined style={{ fontSize: "20px" }} />,
    content: <CheckTab />,
  },
  {
    value: "search",
    label: "Поиск",
    icon: <SearchOutlined style={{ fontSize: "20px" }} />,
    content: <SearchTab />,
  },

  {
    value: "checked",
    label: "Просмотренные",
    icon: <CheckCircleOutlined style={{ fontSize: "20px" }} />,
  },
];
