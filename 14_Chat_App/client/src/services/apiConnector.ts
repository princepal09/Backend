import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials : true
});

export const apiConnector = (
  method: string,
  url: string,
  data?: any,
  headers = {},
  params = {},
) => {
  return axiosInstance({
    method,
    url,
    data,
    headers,
    params,
  });
};
