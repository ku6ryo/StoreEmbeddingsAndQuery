import "dotenv/config"
import readline from "readline"
import { buildPineconeClient } from "./utils/buildPineconeClient"
import { getEmbeddings } from "./utils/getEmbeddings"
import { envVar } from "./utils/EnvVarManager"

;(async () => {
  const pinecone = await buildPineconeClient()
  const indexName = envVar.pineconeIndex()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  while(true) {
    const text = await new Promise<string>((resolve) => {
      rl.question("input: ", function(input) {
        resolve(input)
      })
    })
    const res = await getEmbeddings(text)
    const index = pinecone.Index(indexName)
    const queryRes = await index.query({
      queryRequest: {
        vector: res,
        topK: 10,
        includeValues: true,
        includeMetadata: true,
      }
    })
    const { matches } = queryRes
    if (!matches || matches.length == 0) {
      console.log("No matches found.")
    } else {
      for (const match of matches) {
        console.log((match.metadata as any).text)
      }
    }
  }
})()