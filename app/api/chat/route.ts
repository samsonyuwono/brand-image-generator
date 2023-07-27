// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(req: Request, response: Response) {
  // Extract the messages from the body of the request
  const { messages } = await req.json()

  // Create an array to store the conversation messages
  const conversation = messages.map((message: any) => ({
    role: message.role,
    content: message.content
  }))
  
  // Make the API call to DALL-E
  const res = await openai.createImage({
    prompt: conversation[0].content,
    n: 1, // sets the numberof images to generate
    size: "1024x1024",
  })

  return new Response(JSON.stringify({ imageUrl: res.data.data[0].url }), {
    headers: { 'Content-Type': 'application/json'}
  });
}
