import axios from "axios";
import { getToken } from "@/utils";
import { message, Modal } from "antd";

console.log(33, import.meta.env);
let downloadLoadingInstance;
// 是否显示重新登录
let isReloginShow;

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 业务服务,代表本系统的后台的服务
const service = axios.create({
  // http://10.103.237.163/api/lls/newexam/exam/studentPage
  baseURL: import.meta.env.VITE_BASE_URL ?? "",
  // 超时
  timeout: 10000,
});

const interceptorFulfilledHandler = (config: any) => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false;
  // 是否需要防止数据重复提交
  if (getToken() && !isToken) {
    config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.headers["token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJ0bmVyIiwiYXVkIjoibGVub3ZvZWR1IiwibmJmIjoxNjc1NjY3MzkyLCJpc3MiOiJsZW5vdm9lZHUiLCJleHAiOjE2NzYyNzIxOTIsImlhdCI6MTY3NTY2NzM5MiwiZW1haWwiOiIyNjAwMjM0MDhAcXEuY29tIn0.mlZK2MfrOuamE51ymcZkImoE9orLHRsIfB_jBVu7wiY";

  return config;
};

const responseFulfilledHandler = (res: any) => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = res?.data?.msg;
  // 二进制数据则直接返回
  if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
    return res.data;
  }
  if (code === 401) {
    // if (!isReloginShow) {
    //   isReloginShow = true;
    // MessageBox.confirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", {
    //   confirmButtonText: "重新登录",
    //   cancelButtonText: "取消",
    //   type: "warning",
    // })
    //   .then(() => {
    //     isReloginShow = false;
    //     store.dispatch("LogOut").then(() => {
    //       // 如果是登录页面不需要重新加载
    //       // if (window.location.hash.indexOf("#/login") != 0) {
    //       location.href = "/login";
    //       // }
    //     });
    //   })
    //   .catch(() => {
    //     isReloginShow = false;
    //   });
    // }
    return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
  } else if (code === 500) {
    // Message({
    //   message: msg,
    //   type: "error",
    // });
    return Promise.reject(new Error(msg));
  } else if (code !== 200 && code !== "succeed") {
    // Notification.error({
    //   title: msg,
    // });
    return Promise.reject("error");
  } else {
    return res;
  }
};
const responseRejectedHandler = (error: any) => {
  // console.log("err" + error);
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }
  // Message({
  //   message: message,
  //   type: "error",
  //   duration: 5 * 1000,
  // });
  return Promise.reject(error);
};

// 请求拦截器
service.interceptors.request.use(interceptorFulfilledHandler, (error) => {
  console.log(error);
  Promise.reject(error);
});
// 响应拦截器
service.interceptors.response.use(responseFulfilledHandler, responseRejectedHandler);

// 通用下载方法

const downloadService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? "",
  timeout: 60 * 1000, // request timeout
});

export const downloadFile = (config: any, customFileName: any) => {
  return downloadService(config).then((ress) => {
    const fileName = customFileName || decodeURI((ress.headers["content-disposition"] || "").split("filename=")[1].trim().replace('"', "").replace('"', ""));
    const a = document.createElement("a");
    const blob = new Blob([ress.data], { type: "application/octet-stream" });
    const objectUrl = URL.createObjectURL(blob);
    a.setAttribute("href", objectUrl);
    a.setAttribute("download", fileName);
    a.click();
  });
};

export let checkCode = (res) => {
  //console.log("22222",res)
  if (!res) {
    return false;
  }
  if ((res && res.data && res.data.code) || (res && res.data && res.data.msg) || (res && res.data && res.data.message)) {
    //引入第三方showMessage插件显示错误
    if (res.data.message && res.data.code !== "0") {
      message.error(res.data.message);
      return false;
    } else if (res.data.msg) {
      message.error(res.data.msg);
      return false;
    } else {
      return res;
    }
  } else {
    return res;
  }
};
export let checkStatus = (res) => {
  if (res.status === 200 || res.status === 304) {
    return res;
  } else if (res.status === 401) {
    // if (!window.isLoginExpire) {
    //   window.isLoginExpire = true;
    //   Modal.info({
    //     title: "登录失效",
    //     okText: "确定",
    //     content: (
    //       <div>
    //         <p> 当前登录状态已失效，点击确定返回首页重新登录</p>
    //       </div>
    //     ),
    //     onOk() {
    //       window.location.replace(`${window.location.origin}/#/login`);
    //     },
    //   });
    // }
  } else if (res.status === 500) {
    message.error("服务器开小差了");
  } else {
    //引入第三方showMessage插件显示错误
    if (res.data && res.data.message && res.data.message.search("not have permission") != -1) {
      message.error("权限不足，请联系管理员!");
    } else {
      message.error(res.data.message);
    }
    return {
      code: res.status,
      message: res.statusText,
    };
  }
};

export let download = async (url, params) => {
  downloadService({ url, params, responseType: "blob" })
    .then(checkStatus)
    .then(checkCode)
    .then((res) => {
      let a = document.createElement("a");
      let blob = new Blob([res.data], { type: "application/octet-stream" });
      let objectUrl = URL.createObjectURL(blob);
      a.setAttribute("href", objectUrl);
      a.setAttribute("download", decodeURI(res.headers["content-disposition"].split("filename=")[1].trim().replace('"', "").replace('"', "")));
      console.log(res.headers["content-disposition"].split("filename=")[1]);
      a.click();
      document.body.removeChild(a);
    });
};

export default service;
