import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/userCarAssign/";


export const getUserCarAssignInfoBasedOnQrCode = (qrCodeInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'getUserCarAssignInfoBasedOnQrCode', qrCodeInfo);
}

export const getAllUserCarAssignInfo = () => {
    //console.log('api for edit user info', userInfo)
    return http.get(apiEndpoint + 'getAllUserCarAssignInfo');
}

export const addNewAssignInfo = (assignInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'addNewAssignInfo', assignInfo);
}
