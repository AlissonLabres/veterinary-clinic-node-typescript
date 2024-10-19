import MedicalException from "../exception/medical-exception";

export default class Medical {
  medical_name: string;
  medical_phone: string;
  medical_email: string;
  medical_id: number | undefined;

  constructor(medical_name: string, medical_phone: string, medical_email: string, medical_id?: number) {
    this.medical_name = medical_name;
    this.medical_phone = medical_phone;
    this.medical_email = medical_email;
    this.medical_id = medical_id;
  }

  static restore(dto: any) {
    if (!dto || !dto.medical_id) {
      throw new MedicalException();
    }

    return new Medical(dto.medical_name, dto.medical_phone, dto.medical_email, dto.medical_id);
  }
}
