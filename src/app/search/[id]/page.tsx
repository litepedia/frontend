
import { SearchInput } from "@/components/SearchInput";
import _ from "lodash";
import { Metadata } from "next";
import React from "react";

const getData = async (value: string) => {

const encoded = decodeURIComponent(value).split(" ").join("_");
      const url = `${process.env.API_URL}/litePediaTerm/${encodeURIComponent(
        encoded
      )}`;
      console.log(encoded);
      
  const response = await fetch(url);

  const la = await response.text();
  if (la.indexOf("An error occurred while scraping the content.") > 0) {
    throw new Error("An error occurred while scraping the content.");
  }
  return la;
};

export async function generateMetadata({ params }: any): Promise<Metadata> {

  const res = await getData(params.id);
  
  return { title: '' };
}

async function Page(searchParams: any) {
  const res = await getData(searchParams.params.id);

  return (
    <div>
      <SearchInput />
      <div dangerouslySetInnerHTML={{ __html: res }}></div>
    </div>
  );
}

export default Page;
