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
export class WarriorController {
    static addView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('warrior/add');
        });
    }
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const warrior = new WarriorRecord({
                name: String(req.body.name),
                strength: Number(req.body.strength),
                defense: Number(req.body.defense),
                stamina: Number(req.body.stamina),
                agility: Number(req.body.agility),
                winFights: 0,
                loseFights: 0,
            });
            yield warrior.insert();
            res.redirect('/arena');
        });
    }
    static editView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('warrior/edit');
        });
    }
    static edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send('edit');
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send('delete');
        });
    }
}
//# sourceMappingURL=warrior.controller.js.map