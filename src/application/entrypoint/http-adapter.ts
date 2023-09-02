export default interface HttpAdapter {
  router(method: string, path: string, status: number, execute: Function): void;
  start(port: number): void;
}