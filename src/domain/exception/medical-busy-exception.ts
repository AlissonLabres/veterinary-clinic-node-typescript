import BusinessException from "./business-exception";

export default class MedicalBusyException implements BusinessException, Error {
  name: string = 'MEDICAL_BUSY_EXCEPTION';
  message: string = 'Medical is not available at this is time';
  status: number = 404;
}