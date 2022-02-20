import { Request, Response } from 'express';
import { WarriorRecord } from '../records/warrior.record';
import { loadImgName } from '../utils/load-img-name';
import { AVATAR_PATH } from '../../config';

export class WarriorController {
  public static async addView(req: Request, res: Response) {
    const imgName = await loadImgName(AVATAR_PATH);
    res.render('warrior/add', {
      imgName,
      pageTitle: 'Stwórz Wojownika - Warrior Game',
      styles: ['style.css', 'warrior.style.css'],
    });
  }

  public static async add(req: Request, res: Response) {
    const {
      name, strength, defense, stamina, agility, avatar,
    } = req.body;

    const warrior = new WarriorRecord({
      name: String(name),
      strength: Number(strength),
      defense: Number(defense),
      stamina: Number(stamina),
      agility: Number(agility),
      avatar: String(avatar),
      winFights: 0,
      loseFights: 0,
    });
    await warrior.insert();

    res.redirect('/arena');
  }
}
