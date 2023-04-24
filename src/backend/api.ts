import { Configuration, OpenAIApi } from "openai";
import { getCachedContent, setCachedContent } from "./cache";
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
const BASE_QUESTION = process.env.GPT_QUESTION || 'explain to a first grader this paragraph in no longer than four sentences \n';

export async function callGpt(key: string, text: string) {
    try { 

        const cachedResponse = await getCachedContent(key);
        if (cachedResponse) {
            console.log(`cache:Hit for ${key}`);
            
            return cachedResponse;
        }
    } catch(e:any) {
        console.error(e);
    }

    console.log(`cache:Miss fetching ${key}`);
    
    const messages = [
        { role: "user", content: `${BASE_QUESTION} ${text}` }
    ];
    const response = await openai.createChatCompletion({
        //@ts-ignore
        messages,
        model: process.env.GPT_MODEL || "gpt-3.5-turbo",
    });
    const botMessage = response.data.choices[0].message;
    if (botMessage && botMessage.content) {
        await setCachedContent(key, {title: key, description: botMessage.content});
    }
    return  { 
        title: key,
        description: botMessage?.content
    }
}
