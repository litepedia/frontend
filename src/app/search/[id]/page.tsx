import _ from "lodash";
import React from "react";
import { Metadata } from "next";
import { callGpt } from "@/backend/api";
import "@/styles/search-page.scss";
import { SearchInput } from "@/components/SearchInput";

const getData = async (value: string) => {
  return callGpt(value, value);
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const res = await getData(params.id);

    return { title: res.title, description: res.description };
  } catch (error) {
    return { title: "" };
  }
}

async function Page(searchParams: any) {
  const res = await getData(searchParams.params.id);

  let title = res.title.replaceAll("_", " ");
  title = title[0].toUpperCase() + title.slice(1).toLowerCase();
  return (
    <div className="search-page">
      <SearchInput />
      <div className="container search-page-content">
        <h2 className="search-page-title">{title}</h2>
        <p className="search-page-description">{res.description}</p>
      </div>
    </div>
  );
}

export default Page;
