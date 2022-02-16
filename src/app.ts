import express from 'express';
import { engine } from 'express-handlebars';
import { router } from './routes';
import './utils/db';
import { handlebarsHelpers } from './utils/handlebars-helpers';

const app = express();

app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(3000, 'localhost', () => {
  console.log('server start http://localhost:3000/');
});
