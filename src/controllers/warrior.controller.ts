import { Request, Response } from 'express';

export class WarriorController {
  public static addView(req: Request, res: Response) {
    res.render('warrior/add');
  }

  public static add(req: Request, res: Response) {
    res.send('add');
  }

  public static editView(req: Request, res: Response) {
    res.render('warrior/edit');
  }

  public static edit(req: Request, res: Response) {
    res.send('edit');
  }

  public static delete(req: Request, res: Response) {
    res.send('delete');
  }
}
