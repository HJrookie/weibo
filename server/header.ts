const cookie = 'XSRF-TOKEN=q-nIZrds9ZsdbkLJvEb7rHpj; login_sid_t=bf4745553b3584dd28f3074e35078e09; cross_origin_proto=SSL; _s_tentry=passport.weibo.com; Apache=4526254939714.358.1711934723230; SINAGLOBAL=4526254939714.358.1711934723230; ULV=1711934723232:1:1:1:4526254939714.358.1711934723230:; WBtopGlobal_register_version=2024040109; UOR=,,www.google.com; ALF=1729305176; SUB=_2A25L7_0IDeRhGeNJ6VEV-SjLyzWIHXVohXDArDV8PUJbkNAGLXDhkW1NS_JDM4DGDPtDJv3y8x-_pm4IZih3n4M7; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWDYrd5hSa5Pfd_qzyE4RP55JpX5KMhUgL.Fo-NeoeX1KqNeh.2dJLoI0YLxKBLBonL1h5LxKqL1-zLBozLxK-LB-BLBKBLxK.LBonLB.qLxK-L1h-LBK-LxKqLBKzLBKqLxKqL1-BLBK-t; WBPSESS=nLYDcTTZPPS4-Kwz2riLykCEJdx2db_oUAF9VH-ms1uRzGgwM1njTnnXwY0PkscEip4bHbpL2KQoQuNr08RhOPZhh8w8Fja5c4tC_VWOX3PY8E3HFmIFzCqIol5RXGcWTQoRaAtuAujBaje9lJl4UQ==';

const header = {
    authority: "weibo.com",
    accept: "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "client-version": "v2.40.83",
    dnt: "1",
    referer: "https://weibo.com/u/2353799033",
    "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "server-version": "v2023.07.05.2",
    traceparent: "00-fa236363f9d809c2a5e1a3e70546cd64-f0e5dacc2403b521-00",
    "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67",
    "x-requested-with": "XMLHttpRequest",
    "x-xsrf-token": "l_DSnFBZPcPDzwH_AxuMnIDl",
    cookie,
};
export default header;


export const downloadImageHeader = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "cross-site",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "Referer": "https://weibo.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}