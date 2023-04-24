import _ from "lodash";
import React from "react";
import styles from "@/styles/SearchPage.module.scss";
import { Metadata } from "next";

const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : "https://litepedia.netlify.app";

const getData = async (value: string) => {
  console.log(`fetching ${API_URL}/api/search?id=${value.replaceAll("%20", "_")}`);
  
  const res = await fetch(`${API_URL}/api/search?id=${value.replaceAll("%20", "_")}`, { cache: 'no-store' });
  return res.json();
};


export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const res = await getData(params.id);
    
    return { title: res.data.title, description: res.data.description };
  } catch (error) {
    return {title :''}
  }
}

async function Page(searchParams: any) {

  const res = await getData(searchParams.params.id);
  console.log('getData-> res=', res);
  
  return (
    <>
      <div >
        <h2 >{res.title}</h2>
        <p>{res.content}</p>
      </div>
    </>
  );
}

export default Page;
