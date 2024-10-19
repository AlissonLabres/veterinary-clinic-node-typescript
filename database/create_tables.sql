DROP TABLE IF EXISTS
schedule,
medical_speciality,
bullet,
medical,
users,
animal,
speciality CASCADE;

CREATE TABLE IF NOT EXISTS speciality (
    speciality_id SERIAL primary key,
    speciality_name varchar(255) not null
);

CREATE TABLE IF NOT EXISTS bullet (
    bullet_id SERIAL primary key,
    bullet_code varchar(255) not null,
    schedule_id integer
);

CREATE TABLE IF NOT EXISTS medical (
    medical_id SERIAL primary key,
    medical_name varchar(255) not null,
    medical_phone varchar(255) not null,
    medical_email varchar(255) not null
);

CREATE TABLE IF NOT EXISTS schedule (
    schedule_id SERIAL primary key,
    schedule_status varchar(255) not null,
    type_service varchar(255) not null,
    animal_id integer,
    user_id integer,
    medical_id integer,
    bullet_id integer
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL primary key,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_phone varchar(255) not null
);

CREATE TABLE IF NOT EXISTS animal (
    animal_id SERIAL primary key,
    animal_name varchar(255) not null,
    animal_breed varchar(255) not null,
    animal_age integer not null,
    animal_weight integer not null,
    animal_type varchar(255) not null,
    user_id integer
);

CREATE TABLE IF NOT EXISTS medical_speciality (
    medical_id integer NOT NULL REFERENCES medical(medical_id),
    speciality_id integer NOT NULL REFERENCES speciality(speciality_id),
    PRIMARY KEY (medical_id, speciality_id)
);

ALTER TABLE bullet ADD
CONSTRAINT fk_schedule FOREIGN KEY(schedule_id) REFERENCES schedule(schedule_id);

ALTER TABLE schedule ADD
CONSTRAINT fk_bullet FOREIGN KEY(bullet_id) REFERENCES bullet(bullet_id);

ALTER TABLE schedule ADD
CONSTRAINT fk_medical FOREIGN KEY(medical_id) REFERENCES medical(medical_id);

ALTER TABLE schedule ADD
CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id);

ALTER TABLE schedule ADD
CONSTRAINT fk_animal FOREIGN KEY(animal_id) REFERENCES animal(animal_id);

ALTER TABLE animal ADD
CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id);