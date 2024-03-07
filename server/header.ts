const cookie = 'login_sid_t=1f06b58f90f1f7f7bd16759db6b2d7e7; cross_origin_proto=SSL; _s_tentry=passport.weibo.com; Apache=3466355927550.6504.1661334537529; XSRF-TOKEN=l_DSnFBZPcPDzwH_AxuMnIDl; WBtopGlobal_register_version=2022101810; UPSTREAM-V-WEIBO-COM=35846f552801987f8c1e8f7cec0e2230; ULV=1692675410333:1:1:1:3466355927550.6504.1661334537529:; UOR=,,www.google.com; SINAGLOBAL=3466355927550.6504.1661334537529; SCF=AmOk5zPMKliQpWoWuOLAiSYsHB65AciX2lt07iQy9Oq01VNvaH9i7XUs0Ct-5b4xMiiXp_AALmtY8mvXkGHDn6M.; SSOLoginState=1704333140; ALF=1711501401; SUB=_2A25I35MJDeRhGeNJ6VEV-SjLyzWIHXVrlKrBrDV8PUJbkNAGLUXckW1NS_JDMxmS7OJQr8im7p-r4v52-zTHbnp3; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWDYrd5hSa5Pfd_qzyE4RP55JpX5KMhUgL.Fo-NeoeX1KqNeh.2dJLoI0YLxKBLBonL1h5LxKqL1-zLBozLxK-LB-BLBKBLxK.LBonLB.qLxK-L1h-LBK-LxKqLBKzLBKqLxKqL1-BLBK-t; WBPSESS=nLYDcTTZPPS4-Kwz2riLykCEJdx2db_oUAF9VH-ms1uRzGgwM1njTnnXwY0PkscEip4bHbpL2KQoQuNr08RhOBGs85HK3SvQRwWXZmIdzqkzEkEqUWHOYw099BYspcbq6PV9Thr2RbwNKY_AOThMmw==';

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