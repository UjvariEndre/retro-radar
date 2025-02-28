"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonPrimary from "../features/ButtonPrimary";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search games..."
        className="rounded-lg border p-2"
      />
      <ButtonPrimary type="submit">Search</ButtonPrimary>
    </form>
  );
}
