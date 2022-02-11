import { Request, Response } from 'express';

export class WarriorController {
  public static addView(req: Request, res: Response) {
    res.send('addView');
  }

  public static add(req: Request, res: Response) {
    res.send('add');
  }

  public static editView(req: Request, res: Response) {
    res.send('editView');
  }

  public static edit(req: Request, res: Response) {
    res.send('edit');
  }

  public static delete(req: Request, res: Response) {
    res.send('delete');
  }
}
