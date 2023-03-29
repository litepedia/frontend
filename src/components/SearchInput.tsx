"use client";
import { useDebounce } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/Components.module.scss";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import _ from "lodash";
import fetchJsonp from "fetch-jsonp";

export const SearchInput = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");

  const onSubmit = () => {
    if (searchValue) {
     search(searchValue);
    }
  };

  const search = (value: string) => router.push(`/search/${value}`);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInput}>
        <Input onChange={setSearchValue} onSubmit={onSubmit} />
        <SearchResults onSearch={search} searchValue={searchValue} />
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

export const SearchResults = ({
  searchValue,
  onSearch,
}: {
  searchValue: string;
  onSearch: (value: string) => void;
}) => {
  const { data: results } = useQuery(
    ["search-results", searchValue],
    async () => {
      const response = await fetchJsonp(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&prop=pageprops%7Cpageimages%7Cdescription&redirects=&ppprop=displaytitle&piprop=thumbnail&pithumbsize=120&pilimit=6&gpssearch=${encodeURIComponent(
          searchValue
        )}&gpsnamespace=0&gpslimit=6`
      );
      const res = await response.json();
      return _.map(res.query.pages, (page) => ({
        title: page.title,
        description: page.description,
        thumbnail: page.thumbnail,
      }));
    },
    {
      enabled: !!searchValue,
    }
  );

  if (!searchValue || !results?.length) return null;
  return (
    <div className={styles.results}>
      {results?.map((result) => (
        <div
          className={styles.result}
          key={result.title}
          onClick={() => onSearch(result.title.toLowerCase())}
        >
          <p>{result.title}</p>
        </div>
      ))}
    </div>
  );
};
