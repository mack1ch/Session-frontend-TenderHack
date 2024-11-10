import styles from "./ui.module.scss";
import { useState, useMemo, useEffect } from "react";
import { QuotationSessionCard } from "@/entities/session-slice/sessionCard";
import useSWR from "swr";
import { fetcher } from "@/shared/api";

import { Empty, Pagination, Result, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { setSessionsArray } from "@/shared/redux/features/sessions";
import {
  clearLoadingAuctionTime,
  setLoadingAuctionTime,
} from "@/shared/redux/features/loadingAuctionTime";
import { SearchInput } from "@/entities/search-slice/searchInput";
import { IFetchAuctions } from "../interface";
import { IHistory } from "@/shared/interface/history";

export const SearchTab = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const loadingTime = useAppSelector((store) => store.loadingTime.time);
  const [startTime, setStartTime] = useState<number | null>(null);
  const searchValue = useAppSelector((state) => state.search.query);
  const searchFilterRegions = useAppSelector((state) => state.filter.regions);
  const initialDuration = useAppSelector(
    (state) => state.filter.initialDuration
  );
  const productionDirectoryPaths = useAppSelector(
    (store) => store.filter.product
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
  const { data: history } = useSWR<IHistory[]>(`/viewed_history/`, fetcher);

  const historyIDs = useMemo(() => {
    return history && Array.isArray(history)
      ? history?.map((historyItem) => historyItem.auctionId)
      : [];
  }, [history]);

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
      productionDirectoryPaths,
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
      productionDirectoryPaths,
    ]
  );

  const {
    data: fetchAuctions,
    error,
    isLoading,
  } = useSWR<IFetchAuctions>(
    `/auctions/?${new URLSearchParams(queryParams).toString()}`,
    fetcher
  );

  useEffect(() => {
    if (isLoading && startTime === null) {
      setStartTime(performance.now());
    }

    if (!isLoading && startTime !== null) {
      const endTime = performance.now();
      dispatch(setLoadingAuctionTime((endTime - startTime) / 1000));
      setStartTime(null);
    }
  }, [isLoading, startTime]);

  useEffect(() => {
    if (fetchAuctions?.items) {
      dispatch(setSessionsArray(fetchAuctions.items));
    }
  }, [fetchAuctions, dispatch]);

  useEffect(() => {
    return () => {
      clearLoadingAuctionTime();
      setStartTime(null);
    };
  }, []);

  const onPageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <>
      <section className={styles.searchTabLayout}>
        <div className={styles.preview}>
          <SearchInput />
        </div>
        {fetchAuctions && fetchAuctions?.count > 0 && (
          <span
            className={styles.statsLabel}
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            Найдено {fetchAuctions?.count.toLocaleString("ru-RU")} за{" "}
            {loadingTime !== null
              ? `${loadingTime.toFixed(2)} сек.`
              : "загрузка..."}
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
              isRead={Boolean(
                historyIDs?.includes(Number(fetchAuction.auctionId))
              )}
              tabItemID="search"
              auction={fetchAuction}
              key={fetchAuction.number}
            />
          ))}

          {fetchAuctions && fetchAuctions.count > 0 ? (
            <Pagination
              hideOnSinglePage
              style={{ marginTop: "16px" }}
              current={currentPage}
              pageSize={pageSize}
              total={fetchAuctions?.count || 0}
              onChange={onPageChange}
              showSizeChanger
            />
          ) : (
            fetchAuctions &&
            fetchAuctions.count === 0 && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Empty />
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};
