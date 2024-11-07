"use client";

import { Button, Dropdown, MenuProps, Skeleton, Space } from "antd";
import styles from "./ui.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/shared/api";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import {
  setSearchFilterRegions,
  setSearchFilterInitialDuration,
  setSearchFilterHasParticipants,
  setSearchFilterContractGuaranteeRequired,
  setSearchFilterElectronicContractExecutionRequired,
} from "@/shared/redux/features/filter";
import { DThreeVariants, DTimeOfSessionContinue } from "../data";
import { IAuctionRegion } from "@/shared/interface/auctionById";

export const SearchFilters = () => {
  const dispatch = useAppDispatch();
  const searchFilterRegions = useAppSelector((state) => state.filter.regions);
  const { data: regions, isLoading } = useSWR<IAuctionRegion[]>(
    `/auctions/regions/`,
    fetcher
  );

  const regionsOptionsMemo: MenuProps["items"] = useMemo(() => {
    if (regions && Array.isArray(regions)) {
      return regions.map((region) => ({
        label: region.name,
        key: region.id,
      }));
    }

    return [];
  }, [regions]);

  const handleDropDownRegionClick: MenuProps["onClick"] = (e) => {
    const regionKey = e.key;
    const currentRegions = searchFilterRegions ?? [];

    const updatedRegions = currentRegions.includes(regionKey)
      ? currentRegions.filter((key) => key !== regionKey)
      : [...currentRegions, regionKey];

    dispatch(setSearchFilterRegions(updatedRegions));
  };

  const handleDropDownInitialDurationClick: MenuProps["onClick"] = (e) => {
    dispatch(setSearchFilterInitialDuration(e.key));
  };

  const handleDropDownHasParticipantsClick: MenuProps["onClick"] = (e) => {
    dispatch(setSearchFilterHasParticipants(e.key));
  };

  const handleDropDownContractGuaranteeRequiredClick: MenuProps["onClick"] = (
    e
  ) => {
    dispatch(setSearchFilterContractGuaranteeRequired(e.key));
  };

  const handleDropDownElectronicContractExecutionRequiredClick: MenuProps["onClick"] =
    (e) => {
      dispatch(setSearchFilterElectronicContractExecutionRequired(e.key));
    };

  return (
    <div className={styles.wrap}>
      {isLoading ? (
        <>
          <Skeleton.Button active={isLoading} style={{ width: 160 }} />
          <Skeleton.Button active={isLoading} style={{ width: 160 }} />
          <Skeleton.Button active={isLoading} style={{ width: 160 }} />
          <Skeleton.Button active={isLoading} style={{ width: 160 }} />
          <Skeleton.Button active={isLoading} style={{ width: 160 }} />
          <Skeleton.Button active={isLoading} style={{ width: 160 }} />
        </>
      ) : (
        <>
          <Dropdown
            autoAdjustOverflow
            menu={{
              multiple: true,
              items: regionsOptionsMemo,
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
          <Dropdown
            autoAdjustOverflow
            menu={{
              items: DTimeOfSessionContinue,
              selectable: true,
              onClick: handleDropDownInitialDurationClick,
            }}
            trigger={["click"]}
          >
            <Button size="middle">
              <Space>
                Время проведения котировочной сессии
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown
            autoAdjustOverflow
            menu={{
              items: DThreeVariants,
              selectable: true,
              onClick: handleDropDownHasParticipantsClick,
            }}
            trigger={["click"]}
          >
            <Button size="middle">
              <Space>
                Наличие ставок
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown
            autoAdjustOverflow
            menu={{
              items: DThreeVariants,
              selectable: true,
              onClick: handleDropDownElectronicContractExecutionRequiredClick,
            }}
            trigger={["click"]}
          >
            <Button size="middle">
              <Space>
                Электронное исполнение
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown
            autoAdjustOverflow
            menu={{
              items: DThreeVariants,
              selectable: true,
              onClick: handleDropDownContractGuaranteeRequiredClick,
            }}
            trigger={["click"]}
          >
            <Button size="middle">
              <Space>
                Обеспечения контракта
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </>
      )}
    </div>
  );
};
