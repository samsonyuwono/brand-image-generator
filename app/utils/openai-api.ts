import { Configuration, OpenAIApi } from 'openai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openAI = new OpenAIApi(config)

export default openAI;