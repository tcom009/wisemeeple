import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

const embeddingGenerator = async (prompt: string) => {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: prompt,
    });  
    return response.data[0].embedding
}

export default embeddingGenerator;