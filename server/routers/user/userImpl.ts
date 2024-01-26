import { Prisma, PrismaClient } from "@prisma/client";
import { getUserInfo } from "../../api/api";
const prisma = new PrismaClient();

export const syncUser = async (args: { uid: string }) => {
    if (!args.uid) { return }
    // 1. 用户入库
    const { data: userInfo } = await getUserInfo({ uid: +args.uid });
    const user = userInfo?.data?.user ?? {};
    const _user = await prisma.profile.findUnique({
        where: {
            uid: args.uid,
        },
    });

    const info = {
        name: user?.screen_name ?? "",
        gender: user?.gender,
        followersCount: user?.followers_count,
        description: user?.description,
        blogAddress: user?.url,
    }

    if (!_user) {
        await prisma.user.create({
            data: {
                profile: {
                    create: {
                        ...info,
                        uid: args.uid,
                    },
                },
            },
        });
    } else {
        await prisma.profile.update({
            where: {
                uid: args.uid,
            },
            data: {
                ...info,
            }
        })
    }
}
