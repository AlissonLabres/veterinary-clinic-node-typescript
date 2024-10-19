import Speciality from "../../src/domain/entity/speciality";
import SpecialityException from "../../src/domain/exception/speciality-exception";

test("Should restore speciality", () => {
  const input = {
    speciality_name: "URGENTE",
    speciality_id: 1,
  };

  const speciality = Speciality.restore(input);
  expect(speciality.speciality_name).toEqual("URGENTE");
});

test("Should receive error SpecialityException when restore speciality empty", () => {
  const input = {};
  expect(() => Speciality.restore(input)).toThrow(SpecialityException);
});
