INSERT INTO speciality(speciality_name) VALUES ('CASTRATE');
INSERT INTO speciality(speciality_name) VALUES ('VACCINATION');
INSERT INTO speciality(speciality_name) VALUES ('GENERAL_DOCTOR');
INSERT INTO speciality(speciality_name) VALUES ('BATH_GROOMING');
INSERT INTO speciality(speciality_name) VALUES ('URGENT');

INSERT INTO medical(medical_name, medical_phone, medical_email) 
VALUES ('Evelyn Melo Ferreira', '2140696358', 'evelynmeloferreira@veterinaryclinical.com.br');

INSERT INTO medical(medical_name, medical_phone, medical_email) 
VALUES ('Anderson Silva', '4835624156', 'andersonsilva@veterinaryclinical.com.br');

INSERT INTO medical(medical_name, medical_phone, medical_email) 
VALUES ('Mariane Daniela Silveira', '9138672117', 'marianedanielasilveira@veterinaryclinical.com.br');

INSERT INTO medical_speciality(medical_id, speciality_id) VALUES (1, 2);
INSERT INTO medical_speciality(medical_id, speciality_id) VALUES (1, 3);
INSERT INTO medical_speciality(medical_id, speciality_id) VALUES (1, 5);

INSERT INTO medical_speciality(medical_id, speciality_id) VALUES (2, 4);

INSERT INTO medical_speciality(medical_id, speciality_id) VALUES (3, 1);
INSERT INTO medical_speciality(medical_id, speciality_id) VALUES (3, 5);

INSERT INTO users(user_name, user_email, user_phone) 
VALUES ('John Due', 'email@email.com', '99999999999');

INSERT INTO animal(animal_name, animal_breed, animal_age, animal_weight, animal_type, user_id)
VALUES ('Scott', 'N/A', 5, 5, 'CAT', 1);

INSERT INTO bullet(bullet_code) VALUES (concat(CURRENT_DATE - 5, 'T16:00'));
INSERT INTO bullet(bullet_code) VALUES (concat(CURRENT_DATE - 5, 'T20:00'));
INSERT INTO bullet(bullet_code) VALUES (concat(CURRENT_DATE, 'T16:00'));
INSERT INTO bullet(bullet_code) VALUES (concat(CURRENT_DATE, 'T20:00'));
INSERT INTO bullet(bullet_code) VALUES (concat(CURRENT_DATE + 5, 'T20:00'));
INSERT INTO bullet(bullet_code) VALUES (concat(CURRENT_DATE + 10, 'T20:00'));
