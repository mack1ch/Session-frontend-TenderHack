"use client";

import { SessionsUnPublishFilters } from "@/features/search-slice/sessionsUnPublishFilters";
import { AppLayout } from "@/shared/layout/appLayout/ui/ui";
import { MainTab } from "@/widgets/search-slice/searchTab";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const activeTabItem = searchParams.get("activeTabItem");
  return (
    <>
      <AppLayout style={{ gap: "48px", justifyContent: "space-between" }}>
        <SessionsUnPublishFilters />
        <MainTab activeTabItem={activeTabItem} />
      </AppLayout>
    </>
  );
}
