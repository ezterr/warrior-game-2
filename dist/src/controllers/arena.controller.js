var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WarriorRecord } from '../records/warrior.record';
import { Arena } from '../utils/arena';
import { ArenaValidationError, NotFoundError } from '../utils/handle-error';
export class ArenaController {
    static arenaView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const warriors = yield WarriorRecord.findAll();
            res.render('arena', {
                warriors,
                pageTitle: 'Arena - Warrior Game',
                styles: ['style.css', 'arena.style.css'],
            });
        });
    }
    static fight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { warriorOne: warriorOneId, warriorTwo: warriorTwoId } = req.body;
            if (!warriorOneId || !warriorTwoId)
                throw new ArenaValidationError('You must select warriors');
            if (warriorOneId === warriorTwoId)
                throw new ArenaValidationError('Warrior must be unique');
            const warriorOne = yield WarriorRecord.findById(warriorOneId);
            const warriorTwo = yield WarriorRecord.findById(warriorTwoId);
            if (!warriorOne || !warriorTwo)
                throw new NotFoundError('Warrior not found');
            const arena = new Arena(warriorOne, warriorTwo);
            const fightLogs = arena.fight();
            res.render('arena/result', {
                fightLogs,
                warriorOne,
                warriorTwo,
                winner: fightLogs[fightLogs.length - 1].attacker,
                pageTitle: `Walka ${warriorOne.name} vs ${warriorTwo.name} - Warrior Game`,
                styles: ['style.css', 'fight-result.style.css'],
            });
        });
    }
    static randomFight(req, res) {
        res.send('editView');
    }
}
//# sourceMappingURL=arena.controller.js.map