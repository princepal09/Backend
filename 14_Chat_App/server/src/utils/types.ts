import { Request } from "express";

export interface IResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}


export interface AuthRequest extends Request {
  user?: any;
}