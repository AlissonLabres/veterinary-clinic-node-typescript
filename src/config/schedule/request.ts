/**
 * Schedule Appointment
 * @typedef {object} ScheduleAppointment
 * @property {string} user_id.required - User ID
 * @property {string} medical_id.required - Medical ID
 * @property {string} animal_id.required - Animal ID
 * @property {string} bullet_code.required - Bullet Code
 */

/**
 * Schedule Urgent
 * @typedef {object} ScheduleUrgent
 * @property {string} user_id.required - User ID
 * @property {string} medical_id.required - Medical ID
 * @property {string} animal_id.required - Animal ID
 * @property {string} urgency_date.required - Urgency Date - (YYYY-MM-DD)
 */

/**
 * Schedule Cancel
 * @typedef {object} ScheduleCancel
 * @property {string} schedule_id.required - Schedule ID
 */
