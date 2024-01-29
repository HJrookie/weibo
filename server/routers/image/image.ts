import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/images", async (req, res) => {
    const { page, pageSize } = req.body;

    const result = await prisma.$transaction([
        prisma.image.count(),
        prisma.image.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                belongToBlog: true,
            },
        }),
    ]);
    res.json({
        status: "success",
        data: result[1] ?? [],
        total: result[0] ?? 0,
    });
});




export default router;
