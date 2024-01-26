import { PrismaClient, User } from "@prisma/client";
import { downloadImage } from "../../api/api";
import { downloadImageHeader } from "../../header";
const fs = require('fs')
const prisma = new PrismaClient();


export const saveImage = async (user: User, blog: Record<string, any>, url: string, fileName?: string) => {
    const _fileName = fileName ?? `${user.name}-${blog.mblogid}-${url}-${fileName}`;
    await downloadImage(url,)
        .then((res: { data: any; }) => {
            fs.writeFileSync(_fileName, res.data)
        }).catch((err: any) => {
            console.log(`download Image error ---> ${_fileName}`, err)
        })
    await prisma.
}

export const checkBlog = async (content: string, blogInfo: Record<string, any>, authorInfo: any, user: User) => {
    const checkExist = await prisma.blog.findFirst({
        where: {
            content,
        },
    });

    if (!checkExist) {
        await prisma.blog.create({
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
        let url = imageDetail.largest as string;
        await saveImage(user, blogInfo, url,)
        await prisma.image.create({data:{
            url:imageDetail.largest.url as string,
            fileName:
        }})
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

