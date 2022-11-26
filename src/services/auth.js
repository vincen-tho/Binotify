import { api } from "./api";

export const postLogin = async (formData) => {
  const { data } = await api.post("/login", formData);
  return data;
};

export const postRegister = async (formData) => {
  const { data } = await api.post("/register", formData);
  return data;
};
