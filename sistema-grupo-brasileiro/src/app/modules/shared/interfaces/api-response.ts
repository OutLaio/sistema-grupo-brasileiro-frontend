export interface I_Api_Response<T> {
  message: string;
  data: T | null;
}
