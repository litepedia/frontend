
import { SearchInput } from "@/components/SearchInput";
import React from "react";

const getData = async (value: string) => {
  
  const response = await fetch(`${process.env.API_URL}/wiki/${value}`);

  const la = await response.text();
  if (la.indexOf("An error occurred while scraping the content.") > 0) {
    throw new Error("An error occurred while scraping the content.");
  }
  return la;
};

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
