import { Request, Response } from 'express';
import { signUpService } from '../services/auth.service';

const signUpController = async (req: Request, res: Response) => {
  const { name, lastName, email, password, roleId } = req.body;
  const result = await signUpService(name, lastName, email, password, roleId)

  if ('error' in result) {
    return res.status(400).json({message: result.error});
  }
  res.status(201).json({message: 'User created successfully'});
}

export { signUpController }
