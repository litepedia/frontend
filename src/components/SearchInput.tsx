"use client";
import { useDebounce, useOnClickOutside } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Components.module.scss";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import _ from "lodash";
import fetchJsonp from "fetch-jsonp";
import { useRouter,  useSearchParams } from "next/navigation";
import Link from "next/link";

export const SearchInput = () => {
  const router = useRouter();
  const params =  useSearchParams();
  
  const [searchValue, setSearchValue] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const ref = useRef<any>();

  
  useOnClickOutside(ref, () => setShowResults(false));

  const onSubmit = () => {
    if (searchValue) {
      search(searchValue);
    }
  };


  const search = (value: string) =>
    router.push(`/search/${value}`, {
      forceOptimisticNavigation: true,
    });


    
  const onSelect = (value: string) => {
    // setShowResults(false);
    search(value);
  };
  

  return (
    <div className={styles.searchContainer} ref={ref}>
      <div className={styles.searchInput}>
        <Input
          
          onFocus={() => setShowResults(true)}
          onChange={setSearchValue}
          onSubmit={onSubmit}
        />
        {showResults && (
          <SearchResults
            onSelect={onSelect}
            searchValue={searchValue}
          />
        )}
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
  onFocus,
  initialValue = '',
}: {
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFocus: () => void;
  initialValue?: string;
}) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, value ? 300 : 0);

  useEffect(() => {
   setValue(initialValue);
  }, [initialValue]);
  

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
      onFocus={onFocus}
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
  onSelect,
}: {
  searchValue: string;
  onSelect: (value: string) => void;
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
      staleTime: Infinity,
    }
  );

  if (!searchValue || !results?.length) return null;
  return (
    <div className={styles.results}>
      {results?.map((result) => (
        <Link
          className={styles.result}
          key={result.title}
          href={`/nextjs/search/${result.title.toLowerCase()}`}
          prefetch={false}
          shallow={false}
        >
          <p>{result.title}</p>
        </Link>
      ))}
    </div>
  );
};
