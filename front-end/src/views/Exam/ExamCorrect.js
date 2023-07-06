import React from "react";
import "./ExamCorrect.less";
import QuestionCard from "page/Exam/QuestionCard/QuestionCard";
import { Input, message, Modal, Button } from "antd";
import Question from "components/Exam/Question/Question";
import moment from "moment";
import CountDownCom from "components/CountDown";
import Slider from "react-slick";
import { connect } from "react-redux";
import { tempSaveStudentExamAnswers } from "api/api/exam";

export default class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      examId: props.match.params.examId,
      type: props.match.path.split("/")[2],
      ExamData: [],
      queIndex: null,
      restTime: null,
      questions: [],
      loading: false,
      totalScore: 100,
      message: "",
      questionTypeList: {
        1: "单选题",
        2: "多选题",
        3: "判断题",
        4: "简答题",
        5: "技能题",
      },
      questionColor: {
        1: "blue",
        2: "cyan",
        3: "green",
        4: "red",
        5: "orange",
      },
      examExactStartTimeId: null,
    };
  }

  componentDidMount() {
    this.getExamData();
  }

  getExamData = () => {
    const { id, examId, type } = this.state;
    // 这里就是改卷子的逻辑,
    this.post(`/newexam/examNewResult/correctDetail`, { id, examId }).then((res) => {
      let totalScore = 0;
      res.data.list.map((item) => {
        // 这里不会展示教师的真实评论,......
        item.type !== 5 && item.answer === item.examPaperAnswerVO.answer
          ? (item.examPaperAnswerVO.teacherComment = "棒棒哒！加油！")
          : (item.examPaperAnswerVO.teacherComment = "知识点掌握不牢固，下次努力！加油！");
        totalScore += parseInt(item.examPaperAnswerVO.score === null ? 0 : item.examPaperAnswerVO.score);
      });

      res.data.list.sort((x, y) => {
        return x.type - y.type;
      });
      this.setState({
        ExamData: res.data,
        questions: res.data.list,
        message: res.data.common,
        totalScore,
      });
    });
  };
  onIndexChange = (index) => {
    this.setState(
      {
        queIndex: index,
      },
      () => {
        const target = document.querySelector(`#id${this.state.queIndex}`);
        target
          ? target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          : false;
      }
    );
  };
  setUpChoose = (type, id, val) => {
    const questionWithAnswer = [...this.state.ExamData.list];
    if (this.state.type !== "answer") {
      questionWithAnswer.map((item) => {
        item.id === id ? (item.examPaperAnswerVO[type] = val) : false;
      });
      let totalScore = 0;
      questionWithAnswer.map((item) => {
        //console.log(totalScore)
        totalScore += parseFloat(!!item.examPaperAnswerVO.score ? item.examPaperAnswerVO.score : 0);
      });

      this.setState({
        totalScore,
      });
    }
    if (type === 1 || type === 3 || type === 4) {
      questionWithAnswer.map((item) => {
        item.id === id ? (item.answer = val) : false;
      });
    } else if (type === 2) {
      questionWithAnswer.map((item) => {
        if (item.id === id) {
          if (item.answer === null || item.answer === "") {
            item.answer = val;
          } else {
            let arr = item.answer.split("");
            let index = arr.indexOf(val);
            index !== -1 ? arr.splice(index, 1) : arr.push(val);
            item.answer = Array.from(new Set(arr.sort())).toString().replace(/,/g, "");
          }
        }
      });
    } else if (type === 5) {
      console.log("上传文件：", id, val);
      if (val.file && val.file.status === "done") {
        // console.log("questionWithAnswer", questionWithAnswer);
        let files = [];
        val.fileList.map((item) => files.push(item.response));
        questionWithAnswer.map((item) => {
          // 原来的写法比较奇怪,改成正常写法
          // item.id === id ? (item.files = files) : false;
          if (item.id === id) {
            item.files =
              [
                ...val.fileList?.map((fileInfo) => {
                  // response 这个字段并不是一定有的, 如果这个文件是上次答题时提交的文件,那么就没有response字段,如果是新上传的文件,是有response字段的
                  return fileInfo?.response ? { ...fileInfo?.response } : { ...fileInfo };
                }),
              ] ?? [];
          }
        });
      } else if (id === "delete") {
        let id = val?.response?.id || val?.id;
        this.post(`/newexam/examPaperAnswerFile/delete`, id).then((res) => {
          return res.data === "";
        });
        // 当某个文件被移除时
      } else if (val?.file?.status === "removed") {
        questionWithAnswer.map((item) => {
          if (item.id === id) {
            item.files = [...val.fileList] ?? [];
          }
        });
      }
    }
    this.setState({
      questions: questionWithAnswer,
    });
  };

  // 当倒计时结束时, 调用本方法,  haveNoTime 为 true , 用户手动提交时 haveNoTime 为 false
  submitCorrectResult = (haveNoTime = false) => {
    let { ExamData, questions } = this.state;
    let list = [];
    let allQuestionCorrected = true; // 代表所有的题目都被老师改过了,
    questions.map((item) => {
      let obj = {};
      if (item.examPaperAnswerVO.score === null) {
        allQuestionCorrected = false;
      }
      obj.id = item.examPaperAnswerVO.id;
      obj.teacherComment = item.examPaperAnswerVO.teacherComment;
      obj.score = item.examPaperAnswerVO.score;

      list.push(obj);
    });
    if (allQuestionCorrected) {
      let examNewResult = {
        id: this.state.id,
        comment: this.state.message,
      };
      this.post(`/newexam/examNewResult/correctPaper`, { examNewResult, list }).then((res) => {
        if (res.data === "") {
          Modal.success({
            content: "批改试卷成功！",
            onOk: () => {
              window.close();
              window.opener.postMessage({
                refresh: true,
              });
            },
          });
        }
      });
    } else {
      Modal.warning({
        content: "还有题目没有评分，不能提交哦！",
        onOk: () => {
          return false;
        },
      });
    }
  };

  render() {
    const role = localStorage.getItem("role");
    const { ExamData, questions, type, totalScore, message, restTime } = this.state;
    // const shouldInput = type === "answer" || type === "correct";
    const shouldInput = true;

    return (
      <div id="Exam-correct" className={"role-" + role}>
        <div className="home-layout">
          <main className="home-page-container">
            <div className="content">
              <div id="Exam">
                <main>
                  <header>
                    <div className="exam_title">
                      <div className="exam_title_name">
                        <span>考试名称：</span>
                        <h1>{ExamData.name}</h1>
                      </div>
                    </div>
                  </header>

                  <div className="content">
                    <div id="com-question">
                      {questions.map((item, index) => {
                        return (
                          <div
                            id={`id${index}`}
                            key={item.id}
                            className={`question ${this.state.queIndex === index ? "selectedQue" : ""}`}
                          >
                            <span className={`question_number ${this.state.queIndex === index ? "selected" : ""}`}>
                              {index + 1}.
                            </span>
                            <Question
                              previewType={type}
                              props={item}
                              setUpChoose={this.setUpChoose}
                              role={role}
                              shouldInput={shouldInput}
                              downloadUrlState={1}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <QuestionCard
                        onIndexChange={(e, index) => this.onIndexChange(index)}
                        questions={questions}
                        endTime={restTime}
                        // endTime={ExamData.endTime}
                        duration={ExamData.duration}
                        totalScore={totalScore}
                        submitAnswer={this.submitCorrectResult}
                        previewType={type}
                        loading={this.state.loading}
                        type={type}
                        {...this.props}
                      >
                        {type === "preview" && (
                          <div>
                            <span>寄语：</span>
                            <Input.TextArea
                              placeholder="写下您想对学生说的话。。。"
                              autosize={{ minRows: 2, maxRows: 4 }}
                              value={message}
                              disabled={type === "preview"}
                              onChange={(e) => this.setState({ message: e.target.value })}
                            />
                          </div>
                        )}
                      </QuestionCard>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
