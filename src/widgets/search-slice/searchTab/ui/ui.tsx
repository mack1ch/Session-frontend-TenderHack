import styles from "./ui.module.scss";
import { TabItem } from "../tabItem";
import { DSearchTabItems } from "../data";
import { useState } from "react";
import { QuotationSessionCard } from "@/entities/quotationSession-slice/quotationSessionCard";
import useSWR from "swr";
import { fetcher } from "@/shared/api";
import { IFetchAuctions } from "../interface";
import { Pagination, Result, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { setSessionsArray } from "@/shared/redux/features/sessions";
import { useMemo, useEffect } from "react";

export const SearchTab = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const searchValue = useAppSelector((state) => state.search.query);
  const searchFilterRegions = useAppSelector((state) => state.filter.regions);
  const initialDuration = useAppSelector(
    (state) => state.filter.initialDuration
  );
  const hasParticipants = useAppSelector(
    (state) => state.filter.hasParticipants
  );
  const isContractGuaranteeRequired = useAppSelector(
    (state) => state.filter.isContractGuaranteeRequired
  );
  const isElectronicContractExecutionRequired = useAppSelector(
    (state) => state.filter.isElectronicContractExecutionRequired
  );

  const [fetchDuration, setFetchDuration] = useState<number | null>(null); // Состояние для времени

  const queryParams = useMemo(
    () => ({
      take: String(pageSize),
      skip: String(pageSize * (currentPage - 1)),
      search: searchValue.toString(),
      region_paths: searchFilterRegions?.join(",") || "",
      initialDuration,
      hasParticipants,
      isContractGuaranteeRequired,
      isElectronicContractExecutionRequired,
    }),
    [
      searchValue,
      searchFilterRegions,
      initialDuration,
      hasParticipants,
      pageSize,
      currentPage,
      isContractGuaranteeRequired,
      isElectronicContractExecutionRequired,
    ]
  );

  const {
    data: fetchAuctions,
    error,
    isLoading,
  } = useSWR<IFetchAuctions>(
    `/auctions/?${new URLSearchParams(queryParams).toString()}`,
    fetcher,
    {
      onSuccess: () => {
        const endTime = performance.now(); // Получаем время окончания запроса
        setFetchDuration((endTime - startTime) / 1000); // Вычисляем время в секундах
      },
    }
  );

  const startTime = performance.now(); // Время начала запроса

  useEffect(() => {
    if (fetchAuctions?.items) {
      dispatch(setSessionsArray(fetchAuctions.items));
    }
  }, [fetchAuctions, dispatch]);

  const [activeTabValue, setActiveTabValue] = useState<string>(
    DSearchTabItems[0].value
  );

  const getContentForTab = () => {
    const activeTab = DSearchTabItems.find(
      (tabItem) => tabItem.value === activeTabValue
    );
    return activeTab ? activeTab.content : null;
  };

  const onPageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <>
      <section className={styles.searchTabLayout}>
        <h1 className={styles.h1}>Недобросовестные сессии</h1>
        <header className={styles.tags}>
          {DSearchTabItems.map((tabItem, index) => (
            <TabItem
              style={{
                background:
                  activeTabValue === tabItem.value ? "#DB2B21" : undefined,
                color: activeTabValue === tabItem.value ? "#fff" : undefined,
              }}
              onClick={() => setActiveTabValue(tabItem.value)}
              tabItem={tabItem}
              key={index}
            />
          ))}
        </header>
        <div className={styles.preview}>{getContentForTab()}</div>
        {fetchAuctions && fetchAuctions?.count > 0 && (
          <span
            className={styles.statsLabel}
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            Найдено {fetchAuctions?.count.toLocaleString("ru-RU")} за{" "}
            {fetchDuration ? fetchDuration.toFixed(2) : "0.00"} сек.
          </span>
        )}
        <div className={styles.cardWrap}>
          {error && (
            <Result
              status="error"
              title="Ошибка на сервере"
              subTitle="Обратитесь к разработчику и поменяйте настройки"
            />
          )}
          {isLoading && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          )}

          {fetchAuctions?.items?.map((fetchAuction) => (
            <QuotationSessionCard
              auction={fetchAuction}
              key={fetchAuction.number}
            />
          ))}

          {fetchAuctions && fetchAuctions.count > 0 && (
            <Pagination
              style={{ marginTop: "16px" }}
              current={currentPage}
              pageSize={pageSize}
              total={fetchAuctions?.count || 0}
              onChange={onPageChange}
              showSizeChanger
            />
          )}
        </div>
      </section>
    </>
  );
};
