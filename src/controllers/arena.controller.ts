import { Request, Response } from 'express';
import { WarriorRecord } from '../records/warrior.record';
import { Arena } from '../utils/arena';

export class ArenaController {
  public static async arenaView(req: Request, res: Response) {
    const warriors = await WarriorRecord.findAll();

    res.render('arena', {
      warriors,
    });
  }

  public static async fight(req: Request, res: Response) {
    const { warriorOne: warriorOneId, warriorTwo: warriorTwoId } = req.body as Record<string, string>;

    if (!warriorOneId || !warriorTwoId) throw new Error('You must select warriors');

    const warriorOne = await WarriorRecord.findById(warriorOneId);
    const warriorTwo = await WarriorRecord.findById(warriorTwoId);

    if (!warriorOne || !warriorTwo) throw new Error('Warrior not found');

    const arena = new Arena(warriorOne as WarriorRecord, warriorTwo as WarriorRecord);
    const fightLogs = arena.fight();

    res.render('arena/result', {
      fightLogs,
      warriorOne,
      warriorTwo,
      winner: fightLogs[fightLogs.length - 1].attacker,
    });
  }

  public static randomFight(req: Request, res: Response) {
    res.send('editView');
  }
}
