// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const res = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  })

  return new Response(JSON.stringify({ data: res.data.data[0].url }));
}
