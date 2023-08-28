import pgp from "pg-promise";
import DatabaseConnection from "./DatabaseConnection";

export default class PostgresConnection implements DatabaseConnection {
  private pgp: any;
  static instance: PostgresConnection;

  private constructor() {
    this.pgp = pgp()("postgres://root:123456@localhost:5432/petshoponline");
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