import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/userCarAssign/";


export const getUserCarAssignInfoBasedOnQrCode = (qrCodeInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'getUserCarAssignInfoBasedOnQrCode', qrCodeInfo);
}

