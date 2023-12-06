import {API_BASE_URL} from "@/services/contants";
import axios from "axios";

export const BASE_CONCERT_URL = API_BASE_URL + '/concert'

export const sayHello = function(){
    return axios.get(BASE_CONCERT_URL+'/hello')
}

export const getTodays = function() {
    return axios.get(BASE_CONCERT_URL + '/today')
}
