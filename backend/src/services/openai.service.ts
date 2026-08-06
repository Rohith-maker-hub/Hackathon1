import OpenAI from 'openai';
import { env } from '../config/env';

// Determine which API to use
const useGemini = !env.OPENAI_API_KEY && !!env.GEMINI_API_KEY;

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || env.GEMINI_API_KEY,
  baseURL: useGemini ? 'https://generativelanguage.googleapis.com/v1beta/openai/' : undefined,
});

const defaultModel = useGemini ? 'gemini-1.5-flash' : 'gpt-4o';

class OpenAIService {
  async generateCompletion(prompt: string, systemPrompt?: string) {
    const messages: any[] = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await openai.chat.completions.create({
      model: defaultModel,
      messages,
      temperature: 0.7,
    });
    
    return response.choices[0].message.content;
  }

  async generateStream(prompt: string, systemPrompt?: string) {
    const messages: any[] = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const stream = await openai.chat.completions.create({
      model: defaultModel,
      messages,
      temperature: 0.7,
      stream: true,
    });
    
    return stream;
  }

  async generateStructuredOutput(prompt: string, schema: any, systemPrompt?: string) {
    // Basic function calling or JSON mode implementation
    const messages: any[] = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await openai.chat.completions.create({
      model: defaultModel,
      messages,
      response_format: { type: 'json_object' },
    });
    
    return JSON.parse(response.choices[0].message.content || '{}');
  }
}

export const openaiService = new OpenAIService();
