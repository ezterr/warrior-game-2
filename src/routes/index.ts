import { Router } from 'express';
import { router as warriorRouter } from './warrior.router';
import { router as arenaRouter } from './arena.router';
import { router as rankingRouter } from './ranking.router';

export const router = Router();

router
  .use('/warrior', warriorRouter)
  .use('/arena', arenaRouter)
  .use('/ranking', rankingRouter);

router
  .get('/', (req, res) => res.redirect('/arena'));
