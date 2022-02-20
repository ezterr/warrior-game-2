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
import { loadImgName } from '../utils/load-img-name';
import { AVATAR_PATH } from '../../config';
export class WarriorController {
    static addView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const imgName = yield loadImgName(AVATAR_PATH);
            res.render('warrior/add', {
                imgName,
                pageTitle: 'Stwórz Wojownika - Warrior Game',
                styles: ['style.css', 'warrior.style.css'],
            });
        });
    }
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, strength, defense, stamina, agility, avatar, } = req.body;
            const warrior = new WarriorRecord({
                name: String(name),
                strength: Number(strength),
                defense: Number(defense),
                stamina: Number(stamina),
                agility: Number(agility),
                avatar: String(avatar),
                winFights: 0,
                loseFights: 0,
            });
            yield warrior.insert();
            res.redirect('/arena');
        });
    }
}
//# sourceMappingURL=warrior.controller.js.map