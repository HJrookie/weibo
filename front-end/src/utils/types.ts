type getObjectType<Type> = {
  [K in keyof Type]?: Type[K];
};
const studentExamList = {
  "id": 26,
  "code": "2-Unit01-现代操作系统起源.mp4",
  "fielPath": "../LESSON 02/03-视频单元/mp4/2-Unit01-现代操作系统起源.mp4",
  "size": "137.48MB",
  "createdAt": "2023-02-07T07:47:38.013Z",
  "updatedAt": "2023-02-07T07:47:38.022Z",
};

const UserData = {
  "id": 2,
  "profile": {
    "id": 2,
    "userId": 2,
    "uid": "2353799033",
    "name": "关自不在",
    "gender": "f",
    "followersCount": 82063,
    "description": "佛理，医理，命理，理事无碍，事事无碍。工号：关自不在。"
  }
}

export type StudentExamListType = getObjectType<typeof studentExamList>;
export type UserListType = getObjectType<typeof UserData>;
