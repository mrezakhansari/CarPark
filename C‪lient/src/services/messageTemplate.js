import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/messageTemplate/";


export const getMessageTemplates = () => {
    return http.get(apiEndpoint + 'getMessageTemplates');
}

