export default class ScheduleException implements Error {
  name: string = 'SCHEDULE_EXCEPTION';
  message: string = 'Schedule not found';
  status: number = 404;
}