import { instance } from "@/shared/api";
import { message } from "antd";
import { AxiosError } from "axios";
import { ImageError } from "next/dist/server/image-optimizer";

export const postSessionsURLToCheck = async (
  sessionURL: string
): Promise<{ reason: string } | null> => {
  const handleError = (error: AxiosError<ImageError>) => {
    message.error(error.response?.data.message || "Ошибка на сервере");
    return null;
  };

  try {
    const response = await instance.post<{ reason: string }>(
      `/auctions/check_url/`,
      {
        url: sessionURL,
      }
    );

    return response.data;
  } catch (error) {
    return handleError(error as AxiosError<ImageError>);
  }
};
