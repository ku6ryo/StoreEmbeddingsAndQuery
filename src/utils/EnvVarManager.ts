
class EnvVarManager {

    constructor() {}

    private get(envVarName: string) {
      const v = process.env[envVarName]
      if (!v) {
        throw new Error(`Environment variable ${envVarName} is not set.`)
      }
      return v
    }

    openAISecret() {
      return this.get("OPENAI_SECRET")
    }

    pineconeSecret() {
      return this.get("PINECONE_SECRET")
    }

    pineconeIndex() {
      return this.get("PINECONE_INDEX")
    }

    pineconeEnv() {
      return this.get("PINECONE_ENV")
    }
}

export const envVar = new EnvVarManager()