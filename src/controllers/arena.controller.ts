import { Request, Response } from 'express';

export class ArenaController {
  public static arenaView(req: Request, res: Response) {
    res.send('addView');
  }

  public static fight(req: Request, res: Response) {
    res.send('add');
  }

  public static randomFight(req: Request, res: Response) {
    res.send('editView');
  }

  public static resultView(req: Request, res: Response) {
    res.send('edit');
  }
}
