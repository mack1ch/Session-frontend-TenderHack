"use client";

import { Button, Dropdown, Space } from "antd";
import styles from "./ui.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { DSearchFiltersDropDown } from "../data";

export const SearchFilters = () => {
  return (
    <>
      <div className={styles.wrap}>
        {DSearchFiltersDropDown.map((filterDropDown) => (
          <>
            <Dropdown
              key={filterDropDown.title}
              menu={{
                multiple: filterDropDown.isMultiply,
                items: filterDropDown.items,
                selectable: true,
              }}
              trigger={["click"]}
            >
              <Button size="middle">
                <Space>
                  {filterDropDown.title}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </>
        ))}
      </div>
    </>
  );
};
