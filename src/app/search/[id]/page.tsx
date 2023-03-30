
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

  const la = await response.json();

  return la;
};

export async function generateMetadata({ params }: any): Promise<Metadata> {

  const res = await getData(params.id);
  console.log(res);
  
  
  return { title: res.title };
}

async function Page(searchParams: any) {
  const res = await getData(searchParams.params.id);

  return (
    <div>
      <SearchInput />
      <div>{res.content}</div>
    </div>
  );
}

export default Page;
