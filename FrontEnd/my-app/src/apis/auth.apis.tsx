import axios from "axios";
import { authUrls, serverUrl } from "./urls";

export interface ISignupBody{
    username:string;
    password:string;
}

export interface IAuthResponse{
    user:{
        username:string;
        id:number;
    };
    token:string;
}

type siggnupFuncType=(body:ISignupBody)=>Promise<IAuthResponse>;

export const signUpApi:siggnupFuncType=async (body:ISignupBody)=>{
    const responce=await axios.post(serverUrl+authUrls.signup,body);
    return responce.data as IAuthResponse;
}

export interface ILoginBody {
    username: string;
    password: string;
  }


  type loginFuncType = (body: ILoginBody) => Promise<IAuthResponse>;
  export const loginApi: loginFuncType = async (body: ILoginBody) => {
    const response = await axios.post(serverUrl + authUrls.login, body);
    return response.data as IAuthResponse;
  };