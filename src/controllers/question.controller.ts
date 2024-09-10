import {Request, Response} from 'express';

import { createQuestionService } from "../services/question.service"

export const createQuestionController = async (req: Request, res: Response) => {
  const { statement, justification, answer, categoryId, simulatorId } = req.body;
  const imageName = req.file ? req.file.path : undefined;

  const result = await createQuestionService({
    statement,
    imageName: imageName,
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
