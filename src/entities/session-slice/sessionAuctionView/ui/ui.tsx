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
    <section style={style} className={styles.customerView}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className={styles.infoOfAuctionWrap}>
            {session?.customer?.name && (
              <div className={styles.infoOfAuctionItem}>
                <Link
                  href={`https://zakupki.mos.ru/companyProfile/customer/${session.customer.id}`}
                  target="_blank"
                  className={styles.link}
                >
                  {session.customer.name.toLowerCase()}
                </Link>
              </div>
            )}
            {session?.sharedPurchaseBuyers &&
              Array.isArray(session.sharedPurchaseBuyers) && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  {session?.sharedPurchaseBuyers?.map(
                    (sharedPurchaseBuyer, index) => (
                      <Link
                        href={`https://zakupki.mos.ru/companyProfile/customer/${sharedPurchaseBuyer.id}`}
                        target="_blank"
                        className={styles.link}
                        key={sharedPurchaseBuyer.id}
                      >
                        {sharedPurchaseBuyer.shortName}
                        {session.sharedPurchaseBuyers?.length &&
                        index !== session?.sharedPurchaseBuyers?.length - 1
                          ? ", "
                          : ""}
                      </Link>
                    )
                  )}
                </div>
              )}
            {session?.auctionRegion?.map(
              (auctionRegion) =>
                auctionRegion.name && (
                  <div
                    key={auctionRegion.id}
                    className={styles.infoOfAuctionItem}
                  >
                    <span className={styles.h2__title}>Регион:</span>
                    <h2 className={styles.h2}>
                      {auctionRegion.name.toLowerCase()}
                    </h2>
                  </div>
                )
            )}
            <div className={styles.infoOfAuctionItem}>
              <span className={styles.h2__title}>
                Обеспечение исполнения контракта:
              </span>
              <h2 className={styles.h2}>
                {session?.isContractGuaranteeRequired
                  ? "Требуется"
                  : "Не требуется"}
              </h2>
            </div>
            {session?.isElectronicContractExecutionRequired && (
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>
                  Условия исполнения контракта:
                </span>
                <h2 className={styles.h2}>
                  Обязательное электронное исполнение с использованием УПД
                </h2>
              </div>
            )}
            {session?.isContractGuaranteeRequired && (
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>Размер обеспечения:</span>
                <h2 className={styles.h2}>
                  {session.contractGuaranteeAmount?.toLocaleString(`ru-RU`)}
                </h2>
              </div>
            )}
            {session?.uploadLicenseDocumentsComment && (
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>
                  Наличие сертификатов/лицензий:
                </span>
                <h2 className={styles.h2}>
                  {session.uploadLicenseDocumentsComment.toLowerCase()}
                </h2>
              </div>
            )}
            {session?.contractCost && (
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>
                  Максимальное значение цены контракта:
                </span>
                <h2 className={styles.h2}>
                  {session.contractCost.toLocaleString(`ru-RU`, {
                    style: "currency",
                    currency: "RUB",
                  })}
                </h2>
              </div>
            )}
            {session?.conclusionReasonName && (
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>Причина заключения:</span>
                <h2 className={styles.h2}>
                  {session.conclusionReasonName.toLowerCase()}
                </h2>
              </div>
            )}
            {session?.federalLawName && (
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>
                  Заключение происходит в соответствии с законом:
                </span>
                <h2 className={styles.h2}>{session.federalLawName}</h2>
              </div>
            )}
            {session?.startDate && session?.endDate && (
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>Даты проведения:</span>
                <h2 className={styles.h2}>
                  {session.startDate} по {session.endDate}
                </h2>
              </div>
            )}
            {Array.isArray(files) && files.length > 0 && (
              <div
                style={{ flexDirection: "column" }}
                className={styles.infoOfAuctionItem}
              >
                <span className={styles.h2__title}>Файлы:</span>
                <dt className={styles.column}>
                  {files.map((file, index) => (
                    <Link
                      key={index}
                      className={styles.file}
                      href={file.url}
                      target="_blank"
                    >
                      {file.name}
                    </Link>
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
                  {item.skuId ? (
                    <Link
                      href={`https://zakupki.mos.ru/sku/view/${item.skuId}`}
                      target="_blank"
                      className={styles.link}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <h2 style={{ fontSize: "16px" }}>{item.name}</h2>
                  )}
                  <Descriptions
                    layout="vertical"
                    size="small"
                    title="Информация по оферте"
                  >
                    {item.currentValue && (
                      <Descriptions.Item label="Количество">
                        {item.currentValue}
                      </Descriptions.Item>
                    )}
                    {item.costPerUnit && (
                      <Descriptions.Item label="Цена за ед.">
                        {Number(item.costPerUnit).toLocaleString("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        })}
                      </Descriptions.Item>
                    )}
                    {item.currentValue && item.costPerUnit && (
                      <Descriptions.Item label="Общая стоимость">
                        {(item.costPerUnit * item.currentValue).toLocaleString(
                          "ru-RU",
                          {
                            style: "currency",
                            currency: "RUB",
                          }
                        )}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                  {item.okpdName && (
                    <Descriptions size="small">
                      <Descriptions.Item label="Наименование ОКПД2">
                        {item.okpdName}
                      </Descriptions.Item>
                    </Descriptions>
                  )}
                  <Table
                    style={{ width: "100%" }}
                    pagination={false}
                    columns={TableSpecificationColumns}
                    dataSource={specifications
                      ?.find((spec) => spec.id === item.id)
                      ?.characteristics?.map((char) => ({
                        name: char.name,
                        value: char.value,
                      }))}
                  />
                  <Table
                    style={{ width: "100%" }}
                    pagination={false}
                    columns={TableSpecificationGraphicColumns}
                    dataSource={specifications
                      ?.find((spec) => spec.id === item.id)
                      ?.auctionItemDelivery?.map((delivery) => ({
                        dates:
                          delivery.daysStart && delivery.daysEnd
                            ? `${delivery.daysStart} - ${delivery.daysEnd} дней`
                            : "Отсутствуют",
                        quantity: delivery.quantity.toString(),
                        address: delivery.deliveryAddress,
                        details: delivery.details,
                      }))}
                  />
                </article>
              ))}
            </div>
          ) : (
            activeTabCardValue === "График поставки" && (
              <div
                style={{ overflow: "hidden" }}
                className={styles.graphicsWrap}
              >
                {session?.deliveries?.map((deliver) => (
                  <div key={deliver.id} className={styles.graphicsItem}>
                    <div className={styles.header}>
                      <p>{deliver.deliveryPlace}</p>
                      <p>
                        {deliver.periodDaysFrom} - {deliver.periodDaysTo} дней
                      </p>
                    </div>
                    <Table
                      scroll={{ scrollToFirstRowOnChange: true }}
                      dataSource={deliver.items.map((item) => ({
                        customer: item.buyerId,
                        name: item.name,
                        cost: item.costPerUnit,
                        quantity: item.quantity,
                        sum: item.sum.toLocaleString("ru-RU", {
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
  );
};
