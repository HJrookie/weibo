import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/users", async (req, res) => {
  // console.log("2222", req.query);
  const result = await prisma.user.findMany();
  //   console.log(req.body);
  res.json(result);
});

router.post("/users", async (req, res) => {
  // console.log("2222", req.query);
  // console.log("2222", req.params);
  // console.log("2222", req.body);
  const { page, pageSize } = req.body;

  const result = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  //   console.log(req.body);
  res.json({
    status: "success",
    data: result[1] ?? [],
    total: result[0] ?? 0,
  });
});


router.post("/syncUser", async (req, res) => {


  //   console.log(req.body);
  res.json({
    status: "success",
    data: [],
    total: 0,
  });
});

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   // 删除
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(post);
// });

//   // 查询
//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy as Prisma.SortOrder,
//     },
//   });

//   res.json(posts);
// });

export default router;
