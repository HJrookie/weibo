const cookie = 'login_sid_t=1f06b58f90f1f7f7bd16759db6b2d7e7; cross_origin_proto=SSL; _s_tentry=passport.weibo.com; Apache=3466355927550.6504.1661334537529; SINAGLOBAL=3466355927550.6504.1661334537529; ULV=1661334537559:1:1:1:3466355927550.6504.1661334537529:; XSRF-TOKEN=l_DSnFBZPcPDzwH_AxuMnIDl; WBtopGlobal_register_version=2022101810; UPSTREAM-V-WEIBO-COM=35846f552801987f8c1e8f7cec0e2230; SSOLoginState=1684203536; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWDYrd5hSa5Pfd_qzyE4RP55JpX5KMhUgL.Fo-NeoeX1KqNeh.2dJLoI0YLxKBLBonL1h5LxKqL1-zLBozLxK-LB-BLBKBLxK.LBonLB.qLxK-L1h-LBK-LxKqLBKzLBKqLxKqL1-BLBK-t; ALF=1691143478; SCF=AmOk5zPMKliQpWoWuOLAiSYsHB65AciX2lt07iQy9Oq0D-ZCYxUd-OL_WpmbXVRXgxiNKp0BDxPxQZtikn3BXrI.; SUB=_2A25JoTBnDeRhGeNJ6VEV-SjLyzWIHXVq1yavrDV8PUNbmtAGLXTXkW9NS_JDMzfuFlSlwd8cwGzDIGqnKpTeLZQg; WBPSESS=nLYDcTTZPPS4-Kwz2riLykCEJdx2db_oUAF9VH-ms1uRzGgwM1njTnnXwY0PkscE4L_ZHbTwEzq-fdYAE5I_17-PJcrqp8jIy3a7x-K-OYQnwmNI5QkI1fuM6ykoYIeEylQy_Kjmt3vnDS14XWv3hw==';

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
