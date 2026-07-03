import axios from "axios";
import { localStorageKey } from "../config/localStorageKey";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKey.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
