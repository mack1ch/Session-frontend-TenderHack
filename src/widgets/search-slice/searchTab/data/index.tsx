import { SearchInput } from "@/features/search-slice/searchInput";
import { ISearchTabItem } from "../interface";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export const DSearchTabItems: ISearchTabItem[] = [
  {
    value: "search",
    label: "Поиск",
    icon: <SearchOutlined style={{ fontSize: "20px" }} />,
    content: <SearchInput />,
  },
  {
    value: "checked",
    label: "Просмотренные",
    icon: <CheckCircleOutlined style={{ fontSize: "20px" }} />,
  },
  {
    value: "cancel",
    label: "Хотите отменить",
    icon: <ExclamationCircleOutlined style={{ fontSize: "20px" }} />,
  },
];
