import { useEffect, useState } from "react";
import tinymce, { Editor } from 'tinymce'
import "./richText.less"
// @ts-ignore
import { weiboFaceParse } from 'weibo-face'
import { parstBlogContent } from '@/utils/index'
type RichTextProps = {
    content: string;
}

export const RichText = (props: RichTextProps) => {
    const [editor, setEditor] = useState<Editor | null>(null)
    const [content, setContent] = useState<string | null>(null)
    const [zanInfo,setZanInfo] = useState<string | null>(null)

    useEffect(() => {
        if (props.content) {
            if(props.content.startsWith('$zan')){
                let index = props.content.indexOf(')')
                setContent(parstBlogContent(props.content.slice(index+1)))
setZanInfo(props.content.slice(4,index+1))
            }else{
                setContent(parstBlogContent(props.content))

            }
        }
        // editor.setContent(weiboFaceParse(`${props.content}`));
    }, [])
    // useEffect(() => {
    //     tinymce
    //         .init({
    //             selector: `textarea#editor`, // "textarea#editor"
    //             height: 500,
    //             language: "zh_CN",
    //             toolbar:
    //                 "undo redo | blocks | " +
    //                 "bold italic backcolor | alignleft aligncenter " +
    //                 "alignright alignjustify | bullist numlist outdent indent | " +
    //                 "removeformat ",
    //             content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:16px } img {max-width:100%;} .weibo-face{
    //                 width: 18px;
    //                 height: 18px;
    //                 vertical-align: -4px;
    //                 margin: 0 1px;
    //               }`,
    //             init_instance_callback: (editor) => {
    //                 // 可以在这里手动给 dom 赋值
    //                 if (props.content) {
    //                     if(props.content.includes('<img')){
    //                     editor.setContent((`${props.content}`));
    //                     }else{
    //                     editor.setContent(weiboFaceParse(`${props.content}`));
    //                     }
    //                     // editor.setContent(weiboFaceParse(`${props.content}`));

    //                 } else {
    //                     editor.setContent(``);
    //                 }
    //             },
    //         })
    //         .then((editors: any[]) => {
    //             setEditor(editors[0])
    //         });

    //         return ()=>{
    //             // editor?.destroy()
    //             tinymce.remove();  //ok
    //             console.log(333333)
    //         }
    // }, [])

    return <> 
    <div className="zan">
{zanInfo}
    </div>
    <div className="rich-text" dangerouslySetInnerHTML={{ __html: content || '' }}></div>
        {/* <textarea id={"editor"}>

        </textarea> */}
    </>
}



