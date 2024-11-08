"use client";

import { SessionAnalyticsView } from "@/entities/session-slice/sessionAnalyticsView";
import { SessionAuctionView } from "@/entities/session-slice/sessionAuctionView";
import { SessionViewHeader } from "@/entities/session-slice/sessionViewHeader";
import { fetcher } from "@/shared/api";
import {
  IAuctionDetail,
  IFile,
  ISpecification,
} from "@/shared/interface/auctionById";
import { AppLayout } from "@/shared/layout/appLayout/ui/ui";
import { Breadcrumb, Divider } from "antd";
import Link from "next/link";
import useSWR from "swr";

export default function Home({ params }: { params: { id: number } }) {
  const { data: fetchAuction, isLoading } = useSWR<IAuctionDetail>(
    params.id ? `/auctions/${params.id}/` : ``,
    fetcher
  );
  const { data: fetchFiles } = useSWR<IFile[]>(
    fetchAuction?.id ? `/auctions/${fetchAuction.id}/files/` : "",
    fetcher
  );
  const { data: fetchSpecifications } = useSWR<ISpecification[]>(
    fetchAuction?.id ? `/auctions/${fetchAuction.id}/specifications/` : "",
    fetcher
  );
  return (
    <>
      <AppLayout
        style={{
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Breadcrumb
          items={[
            {
              title: <Link href="/">Закупки</Link>,
            },
            {
              title: (
                <>
                  {params.id} ({fetchAuction?.state?.name})
                </>
              ),
            },
          ]}
        />
        <Divider />
        <SessionViewHeader isLoading={isLoading} session={fetchAuction} />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "32px",
            marginTop: "24px",
          }}
        >
          <SessionAuctionView
            specifications={fetchSpecifications}
            files={fetchFiles}
            isLoading={isLoading}
            style={{ width: "48%" }}
            session={fetchAuction}
          />
          <SessionAnalyticsView
            style={{ width: "51%" }}
            session={fetchAuction}
          />
        </div>
      </AppLayout>
    </>
  );
}
