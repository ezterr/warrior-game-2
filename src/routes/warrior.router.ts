import { Router } from 'express';
import { WarriorController } from '../controllers/warrior.controller';

export const router = Router();

router
  .get('/add', WarriorController.addView)
  .get('/:id/edit', WarriorController.editView);

router.route('/')
  .post(WarriorController.add);

router.route('/:id')
  .patch(WarriorController.edit)
  .delete(WarriorController.delete);
