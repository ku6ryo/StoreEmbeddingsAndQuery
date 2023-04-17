import { buildGptAxiosClient } from "./buildGptAxiosClient"

export async function getEmbeddings(input: string): Promise<number[]> {
  const axios = buildGptAxiosClient()
  const res = await axios.post("/embeddings", JSON.stringify({
    model: "text-embedding-ada-002",
    input,
  }))
  const data = JSON.parse(res.data)
  return data.data[0].embedding as number[]
}