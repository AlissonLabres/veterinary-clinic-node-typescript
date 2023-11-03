/**
 * Schedule Appointment
 * @typedef {object} ScheduleAppointment
 * @property {number} user_id.required - User ID
 * @property {number} medical_id.required - Medical ID
 * @property {number} animal_id.required - Animal ID
 * @property {string} bullet_code.required - Bullet Code
 */

/**
 * Schedule Urgent
 * @typedef {object} ScheduleUrgent
 * @property {number} user_id.required - User ID
 * @property {number} animal_id.required - Animal ID
 * @property {string} urgency_date.required - Urgency Date - (YYYY-MM-DD)
 */

/**
 * Schedule Cancel
 * @typedef {object} ScheduleCancel
 * @property {string} schedule_id.required - Schedule ID
 */
