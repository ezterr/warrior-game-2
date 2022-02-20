import { ActiveWarrior } from '../types/active-warrior';
import { TourLog } from './tour-log';
export class Arena {
    constructor(warriorOne, warriorTwo) {
        this.warriorOne = warriorOne;
        this.warriorTwo = warriorTwo;
        this.activeWarrior = 1;
        this.activeWarrior = ActiveWarrior[ActiveWarrior[Math.round(Math.random())]];
    }
    fight() {
        const fightLog = [];
        let tourLog = this.nextTour();
        fightLog.push(tourLog);
        while (tourLog.attacked.currentHp > 0) {
            tourLog = this.nextTour();
            fightLog.push(tourLog);
        }
        return fightLog;
    }
    nextTour() {
        const attacker = this.activeWarrior === ActiveWarrior.first ? this.warriorOne : this.warriorTwo;
        const attacked = this.activeWarrior === ActiveWarrior.first ? this.warriorTwo : this.warriorOne;
        let hpDamage = 0;
        let defenseDamage = 0;
        if (attacked.currentDefense + attacked.agility > attacker.strength && attacked.currentDefense > 0) {
            defenseDamage = attacked.currentDefense >= attacker.strength ? attacker.strength : attacked.currentDefense;
            attacked.currentDefense -= attacker.strength;
            if (attacked.currentDefense < 0) {
                attacked.currentHp += attacked.currentDefense;
                hpDamage = attacked.currentDefense * (-1);
                attacked.currentDefense = 0;
            }
        }
        else {
            attacked.currentHp -= attacker.strength;
            hpDamage = attacker.strength;
        }
        this.activeWarrior = this.activeWarrior === ActiveWarrior.first ? ActiveWarrior.second : ActiveWarrior.first;
        return new TourLog(this.activeWarrior, attacker, attacked, { currentDefense: attacker.currentDefense, currentHp: attacker.currentHp }, { currentDefense: attacked.currentDefense, currentHp: attacked.currentHp }, hpDamage, defenseDamage);
    }
}
//# sourceMappingURL=arena.js.map