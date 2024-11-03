import axios, { AxiosError } from "axios";

const BASE_URL = "http://147.45.253.71:8000";

export const fetcher = (url: string) =>
  axios(BASE_URL + url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((res) => res.data)
    .catch((e: AxiosError) => e);
