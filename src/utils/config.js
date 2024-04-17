import axios from "axios";

export const apiUrl = axios.create({
  baseURL: "http://localhost:2030/api/v1/",
});

export const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const token = {
  headers: {
    Authorization: `Bearer ${userInfo?.token || ""}`,
    Accept: "application/json",
  },
};
export const tokenForUploadImage = {
  headers: {
    Authorization: `Bearer ${userInfo?.token || ""}`,
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};
