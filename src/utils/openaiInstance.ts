import OpenAI from "openai";

const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openaiInstance = new OpenAI({
    apiKey: openAiApiKey,
    dangerouslyAllowBrowser: true 
});