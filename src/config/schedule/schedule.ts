/**
 * POST /schedule/appointment
 * @summary Create schedule appointment
 * @tags Schedule
 * @param {ScheduleAppointment} request.body.required
 * @return {ScheduleResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error response
 */

/**
 * POST /schedule/urgent
 * @summary Create schedule urgent
 * @tags Schedule
 * @param {ScheduleUrgent} request.body.required
 * @return {ScheduleResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error response
 */

/**
 * POST /schedule/cancel
 * @summary Cancel schedule appointment
 * @tags Schedule
 * @param {ScheduleCancel} request.body.required
 * @return {object} 200 - Success response
 * @return {ErrorResponse} 400 - Error response
 */

/**
 * GET /schedule/{user_id}
 * @summary Get all schedules by user
 * @tags Schedule
 * @param {string} user_id.path - User id
 * @return {Array<ScheduleResponse>} 200 - Success response
 * @return {ErrorResponse} 400 - Error response
 */