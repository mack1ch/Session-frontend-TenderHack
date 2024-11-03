"use client";

import { Button, Dropdown, Space } from "antd";
import styles from "./ui.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { DSearchFiltersDropDown } from "../data";

export const SearchFilters = () => {
  return (
    <>
      <div className={styles.wrap}>
        {DSearchFiltersDropDown.map((filterDropDown, index) => (
          <Dropdown
            key={index}
            menu={{
              multiple: filterDropDown.isMultiply,
              items: filterDropDown.items,
              selectable: true,
            }}
            trigger={["click"]}
          >
            <Button key={index} size="middle">
              <Space>
                {filterDropDown.title}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ))}
      </div>
    </>
  );
};
