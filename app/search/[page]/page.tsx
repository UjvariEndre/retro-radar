import PageContainer from "@/components/layout/PageContainer";
import TitlePrimary from "@/components/text/TitlePrimary";
import { notFound } from "next/navigation";

interface SearchPageParams {
  params: {
    page: string;
  };
}

export default async function SearchPage({ params }: SearchPageParams) {
  const page = Number(params.page) || 1;

  if (page < 1) return notFound();

  return (
    <PageContainer>
      <TitlePrimary>Search {page}</TitlePrimary>
    </PageContainer>
  );
}
