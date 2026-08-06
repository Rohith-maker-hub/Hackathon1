import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { openaiService } from '../services/openai.service';

export const chat = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { message, systemPrompt } = req.body;
    const response = await openaiService.generateCompletion(message, systemPrompt);
    res.status(200).json({ status: 'success', data: { response } });
  } catch (error) {
    next(error);
  }
};

export const chatStream = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { message, systemPrompt } = req.body;
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await openaiService.generateStream(message, systemPrompt);
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
    
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    next(error);
  }
};
