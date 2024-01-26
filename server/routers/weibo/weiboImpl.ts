import { PrismaClient, Profile, User } from "@prisma/client";
import { downloadImage } from "../../api/api";
import { downloadImageHeader } from "../../header";
const fs = require('fs')
const prisma = new PrismaClient();


export const saveImage = async (user: (User & {
    profile: Profile | null;
}) | null, blog: Record<string, any>, url: string, fileName: string) => {
    await downloadImage(url,)
        .then((res: { data: any; }) => {
            fs.writeFileSync(fileName, res.data)
        }).catch((err: any) => {
            console.log(`download Image error ---> ${fileName}`, err)
        })
}

export const checkBlog = async (content: string, blogInfo: Record<string, any>, authorInfo: any, user: (User & {
    profile: Profile | null;
})) => {
    let blogObj = await prisma.blog.findFirst({
        where: {
            content,
        },
    });

    if (!blogObj) {
        blogObj = await prisma.blog.create({
            data: {
                content,
                isLongText: blogInfo.isLongText,
                blogCreateAt: new Date(blogInfo.created_at),
                author: { ...authorInfo }
            }
        });
    }

    // images check
    if (blogInfo.pic_num <= 0) { return }
    const imageInfos = blogInfo.pic_infos ?? {};
    for (let [k, imageDetail] of Object.entries<Record<string, any>>(imageInfos)) {
        let url = imageDetail.largest.url as string;
        console.log(111111, url)
        // const fileName = `${user.profile?.name}-${blogInfo.mblogid}-${url}`;
        const fileName = `${blogInfo.mblogid}.jpg`;

        await saveImage(user, blogInfo, url, fileName)
        await prisma.image.create({
            data: {
                url: imageDetail.largest.url as string,
                fileName,
                belongToBlog: {
                    connect: {
                        id: blogObj.id
                    }
                }

            }
        })
    }



    // pic_num

    // blog.text, {
    //     content: blog.text,
    //     isLongText: false,
    //     blogCreateAt: new Date(blog.created_at),
    //     author: { ...authorArgs }
    //   }

}


export const CalcLongAndShortBlogs = (blogList: any[]) => {
    const { shortBlogs, longBlogs } = blogList.reduce<{ longBlogs: any[]; shortBlogs: any[] }>(
        (prev, cur) => {
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
    return [shortBlogs, longBlogs]
}

