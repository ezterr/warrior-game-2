import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
import { WarriorRecordsFromDb } from '../types/data-from-db';
import { WarriorData } from '../types/warrior-data';
import { CreateWarriorValidationError } from '../utils/handle-error';

export class WarriorRecord implements WarriorData {
  public id: string | null = null;
  public readonly name: string;
  public readonly hp: number;
  public readonly strength: number;
  public readonly stamina: number;
  public readonly defense: number;
  public readonly agility: number;
  public readonly avatar: string;
  public winFights: number;
  public loseFights: number;
  public currentHp: number;
  public currentDefense: number;

  constructor(warrior: WarriorData) {
    this.id = warrior.id || null;
    this.name = warrior.name;
    this.hp = warrior.stamina * 10;
    this.strength = warrior.strength;
    this.defense = warrior.defense;
    this.stamina = warrior.stamina;
    this.agility = warrior.agility;
    this.avatar = warrior.avatar;
    this.winFights = warrior.winFights;
    this.loseFights = warrior.loseFights;

    this.currentHp = warrior.stamina * 10;
    this.currentDefense = warrior.defense;

    this.validate();
  }

  private validate() {
    if (!this.name || this.name.trim().length < 3 || this.name.length > 50) {
      throw new CreateWarriorValidationError('name must contain at least 3 characters, cannot exceed 50 characters '
          + 'and must be a string.');
    }

    const warriorPointsSum = this.strength + this.stamina + this.agility + this.defense;
    if (warriorPointsSum !== 10) {
      throw new CreateWarriorValidationError('Each fighter must be allocated 10 points. No more, no less.');
    }

    if (this.strength <= 0 || this.stamina <= 0 || this.agility <= 0 || this.defense <= 0) {
      throw new CreateWarriorValidationError('Each skill should be assigned at least 1 point.');
    }

    if (Number.isNaN(Number(this.winFights)) || Number.isNaN(Number(this.loseFights))) {
      throw new CreateWarriorValidationError('wins or lose must be a number');
    }
  }

  public async checkUniquenessName() {
    const [result] = await pool.execute('SELECT `id`, `name` FROM `warrior` WHERE `name`=:name;', {
      name: this.name,
    }) as [Record<string, string>[], FieldPacket[]];

    const withoutThisRecord = result.filter((e) => e.id !== this.id);

    if (withoutThisRecord.length) throw new CreateWarriorValidationError('Your name is not unique');
  }

  public static async findAll(): Promise<WarriorRecord[]> {
    const [result] = await pool.execute('SELECT * FROM `warrior` ORDER BY `winFights` DESC') as WarriorRecordsFromDb;

    return result.map((e) => new WarriorRecord(e));
  }

  public static async findGivenQuantity(count: number): Promise<WarriorRecord[]> {
    const [result] = await pool
      .execute('SELECT * FROM `warrior` ORDER BY `winFights` DESC LIMIT :count', {
        count,
      }) as WarriorRecordsFromDb;

    return result.map((e) => new WarriorRecord(e));
  }

  public static async findById(id: string): Promise<WarriorRecord | null> {
    const [result] = await pool.execute('SELECT * FROM `warrior` WHERE `id` = :id;', {
      id,
    }) as WarriorRecordsFromDb;

    return result.length ? new WarriorRecord(result[0]) : null;
  }

  public async insert() {
    this.validate();
    this.id = this.id ?? uuid();

    await this.checkUniquenessName();
    await pool.execute('INSERT INTO `warrior` VALUES(:id, :name, :strength, :defense, :stamina, :agility, '
        + ':winFights, :loseFights, :avatar)', {
      id: this.id,
      name: this.name,
      strength: this.strength,
      defense: this.defense,
      stamina: this.stamina,
      agility: this.agility,
      winFights: this.winFights,
      loseFights: this.loseFights,
      avatar: this.avatar,
    });

    return this.id;
  }

  public async updateWinRatio(id: string) {
    this.validate();
    if (!id) throw new CreateWarriorValidationError('You must enter the id');

    await pool.execute('UPDATE `warrior` SET `winFights`=:winFights, loseFights=:loseFights WHERE `id`=:id;', {
      id,
      winFights: this.winFights,
      loseFights: this.loseFights,
    });
  }

  public async addWin() {
    if (!this.id) throw new CreateWarriorValidationError('The record must contain id.');

    this.winFights++;

    await this.updateWinRatio(this.id as string);
  }

  public async addLose() {
    if (!this.id) throw new CreateWarriorValidationError('The record must contain id.');

    this.loseFights++;

    await this.updateWinRatio(this.id as string);
  }
}
