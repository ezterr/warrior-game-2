import { Request, Response } from 'express';
import { WarriorRecord } from '../records/warrior.record';
import { Arena } from '../utils/arena';
import { ArenaValidationError, NotFoundError } from '../utils/handle-error';

export class ArenaController {
  public static async arenaView(req: Request, res: Response) {
    const warriors = await WarriorRecord.findAll();

    res.render('arena', {
      warriors,
      pageTitle: 'Arena - Warrior Game',
      styles: ['style.css', 'arena.style.css'],
    });
  }

  public static async fight(req: Request, res: Response) {
    const { warriorOne: warriorOneId, warriorTwo: warriorTwoId } = req.body as Record<string, string>;

    if (!warriorOneId || !warriorTwoId) throw new ArenaValidationError('You must select warriors');
    if (warriorOneId === warriorTwoId) throw new ArenaValidationError('Warrior must be unique');

    const warriorOne = await WarriorRecord.findById(warriorOneId);
    const warriorTwo = await WarriorRecord.findById(warriorTwoId);

    if (!warriorOne || !warriorTwo) throw new NotFoundError('Warrior not found');

    const arena = new Arena(warriorOne as WarriorRecord, warriorTwo as WarriorRecord);
    const fightLogs = arena.fight();

    await fightLogs[fightLogs.length - 1].attacker.addWin();
    await fightLogs[fightLogs.length - 1].attacked.addLose();

    res.render('arena/result', {
      fightLogs,
      warriorOne,
      warriorTwo,
      winner: fightLogs[fightLogs.length - 1].attacker,
      pageTitle: `Walka ${warriorOne.name} vs ${warriorTwo.name} - Warrior Game`,
      styles: ['style.css', 'fight-result.style.css'],
    });
  }

  public static randomFight(req: Request, res: Response) {
    res.send('editView');
  }
}
