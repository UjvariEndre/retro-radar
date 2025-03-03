"use client";

import { SelectOptionsModel } from "@/lib/models/ui.models";
import { LucideSlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonPrimary from "../features/RRButton";
import RRInput from "../features/RRInput";
import RRSelect from "../features/RRSelect";

const options: SelectOptionsModel = [
  {
    value: "15",
    title: "15 Results Per Page",
  },
  {
    value: "30",
    title: "30 Results Per Page",
  },
  {
    value: "50",
    title: "50 Results Per Page",
  },
  {
    value: "100",
    title: "100 Results Per Page",
  },
];

interface SearchBarProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onPerPageChange: (value: string) => void;
}

export default function SearchBar({
  keyword,
  setKeyword,
  onPerPageChange,
}: SearchBarProps) {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?query=${encodeURIComponent(keyword)}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-2 flex gap-2">
      <RRInput
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value ?? "")}
        placeholder="Search games..."
      />
      <RRSelect
        options={options}
        onChange={onPerPageChange}
        defaultValue="30"
      />
      <ButtonPrimary type="button" variant="secondary">
        <LucideSlidersHorizontal />
        Filters
      </ButtonPrimary>
    </form>
  );
}
