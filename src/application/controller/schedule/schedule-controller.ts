import UsecaseFactory from "../../factory/usecase-factory";
import HttpAdapter from "../../entrypoint/http-adapter";

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

  /**
   * POST /schedule/appointment
   * @summary Create schedule appointment
   * @tags Schedule
   * @param {ScheduleAppointment} request.body.required
   * @return {ScheduleResponse} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private createScheduleAppointment() {
    this.httpAdapter.router('post', '/schedule/appointment', 201,
      async ({ user_id, medical_id, animal_id, bullet_code }: any) =>
        this.usecaseFactory.createScheduleAppointment.execute({ user_id, medical_id, animal_id, bullet_code })
    );
  }

  /**
   * POST /schedule/urgent
   * @summary Create schedule urgent
   * @tags Schedule
   * @param {ScheduleUrgent} request.body.required
   * @return {ScheduleResponse} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async createScheduleUrgent() {
    this.httpAdapter.router('post', '/schedule/urgent', 201,
      async ({ user_id, animal_id, urgency_date }: any) =>
        this.usecaseFactory.createScheduleUrgent.execute({ user_id, animal_id, urgency_date })
    )
  }

  /**
   * POST /schedule/cancel
   * @summary Cancel schedule appointment
   * @tags Schedule
   * @param {ScheduleCancel} request.body.required
   * @return {object} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async cancelScheduleAppointment() {
    this.httpAdapter.router('post', '/schedule/cancel', 204,
      async ({ schedule_id }: any) => this.usecaseFactory.cancelScheduleAppointment.execute(schedule_id)
    )
  }

  /**
   * GET /schedule/{user_id}
   * @summary Get all schedules by user
   * @tags Schedule
   * @param {string} user_id.path - User id
   * @return {Array<ScheduleResponse>} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async getAllSchedules() {
    this.httpAdapter.router('get', '/schedule/$user_id', 200,
      async (_: any, { user_id }: any) => this.usecaseFactory.getAllSchedules.execute(user_id)
    )
  }
}