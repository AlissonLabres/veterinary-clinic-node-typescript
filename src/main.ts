import ScheduleRepositoryDatabase from "./infrastructure/repository/schedule-repository-database";
import PostgresConnection from "./infrastructure/repository/database/postgres-connection";
import ExpressAdapter from './infrastructure/entrypoint/express-adapter';
import UsecaseFactory from './application/factory/usecase-factory';
import ScheduleController from "./application/schedule-controller";
import ScheduleRepositoryMemory from "./infrastructure/repository/schedule-repository-memory";
import BulletController from "./application/bullet-controller";
import dotenv from 'dotenv';
import MedicalRepositoryDatabase from "./infrastructure/repository/medical-repository-database";
import MedicalController from "./application/medical-controller";
import MedicalRepositoryMemory from "./infrastructure/repository/medica-repository-memory";
import MemoryConnection from "./infrastructure/repository/database/memory-connection";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const NODE_PORT = process.env.NODE_PORT;

const postgresConnection = PostgresConnection.OpenConnection();
const memoryConnection = new MemoryConnection();

const scheduleRepository = NODE_ENV === 'production'
  ? new ScheduleRepositoryDatabase(postgresConnection)
  : new ScheduleRepositoryMemory(memoryConnection);

const medicalRepository = NODE_ENV === 'production'
  ? new MedicalRepositoryDatabase(postgresConnection)
  : new MedicalRepositoryMemory(memoryConnection);

const httpClient = new ExpressAdapter();
const usecaseFactory = new UsecaseFactory(scheduleRepository, medicalRepository);
const controllerScheduler = new ScheduleController(httpClient, usecaseFactory);
const controllerBullets = new BulletController(httpClient, usecaseFactory);
const controllerMedical = new MedicalController(httpClient, usecaseFactory);

controllerScheduler.register();
controllerBullets.register();
controllerMedical.register();

httpClient.start(Number(NODE_PORT) || 3000);