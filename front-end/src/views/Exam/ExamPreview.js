import React from "react";
import "./ExamPreview.less";
import QuestionCard from "page/Exam/QuestionCard/QuestionCard";
import { Input, message, Modal, Button } from "antd";
import Question from "components/Exam/Question/Question";
import Slider from "react-slick";
import { connect } from "react-redux";

@connect((state) => ({
  isMob: state.userAgent.isMob,
  isPad: state.userAgent.isPad,
}))
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
      timer: null, // 定时提交答题结果
    };
  }

  componentDidMount() {
    this.getExamData();
  }
  componentWillUnmount() {
    clearInterval(this.state.timer); // 清除暂存数据的定时器
  }

  getArrRandomly = (arr) => {
    var len = arr.length;
    //首先从最大的数开始遍历，之后递减
    for (var i = len - 1; i >= 0; i--) {
      //随机索引值randomIndex是从0-arr.length中随机抽取的
      var randomIndex = Math.floor(Math.random() * (i + 1));
      //下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
      var itemIndex = arr[randomIndex];
      arr[randomIndex] = arr[i];
      arr[i] = itemIndex;
    }
    //每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
    return arr;
  };

  getExamData = () => {
    const { id, examId, type } = this.state;
    if (type === "preview") {
      this.post(`/newexam/examNewResult/correctDetail`, { id, examId }).then((res) => {
        let totalScore = res.data.score;
        res.data.list.map((item) => {
          // 这里不会展示教师的真实评论,......
          // item.type !== 5 && item.answer === item.examPaperAnswerVO.answer
          //   ? (item.examPaperAnswerVO.teacherComment = "棒棒哒！加油！")
          //   : (item.examPaperAnswerVO.teacherComment = "知识点掌握不牢固，下次努力！加油！");
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
    } else if (type === "view") {
      this.get(`/newexam/examPaper/detail/${examId}`).then((res) => {
        res.data.list.sort((x, y) => {
          return x.type - y.type;
        });
        this.setState({
          ExamData: res.data,
          questions: res.data.list,
          message: res.data.common,
        });
      });
    }
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

  formatIdCard = (value) => {
    if (!value?.trim() || !value) {
      return "-";
    }
    let str = "";
    for (let i = 0; i < value.length; i++) {
      if (i <= 5 || i >= 12) {
        str += value[i];
      } else {
        str += "*";
      }
    }
    return str;
  };

  // 当倒计时结束时, 调用本方法,  haveNoTime 为 true , 用户手动提交时 haveNoTime 为 false
  submitAnswer = (haveNoTime = false) => {
    let { ExamData, questions } = this.state;
    let list = [];
    let achieve = true;
    if (this.state.type !== "answer") {
      questions.map((item) => {
        let obj = {};
        if (item.examPaperAnswerVO.score === null) {
          achieve = false;
        }
        obj.id = item.examPaperAnswerVO.id;
        obj.teacherComment = item.examPaperAnswerVO.teacherComment;
        obj.score = item.examPaperAnswerVO.score;

        list.push(obj);
      });
      if (achieve) {
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
    }
  };

  render() {
    const role = localStorage.getItem("role");
    let { isMob, isPad } = this.props;
    // pad 与 手机样式相同
    isMob = isPad || isMob;
    const { ExamData, questions, type, totalScore, message, restTime } = this.state;

    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      // 一页显示多少个
      slidesToShow: 1,
      rows: 2,
      // 滚动的时候   向左或者 向右 滚动几个
      slidesToScroll: 1,
      slidesPerRow: 5,
    };
    // const shouldInput = type === "answer" || type === "correct";
    const shouldInput = false;

    // console.log(isMob, shouldInput, restTime);

    return (
      <div id="Exam-preview" className={"role-" + role}>
        <div className="home-layout">
          <main className="home-page-container">
            <div className="content">
              <div id="Exam">
                <main>
                  <header>
                    <div className="exam_title">
                      <div className="exam_title_name">
                        {isMob ? null : <span>考试名称：</span>}
                        <h1>{ExamData.name}</h1>
                      </div>
                    </div>
                  </header>
                  {isMob && (
                    <>
                      <h3 style={{ textAlign: "center" }}>考试得分: {totalScore}</h3>
                      <div className={"count-and-slider"}>
                        <div
                          className={"slider-container" + (isPad ? " pad" : "")}
                          onClick={(e) => {
                            this.onIndexChange(e.target.dataset.id);
                          }}
                        >
                          <Slider {...settings}>
                            {questions.map((item, index) => {
                              const score = (item.examPaperAnswerVO && item.examPaperAnswerVO.score) || 0;
                              return (
                                <div
                                  className={`slider-item ${type === "answer" ? (item.answer ? "is-answered" : "") : ""} ${
                                    type === "preview" ? (score > 0 ? "is-correct" : "is-wrong") : ""
                                  } `}
                                  data-id={index}
                                  key={questions.id}
                                >
                                  {index + 1}
                                </div>
                              );
                            })}
                          </Slider>
                        </div>
                      </div>
                    </>
                  )}
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
                              isMob={isMob}
                              setUpChoose={this.setUpChoose}
                              role={role}
                              shouldInput={shouldInput}
                              downloadUrlState={1}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {!isMob && (
                      <div>
                        <QuestionCard
                          onIndexChange={(e, index) => this.onIndexChange(index)}
                          questions={questions}
                          endTime={restTime}
                          // endTime={ExamData.endTime}
                          duration={ExamData.duration}
                          totalScore={totalScore}
                          submitAnswer={this.submitAnswer}
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
                    )}

                    {isMob && type === "preview" && (
                      <div className={"submit-button"} onClick={() => window.close()}>
                        不看了
                      </div>
                    )}
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
