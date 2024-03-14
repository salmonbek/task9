import axios from "axios";

const request = axios.create({
  baseURL: "https://ap-countries-api.vercel.app/",
  timeout: 10000,
});

export default request;
