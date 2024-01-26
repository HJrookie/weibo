import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import { syncUser } from "./userImpl";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/users", async (req, res) => {
  const { page, pageSize } = req.body;

  const result = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        profile: true,
      },
    }),
  ]);
  res.json({
    status: "success",
    data: result[1] ?? [],
    total: result[0] ?? 0,
  });
});

router.post("/syncUser", async (req, res) => {
  //   console.log(req.body);
  await syncUser({ uid: req.body.uid })
  res.json({
    status: "success",
    data: [],
    message: '',
  });
});



export default router;
