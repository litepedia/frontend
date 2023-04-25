import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: Request) {
  return NextResponse.json({
    name: `Hello, from ${request.url} I'm now an Edge Function!`,
  });
};
