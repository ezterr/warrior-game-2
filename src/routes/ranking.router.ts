import { Router } from 'express';
import { WarriorRecord } from '../records/warrior.record';

export const router = Router();

router
  .get('/', async (req, res) => {
    const warriors = await WarriorRecord.findGivenQuantity(10);

    res.render('ranking', {
      warriors,
    });
  });
