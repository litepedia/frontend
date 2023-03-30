import { NextResponse } from "next/server";

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
    console.log({ id });

  if (!id) {
    return NextResponse.error();
  }

  const res = await fetch(`${process.env.API_URL}/litePediaTerm/${id}`);

  const data = await res.json();

  return NextResponse.json({ data });
}
