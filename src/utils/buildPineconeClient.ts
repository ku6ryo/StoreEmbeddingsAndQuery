import { PineconeClient } from '@pinecone-database/pinecone'
import { envVar } from './EnvVarManager'

export async function buildPineconeClient() {
  const pinecone = new PineconeClient()
  await pinecone.init({
    apiKey: envVar.pineconeSecret(),
    environment: envVar.pineconeEnv(),
  })
  return pinecone
}