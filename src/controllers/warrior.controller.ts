import { Request, Response } from 'express';
import { WarriorRecord } from '../records/warrior.record';

export class WarriorController {
  public static async addView(req: Request, res: Response) {
    res.render('warrior/add');
  }

  public static async add(req: Request, res: Response) {
    const warrior = new WarriorRecord({
      name: String(req.body.name),
      strength: Number(req.body.strength),
      defense: Number(req.body.defense),
      stamina: Number(req.body.stamina),
      agility: Number(req.body.agility),
      winFights: 0,
      loseFights: 0,
    });
    await warrior.insert();

    res.redirect('/arena');
  }

  public static async editView(req: Request, res: Response) {
    res.render('warrior/edit');
  }

  public static async edit(req: Request, res: Response) {
    res.send('edit');
  }

  public static async delete(req: Request, res: Response) {
    res.send('delete');
  }
}
