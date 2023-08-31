DROP TABLE IF EXISTS schedule, bullet CASCADE;

CREATE TABLE IF NOT EXISTS bullet (
    bullet_id SERIAL primary key,
    bullet_code varchar(255) not null,
    schedule_id integer
);

CREATE TABLE IF NOT EXISTS schedule (
    schedule_id SERIAL primary key,
    schedule_status varchar(255) not null,
    user_id integer not null,
    medical_id integer not null,
    animal_id integer not null,
    type_service varchar(255) not null,
    bullet_id integer,
    CONSTRAINT fk_bullet 
    FOREIGN KEY(bullet_id) 
    REFERENCES bullet(bullet_id)
);
