import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/registerDriver/";

export const registerDriver = (info) => {
    return http.post(apiEndpoint , info);
}