"use client";
import { useDebounce, useOnClickOutside } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import _ from "lodash";
import fetchJsonp from "fetch-jsonp";
import { useRouter, useParams } from "next/navigation";

export const SearchInput = () => {
  const router = useRouter();
  const idParam = useParams().id;

  const [searchValue, setSearchValue] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const ref = useRef<any>();

  useOnClickOutside(ref, () => setShowResults(false));

  useEffect(() => {
    if (idParam) {
      setSearchValue(idParam.replaceAll("_", " "));
    }
  }, [idParam]);

  const search = (value: string) => {
    if (!value) return;
    setSearchValue(value.toLowerCase());
    router.push(`/search/${formatTerm(value.toLowerCase())}`, {
      forceOptimisticNavigation: true,
    });
  };

  return (
    <div className="search" ref={ref}>
      <div className="inputContainer">
        <Input
          onFocus={() => setShowResults(true)}
          onChange={setSearchValue}
          onSubmit={search}
          initialValue={searchValue}
        />
        {showResults && (
          <SearchResults
            onClose={() => setShowResults(false)}
            onSelect={search}
            searchValue={searchValue}
          />
        )}
      </div>
      <button className="searchButton" onClick={() => search(searchValue)}>
        <FiSearch style={{ width: 20, height: 20 }} />
      </button>
    </div>
  );
};

export const Input = ({
  onChange,
  onSubmit,
  onFocus,
  initialValue = "",
}: {
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
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
      onSubmit(value);
    }
  };

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <input
      onFocus={onFocus}
      className="input"
      placeholder="Insert a search term"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

function formatTerm(term: string) {
  return term.replace(/ /g, "_");
}

export const SearchResults = ({
  searchValue,
  onSelect,
  onClose,
}: {
  searchValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}) => {
  const { data: results } = useWikiSearch(searchValue);

  console.log(results);

  if (!searchValue || !results?.length) return null;
  return (
    <div className="results">
      {results?.map((result) => (
        <button
          className="result"
          key={result.title}
          onClick={() => {
            onSelect(result.title);
            onClose();
          }}
        >
          {result.thumbnail ? (
            <img className="resultImg" src={result.thumbnail.source} />
          ) : (
            <div className="resultImg" />
          )}
          <div className="resultContent">
            <p className="resultContentTitle">{result.title}</p>
            <p className="resultContentDescription">{result.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

const useWikiSearch = (searchValue: string) => {
  return useQuery(
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
};
