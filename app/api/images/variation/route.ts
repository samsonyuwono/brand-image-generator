import { NextResponse } from 'next/server'
import openAI from "../../../utils/openai-api";

export async function GET() {
  const data = { text: 'Variation Images Route' };

  const response = new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });

  return response;
}

export async function POST(req: Request) {
  try {
    /**
     * This is doing by using a remote URL, so this will be extremely slow but do the work so far
     */
    const { url } = await req.json();
    const bufferArray = await fetch(url).then(r => r.arrayBuffer());
    const file: any = Buffer.from(bufferArray);
    file.name = "file.png"

    const res = await openAI.createImageVariation(
      file,
      1, // sets the numberof images to generate
      "512x512", // Default value = 1024x1024
    )

    return new Response(JSON.stringify({ data: res.data.data[0].url }));

  } catch (error: Error | any) {
    if (error.response) {
      console.log(error.response.status, '====>', error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
