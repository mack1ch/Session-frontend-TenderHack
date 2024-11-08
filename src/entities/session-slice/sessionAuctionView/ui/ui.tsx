import { CSSProperties, useState } from "react";
import styles from "./ui.module.scss";
import {
  IAuctionDetail,
  IFile,
  ISpecification,
} from "@/shared/interface/auctionById";
import { Descriptions, Segmented, Skeleton, Table } from "antd";
import Link from "next/link";
import {
  TableGraphicsColumns,
  TableSpecificationColumns,
  TableSpecificationGraphicColumns,
} from "../data";

export const SessionAuctionView = ({
  session,
  style,
  isLoading,
  files,
  specifications,
}: {
  session?: IAuctionDetail;
  style?: CSSProperties;
  isLoading: boolean;
  files?: IFile[];
  specifications?: ISpecification[];
}) => {
  const [activeTabCardValue, setActiveTabCardValue] = useState<
    "Спецификация" | "График поставки"
  >("Спецификация");

  return (
    <>
      <section style={style} className={styles.customerView}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <div className={styles.infoOfAuctionWrap}>
              <div className={styles.infoOfAuctionItem}>
                <h2 className={styles.h2_withFirstLetterUpperCase}>
                  {session?.customer?.name?.toLowerCase()}
                </h2>
              </div>
              {session?.auctionRegion?.map((auctionRegion) => (
                <div
                  key={auctionRegion.id}
                  className={styles.infoOfAuctionItem}
                >
                  <span className={styles.h2__title}>Регион:</span>{" "}
                  <h2 className={styles.h2}>
                    {auctionRegion?.name?.toLowerCase()}
                  </h2>
                </div>
              ))}
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>
                  Условия исполнения контракта:
                </span>{" "}
                <h2 className={styles.h2}></h2>
              </div>
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>
                  Обеспечение исполнения контракта:
                </span>{" "}
                <h2 className={styles.h2}></h2>
              </div>
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>Причина заключения:</span>{" "}
                <h2 className={styles.h2}>
                  {session?.conclusionReasonName?.toLowerCase()}
                </h2>
              </div>
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>
                  Заключение происходит в соответствии с законом:
                </span>{" "}
                <h2 className={styles.h2}>{session?.federalLawName}</h2>
              </div>
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>Даты проведения:</span>{" "}
                <h2 className={styles.h2}>
                  {session?.startDate} по {session?.endDate}
                </h2>
              </div>
              {Array.isArray(files) && (
                <div
                  style={{ flexDirection: "column" }}
                  className={styles.infoOfAuctionItem}
                >
                  <span className={styles.h2__title}>Файлы:</span>{" "}
                  <dt className={styles.column}>
                    {files?.map((file, index) => (
                      <>
                        <Link
                          key={index}
                          className={styles.file}
                          href={file.url}
                          target="_blank"
                        >
                          {file.name}
                        </Link>{" "}
                      </>
                    ))}
                  </dt>
                </div>
              )}
            </div>
            <Segmented
              value={activeTabCardValue}
              size="large"
              style={{ width: "100%" }}
              options={["Спецификация", "График поставки"]}
              onChange={(value: "Спецификация" | "График поставки") => {
                setActiveTabCardValue(value);
              }}
            />
            {activeTabCardValue === "Спецификация" ? (
              <div className={styles.lots}>
                {session?.items?.map((item) => (
                  <article className={styles.itemCard} key={item.id}>
                    <h4 className={styles.h4}>{item.name}</h4>
                    <Descriptions
                      layout="vertical"
                      size="small"
                      title="Информация по оферте"
                    >
                      <Descriptions.Item label="Количество">
                        {item.currentValue}
                      </Descriptions.Item>
                      <Descriptions.Item label="Цена за ед.">
                        {Number(item.costPerUnit).toLocaleString(`ru-RU`, {
                          style: "currency",
                          currency: "RUB",
                        })}
                      </Descriptions.Item>
                      <Descriptions.Item label="Общая стоимость">
                        {(item.costPerUnit * item.currentValue).toLocaleString(
                          `ru-RU`,
                          {
                            style: "currency",
                            currency: "RUB",
                          }
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions size="small">
                      <Descriptions.Item label="Наименование ОКПД2">
                        {item.okpdName}
                      </Descriptions.Item>
                    </Descriptions>
                    <Table
                      style={{ width: "100%" }}
                      pagination={false}
                      columns={TableSpecificationColumns}
                      dataSource={specifications
                        ?.find((specification) => specification.id === item.id)
                        ?.characteristics.map((characteristic) => ({
                          name: characteristic.name,
                          value: characteristic.value,
                        }))}
                    />
                    <Table
                      style={{ width: "100%" }}
                      pagination={false}
                      columns={TableSpecificationGraphicColumns}
                      dataSource={specifications
                        ?.find((specification) => specification.id === item.id)
                        ?.auctionItemDelivery.map((characteristic) => ({
                          dates:
                            characteristic.daysStart +
                            " - " +
                            characteristic.daysEnd +
                            " дней",
                          quantity: characteristic.quantity.toString(),
                          address: characteristic.deliveryAddress,
                          details: characteristic.details,
                        }))}
                    />
                  </article>
                ))}
              </div>
            ) : (
              activeTabCardValue === "График поставки" && (
                <div className={styles.graphicsWrap}>
                  {session?.deliveries.map((deliver) => (
                    <div key={deliver.id} className={styles.graphicsItem}>
                      <div className={styles.header}>
                        <p>{deliver.deliveryPlace}</p>
                        <p>
                          {deliver.periodDaysFrom} - {deliver.periodDaysTo} дней
                        </p>
                      </div>

                      <Table
                        dataSource={deliver.items.map((item) => ({
                          customer: item.buyerId,
                          name: item.name,
                          cost: item.costPerUnit,
                          quantity: item.quantity,
                          sum: item.sum.toLocaleString(`ru-RU`, {
                            style: "currency",
                            currency: "RUB",
                          }),
                        }))}
                        columns={TableGraphicsColumns}
                        pagination={false}
                        style={{ width: "100%" }}
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        )}
      </section>
    </>
  );
};
