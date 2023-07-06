import { Prisma, PrismaClient } from "@prisma/client";
import { getFileSize, getVvidFromCode, isVideoFile } from "../../utils";
const fs = require("fs");
import express, { query } from "express";
const path = require("path");
var cors = require("cors");
const prisma = new PrismaClient();
import header from "../../header";
import { getBlogList, getLongBlog } from "../../api/api";
const router = express.Router();

router.post("/videos", async (req, res) => {
  const { page, pageSize } = req.body;

  const result = await prisma.$transaction([
    prisma.video.count(),
    prisma.video.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        actors: true,
        fengmian: true,
        previewImgs: true,
      },
    }),
  ]);

  //   console.log(req.body);
  res.json({
    status: "success",
    data: result[1] ?? [],
    total: result[0] ?? 0,
  });
});

router.post("/syncWeibo", async (req, res) => {
  const data = {
    uid: 2353799033,
    page: 1,
    feature: 0,
  };
  // 获取微博 并且存储到数据库中 最好去重
  getBlogList(data).then((response) => {
    // console.log('22222', res)
    const blogList = response.data.data.list;
    let blog = blogList[0];

    getLongBlog({
      id: blog.mblogid,
    }).then(res2 => {
      const text = res2.data.data.longTextContent
      console.log(11, text)
    })

    // res.json({
    //   status: "success",
    //   data: { ...response.data },
    //   total: 0,
    // });
  });
});

router.get("/videos", async (req, res) => {
  // console.log("2222", req.query);
  const result = await prisma.video.findMany();
  //   console.log(req.body);
  res.json(result);
});

router.post("/videoDetail", async (req, res) => {
  const data = req.body;
  const result = await prisma.video.findUnique({ where: { id: data.id } });
  // console.log(555, result);
  res.json({ result });
});

router.put("/video:id", async (req, res) => { });
router.get("/videoAdd", async (req, res) => {
  await prisma.video.create({
    data: {
      code: "111",
      fielPath: "22",
      size: "3",
    },
  });

  const allUsers = await prisma.video.findMany({});
  res.json(allUsers);
});

export default router;
