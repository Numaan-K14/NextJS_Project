"use client";
import { axios } from "@/config/axios";
import { LoginFormValues } from "@/interfaces/Userinterfaces";

export const LoginApi = async (data: LoginFormValues) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`;
  const res = await axios.post(url, data);
  return res.data;
};

// const LoginAPI = async (data: LoginFormValues) => {
//   const URL = `/user/login`;
//   const res = await axios.post(URL, data);
//   return res.data;
// };
