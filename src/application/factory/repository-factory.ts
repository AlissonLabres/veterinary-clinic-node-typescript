import MedicalRepository from "../../domain/repository/medical-repository";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import UserRepository from "../../domain/repository/user-repository";
import MemoryConnection from "../../infrastructure/repository/database/memory-connection";
import memoryConnection from "../../infrastructure/repository/database/memory-connection";
import PostgresConnection from "../../infrastructure/repository/database/postgres-connection";
import postgresConnection from "../../infrastructure/repository/database/postgres-connection";
import MedicalRepositoryMemory from "../../infrastructure/repository/medica-repository-memory";
import MedicalRepositoryDatabase from "../../infrastructure/repository/medical-repository-database";
import ScheduleRepositoryDatabase from "../../infrastructure/repository/schedule-repository-database";
import ScheduleRepositoryMemory from "../../infrastructure/repository/schedule-repository-memory";
import UserRepositoryDatabase from "../../infrastructure/repository/user/user-repository-database";
import UserRepositoryMemory from "../../infrastructure/repository/user/user-repository-memory";

export default class RepositoryFactory {
  private postgresConnection: PostgresConnection;
  private memoryConnection: MemoryConnection;

  constructor(
    private readonly envoinment: string
  ) {
    this.postgresConnection = PostgresConnection.OpenConnection();
    this.memoryConnection = new MemoryConnection();
  }

  createScheduleRepository(): ScheduleRepository {
    return this.envoinment === 'production'
      ? new ScheduleRepositoryDatabase(this.postgresConnection)
      : new ScheduleRepositoryMemory(this.memoryConnection);
  }

  createMedicalRepository(): MedicalRepository {
    return this.envoinment === 'production'
      ? new MedicalRepositoryDatabase(this.postgresConnection)
      : new MedicalRepositoryMemory(this.memoryConnection);
  }
  
  createUserRepository(): UserRepository {
    return this.envoinment === 'production'
      ? new UserRepositoryDatabase(this.postgresConnection)
      : new UserRepositoryMemory(this.memoryConnection);
  }

}