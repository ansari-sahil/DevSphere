import API from "./api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const getAccessToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

export const getRefreshToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const registerUser = async (data: RegisterData) => {
  const res = await API.post("api/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginData) => {
  const res = await API.post("api/auth/login", data);

  const { accessToken, refreshToken } = res.data;

  setTokens(accessToken, refreshToken);

  return res.data;
};

export const logoutUser = () => {
  clearTokens();
};
