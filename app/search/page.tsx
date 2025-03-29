import PageContainer from "@/components/layout/PageContainer";
import SearchTable from "@/components/search/SearchTable";
import TitlePrimary from "@/components/text/TitlePrimary";

export default function SearchPage() {
  return (
    <PageContainer>
      <TitlePrimary>Search</TitlePrimary>
      <SearchTable />
    </PageContainer>
  );
}
