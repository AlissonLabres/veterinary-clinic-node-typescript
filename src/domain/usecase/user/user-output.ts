export default class UserOutput {
  constructor(
    public user_id: number,
    public user_name: string,
    public user_email: string,
    public user_phone: string,
    public user_animals: number[]
  ) { }
}