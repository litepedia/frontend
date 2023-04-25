import _ from "lodash";
import React from "react";
import styles from "@/styles/SearchPage.module.scss";
import { Metadata } from "next";
import { callGpt } from "@/backend/api";


const getData = async (value: string) => {
  return callGpt(value, value);
};


export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const res = await getData(params.id);
    
    return { title: res.title, description: res.description };
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
