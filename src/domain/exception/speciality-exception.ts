import BusinessException from "./business-exception";

export default class SpecialityException implements BusinessException, Error {
  name: string = 'SPECIALITY_EXCEPTION';
  message: string = 'Speciality is invalid';
  status: number = 422;
}