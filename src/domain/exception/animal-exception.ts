import BusinessException from "./business-exception";

export default class AnimalException implements BusinessException, Error {
  name: string = 'ANIMAL_EXCEPTION';
  status: number = 404;
  message: string;

  constructor(message: string = 'Animal not found') {
    this.message = message;
  }
}