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
  "authorId": null
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

export type BlogItem = getObjectType<typeof weiboBlogItem>;
export type UserListType = getObjectType<typeof UserData>;
