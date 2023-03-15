// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.listEngines()
  res.status(200).json(response.data)
}
