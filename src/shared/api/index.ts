import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://тендерхак.екат.рус";

export const fetcher = (url: string) =>
  axios(BASE_URL + url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((res) => res.data)
    .catch((e: unknown) => {
      if (axios.isAxiosError(e)) {
        return e.response ? e.response.data : e.message;
      }
      return e;
    });

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
