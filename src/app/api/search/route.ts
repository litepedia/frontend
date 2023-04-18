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
  
  const res = await fetch(`${process.env.API_URL}/litePediaTerm/${id}`);

  const data = await res.json();

  return NextResponse.json({ data });
}
