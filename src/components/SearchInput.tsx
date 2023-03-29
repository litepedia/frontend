"use client"
import { useDebounce } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/Components.module.scss";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";

export const SearchInput = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");

  const onSubmit = () => {
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInput}>
        <Input onChange={setSearchValue} onSubmit={onSubmit} />
        <SearchResults searchValue={searchValue} />
      </div>
      <button className={styles.searchButton} onClick={onSubmit}>
        <FiSearch style={{ width: 20, height: 20 }} />
      </button>
    </div>
  );
};

export const Input = ({
  onChange,
  onSubmit,
}: {
  onChange: (value: string) => void;
  onSubmit: () => void;
}) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      onSubmit();
    }
  };

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <input
      className={styles.input}
      placeholder="Search"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};



export const SearchResults = ({ searchValue }: { searchValue: string }) => {
  const { data: results } = useQuery(["search-results", searchValue], () => {
    return [1, 2, 3];
  });

  if (!searchValue || !results?.length) return null;
  return (
    <div className={styles.results}>
      {results?.map((result) => (
        <div className={styles.result} key={result}>
          {result}
        </div>
      ))}
    </div>
  );
};
