"use client";

import { Checkbox, Divider, message, Skeleton, Tooltip } from "antd";
import styles from "./ui.module.scss";
import useSWR from "swr";
import { ISetting } from "@/shared/interface/settings";
import { fetcher } from "@/shared/api";
import { changeSessionUnPublishFilterValue } from "../api";
import { useEffect, useState } from "react";

export const SessionsUnPublishFilters = () => {
  const { data: fetchSettings, isLoading } = useSWR<ISetting[]>(
    `/settings/`,
    fetcher
  );

  const [checkedValues, setCheckedValues] = useState<ISetting[] | undefined>(
    fetchSettings
  );

  useEffect(() => {
    if (fetchSettings) {
      setCheckedValues(fetchSettings);
    }
  }, [fetchSettings]);

  const changeCheckBoxValue = async (arg: boolean, id: number) => {
    const res = await changeSessionUnPublishFilterValue(id, !arg);
    if (res) {
      setCheckedValues((prev) => [
        ...(prev?.filter((prevItem) => prevItem.id !== id) ?? []),
        res,
      ]);
      message.success("Фильтр успешно применён");
    }
  };

  const renderCheckbox = (setting: ISetting) =>
    setting.description ? (
      <Tooltip
        key={setting.id}
        placement="bottomRight"
        title={setting.description}
      >
        <Checkbox
          onChange={() => changeCheckBoxValue(setting.value, setting.id)}
          value={setting.value}
          checked={setting.value}
        >
          {setting.title}
        </Checkbox>
      </Tooltip>
    ) : (
      <Checkbox
        key={setting.id}
        onChange={() => changeCheckBoxValue(setting.value, setting.id)}
        value={setting.value}
        checked={setting.value}
      >
        {setting.title}
      </Checkbox>
    );

  return (
    <>
      <section className={styles.filtersLayout}>
        <h2 className={styles.h2}>Фильтры для проверки</h2>
        <div className={styles.filters}>
          {isLoading ? (
            <>
              <Skeleton.Input active style={{ width: "100%" }} block />
              <Skeleton.Input active style={{ width: "100%" }} block />
              <Skeleton.Input active style={{ width: "100%" }} block />
              <Skeleton.Input active style={{ width: "100%" }} block />
              <Skeleton.Input active style={{ width: "100%" }} block />
              <Skeleton.Input active style={{ width: "100%" }} block />
              <Skeleton.Input active style={{ width: "100%" }} block />
            </>
          ) : (
            <>
              {Array.isArray(checkedValues) && (
                <>
                  {/* Рендер чекбоксов с типом "main" */}
                  {checkedValues
                    .filter((setting) => setting.type === "main")
                    .sort((a, b) => a.id - b.id)
                    .map(renderCheckbox)}

                  {/* Разделитель */}
                  <Divider style={{ margin: "8px 0" }} />

                  {/* Рендер чекбоксов с типом "other" */}
                  {checkedValues
                    .filter((setting) => setting.type === "other")
                    .sort((a, b) => a.id - b.id)
                    .map(renderCheckbox)}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
