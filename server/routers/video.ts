import { Prisma, PrismaClient } from "@prisma/client";
import { getFileSize, getVvidFromCode, isVideoFile } from "../utils";
const fs = require("fs");
import express, { query } from "express";
const path = require("path");
var cors = require("cors");
const prisma = new PrismaClient();

const router = express.Router();

router.post("/videos", async (req, res) => {
  // console.log("2222", req.query);
  // console.log("2222", req.params);
  // console.log("2222", req.body);
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

router.post("/syncVideo", async (req, res) => {
  function readFileInfoAndSync(fileInfo: string = "", fileName: string) {
    fs.stat(fileInfo, async function (err: any, stats: any) {
      const filePath = path.join(__dirname, fileInfo);
      console.log(fileName);
      let vvidMatch = fileName.match(/([a-zA-Z]+)(\-?)(\d{3,4})/);
      let vvId = vvidMatch ? vvidMatch?.[0] : fileName;
      await prisma.video.create({
        data: {
          code: fileName,
          fielPath: fileInfo,
          size: getFileSize(stats.size),
          vvId,
        },
      });
      // console.log(size, filePath); //true
    });
  }

  function getDiskVideos(initDirs: string[] = ["D:/"]) {
    const promise = Promise.resolve();
    for (let i = 0; i < initDirs.length; i++) {
      let initDir = initDirs[i];

      // 1. 读取目录中的文件
      const directoryFiles: string[] = fs.readdirSync(initDir).filter((v: string) => {
        if (v?.[0] === "$" || v?.[0] === ".") {
          // 跳过隐藏文件
          return false;
        }
        if (v === "Recovery" || v === "System Volume Information") {
          return false;
        }
        return true;
      });

      // console.log(i, initDir, directoryFiles);
      // 跳过这个目录
      if (directoryFiles.includes("node_modules")) {
        continue;
      }

      // 2. 读取文件信息
      directoryFiles.forEach((directoryFile) => {
        // 如果是一个目录
        if (fs.lstatSync(path.join(initDir, directoryFile)).isDirectory()) {
          getDiskVideos([path.join(initDir, directoryFile)]);
        } else {
          //video 后缀
          if (isVideoFile(directoryFile)) {
            new Promise<void>((res, rej) => {
              setTimeout(() => {
                res();
              }, 10);
            }).then(() => {
              readFileInfoAndSync(path.join(initDir, directoryFile), directoryFile);
            });
          }
        }
      });
    }

    // directoryFiles.map((directoryInfo) => {});
    // console.log(directoryFiles);
  }

  // let dir = "/Users/alex_sun/Desktop/联想课程资料";
  let dir = "D:/";
  getDiskVideos([dir]);

  res.json({
    status: "success",
    data: [],
    total: 0,
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
