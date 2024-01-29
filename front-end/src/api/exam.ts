import service from "@/api/request";
import { AxiosResponse } from "axios";
// import { CommonObject } from "@/api/index";

export interface CommonObject {
  [key: string]: any;
}

export function getVideos(params: any): Promise<CommonObject> {
  return service({
    url: "/videos",
    method: "POST",
    data: params,
  });
}


export function getWeibos(params: any): Promise<CommonObject> {
  return service({
    url: "/weibos",
    method: "POST",
    data: params,
  });
}


export function syncUser(data: Record<string, any>): Promise<CommonObject> {
  return service({
    url: "/syncUser",
    method: "POST",
    data
  });
}
export function syncWeibos(data: Record<string, any>): Promise<CommonObject> {
  return service({
    url: "/syncWeibo",
    method: "POST",
    data
  });
}


export function getImages(data: Record<string, any>): Promise<CommonObject> {
  return service({
    url: "/images",
    method: "POST",
    data
  });
}



export function getUsers(params: any): Promise<CommonObject> {
  return service({
    url: "/users",
    method: "POST",
    data: params,
  });
}

export function examStart(params: any): Promise<CommonObject> {
  return service({
    url: "/newexam/exam/examStart",
    method: "get",
    params: params,
  });
}

export function submitExam(data: any): Promise<CommonObject> {
  return service({
    url: "/newexam/examNewResult/submit",
    method: "post",
    data: data,
  });
}
export function tempSaveStudentExamAnswers(data) {
  return service({
    url: "/newexam/examPaperAnswer/batchSave",
    method: "post",
    data: data,
  });
}

export function getCurrentUser() {
  return service({
    url: "/permit/user/currentUser",
    method: "get",
  });
}

export function deleteAnsFile(data) {
  return service({
    url: "/newexam/examPaperAnswerFile/delete",
    method: "post",
    data: data,
  });
}

export function getPveAddress() {
  return service({
    url: "/newexam/examPaperQuestionFile/getPveUrl",
    method: "get",
  });
}

export function getVieeoDetail(data) {
  return service({
    url: "/videoDetail",
    method: "post",
    data,
  });
}
