import { pool } from '../utils/db';
import { DateForCheckName } from '../types/data-from-db';

export class WarriorRecord {
  private id: string | null = null;
  private name: string;
  private strength: number;
  private defense: number;
  private stamina: number;
  private agility: number;
  private winFights: number;
  private loseFights: number;

  constructor(warrior: WarriorRecord) {
    this.id = warrior.id || null;
    this.name = warrior.name;
    this.strength = warrior.strength;
    this.defense = warrior.defense;
    this.stamina = warrior.stamina;
    this.agility = warrior.agility;
    this.winFights = warrior.winFights;
    this.loseFights = warrior.loseFights;

    this.validate();
  }

  private validate() {
    if (!this.name || this.name.trim().length < 3 || this.name.length > 50) {
      throw new Error('name must contain at least 3 characters, cannot exceed 50 characters and must be a string.');
    }

    const warriorPointsSum = this.strength + this.stamina + this.agility + this.defense;
    if (warriorPointsSum !== 10) throw new Error('Each fighter must be allocated 10 points. No more, no less.');
  }

  public async checkUniquenessName() {
    const [result] = await pool.execute('SELECT `id`, `name` FROM `warrior` WHERE `name`=:name;', {
      name: this.name,
    }) as DateForCheckName;

    const withoutThisRecord = result.filter((e) => e.id !== this.id);

    if (withoutThisRecord.length) throw new Error('Your name is not unique');
  }
}
