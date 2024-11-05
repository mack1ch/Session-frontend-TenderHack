"use client";

import { AutoComplete, ConfigProvider, Input } from "antd";
import { searchInputThemeContext } from "../theme";
import { SearchFilters } from "@/entities/searchFilters";
import styles from "./ui.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useState } from "react";
import { setSearchQuery } from "@/shared/redux/features/search";
import { SearchProps } from "antd/es/input";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>();

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };
  const onSearch: SearchProps["onSearch"] = (value) =>
    dispatch(setSearchQuery(value));
  // const handleSearch = (value: string) => {
  // setOptions(value ? searchResult(value) : []);
  // };

  return (
    <>
      <ConfigProvider theme={searchInputThemeContext}>
        <div className={styles.searchInputWrap}>
          <AutoComplete
            style={{ width: "100%", marginBottom: "8px" }}
            // options={options}
            onSelect={onSelect}
            // onSearch={handleSearch}
            size="large"
          >
            <Input.Search
              value={inputValue}
              onSearch={onSearch}
              onChange={(e) => setInputValue(e.target.value)}
              prefix={
                <SearchOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              placeholder="Введите ключевое слово, номер процедуры или ИНН"
              size="large"
              enterButton="Найти"
            />
          </AutoComplete>
          <SearchFilters />
        </div>
      </ConfigProvider>
    </>
  );
};
