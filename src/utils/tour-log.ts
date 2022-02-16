/* eslint-disable no-useless-constructor,no-empty-function */
import { ActiveWarrior } from '../types/active-warrior';
import { WarriorRecord } from '../records/warrior.record';

export class TourLog {
  constructor(
        public readonly activeWarrior: ActiveWarrior,
        public readonly attacker: WarriorRecord,
        public readonly attacked: WarriorRecord,
        public readonly currentAttacker: Record<string, number>,
        public readonly currentAttacked: Record<string, number>,
        public readonly hpDamage: number,
        public readonly defenseDamage: number,
  ) {}
}
