import UsecaseFactory from "./factory/usecase-factory";
import HttpAdapter from "./entrypoint/http-adapter";

export default class ScheduleController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) { }

  register() {
    this.httpAdapter.router('post', '/schedule/appointment', 201,
      async (body: any) => this.createScheduleAppointment(body)
    );

    this.httpAdapter.router('post', '/schedule/urgent', 201,
      async (body: any) => this.createScheduleUrgent(body)
    )

    this.httpAdapter.router('post', '/schedule/appointment/cancel', 204,
      async (body: any) => this.cancelScheduleAppointment(body)
    )

    this.httpAdapter.router('get', '/schedule/$user_id', 200,
      async (_: any, params: any) => this.getAllSchedules(params)
    )
  }

  private async createScheduleAppointment(body: any) {
    const { user_id, medical_id, animal_id, bullet_code } = body;
    return this.usecaseFactory.createScheduleAppointment.execute({ user_id, medical_id, animal_id, bullet_code })
  }

  private async createScheduleUrgent(body: any) {
    const { user_id, medical_id, animal_id, urgency_date } = body;
    return this.usecaseFactory.createScheduleUrgent.execute({ user_id, medical_id, animal_id, urgency_date });
  }

  private async cancelScheduleAppointment(body: any) {
    const { schedule_id } = body;
    return this.usecaseFactory.cancelScheduleAppointment.execute(schedule_id);
  }

  private async getAllSchedules(params: any) {  
    const { user_id } = params;
    return this.usecaseFactory.getAllSchedules.execute(user_id);
  }
}