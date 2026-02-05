import OgAxios from "axios";
import { queryClient } from "./query-Client";



const token = JSON.parse(localStorage.getItem("token") || "null");
export const axios = OgAxios.create({
  baseURL: process.env.VITE_API_URL,
});

axios.interceptors.request.use(function (req) {
  req.headers["Authorization"] = `Bearer ${token}`;

  return req;
});
axios.interceptors.response.use(
  function (response) {
    if (response.config.method === "get") {
      return response;
    }

    return response;
  },
  (err) => {
    const status = err.response?.status || null;
    if (status && status === 401) {
      sessionStorage.clear();
      queryClient.removeQueries();
    } else {
      throw err;
    }
  },
);
