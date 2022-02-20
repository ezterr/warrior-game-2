import { Router } from 'express';
import { WarriorController } from '../controllers/warrior.controller';
export const router = Router();
router
    .get('/add', WarriorController.addView)
    .post('/', WarriorController.add);
//# sourceMappingURL=warrior.router.js.map