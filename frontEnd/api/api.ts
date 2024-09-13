import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.14:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});