import React from "react";
import { Button, Checkbox, Input, Radio, Tag, Upload } from "antd";
import "./SingleQuestionPreview.less";
import { UPLOAD } from "src/api/base";
import { download } from "src/api/axios";
import utils from "src/Utils/Utils";
import { PaperClipOutlined, UploadOutlined } from "@ant-design/icons";
import { PhotoConsumer, PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/index.css";
import { getPveAddress } from "api/api/exam";

/*
*
*
* 单个题目预览时的显示,
*
*
*
*
*
* */

let questionAnswerType = (item, answer = false, setUpChoose = null, shouldInput = false, role) => {
  // https://gitee.com/MinJieLiu/react-photo-view#https://minjieliu.github.io/react-photo-view
  // 用的是这个组件,此外 这个工具栏的代码 部分来源于 该项目的 example 目录中 的代码
  const handleToolbarRender = ({ images, rotate, onRotate, onScale, scale, index }) => {
    const id = images[index]?.originRef?.dataset?.id;
    return (
      <>
        <svg
          className="PhotoView-PhotoSlider__toolbarIcon"
          width="44"
          height="44"
          viewBox="0 0 768 768"
          fill="white"
          onClick={() => onScale(scale + 0.2)}
        >
          <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
        </svg>
        <svg
          className="PhotoView-PhotoSlider__toolbarIcon"
          width="44"
          height="44"
          viewBox="0 0 768 768"
          fill="white"
          onClick={() => onScale(scale - 0.2)}
        >
          <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
        </svg>
        <svg
          className="PhotoView-PhotoSlider__toolbarIcon"
          onClick={() => onRotate(rotate + 90)}
          width="44"
          height="44"
          fill="white"
          viewBox="0 0 768 768"
        >
          <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
        </svg>
        <Button onClick={() => download(`/newexam/examNewResult/downLoadAnswerFile/${id}`)}>下载</Button>
      </>
    );
  };

  const fileProps = {
    name: "file",
    action: `${UPLOAD}/newexam/examNewResult/uploadAnswerFile`,
    withCredentials: true,
    headers: {
      authorization: "authorization-text",
      token: localStorage.getItem("token"),
    },
    onChange: (fileList) => setUpChoose(5, item.id, fileList),
    onRemove: (file) => setUpChoose(5, "delete", file),
    defaultFileList: (item.examPaperAnswerVO?.files ?? item.examPaperAnswerVO?.fileList ?? []).map((v, index) => ({
      ...v,
      name: v.fileName,
      uid: index,
      status: "done",
    })),
  };
  const options = ["A", "B", "C", "D", "E", "F", "G", "H"];
  if (item.type === 2 || item.type === 1) {
    return (
      <ul className="question-options">
        {options.map((val, index) => {
          return (
            item[`option${val}`] && (
              <li
                className="options_item"
                key={index}
                onClick={() => (setUpChoose ? setUpChoose(item.type, item.id, val) : null)}
              >
                {
                  //checked={item.answer?item.answer.IndexOf(val):false}
                  item.type === 1 ? (
                    <Radio checked={answer ? answer.indexOf(val) !== -1 : false} />
                  ) : (
                    <Checkbox checked={answer ? answer.indexOf(val) !== -1 : false} />
                  )
                }
                <span className="label">{val}.</span>
                {item[`option${val}`]}
              </li>
            )
          );
        })}
      </ul>
    );
  } else if (item.type === 3) {
    return (
      <div className="question-options">
        <Button onClick={() => setUpChoose(item.type, item.id, "Y")} type={answer === "Y" ? "primary" : "default"}>
          正确
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          onClick={() => (setUpChoose ? setUpChoose(item.type, item.id, "N") : null)}
          type={answer === "N" ? "primary" : "default"}
        >
          错误
        </Button>
      </div>
    );
  } else if (item.type === 4 && shouldInput && role !== "T") {
    return (
      <Input.TextArea
        value={item.answer}
        placeholder="请输入你的答案"
        autosize={{ minRows: 2, maxRows: 4 }}
        onChange={(e) => setUpChoose(item.type, item.id, e.target.value)}
      />
    );
  } else if (item.type === 5) {
    let files = item.examPaperAnswerVO && item.examPaperAnswerVO.files;
    // 分别获取图片 以及其他类型的文件
    const { imgs, others } = (files || []).reduce(
      (prev, cur) => {
        if (utils.isImage(cur.fileType)) {
          prev.imgs.push(cur);
        } else {
          prev.others.push(cur);
        }
        return prev;
      },
      { imgs: [], others: [] }
    );
    const style = {
      display: "flex",
    };
    // 开始实训,跳转到实训界面
    const beginTrain = () => {
      getPveAddress().then((res) => {
        if (!res) {
          return;
        }
        let url = res.data || "";
        window.open(url, "_blank");
      });
    };

    const renderImgsAndOtherFiles = () => {
      return files && files.length > 0 ? (
        <div className="question-annex-wrapper">
          <div className={"files-text"}>
            {role === "S" ? "我的答案" : "学生提交附件"}
            <PaperClipOutlined />:
          </div>
          <div className={"question-annex-fileList"}>
            {/*渲染图片*/}
            {imgs.length ? (
              <div className={"ans-imgs"}>
                <PhotoProvider
                  imageClassName={"ans-img"}
                  viewClassName={"ans-imgs-wrap"}
                  toolbarRender={handleToolbarRender}
                >
                  {imgs.map((item, index) => (
                    <PhotoConsumer key={index} src={item.filePath} intro={item.fileName}>
                      <img src={item.filePath} alt="" height={80} data-id={item.id} />
                    </PhotoConsumer>
                  ))}
                </PhotoProvider>
              </div>
            ) : (
              ""
            )}

            <div className={"ans-others"}>
              {others.map((item) => (
                <a
                  style={{ display: "block" }}
                  key={item.id}
                  onClick={() => download(`/newexam/examNewResult/downLoadAnswerFile/${item.id}`)}
                >
                  {item.fileName}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null;
    };

    // 对于学生
    if (role === "S") {
      if (shouldInput) {
        return (
          <div style={style}>
            {/*当学生答题时,并且是技能题时,才出现这个按钮*/}
            <Button style={{ marginRight: 10 }} type={"primary"} onClick={() => beginTrain()}>
              开始实训
            </Button>
            <Upload {...fileProps}>
              <Button>
                <UploadOutlined /> 上传你的答案
              </Button>
            </Upload>
          </div>
        );
      }
      return renderImgsAndOtherFiles();
    } else {
      return renderImgsAndOtherFiles();
    }
  }
};

const Question = ({ props, setUpChoose, role = "T", shouldInput = false, previewType, isMob, downloadUrlState }) => {
  /**
   * props:每道题的数据
   * setUpChoose:输入函数
   * role:判断是否显示答案
   * shouldInput:判断是否需要输入
   **/
  const {
    category,
    majorName,
    lessionName,
    stem,
    point,
    type,
    difficultyLevel,
    list,
    answer,
    analysis,
    createTime,
    files,
    fileList,
    id,
    knowledgeList,
    skills,
  } = props;
  let showBackground = (item, opacity = 0.2) => {
    if (!item.examPaperAnswerVO) {
      return `rgba(228, 222, 222, ${opacity})`;
    }
    const score = (item.examPaperAnswerVO && item.examPaperAnswerVO.score) || 0;
    return score > 0 ? `rgba(15, 153, 130,${opacity})` : `rgba(252, 80, 85,${opacity})`;
  };
  const FILELIST = fileList || files; //后端命名不一致
  const questionType = {
    1: "单选题",
    2: "多选题",
    3: "判断题",
    4: "简答题",
    5: "技能题",
  };
  const questionColor = {
    1: "blue",
    2: "cyan",
    3: "green",
    4: "red",
    5: "orange",
  };
  const xLevel = {
    1: "初级",
    2: "中级",
    3: "高级",
  };
  const xType = {
    1: "理论题",
    2: "实操题",
  };
  const CHOICE = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const downloadUrl = "/newexam/examQuestion/downLoadQuestionFile/";
  const formatDownloadArgs = (state) => {
    if (state === null || state === undefined) {
      return "";
    }
    return `?state=${state}`;
  };

  return (
    <div id="single-question-wrapper">
      <div className="com-question" style={{ marginTop: "5px" }}>
        <div className="com-question-body" style={{ paddingRight: isMob ? 0 : 50 }}>
          <div>
            <Tag color={questionColor[type]}>{questionType[type]}</Tag>
            {point && <Tag color="#2db7f5">{`${point}分`}</Tag>}
            {category === 2 && (type == 4 || type == 5) ? <div dangerouslySetInnerHTML={{ __html: stem }}></div> : stem}
          </div>
          {category == 2 ? (
            <div>
              <div>
                <p>{knowledgeList && `知识点:`}</p>
                {knowledgeList &&
                knowledgeList.map((val, i) => {
                  return <Tag key={i}>{val.content}</Tag>;
                })}
              </div>
              <div>
                <p>{skills && `技能点:`}</p>
                {skills &&
                skills.map((val, i) => {
                  return <Tag key={i}>{val.content}</Tag>;
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/*图片文件有就显示*/}
        <div className="question-img-wrapper" style={{ textAlign: "center" }}>
          {list.length > 0
            ? list.map((item, i) => {
              return <img key={i} style={{ maxWidth: 500, maxHeight: 300 }} src={item.showPath || item.path} alt="" />;
            })
            : null}
        </div>
        {FILELIST && FILELIST.length > 0 && (
          <div className="question-annex-wrapper">
            <div>
              附件
              <PaperClipOutlined />:
            </div>
            <div className="question-annex-fileList">
              {FILELIST.map((item) => {
                return (
                  <a
                    style={{ display: "block" }}
                    key={item.id}
                    onClick={() => download(`${downloadUrl}${item.id}${formatDownloadArgs(downloadUrlState)}`)}
                  >
                    {item.fileName}
                  </a>
                );
              })}
            </div>
          </div>
        )}
        {/*答题时可选否则不可选*/}
        {/*选项内容：单选--单选框、多选--多选框、简答--输入框、判断题--按钮、技能题--答题时可以上传*/}
        {questionAnswerType(props, answer, role === "S" && shouldInput ? setUpChoose : null, shouldInput, role)}
        {/*答案解析除答题外时间都显示*/}
        {(role === "T" || (role === "S" && !shouldInput) || role === "PM" || role === "M") && (
          <div>
            {props.examPaperAnswerVO && props.examPaperAnswerVO.answer && (
              <div
                style={{
                  backgroundColor: showBackground(props),
                  marginTop: 10,
                }}
                className="student-answer"
              >
                学生答案：
                {type === 3 ? (props.examPaperAnswerVO.answer === "N" ? "错误" : "正确") : props.examPaperAnswerVO.answer}
              </div>
            )}
            <div
              className="question-answer"
              style={{
                backgroundColor: showBackground(props, 0.4),
              }}
            >
              正确答案：
              {type === 3 ? (answer === "N" ? "错误" : "正确") : answer}
            </div>
            <div
              style={{
                backgroundColor: showBackground(props),
              }}
              className="question-analysis"
            >
              题目解析：{analysis}
            </div>
            {props.examPaperAnswerVO && previewType !== "view" && (
              <div className="question-score">
                <span className="title">得分：</span>
                <Input
                  disabled={type === 3 || type === 2 || type === 1 || !shouldInput}
                  onChange={(e) => setUpChoose("score", props.id, utils.numRules(e.target.value, 0, point))}
                  value={props.examPaperAnswerVO.score}
                  style={{ width: 80 }}
                  placeholder="输入得分"
                />
              </div>
            )}
            {props.examPaperAnswerVO && props.examPaperAnswerVO.teacherComment && previewType !== "view" && (
              <div className="teacher-comment">
                <span className="title">点评：</span>
                <Input
                  disabled={!shouldInput}
                  style={{ width: "90%" }}
                  onChange={(e) => setUpChoose("teacherComment", props.id, e.target.value)}
                  value={props.examPaperAnswerVO.teacherComment}
                />
              </div>
            )}
            {type === 5 && props.examPaperAnswerVO && props.examPaperAnswerVO.managerComment && previewType !== "view" && (
              <div className="teacher-comment">
                <span className="title">产品经理点评：</span>
                <Input disabled={true} style={{ width: "79%" }} value={props.examPaperAnswerVO.managerComment} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Question;
