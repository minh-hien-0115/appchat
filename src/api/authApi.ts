import { appInfor } from "../contants/appInfor";
import axiosClient from "./axiosClient";

class AuthApi {
  HandleAuthentication = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`${appInfor.BASE_URL}/auth${url}`, {
        method: method ?? 'get',
        data,
    })
  };
}
 const authenticationAPI = new AuthApi();

 export default authenticationAPI;