import axios from "axios";

export const mainFetcher = axios.create({
  baseURL: "http://localhost:8000/api/",
});
