import _ from "lodash";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : "https://litepedia.netlify.app";

const getData = async (value: string) => {
  console.log({API_URL});
  
  const res = await fetch(`${API_URL}/api/search?id=${value}`);

  return res.json();
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const res = await getData(params.id);

    return { title: res.data.title };
  } catch (error) {
    return {title :''}
  }
}

async function Page(searchParams: any) {
  const res = await getData(searchParams.params.id);

  return (
    <>
    
      <div>{res.data.content}</div>
    </>
  );
}

export default Page;
