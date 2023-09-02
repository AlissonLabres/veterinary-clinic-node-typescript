export default abstract class BusinessException {
  abstract name: string;
  abstract message: string;
  abstract status: number;
}