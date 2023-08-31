import { Request, Response } from 'express';
import express from "express";

import CreateScheduleAppointment from "./domain/usecase/create-schedule-appointment/create-schedule-appointment";
import ScheduleRepositoryDatabase from "./infrastructure/repository/ScheduleRepositoryDatabase";
import PostgresConnection from "./infrastructure/database/PostgresConnection";
import TimeOrDateException from './domain/exception/time-or-date-exception';
import CreateScheduleUrgent from './domain/usecase/create-schedule-urgent/create-schedule-urgent';

const app = express();
app.use(express.json());

app.post("/schedule/appointment", async (request:  Request, response: Response) => {
  const { user_id, medical_id, animal_id, bullet_code } = request.body;

  try {
    const databaseConnection = PostgresConnection.OpenConnection();
    const repository = new ScheduleRepositoryDatabase(databaseConnection);
    const usecase = new CreateScheduleAppointment(repository);

    const schedule = await usecase.execute({ user_id, medical_id, animal_id, bullet_code });
  
    response.json(schedule);
  } catch (error) {
    const message = !(error instanceof TimeOrDateException)
      ? { name: 'GENERIC_ERROR', message: 'Exception to create schedule', status: 500 }
      : error;

    response.status(message.status).json(message)
  }
});

app.post("/schedule/urgent", async (request: Request, response: Response) => {
  const { user_id, medical_id, animal_id, urgency_date } = request.body;

  try {
    const databaseConnection = PostgresConnection.OpenConnection();
    const repository = new ScheduleRepositoryDatabase(databaseConnection);
    const usecase = new CreateScheduleUrgent(repository);

    const schedule = await usecase.execute({ user_id, medical_id, animal_id, urgency_date });

    response.json(schedule);
  } catch (error) {
    const message = !(error instanceof TimeOrDateException)
      ? { name: 'GENERIC_ERROR', message: 'Exception to create schedule', status: 500 }
      : error;

    response.status(message.status).json(message)
  }
});

app.listen(3000);