import express, { Request, Response } from 'express';
import cors from 'cors';
import HttpAdapter from "../../application/entrypoint/http-adapter";
import { SwaggerConfig } from '../../config/swagger-config';

export default class ExpressAdapter implements HttpAdapter {
  private application: any
  
  constructor() {
    this.application = express();
    this.application.use(express.json());
    this.application.use(cors());

    SwaggerConfig(this.application);
  }

  router(method: string, path: string, status: number, execute: Function): void {
    this.application[method](this.convertion(path), async (request: Request, response: Response) => {
      try {
        const output = await execute(request.body, request.params);
        response.status(status).json(output);
      } catch (error: any) {
        console.trace(error);
        const message = { name: error.name, message: error.message, status: error.status || 500 };
        response.status(message.status).json(message) 
      }
    });
  }

  private convertion(path: string) {
    return path.replace(/\$/g, ":");
  }

  start(port: number): void {
    this.application.listen(port, () => console.log(`Server running on port ${port}`));
  }
}