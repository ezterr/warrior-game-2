import { Request, Response } from 'express';
import { start } from 'repl';
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
    arena.fight();

    res.send('add');
  }

  public static randomFight(req: Request, res: Response) {
    res.send('editView');
  }

  public static resultView(req: Request, res: Response) {
    res.render('arena/result');
  }
}
