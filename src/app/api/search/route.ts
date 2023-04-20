import _ from "lodash";
import { NextResponse } from "next/server";

const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.error();
  }
  console.log(`fetching ${process.env.API_URL}litePediaTerm/${id}`);
  
  const res = await fetch(`${process.env.API_URL}/litePediaTerm/${id}`, { cache: 'no-store' });
  //console.log(await res.text());
  
  // const data = await res.text();
  // console.log(JSON.parse(data));
  
  return res;
}
