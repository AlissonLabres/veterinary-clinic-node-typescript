DROP TABLE IF EXISTS schedule, bullet, medical CASCADE;

CREATE TABLE IF NOT EXISTS bullet (
    bullet_id SERIAL primary key,
    bullet_code varchar(255) not null,
    schedule_id integer
);

CREATE TABLE IF NOT EXISTS medical (
    medical_id SERIAL primary key,
    medical_name varchar(255) not null,
    medical_specialities varchar(255) not null,
    medical_phone varchar(255) not null,
    medical_email varchar(255) not null
);

CREATE TABLE IF NOT EXISTS schedule (
    schedule_id SERIAL primary key,
    schedule_status varchar(255) not null,
    user_id integer not null,
    animal_id integer not null,
    type_service varchar(255) not null,
    medical_id integer,
    bullet_id integer
);

ALTER TABLE bullet
ADD CONSTRAINT fk_schedule
FOREIGN KEY(schedule_id)
REFERENCES schedule(schedule_id);

ALTER TABLE schedule 
ADD CONSTRAINT fk_bullet 
FOREIGN KEY(bullet_id) 
REFERENCES bullet(bullet_id);

ALTER TABLE schedule 
ADD CONSTRAINT fk_medical 
FOREIGN KEY(medical_id) 
REFERENCES medical(medical_id);
