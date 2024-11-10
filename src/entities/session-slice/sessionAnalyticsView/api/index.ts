import { instance } from "@/shared/api";
import { IAuctionCheck } from "@/shared/interface/auctionCheck";
import { message } from "antd";
import { AxiosError } from "axios";
import { ImageError } from "next/dist/server/image-optimizer";

export const postSessionsURLToCheck = async (
  sessionURL: string
): Promise<IAuctionCheck | null> => {
  const handleError = (error: AxiosError<ImageError>) => {
    message.info(error.response?.data.message || "Всё верно");
    return null;
  };

  try {
    const response = await instance.post<IAuctionCheck>(
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
