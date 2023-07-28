import { NextResponse } from 'next/server'
import openAI from "../../../utils/openai-api";

export async function GET() {
  const data = { text: 'Generate Route' };
  return NextResponse.json(data);
}

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const res = await openAI.createImage({
      prompt: prompt,
      n: 1, // sets the numberof images to generate
      size: "512x512", // Default value = 1024x1024
    })
    
    return NextResponse.json({ result: res.data.data[0].url });
}
