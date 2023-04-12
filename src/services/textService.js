import {API_BASE_URL} from "@/services/contants";
import axios from "axios";

export const BASE_BUTTON_URL = API_BASE_URL + '/text'
export const getText = function(){
    return axios.get(BASE_BUTTON_URL)
}
