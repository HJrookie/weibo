import moment from 'moment'
import { port } from '..';

export function isVideoFile(fileName: string) {
  const suffixs = [
    ".mp4",
    ".3gp",
    ".avi",
    ".wmv",
    ".mpeg",
    ".mpg",
    ".mkv",
    ".mov",
    ".flv",
    ".swf",
    ".qsv",
    ".kux",
    ".mpg",
    ".rm",
    ".ts",
    ".ram",
  ];
  return suffixs.some((suffix) => fileName.toLocaleLowerCase().endsWith(suffix));
}

export function getFileSize(v: number) {
  let arr = ["B", "KB", "MB", "GB"],
    i = 0;
  while (v > 1000) {
    v = v / 1000;
    i++;
  }
  return v.toFixed(2) + arr[i];
}

export function getVvidFromCode(s: string) {
  s = s.replace(/=/, "-");
  return (s.match(/([a-zA-Z]){2,5}[-=0]{1,5}([0-9]+)/g)?.[0] ?? "").toLocaleUpperCase();
}


export const sleep = (t: number) => new Promise<void>(res => setTimeout(() => res(), t * 1000))

// 解决 403 问题
export const replaceImageUrl = (imgUrl: string) => {
  // 原始地址: https://wx1.sinaimg.cn/large/63eaf69fly1hjwmahh23bj20u014mn0w.jpg
  // 替换后:  http://localhost:3000/api/imgProxy?url=https://wx1.sinaimg.cn/large/63eaf69fly1hjwmahh23bj20u014mn0w.jpg
  return `http://localhost:${port}/api/imgProxy?url=${imgUrl}`
}