import ScheduleRepositoryDatabase from "./infrastructure/repository/schedule-repository-database";
import PostgresConnection from "./infrastructure/repository/database/postgres-connection";
import ExpressAdapter from './infrastructure/entrypoint/express-adapter';
import UsecaseFactory from './application/factory/usecase-factory';
import ScheduleController from "./application/schedule-controller";
import ScheduleRepositoryMemory from "./infrastructure/repository/schedule-repository-memory";
import BulletController from "./application/bullet-controller";

const databaseConnection = PostgresConnection.OpenConnection();
// const repository = new ScheduleRepositoryDatabase(databaseConnection);
const repository = new ScheduleRepositoryMemory();
const httpClient = new ExpressAdapter();
const usecaseFactory = new UsecaseFactory(repository);
const controllerScheduler = new ScheduleController(httpClient, usecaseFactory);
const controllerBullets = new BulletController(httpClient, usecaseFactory);

controllerScheduler.register();
controllerBullets.register();

httpClient.start(3000);