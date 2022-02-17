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
export class ArenaController {
    static arenaView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const warriors = yield WarriorRecord.findAll();
            res.render('arena', {
                warriors,
            });
        });
    }
    static fight(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { warriorOne: warriorOneId, warriorTwo: warriorTwoId } = req.body;
            if (!warriorOneId || !warriorTwoId)
                throw new Error('You must select warriors');
            const warriorOne = yield WarriorRecord.findById(warriorOneId);
            const warriorTwo = yield WarriorRecord.findById(warriorTwoId);
            if (!warriorOne || !warriorTwo)
                throw new Error('Warrior not found');
            const arena = new Arena(warriorOne, warriorTwo);
            const fightLogs = arena.fight();
            res.render('arena/result', {
                fightLogs,
                warriorOneId: warriorOne.id,
                warriorTwoId: warriorTwo.id,
                winner: fightLogs[fightLogs.length - 1].attacker,
            });
        });
    }
    static randomFight(req, res) {
        res.send('editView');
    }
}
//# sourceMappingURL=arena.controller.js.map