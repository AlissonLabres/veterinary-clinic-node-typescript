import Medical from "../../src/domain/entity/medical";
import MedicalException from "../../src/domain/exception/medical-exception";
import SpecialityException from "../../src/domain/exception/speciality-exception";

test("Should restore medical", () => {
  const input = {
    medical_name: "Dr. House",
    medical_specialities: "1",
    medical_phone: "21999999999",
    medical_email: "house@veterinaryclinical.com.br",
    medical_id: 1,
  };

  const medical = Medical.restore(input);
  expect(medical.medical_name).toEqual("Dr. House");
});

test("Should receive error MedicalException when restore medical with medical_id inexistent", () => {
  const input = {};
  expect(() => Medical.restore(input)).toThrow(MedicalException);
});
