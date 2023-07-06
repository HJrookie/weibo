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

const actorData = {
  "id": 1,
  "email": "alice@prisma.io",
  "name": "Alice",
  "prevName": "",
};

export type StudentExamListType = getObjectType<typeof studentExamList>;
export type actorListType = getObjectType<typeof actorData>;
