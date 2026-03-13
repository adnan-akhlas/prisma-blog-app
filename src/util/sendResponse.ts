import { Response } from "express";

interface IMeta {
  page: number;
  limit: number;
  totalPages: number;
  [key: string]: number;
}

interface IResponse<T> {
  status: number;
  success: boolean;
  message: string;
  meta?: IMeta;
  data?: T;
}

const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  res.status(data.status).json({
    success: data.success,
    message: data.message,
    meta: data?.meta || null,
    data: data?.data || null,
  });
};

export default sendResponse;
