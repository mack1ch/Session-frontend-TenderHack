"use client";

import { Button, Dropdown, MenuProps, Skeleton, Space, TreeSelect } from "antd";
import styles from "./ui.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/shared/api";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import {
  setSearchFilterRegions,
  setSearchFilterInitialDuration,
  setSearchFilterHasParticipants,
  setSearchFilterContractGuaranteeRequired,
  setSearchFilterElectronicContractExecutionRequired,
  setSearchFilterProduct,
} from "@/shared/redux/features/filter";
import { DThreeVariants, DTimeOfSessionContinue } from "../data";
import { IAuctionRegion } from "@/shared/interface/auctionById";
import { IProduct } from "@/shared/interface/product";
import { DefaultOptionType } from "antd/es/select";
import { ChangeEventExtra, LegacyDataNode, RawValueType } from "../interface";

export const SearchFilters = () => {
  const dispatch = useAppDispatch();
  const [treeData, setTreeData] = useState<DefaultOptionType[]>([]);
  const searchFilterRegions = useAppSelector((state) => state.filter.regions);
  const { data: regions, isLoading } = useSWR<IAuctionRegion[]>(
    `/auctions/regions/`,
    fetcher
  );
  const { data: products } = useSWR<IProduct[]>(`/auctions/products/`, fetcher);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const initialTreeData = products?.map((product) => ({
        title: product.name,
        value: product.id,
        key: product.id,
        isLeaf: product.isLastLevel,
        children: [],
      }));
      setTreeData(initialTreeData);
    }
  }, [products]);
  const loadData = async (dataNode: LegacyDataNode) => {
    if (dataNode.isLeaf) return;

    const response = await fetcher(
      `/auctions/products/?parentId=${dataNode.key}`
    );
    const children = response.map((child: IProduct) => ({
      title: child.name,
      value: child.id,
      key: child.id,
      isLeaf: child.isLastLevel,
    }));

    const updateTreeData = (
      list: DefaultOptionType[],
      key: React.Key,
      children: DefaultOptionType[]
    ): DefaultOptionType[] => {
      return list.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            children,
          };
        } else if (item.children) {
          return {
            ...item,
            children: updateTreeData(item.children, key, children),
          };
        }
        return item;
      });
    };

    setTreeData((origin) => updateTreeData(origin, dataNode.key, children));
  };

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

  const handleTreeSelectChange = (
    value: string[],
    label: ReactNode,
    extra: ChangeEventExtra
  ) => {
    if (extra && extra.triggerValue && label && value) {
      const path = getPathToNode(extra.triggerValue, treeData);
      dispatch(setSearchFilterProduct(path));
    }
  };

  const getPathToNode = (
    triggerValue: RawValueType,
    tree: DefaultOptionType[]
  ): string => {
    const path: string[] = [];

    const findNode = (
      nodes: DefaultOptionType[],
      currentPath: string[]
    ): boolean => {
      for (const node of nodes) {
        const newPath = [...currentPath, node.value as string];
        if (node.value === triggerValue) {
          path.push(...newPath);
          return true;
        }
        if (node.children && findNode(node.children, newPath)) {
          return true;
        }
      }
      return false;
    };

    findNode(tree, []);
    return "." + path.join(".") + ".";
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

          <TreeSelect
            style={{ minWidth: "180px" }}
            treeData={treeData}
            // @ts-expect-error баг antd
            loadData={loadData}
            dropdownStyle={{ width: "400px" }}
            showSearch
            onChange={handleTreeSelectChange}
            allowClear
            placeholder="Категория продукта"
          />
        </>
      )}
    </div>
  );
};
