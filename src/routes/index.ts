import { Router } from 'express';
import { router as warriorRouter } from './warrior.router';
import { router as arenaRouter } from './arena.router';
import { router as rankingRouter } from './ranking.router';

export const router = Router();

router
  .use('/warrior', warriorRouter)
  .use('/arena', arenaRouter)
  .use('/ranking', rankingRouter);

router.get(
  '/',
  (req, res) => res.redirect('/arena'),
);

/**
 * Arenas
 *  - Get '/arena'  --> pobiera arenę
 *  - Post '/arena'  --> walka, przesyłany jest formularz z wybranymi wojownikami, przeprowadzana jest walka, następnie
 *                        użytkowni zostanie przekierowany do strony z wynikami
 *
 *  - Post '/arena/random'  --> to co wyżej, tylko randomowi wojownicy
 *  - Get '/arena/result/id' --> zwraca wynik walki hp wojowników, ilość ruchów, id wojowników,
 *
 * Wojownik
 *  - Get '/warrior/add' --> wyświetla stronę dodawania wojownika
 *  - Get '/warrior/:id/edit' --> wyświetla strone do edycji wojownika
 *  - Post '/warrior' --> dodaje wojownika
 *  - Patch '/warrior/:id' --> edytuje wojownika
 *  - Delete '/warrior/:id' --> usuwa wojownika
 *
 * Sala sław
 *  - Get '/ranking' --> zwraca stronę z rankingiem
 * */
