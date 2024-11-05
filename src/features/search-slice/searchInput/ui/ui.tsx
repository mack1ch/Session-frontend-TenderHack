"use client";

import { AutoComplete, AutoCompleteProps, ConfigProvider, Input } from "antd";
import { searchInputThemeContext } from "../theme";
import { SearchFilters } from "@/entities/searchFilters";
import styles from "./ui.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useCallback, useEffect, useState } from "react";
import { setSearchQuery } from "@/shared/redux/features/search";
import { SearchProps } from "antd/es/input";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const sessionsArray = useAppSelector((state) => state.session.sessions);
  const [autoCompleteSessionsOptions, setAutoCompleteSessionsOptions] =
    useState<AutoCompleteProps["options"]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = useCallback(
    (value: string) => {
      const filteredOptions = sessionsArray
        .filter((session) =>
          session.name?.toLowerCase().includes(value.toLowerCase())
        )
        .map((session) => ({ value: session.name, label: session.name }));

      setAutoCompleteSessionsOptions(filteredOptions);
    },
    [sessionsArray]
  );

  const onSelect = (value: string) => {
    dispatch(setSearchQuery(value));
    setInputValue(value);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    handleSearch(value);
    dispatch(setSearchQuery(value));
  };

  const onClear = () => {
    dispatch(setSearchQuery(""));
    setAutoCompleteSessionsOptions([]);
  };

  useEffect(() => {
    if (inputValue.length === 0) {
      setAutoCompleteSessionsOptions([]);
      dispatch(setSearchQuery(""));
    }
  }, [inputValue]);

  return (
    <>
      <ConfigProvider theme={searchInputThemeContext}>
        <div className={styles.searchInputWrap}>
          <AutoComplete
            style={{ width: "100%", marginBottom: "8px" }}
            options={autoCompleteSessionsOptions}
            onSearch={handleSearch}
            size="large"
            onSelect={onSelect}
          >
            <Input.Search
              allowClear
              onClear={onClear}
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
