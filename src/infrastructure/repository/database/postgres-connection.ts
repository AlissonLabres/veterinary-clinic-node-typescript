import pgp from "pg-promise";
import DatabaseConnection from "./database-connection";
import dotenv from 'dotenv';

dotenv.config();

export default class PostgresConnection implements DatabaseConnection {
  private pgp: any;
  static instance: PostgresConnection;

  private constructor() {
    const POSTGRES_USER = process.env.POSTGRES_USER;
    const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
    const POSTGRES_LOCAL_URL = process.env.POSTGRES_LOCAL_URL;
    const POSTGRES_LOCAL_PORT = process.env.POSTGRES_LOCAL_PORT;
    const POSTGRES_DB = process.env.POSTGRES_DB;

    this.pgp = pgp()(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_LOCAL_URL}:${POSTGRES_LOCAL_PORT}/${POSTGRES_DB}`);
  }

  static OpenConnection() {
    if (!PostgresConnection.instance) {
      PostgresConnection.instance = new PostgresConnection();
    }
    return PostgresConnection.instance;
  }

  query(statement: string, parameters: any) {
    return PostgresConnection.instance.pgp.query(statement, parameters);
  }
}