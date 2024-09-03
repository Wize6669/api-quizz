import {Request, Response} from 'express';

import { createQuestionService } from "../services/question.service"

export const createQuestionController = async (req: Request, res: Response) => {
  const { text, justification, answer, categoryId, simulatorId } = req.body;
  const imageUrl = req.file ? req.file.path : undefined;

  const result = await createQuestionService({
    text,
    imageUrl: imageUrl,
    justification,
    answer,
    categoryId,
    simulatorId,
  });

  if ('error' in result) {
    return res.status(result.code).json({ message: result.error });
  }

  res.status(201).json(result);
};
