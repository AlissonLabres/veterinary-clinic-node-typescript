import AnimalController from "../controller/animal-controller";
import BulletController from "../controller/bullet-controller";
import MedicalController from "../controller/medical-controller";
import ScheduleController from "../controller/schedule-controller";
import UserController from "../controller/user-controller";
import HttpAdapter from "../entrypoint/http-adapter";
import UsecaseFactory from "./usecase-factory";

export default class ControllerFactory {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) { }

  registerControllers(): void {
    new ScheduleController(this.httpAdapter, this.usecaseFactory);
    new BulletController(this.httpAdapter, this.usecaseFactory);
    new MedicalController(this.httpAdapter, this.usecaseFactory);
    new UserController(this.httpAdapter, this.usecaseFactory);
    new AnimalController(this.httpAdapter, this.usecaseFactory);
  }
}