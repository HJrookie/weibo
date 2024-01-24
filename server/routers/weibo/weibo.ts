import { Prisma, PrismaClient } from "@prisma/client";
import { getFileSize, getVvidFromCode, isVideoFile } from "../../utils";
const fs = require("fs");
import express, { query } from "express";
const path = require("path");
var cors = require("cors");
const prisma = new PrismaClient();
import header from "../../header";
import { getBlogList, getLongBlog, getUserInfo } from "../../api/api";
const router = express.Router();

// router.post("/videos", async (req, res) => {
//   const { page, pageSize } = req.body;

//   const result = await prisma.$transaction([
//     prisma.video.count(),
//     prisma.video.findMany({
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//       include: {
//         actors: true,
//       },
//     }),
//   ]);

//   //   console.log(req.body);
//   res.json({
//     status: "success",
//     data: result[1] ?? [],
//     total: result[0] ?? 0,
//   });
// });

const getBlogsByPage = async (pageArgs: { uid: string; page: number; feature: number }) => {
  // 1. 用户入库
  const { data: userInfo } = await getUserInfo({ uid: +pageArgs.uid });
  const user = userInfo?.data?.user ?? {};

  const _user = await prisma.profile.findUnique({
    where: {
      uid: pageArgs.uid,
    },
  });

  if (!_user) {
    await prisma.user.create({
      data: {
        profile: {
          create: {
            name: user?.screen_name ?? "",
            gender: user?.gender,
            followersCount: user?.followers_count,
            description: user?.description,
            uid: pageArgs.uid,
          },
        },
      },
    });
  }

  // 获取微博 并且存储到数据库中

  getBlogList(pageArgs).then(async (response) => {
    const blogList = response.data.data.list;

    // 区分 长博文 和 短博文
    const { shortBlogs, longBlogs } = blogList.reduce(
      (prev: { longBlogs: any[]; shortBlogs: any[] }, cur: { isLongText: any }) => {
        if (cur.isLongText) {
          prev.longBlogs.push(cur);
        } else {
          prev.shortBlogs.push(cur);
        }
        return prev;
      },
      {
        shortBlogs: [],
        longBlogs: [],
      }
    );
    // short insert
    shortBlogs.map((blog: { text: any }) => {
      prisma.blog.create({
        data: {
          content: blog.text,
          isLongText: false,
        },
      });
    });
    // long insert
    longBlogs.map((blog: Record<string, any>) => {
      return new Promise<void>((resolve) => {
        getLongBlog({
          id: blog.mblogid,
        })
          .then(async (res) => {
            const blogInfo = res.data.data.longTextContent;
            // 检查 blog 是否存在
            const checkExist = await prisma.blog.findFirst({
              where: {
                content: blogInfo,
              },
            });

            if (!checkExist) {
              await prisma.blog.create({
                data: {
                  content: blogInfo,
                  isLongText: true,
                  blogCreateAt: new Date(blog.created_at).getTime(),
                },
              });
            }
            setTimeout(() => {
              resolve();
            }, 2000);
          })
          .catch((err) => {
            console.log("get long error", blog.mblogid);
            throw new Error("11");
          });
      });
    });
  });
};

router.post("/syncWeibo", async (req, res) => {
  let arr = [
    147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164,
    165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183,
    184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202,
    203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221,
    222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
    241, 242, 243, 244, 245,
  ];

  arr.reduce((prev, cur) => {
    return prev.then(() => {
      return new Promise<void>((resol) => {
        console.log("page -->", cur);
        getBlogsByPage({
          uid: "2353799033",
          feature: 0,
          page: cur,
        })
          .then(() => {
            setTimeout(() => {
              resol();
            }, 10 * 1000);
          })
          .catch((err) => {
            throw new Error("00");
          });
      }).catch((err) => {
        throw new Error("-1");
      });
    });
  }, Promise.resolve());

  // res.json({
  //   status: "success",
  //   data: { ...response.data },
  //   total: 0,
  // });
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

export default router;
