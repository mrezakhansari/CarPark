import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user/";


export const getAllUsers = () => {
    //console.log(apiEndpoint)
    return http.get(apiEndpoint + 'getAllUsers');
}

export const getUserTypes = () => {
    //console.log(apiEndpoint)
    return http.get(apiEndpoint + 'getUserTypes');
}

export const addNewUserInfo = (userInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'addNewUserInfo',userInfo);
}

export const addNewUserInfoFull = (userInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'addNewUserInfoFull',userInfo);
}

export const deleteUserInfo = (userId) => {
    //console.log(apiEndpoint + `/${userId}`)
    return http.delete(apiEndpoint + 'Delete' + `?Id=${userId}`);
}

export const updateUserStatusToActive = (userInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'Activate',userInfo);
}

export const updateUserStatusToInactive = (userInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.post(apiEndpoint + 'DeActivate',userInfo);
}

export const editUserInfo = (userInfo) => {
    //console.log('api for edit user info', userInfo)
    return http.put(apiEndpoint + 'Update' ,userInfo);
}

