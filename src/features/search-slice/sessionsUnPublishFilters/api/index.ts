import { instance } from "@/shared/api";
import { ISetting } from "@/shared/interface/settings";
import { message } from "antd";
import { AxiosError } from "axios";
import { ImageError } from "next/dist/server/image-optimizer";

export const changeSessionUnPublishFilterValue = async (
  sessionID: number,
  value: boolean
): Promise<ISetting | null> => {
  const handleError = (error: AxiosError<ImageError>) => {
    message.error(error.response?.data.message || "Ошибка на сервере");
    return null;
  };

  try {
    const response = await instance.patch<ISetting>(`/settings/${sessionID}/`, {
      value: value,
    });

    return response.data;
  } catch (error) {
    return handleError(error as AxiosError<ImageError>);
  }
};
