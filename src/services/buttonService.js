import {BASE_URL} from "@/services/contants";
import axios from "axios";

export const BASE_BUTTON_URL = BASE_URL + '/buttons'
export const incrButton = function(name){
    return axios.put(BASE_BUTTON_URL + '/' + name + '/incr')
}

export const resetButton = function(){
    return axios.delete(BASE_BUTTON_URL)
}

export const getButtons = function(){
    return axios.get(BASE_BUTTON_URL)
}

export const postButtonPress = function(name, press){
    return axios.post((BASE_BUTTON_URL + '/' + name + '/press'), press)
}

export const getButtonPress = function(){
    return axios.get(BASE_BUTTON_URL + '/press/all')
}

export const deleteAllButtonPress = function(){
    return axios.delete(BASE_BUTTON_URL + '/press/all')
}
