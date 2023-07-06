import { Prisma, PrismaClient } from "@prisma/client";
import { getFileSize, getVvidFromCode, isVideoFile } from "./utils";
const fs = require("fs");
import express, { query } from "express";
const path = require("path");
var cors = require("cors");
import userApi from "./routers/user";
import videoApi from "./routers/video";
import weiboApi from "./routers/weibo/weibo";
const prisma = new PrismaClient();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", userApi);
app.use("/api", videoApi);
app.use("/api", weiboApi);

const server = app.listen(3000, () =>
  console.log(` 🚀 Server ready at: http://localhost:3000`)
);

async function addNewData() {
  // 新增
  await prisma.user.create({
    data: {
      name: "cc",
      email: "cc@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

// async function update() {
//   // 更新
//   const post = await prisma.post.update({
//     where: { id: 1 },
//     data: { published: true },
//   });
//   console.log(post);
// }

//   update()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

// npx prisma

// prisma.user.create({
//   data: {
//     email: "1",
//   },
// });
// addNewData();
// console.log(fs.readdirSync("D:/"));
// readFileInfoAndSync();

// adddNewVideo();

async function updateVideoVvid() {
  const result = await prisma.video.findMany({});
  result.map(async (item) => {
    console.log(item.id);

    await prisma.video.update({
      where: {
        id: item.id,
      },
      data: {
        vvId: getVvidFromCode(item.code),
      },
    });
  });
}

// updateVideoVvid();
