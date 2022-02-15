/* eslint-disable no-unused-vars */
import { WarriorRecord } from '../records/warrior.record';
import { ActiveWarrior } from '../types/active-warrior';
import { TourLog } from './tour-log';

export class Arena {
  private activeWarrior: ActiveWarrior = 1;

  constructor(
      private warriorOne: WarriorRecord,
      private warriorTwo: WarriorRecord,
  ) {
    this.activeWarrior = ActiveWarrior[ActiveWarrior[Math.round(Math.random())] as keyof typeof ActiveWarrior];
  }

  public fight() {
    const fightLog: TourLog[] = [];

    const tourLog: TourLog = this.nextTour();
    fightLog.push(tourLog);

    while (tourLog.attacked.hp > 0) {
      fightLog.push(this.nextTour());
    }

    return fightLog;
  }

  public nextTour() {
    const attacker = this.activeWarrior === ActiveWarrior.first ? this.warriorOne : this.warriorTwo;
    const attacked = this.activeWarrior === ActiveWarrior.first ? this.warriorTwo : this.warriorOne;

    if (attacked.currDefense + attacked.agility > attacker.strength && attacked.currDefense > 0) {
      attacked.currDefense -= attacker.strength;

      if (attacked.currDefense < 0) {
        attacked.hp += attacked.currDefense;
      }
    } else {
      attacked.hp -= attacker.strength;
    }
    this.activeWarrior = this.activeWarrior === ActiveWarrior.first ? ActiveWarrior.second : ActiveWarrior.first;

    return new TourLog(this.activeWarrior, attacker, attacked, attacker.strength, attacked.currDefense, attacked.hp);
  }
}
