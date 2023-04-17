import "dotenv/config"
import readline from "readline"
import { buildPineconeClient } from "./utils/buildPineconeClient"
import { randomUUID } from "crypto"
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
    const upsertRes = await index.upsert({
      upsertRequest: {
        vectors: [{
          id: randomUUID(),
          values: res,
          metadata: {
            text,
          }
        }]
      }
    })
    console.log(upsertRes)
  }
})()