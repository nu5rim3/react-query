import axios from "axios";
import { baseUrl } from "../constants/apiUrls";

export const getPosts = () => {
    return axios.get(`${baseUrl}/posts`, { params: { _sort: "title" } }).then(res => res.data)
}

export const getPostsPaginated = (page: number) => {
    return axios
        .get(`${baseUrl}/posts`, {
            params: { _page: page, _sort: "title", _limit: 2 },
        })
        .then(res => {
            const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
            return {
                nextPage: hasNext ? page + 1 : undefined,
                previousPage: page > 1 ? page - 1 : undefined,
                posts: res.data,
            }
        })
}

export const getPost = (id: number) => {
    return axios.get(`${baseUrl}/posts/${id}`).then(res => res.data)
}

export const createPost = (data: {title: string, body: string}) => {
    return axios
        .post(`${baseUrl}/posts/`, {
            title: data.title,
            body: data.body,
            userId: 1,
            id: Date.now(),
        })
        .then(res => res.data)
}