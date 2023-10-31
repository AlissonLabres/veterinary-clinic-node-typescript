import BusinessException from "./business-exception";

export default class MedicalException implements BusinessException, Error {
  name: string = 'MEDICAL_EXCEPTION';
  message: string = 'Medical not found';
  status: number = 404;
}