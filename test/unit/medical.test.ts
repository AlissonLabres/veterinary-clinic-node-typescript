import Medical from "../../src/domain/entity/medical"
import MedicalException from "../../src/domain/exception/medical-exception";
import SpecialityException from "../../src/domain/exception/speciality-exception";

test('Should restore medical', () => {
  const input = {
    medical_name: 'Dr. House',
    medical_specialities: 'GENERAL_DOCTOR,VACCINATION', 
    medical_phone: '21999999999',
    medical_email: 'house@veterinaryclinical.com.br',
    medical_id: 1
  };

  const medical = Medical.restore(input);
  expect(medical.medical_specialities[0].value).toEqual('GENERAL_DOCTOR');
})

test('Should receive error MedicalException when restore medical with medical_id inexistent', () => {
  const input = { };
  expect(() => Medical.restore(input)).toThrow(MedicalException);
})

test('Should receive error SpecialityException when restore medical with speciality inexistent', () => {
  const input = { medical_id: 1, medical_specialities: 'ANY_SPECIALITY' };

  expect(() => Medical.restore(input)).toThrow(SpecialityException);  
})
