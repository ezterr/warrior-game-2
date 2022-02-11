import { createPool } from 'mysql2';

export const pool = createPool({
  user: 'root',
  password: '',
  host: 'localhost',
  database: 'megak_warrior',
});
