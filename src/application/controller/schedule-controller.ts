import UsecaseFactory from "../factory/usecase-factory";
import HttpAdapter from "../entrypoint/http-adapter";

export default class ScheduleController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.createScheduleAppointment();
    this.createScheduleUrgent();
    this.cancelScheduleAppointment();
    this.getAllSchedules();
  }

  private createScheduleAppointment() {
    this.httpAdapter.router('post', '/schedule/appointment', 201,
      async ({ user_id, medical_id, animal_id, bullet_code }: any) =>
        this.usecaseFactory.createScheduleAppointment.execute({ user_id, medical_id, animal_id, bullet_code })
    );
  }

  private async createScheduleUrgent() {
    this.httpAdapter.router('post', '/schedule/urgent', 201,
      async ({ user_id, animal_id, urgency_date }: any) =>
        this.usecaseFactory.createScheduleUrgent.execute({ user_id, animal_id, urgency_date })
    )
  }

  private async cancelScheduleAppointment() {
    this.httpAdapter.router('post', '/schedule/cancel', 204,
      async ({ schedule_id }: any) => this.usecaseFactory.cancelScheduleAppointment.execute(schedule_id)
    )
  }

  private async getAllSchedules() {
    this.httpAdapter.router('get', '/schedule/$user_id', 200,
      async (_: any, { user_id }: any) => this.usecaseFactory.getAllSchedules.execute(user_id)
    )
  }
}