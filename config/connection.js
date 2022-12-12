import { DBConnectionSingleton } from "@try-catch-80/pgres";

const connection = new DBConnectionSingleton({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'pgres_db'
});

export default connection;
