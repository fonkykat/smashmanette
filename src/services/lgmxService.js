import {API_BASE_URL} from "@/services/contants";
import axios from "axios";

export const BASE_BUTTON_URL = API_BASE_URL + '/lgmx'
export const getSongs = function(){
    return axios.get(BASE_BUTTON_URL + '/songs')
}

export const editSong = function(song, id){
    return axios.put(BASE_BUTTON_URL + '/songs/edit/'+id, song)
}

export const addSong = function(song){
    return axios.post(BASE_BUTTON_URL + '/songs', song)
}
