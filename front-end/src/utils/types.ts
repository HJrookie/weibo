type getObjectType<Type> = {
  [K in keyof Type]: Type[K];
};

const weiboBlogItem = {
  "id": 1,
  "createdAt": "2024-01-24T05:46:48.842Z",
  "blogCreateAt": "2024-01-24T14:04:37.899Z",
  "updatedAt": "2024-01-24T05:46:48.844Z",
  "content": "首页看到一堆感慨世事无常，还有觉得岁数大了身体不行的……\n\n要不说顺则凡，逆则仙。我没有啊！！！我这几年状态越来越好，不光是心态好，身子也越来越灵活轻盈舒服[笑cry]\n\n我妈这几天感慨好多次，去年这时候还跟我死倔，说她年纪大了练不了那些功，现在简直返老还童十岁，出去练剑还被围观拍掌呢[允悲]\n\n而且咱们这些功又不花钱（省得说我借机割韭菜[二哈]）。反正练功修道这事儿，年纪越大，差别越明显——肉眼可见地明显，不是自我安慰。算了，都是机缘。爱信信，不信走好您[作揖][作揖][作揖]",
  "isLongText": true,
  "authorId": null,
  blogImages: [{
    "id": 91,
    "url": "https://wx3.sinaimg.cn/large/8c4c1f79ly1hlg90yhke0j235s2dce82.jpg",
    "fileName": "NA6BftQQH.jpg",
    "blogId": 62,
    "createdAt": "2024-01-26T11:10:09.649Z"
  }
  ]
};

const UserData = {
  "id": 1,
  "profile": {
    "id": 1,
    "userId": 1,
    "uid": "2353799033",
    "name": "关自不在",
    "gender": "f",
    "followersCount": 164824,
    "description": "佛理，医理，命理，理事无碍，事事无碍。工号：关自不在。",
    "blogAddress": "http://blog.sina.com.cn/astrobuddhism",
    "education": "",
    "realName": ""
  }
}

const imageItem = {
  "id": 421,
  "url": "http://localhost:3000/api/imgProxy?url=https://wx3.sinaimg.cn/large/66eec50cly1hm75b4wng9j20zu1l2top.jpg",
  "originalUrl": "https://wx3.sinaimg.cn/large/66eec50cly1hm75b4wng9j20zu1l2top.jpg",
  "fileName": "NDDSFnG1P-66eec50cly1hm75b4wng9j20zu1l2top.jpg",
  "blogId": 245,
  "createdAt": "2024-01-29T07:56:39.314Z",
  "downloadState": 0,
  "uuid": "66eec50cly1hm75b4wng9j20zu1l2top",
  "belongToBlog": {
    "id": 245,
    "createdAt": "2024-01-29T07:56:39.213Z",
    "blogCreateAt": "2024-01-26T09:15:20.000Z",
    "updatedAt": "2024-01-29T07:56:39.213Z",
    "content": "$zan她1-27赞过的微博(21)网友说：已经晚期了，如果去世了，就真的死无对证了。<br /><a href=\"//s.weibo.com/weibo?q=%23%E4%B8%AD%E5%B1%B1%E5%A4%A7%E5%AD%A6%23\" target=\"_blank\">#中山大学#</a> ，<a href=\"//s.weibo.com/weibo?q=%23%E4%B8%AD%E5%B1%B1%E5%A4%A7%E5%AD%A6%E9%9B%86%E4%BD%93%E6%82%A3%E7%99%8C%23\" target=\"_blank\">#中山大学集体患癌#</a>，<a href=\"//s.weibo.com/weibo?q=%23%E4%B8%AD%E5%B1%B1%E4%BA%8C%E9%99%A2%23\" target=\"_blank\">#中山二院#</a> ​​​",
    "isLongText": false,
    "authorId": 1
  }
}

export type BlogItem = getObjectType<typeof weiboBlogItem>;
export type ImageItem = getObjectType<typeof imageItem>;
export type UserListType = getObjectType<typeof UserData>;
