import API from "./api";

/* ================= TYPES ================= */

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

/* ================= TOKEN HELPERS ================= */

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const getAccessToken = (): string | null =>
  localStorage.getItem("accessToken");

export const getRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken");

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

/* ================= AUTH API ================= */

export const registerUser = async (data: RegisterData) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginData) => {
  const res = await API.post("/auth/login", data);

  const { accessToken, refreshToken } = res.data;

  setTokens(accessToken, refreshToken);

  return res.data;
};

export const logoutUser = () => {
  clearTokens();
};
