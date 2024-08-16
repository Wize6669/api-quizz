import { Router, Response } from 'express';

const router = Router();

router.get('/', (_, res: Response) => {
  res.status(200).send('API V1.0.0');
});

router.get('/health', (_, res: Response) => {
  res.status(200).send('Healthy');
});

export { router };
