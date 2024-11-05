"use client";

import { Button, Dropdown, MenuProps, Space } from "antd";
import styles from "./ui.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IRegion } from "@/shared/interface/auction";
import { fetcher } from "@/shared/api";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { setSearchFilterRegions } from "@/shared/redux/features/filter";

export const SearchFilters = () => {
  const dispatch = useAppDispatch();
  const searchFilterRegions = useAppSelector((state) => state.filter.regions);
  const { data: regions } = useSWR<IRegion[]>(`/auctions/regions/`, fetcher);
  const [regionsOptions, setRegionsOptions] = useState<MenuProps["items"]>();

  useEffect(() => {
    if (regions && Array.isArray(regions)) {
      const cityOptions = regions
        .filter((region) => region.name.startsWith("г."))
        .map((region) => ({
          key: region.id,
          label: region.name,
          type: "item" as const,
        }));

      const oblastOptions = regions
        .filter((region) => region.name.startsWith("обл."))
        .map((region) => ({
          key: region.id,
          label: region.name,
          type: "item" as const,
        }));

      const kraiOptions = regions
        .filter((region) => region.name.startsWith("край"))
        .map((region) => ({
          key: region.id,
          label: region.name,
          type: "item" as const,
        }));

      const republicOptions = regions
        .filter((region) => region.name.startsWith("Респ."))
        .map((region) => ({
          key: region.id,
          label: region.name,
          type: "item" as const,
        }));

      const otherOptions = regions
        .filter(
          (region) =>
            !region.name.startsWith("г.") &&
            !region.name.startsWith("обл.") &&
            !region.name.startsWith("край") &&
            !region.name.startsWith("Респ.")
        )
        .map((region) => ({
          key: region.id,
          label: region.name,
          type: "item" as const,
        }));

      setRegionsOptions([
        ...cityOptions,
        { type: "divider" as const },
        ...oblastOptions,
        { type: "divider" as const },
        ...kraiOptions,
        { type: "divider" as const },
        ...republicOptions,
        { type: "divider" as const },
        ...otherOptions,
      ]);
    }
  }, [regions]);

  const handleDropDownRegionClick: MenuProps["onClick"] = (e) => {
    const regionKey = e.key;
    const updatedRegions = (searchFilterRegions ?? []).includes(regionKey)
      ? (searchFilterRegions ?? []).filter((key) => key !== regionKey)
      : [...(searchFilterRegions ?? []), regionKey];

    dispatch(setSearchFilterRegions(updatedRegions));
  };

  return (
    <>
      <div className={styles.wrap}>
        <Dropdown
          autoAdjustOverflow
          menu={{
            multiple: true,
            items: regionsOptions,
            selectable: true,
            onClick: handleDropDownRegionClick,
          }}
          trigger={["click"]}
        >
          <Button size="middle">
            <Space>
              Регион заказчиков
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </>
  );
};
