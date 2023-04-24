import _ from "lodash";
import { NextResponse } from "next/server";
import { callGpt } from "./api";

const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : "https://litepedia.netlify.app";

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.error();
  }
  // console.log(`fetching ${process.env.API_URL}litePediaTerm/${id}`);
  
  // const res = await fetch(`${process.env.API_URL}/litePediaTerm/${id}`, { cache: 'no-store' });

  let key = id.replaceAll("%20", "_");
  let text = key.replaceAll("_", " ");

  let data = await callGpt(key, text);
  return NextResponse.json(data)
}
