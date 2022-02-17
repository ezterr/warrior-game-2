var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
export class WarriorRecord {
    constructor(warrior) {
        this.id = null;
        this.id = warrior.id || null;
        this.name = warrior.name;
        this.hp = warrior.stamina * 10;
        this.strength = warrior.strength;
        this.defense = warrior.defense;
        this.stamina = warrior.stamina;
        this.agility = warrior.agility;
        this.winFights = warrior.winFights;
        this.loseFights = warrior.loseFights;
        this.currentHp = warrior.stamina * 10;
        this.currentDefense = warrior.defense;
        this.validate();
    }
    validate() {
        if (!this.name || this.name.trim().length < 3 || this.name.length > 50) {
            throw new Error('name must contain at least 3 characters, cannot exceed 50 characters and must be a string.');
        }
        const warriorPointsSum = this.strength + this.stamina + this.agility + this.defense;
        if (warriorPointsSum !== 10)
            throw new Error('Each fighter must be allocated 10 points. No more, no less.');
        if (this.strength <= 0 || this.stamina <= 0 || this.agility <= 0 || this.defense <= 0) {
            throw new Error('Each skill should be assigned at least 1 point.');
        }
        if (Number.isNaN(Number(this.winFights)) || Number.isNaN(Number(this.loseFights))) {
            throw new Error('wins or lose must be a number');
        }
    }
    checkUniquenessName() {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield pool.execute('SELECT `id`, `name` FROM `warrior` WHERE `name`=:name;', {
                name: this.name,
            });
            const withoutThisRecord = result.filter((e) => e.id !== this.id);
            if (withoutThisRecord.length)
                throw new Error('Your name is not unique');
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield pool.execute('SELECT * FROM `warrior` ORDER BY `winFights` DESC');
            return result.map((e) => new WarriorRecord(e));
        });
    }
    static findGivenQuantity(count) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield pool
                .execute('SELECT * FROM `warrior` ORDER BY `winFights` DESC LIMIT :count', {
                count,
            });
            return result.map((e) => new WarriorRecord(e));
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield pool.execute('SELECT * FROM `warrior` WHERE `id` = :id;', {
                id,
            });
            return result.length ? new WarriorRecord(result[0]) : null;
        });
    }
    insert() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.validate();
            this.id = (_a = this.id) !== null && _a !== void 0 ? _a : uuid();
            yield this.checkUniquenessName();
            yield pool.execute('INSERT INTO `warrior` VALUES(:id, :name, :strength, :defense, :stamina, :agility, '
                + ':winFights, :loseFights)', {
                id: this.id,
                name: this.name,
                strength: this.strength,
                defense: this.defense,
                stamina: this.stamina,
                agility: this.agility,
                winFights: this.winFights,
                loseFights: this.loseFights,
            });
            return this.id;
        });
    }
    updateWinRatio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validate();
            if (!id)
                throw new Error('You must enter the id');
            yield pool.execute('UPDATE `warrior` SET `winFights`=:winFights, loseFights=:loseFights WHERE `id`=:id;', {
                id,
                winFights: this.winFights,
                loseFights: this.loseFights,
            });
        });
    }
    addWin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id)
                throw new Error('The record must contain id.');
            this.winFights++;
            yield this.updateWinRatio(this.id);
        });
    }
    addLose() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id)
                throw new Error('The record must contain id.');
            this.loseFights++;
            yield this.updateWinRatio(this.id);
        });
    }
}
//# sourceMappingURL=warrior.record.js.map