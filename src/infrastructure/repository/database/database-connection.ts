export default interface DatabaseConnection {
  query(statement: string, parameters: any): any;
}