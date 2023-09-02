import ScheduleRepositoryDatabase from "./infrastructure/repository/schedule-repository-database";
import PostgresConnection from "./infrastructure/repository/database/postgres-connection";
import ExpressAdapter from './infrastructure/entrypoint/express-adapter';
import UsecaseFactory from './application/factory/usecase-factory';
import ScheduleController from "./application/schedule-controller";

const databaseConnection = PostgresConnection.OpenConnection();
const repository = new ScheduleRepositoryDatabase(databaseConnection);
const httpClient = new ExpressAdapter();
const usecaseFactory = new UsecaseFactory(repository);
const controller = new ScheduleController(httpClient, usecaseFactory);

controller.register();
controller.start();