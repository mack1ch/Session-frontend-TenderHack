import axios, { AxiosError } from "axios";

const BASE_URL = "https://тендерхак.екат.рус";

export const fetcher = (url: string) =>
  axios(BASE_URL + url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((res) => res.data)
    .catch((e: AxiosError) => e);
