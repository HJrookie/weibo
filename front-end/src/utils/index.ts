import Cookies from "js-cookie";

const TokenKey = "Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}








//节流函数
// import { BASE_URL } from "api/base";

let throttle = (fn, delay = 1000) => {
  let preTime = Date.now();
  return (e) => {
    const context = this;
    e.presist && e.presist();
    let doTime = Date.now();
    if (doTime - preTime >= delay) {
      fn.apply(context);
      preTime = Date.now();
    }
  };
};
//防抖函数
let debounce = (fn, wait = 500) => {
  let timeout;
  return function (...args) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
//只能是数字，限制大小
let numRules = (val, min, max) => {
  if (val === "" || val == null) {
    return "";
  }
  if (!isNaN(Number(val))) {
    if (Math.ceil(val) > min) {
      if (Math.ceil(val) < max) {
        return val;
      } else {
        return max;
      }
    } else {
      return min;
    }
    /*return Math.ceil(val)>min?Math.ceil(val)<max?Math.ceil(val):max:min*/
  } else {
    return min;
  }
};
//获取当前日期是今年的第几周
let getWeekOfYear = () => {
  let currentDate = new Date();
  let startDay = new Date();
};

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isValid(value) {
  return value !== null && value !== undefined;
}

function tableCellWidth(value) {
  return () => ({
    style: {
      maxWidth: value,
      minWidth: value,
    },
  });
}

function isImage(fileType) {
  fileType = fileType?.trim()?.toLowerCase();
  const imgs = [
    "bmp",
    "jpg",
    "png",
    "tif",
    "gif",
    "pcx",
    "tga",
    "exif",
    "fpx",
    "svg",
    "psd",
    "cdr",
    "pcd",
    "dxf",
    "ufo",
    "eps",
    "ai",
    "raw",
    "WMF",
    "webp",
    "avif",
    "apng",
    "jpeg",
  ];

  return imgs.includes(fileType);
}

function isDev() {
  return process.env.NODE_ENV === "development";
}

// function getHostname() {
//   return BASE_URL.replace("/api/lls", "");
// }

function getTargetUrl(url) {
  let index = url.indexOf("/file");
  if (index === -1) {
    return url;
  }
  // console.log('url',url,index,url.slice(index))
  return url.slice(index);
}

const utils = {
  debounce,
  throttle,
  numRules,
  isValid,
  uuid,
  tableCellWidth,
  isImage,
  isDev,
  // getHostname,
  getTargetUrl,
};
export default utils;

