const cookie = 'XSRF-TOKEN=7qTLRca0WNCi6SaIWYCDogAT; _s_tentry=weibo.com; Apache=3062632588069.405.1685272167157; SINAGLOBAL=3062632588069.405.1685272167157; ULV=1685272167187:1:1:1:3062632588069.405.1685272167157:; login_sid_t=9cc66a4a950b1e62df6d9ee2fde7ea3e; cross_origin_proto=SSL; WBtopGlobal_register_version=2023061018; UOR=,,login.sina.com.cn; SSOLoginState=1700048710; SCF=Ah7Q5qO0i6_Idglomt0A1pad7wAHIEsqHATxbQfR3oHLJuZ4sAHJHBXaO5XO-_YAq254iAzejced_5IDlsfcaFo.; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWDYrd5hSa5Pfd_qzyE4RP55JpX5KMhUgL.Fo-NeoeX1KqNeh.2dJLoI0YLxKBLBonL1h5LxKqL1-zLBozLxK-LB-BLBKBLxK.LBonLB.qLxK-L1h-LBK-LxKqLBKzLBKqLxKqL1-BLBK-t; ALF=1716176357; SUB=_2A25LJ0i1DeRhGeNJ6VEV-SjLyzWIHXVoXcR9rDV8PUJbkNAGLWfikW1NS_JDM5igVs70_dEOPYav_Any9Dpybqy3; WBPSESS=nLYDcTTZPPS4-Kwz2riLykCEJdx2db_oUAF9VH-ms1uRzGgwM1njTnnXwY0PkscEip4bHbpL2KQoQuNr08RhOBMpbIFZhAarMdWcLfTgneeRsU6OIEiS78lwfaGlUklQbwWRsjo0Tgr__uuQt4Dq1g==';

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