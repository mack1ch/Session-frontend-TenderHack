"use client";

import { SessionsUnPublishFilters } from "@/features/search-slice/sessionsUnPublishFilters";
import { AppLayout } from "@/shared/layout/appLayout/ui/ui";
import { MainTab } from "@/widgets/search-slice/searchTab";

export default function Home() {
  return (
    <>
      <AppLayout style={{ gap: "48px", justifyContent: "space-between" }}>
        <SessionsUnPublishFilters />
        <MainTab />
      </AppLayout>
    </>
  );
}
