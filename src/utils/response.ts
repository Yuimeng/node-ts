/**
 * 通用响应对象
 * @param data
 * @param code {number}
 * @param message {string}
 * @constructor
 */
export class Response<T = any> {
  code: number
  message: string
  data: T

  constructor(
    data: T,
    code = 20000,
    message = 'success'
  ) {
    this.code = code
    this.message = message
    this.data = data
  }
}

export interface Common {
  id?: number;
  create_time?: Date;
  update_time?: Date;
}
