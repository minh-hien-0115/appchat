import { appInfor } from "../contants/appInfor";
import axiosClient from "./axiosClient";

class AuthApi {
  HandleAuthentication = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`/auth${url}`, { //${appInfor.BASE_URL}/auth
        method: method ?? 'get',
        data,
    })
  };
}
 const authenticationAPI = new AuthApi();

 export default authenticationAPI;