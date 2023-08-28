export default class TimeOrDateException implements Error {
  name: string = 'TIME_OR_DATE_EXCEPTION';
  message: string = 'Time or Date not available to schedule';
  status: number = 409;
}