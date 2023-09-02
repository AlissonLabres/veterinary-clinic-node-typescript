import BusinessException from "./business-exception";

export default class ScheduleException implements BusinessException, Error {
  name: string = 'SCHEDULE_EXCEPTION';
  message: string = 'Schedule not found';
  status: number = 404;
}