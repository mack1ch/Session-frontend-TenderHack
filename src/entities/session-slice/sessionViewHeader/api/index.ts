import { instance } from "@/shared/api";
import { IHistory } from "@/shared/interface/history";

export const changeSessionUnPublishFilterValue = async (
  sessionID?: number
): Promise<IHistory | null> => {
  try {
    const response = await instance.post<IHistory>(`/viewed_history/`, {
      auction_id: sessionID,
    });

    return response.data;
  } catch {
    return null;
  }
};
