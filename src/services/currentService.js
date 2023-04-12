import {API_BASE_URL} from "@/services/contants";
import axios from "axios";

export const BASE_BUTTON_URL = API_BASE_URL + '/current'
export const getChap = function(){
    return axios.get(BASE_BUTTON_URL)
}
export const setChap = function(number){
    return axios.put(BASE_BUTTON_URL+'/'+number)
}

export const setNextTrue = function(){
    return axios.put(BASE_BUTTON_URL+'/next/true')
}
