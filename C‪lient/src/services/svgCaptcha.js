import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/captcha";


export const getCaptcha = () => {
    //console.log(apiEndpoint)
    return http.get(apiEndpoint);
}