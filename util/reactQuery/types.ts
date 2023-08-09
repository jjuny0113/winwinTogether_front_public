export interface SuccessResponse {
  status: "ok";
}
export interface SuccessResponseWithMessage extends SuccessResponse {
  message: string;
}
export interface SuccessResponseWithValue<T> extends SuccessResponse {
  result: T;
}

export interface ErrorResponse {
  status: "error";
  message: string;
}

export type PromiseResult<T> = Promise<T | ErrorResponse>;

