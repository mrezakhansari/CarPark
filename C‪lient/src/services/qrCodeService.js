import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/qrLink/";


export const getAllQrLinks = () => {
    return http.get(apiEndpoint + 'getQrLinks');
}