import ExpressAdapter from './infrastructure/entrypoint/express-adapter';
import UsecaseFactory from './application/factory/usecase-factory';
import dotenv from 'dotenv';
import RepositoryFactory from "./application/factory/repository-factory";
import ControllerFactory from "./application/factory/controller-factory";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const NODE_PORT = process.env.NODE_PORT;

const factoryRepository = new RepositoryFactory(NODE_ENV || 'local');

const scheduleRepository = factoryRepository.createScheduleRepository();
const medicalRepository = factoryRepository.createMedicalRepository();
const userRepository = factoryRepository.createUserRepository();

const usecaseFactory = new UsecaseFactory(scheduleRepository, medicalRepository, userRepository);
const httpClient = new ExpressAdapter();

const controllerFactory = new ControllerFactory(httpClient, usecaseFactory);

controllerFactory.registerControllers();
httpClient.start(Number(NODE_PORT) || 3000);