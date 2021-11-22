import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/mobile_shop/",
  withCredentials: true,
});

export const axios2 = axios.create({
  baseURL: "http://localhost:4242",
  withCredentials: true,
});

export const preflight = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:80/mobile_shop/",
});
export const preflight2 = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4242",
});
export default instance;
