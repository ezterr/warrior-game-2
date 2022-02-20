import express from 'express';
import 'express-async-errors';
import { engine } from 'express-handlebars';
import { router } from './routes';
import './utils/db';
import { handlebarsHelpers } from './utils/handlebars-helpers';
import { handleError } from './utils/handle-error';

const app = express();

app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('dist/public'));

app.use('/', router);

app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('server start http://localhost:3000/');
});
