// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  // Extract the messages from the body of the request
  const { messages } = await req.json()
  console.log(messages)
  // Create an array to store the conversation messages
  const conversation = messages.map((message: any) => ({
    role: message.role,
    content: message.content
  }))

  // Make the API call to DALL-E
  const response = await openai.createImage({
    prompt: conversation[0].content,
    n: 1, // sets the numberof images to generate
    size: "1024x1024",
  })

  // Get the generated image URL from the response
  const imageUrl = response.data.data[0].url

  return imageUrl
}
