import _ from "lodash";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

const getData = async (value: string) => {

  const res = await fetch(`http://localhost:3001/api/search?id=${value}`);

  return res.json();
};

// export async function generateMetadata({ params }: any): Promise<Metadata> {
//   try {
//     const res = await getData(params.id);

//     return { title: res.data.title };
//   } catch (error) {
//     return {title :''}
//   }
// }

async function Page(searchParams: any) {
  const res = await getData(searchParams.params.id);

  return (
    <>
    <Head>
      <title>{res.data.title}</title>
    </Head>
      <div>{res.data.content}</div>
    </>
  );
}

export default Page;
