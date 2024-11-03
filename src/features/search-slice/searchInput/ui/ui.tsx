"use client";

import { ConfigProvider, Input } from "antd";
import { searchInputThemeContext } from "../theme";
import { SearchFilters } from "@/entities/searchFilters";
import styles from "./ui.module.scss";
import { SearchOutlined } from "@ant-design/icons";

export const SearchInput = () => {
  return (
    <>
      <ConfigProvider theme={searchInputThemeContext}>
        <div className={styles.searchInputWrap}>
          <Input.Search
            prefix={<SearchOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
            placeholder="Введите ключевое слово, номер процедуры или ИНН"
            size="large"
            enterButton="Найти"
          />
          <SearchFilters />
        </div>
      </ConfigProvider>
    </>
  );
};
