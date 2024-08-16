import { Request, Response } from 'express';
import { userListService } from '../services/user.service';

const userListController = async (req: Request, res: Response) => {
  const { page, count } = req.query;
  const pageAux = Number(page)
  const countAux = Number(count)
  const result = await userListService(pageAux, countAux)

  if ('error' in result) {
    return res.status(result.code).json({message: result.error});
  }

  res.status(200).json(result);
}

export { userListController }
