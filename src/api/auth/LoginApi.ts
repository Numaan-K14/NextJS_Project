import axios from "axios";

export const LoginApi = async (data: unknown) => {
  const url = `${process.env.VITE_API_URL}/user/login`;
  const res = await axios.post(url, data);
  return res.data;
};
