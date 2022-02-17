import { Router } from 'express';
import { ArenaController } from '../controllers/arena.controller';
export const router = Router();
router.route('/')
    .get(ArenaController.arenaView)
    .post(ArenaController.fight);
router
    .post('/random', ArenaController.randomFight);
//# sourceMappingURL=arena.router.js.map