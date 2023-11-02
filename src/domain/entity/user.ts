import UserException from "../exception/user-exception";
import Email from "./value-object/email";
import UserName from "./value-object/user-name";
import Phone from "./value-object/phone";

export default class User {

  user_id: number | undefined;
  user_name: UserName;
  user_email: Email;
  user_phone: Phone;
  user_animals: number[];

  constructor(
    user_id: number,
    user_name: string,
    user_email: string,
    user_phone: string,
    user_animals: number[]
  ) {
    this.user_id = user_id;
    this.user_name = new UserName(user_name);
    this.user_email = new Email(user_email);
    this.user_phone = new Phone(user_phone);
    this.user_animals = user_animals;
  }

  static create(dto: any) {
    if (!dto) {
      throw new UserException();
    }

    const user = new User(
      dto.user_id,
      dto.user_name,
      dto.user_email,
      dto.user_phone,
      []
    );

    return user;
  }

  static restore(dto: any) {
    if (!dto || !dto.user_id) {
      throw new UserException();
    }

    const user = new User(
      dto.user_id,
      dto.user_name,
      dto.user_email,
      dto.user_phone,
      dto.user_animals
    );

    return user;    
  }
}