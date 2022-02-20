import { join } from 'path';

export const AVATAR_PATH = join(__dirname, 'public/img/avatars');

export const TMP_PATH = join(__dirname, 'tmp');

export const DB_CONFIG = {
  user: 'root',
  password: '',
  host: 'localhost',
  database: 'megak_warrior',
  namedPlaceholders: true,
};
