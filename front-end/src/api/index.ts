// import { AxiosResponse } from "axios/index";
//
// export interface CommonResponse extends AxiosResponse {
//   result?: Record<string, any>;
// }
let BASE = "http://10.103.237.163/api";

// if (process.env.EVN_CONFIG === "production") {
//   const Http = new XMLHttpRequest();
//   Http.open("GET", "./config.json", false);
//   Http.send(null);
//   if (Http.readyState === 4) {
//     const res = JSON.parse(Http.responseText);
//     BASE = res.REACT_APP_BASE;
//     PVE_HOST = res.REACT_APP_PVE_HOST;
//     WEBSOCKET = res.REACT_APP_WEBSOCKET;
//     WEBSOCKET_CHAT = res.REACT_APP_WEBSOCKET_CHAT;
//   }
// }

export const UPLOAD = `${BASE}/zuul/lls`;
