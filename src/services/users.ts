import axios from "axios";
import { baseUrl } from "../constants/apiUrls";

export const getUser = (id: number) => {
    return axios.get(`${baseUrl}/users/${id}`).then(res => res.data)
}