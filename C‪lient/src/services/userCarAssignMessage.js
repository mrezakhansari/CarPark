import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/userCarAssignMessage/";


export const saveMessage = (messageData) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'saveMessage', messageData);
}

