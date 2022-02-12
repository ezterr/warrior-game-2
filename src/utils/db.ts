import { createPool } from 'mysql2/promise';

export const pool = createPool({
  user: 'root',
  password: '',
  host: 'localhost',
  database: 'megak_warrior',
  namedPlaceholders: true,
});
