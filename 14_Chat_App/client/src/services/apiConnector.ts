import { AxiosHeaders, Method } from "axios";
import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials : true
});


export const apiConnector = (
  method: Method,
  url: string,
  bodyData?: unknown,
  headers? : AxiosHeaders,
  params?: Record<string, any>
) => {
  return axiosInstance({
    method ,
    url,
    data : bodyData,
    headers ,
    params 
  });
};
