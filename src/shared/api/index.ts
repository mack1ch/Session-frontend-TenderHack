import axios, { AxiosError } from "axios";

const BASE_URL = "http://45.146.165.202:8000";

export const fetcher = (url: string) =>
  axios(BASE_URL + url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((res) => res.data)
    .catch((e: AxiosError) => e);
