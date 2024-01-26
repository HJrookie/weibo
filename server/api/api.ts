import header, { downloadImageHeader } from "../header";

const axios = require("axios");

export interface HttpResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

export function getBlogList(data: Record<string, any>): Promise<HttpResponse<Record<string, any>>> {
    return axios.request({
        url: "https://weibo.com/ajax/statuses/mymblog",
        method: "get",
        params: data,
        headers: header
    });
}


export function getLongBlog(data: Record<string, any>): Promise<HttpResponse<Record<string, any>>> {
    return axios.request({
        url: "https://weibo.com/ajax/statuses/longtext",
        method: "get",
        params: data,
        headers: header
    });
}


export function getUserInfo(data: Record<string, any>): Promise<HttpResponse<Record<string, any>>> {
    return axios.request({
        url: "https://weibo.com/ajax/profile/info",
        method: "get",
        params: data,
        headers: header
    });
}



export const downloadImage = (url: string) => {

    return axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        responseType: 'arraybuffer',
        url: url,
        headers: {
            ...downloadImageHeader
        }
    })
}