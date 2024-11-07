"use client";

import { SessionsUnPublishFilters } from "@/features/search-slice/sessionsUnPublishFilters";
import { AppLayout } from "@/shared/layout/appLayout/ui/ui";
import { SearchTab } from "@/widgets/search-slice/searchTab";

export default function Home() {
  return (
    <>
      <AppLayout style={{ gap: "48px", justifyContent: "space-between" }}>
        <SessionsUnPublishFilters />
        <SearchTab  />
      </AppLayout>
    </>
  );
}
