import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/car/";


export const getAllCars = () => {
    return http.get(apiEndpoint + 'getAllCars');
}

export const addNewCarInfo = (carInfo) => {
    return http.post(apiEndpoint + 'addNewCarInfo', carInfo);
}

export const updateCarInfo = (carInfo) => {
    return http.put(apiEndpoint + 'updateCarInfo', carInfo);
}

export const deleteCarInfo = (carInfo) => {
    return http.delete(apiEndpoint + 'deleteCarInfo', carInfo);
}