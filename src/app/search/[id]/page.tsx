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
  
  let title = res.title.replaceAll("_", " ")
  title = title[0].toUpperCase() + title.slice(1).toLowerCase();
  return (
    <>
      <div >
        <h2 >{title}</h2>
        <br />
        <p>{res.description}</p>
      </div>
    </>
  );
}

export default Page;
