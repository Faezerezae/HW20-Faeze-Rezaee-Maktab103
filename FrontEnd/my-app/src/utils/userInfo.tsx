import { AxiosError } from "axios";
import { errorHandler } from "./errorHandler";
import { IUserInfoReponse, getUserInfoApi } from "../apis/user-apis";

export const UserInfo = async (): Promise<IUserInfoReponse | undefined> => {
  try {
    return await getUserInfoApi();
  } catch (error:any) {
    errorHandler(error as AxiosError);
  }
};

export type { IUserInfoReponse };

