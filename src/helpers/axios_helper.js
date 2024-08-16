import axios from "axios";
import { getAuthToken } from "./auth_helper";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-type"] = "application/json";

export const request = (method, url, data) => {
  let headers = {};

  if (getAuthToken() !== null) {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};
