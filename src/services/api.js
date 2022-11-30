import axios from "axios";
import { notification } from "antd";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["X-Access-Token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 440) {
      if (!error440Flag) {
        notification.error({
          message: "Session expired",
          description: "Please login again",
        });
      }

      error440Flag = true;
      setTimeout(() => {
        window.location.replace("/logout");
      }, 750);
    }
  }
);
