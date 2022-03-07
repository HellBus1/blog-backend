import { Response } from "express";

interface BaseResponse<T> {
  status_code: number;
  message: string;
  data: T | any;
}
// <BaseResponse<UserDocument>>
interface CustomResponse<T> extends Response {
  body: T;
}

export { BaseResponse, CustomResponse }