import axios from "axios";

axios.defaults.baseURL = "https://habit-by-bit-django-afc312512795.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();