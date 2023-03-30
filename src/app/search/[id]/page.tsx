import _ from "lodash";
import React from "react";
import styles from "@/styles/SearchPage.module.scss";

const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : "https://litepedia.netlify.app";

const getData = async (value: string) => {
  console.log({API_URL});
  
  const res = await fetch(`${API_URL}/api/search?id=${value}`);

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
      <div className={styles.content}>
        <p>{res.data.content}</p>
      </div>
    </>
  );
}

export default Page;
