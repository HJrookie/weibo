import "./Exam.less";
import QuestionCard from "./QuestionCard/QuestionCard";
import { Input, message, Modal, Button } from "antd";
import Question from "@/components/Exam/Question/Question";
import moment from "moment";
import CountDownCom from "@/components/CountDown";
import Slider from "react-slick";
// import { connect } from "react-redux";
// import { formatIdCard } from "page/UserProfile/UserProfile";
// import { getCurrentUser } from "api/auth";
import { useLocation, useParams } from "react-router-dom";

// @connect((state) => ({
//   isMob: state.userAgent.isMob,
//   isPad: state.userAgent.isPad,
// }))
import React, { useState, useEffect, createRef } from "react";
import { CommonObject, deleteAnsFile, examStart, getCurrentUser, submitExam, tempSaveStudentExamAnswers } from "@/api/exam";

const Exam: React.FC = (props) => {
  const [page, setPage] = useState<number>(1);
  const [confirmVis, setconfirmVis] = useState(false);
  const location = useLocation();
  const _params = useParams();
  // console.log(33333, location, _params);

  // id: props.match.params.id,
  //   examId: props.match.params.examId,
  //   type: props.match.path.split("/")[2],

  const [id, setid] = useState(_params.id);
  const [examId, setexamId] = useState(_params.examId);
  const [type, settype] = useState(location.pathname.split("/")[2]);
  const [ExamData, setExamData] = useState<[]>([]);
  const [queIndex, setqueIndex] = useState(null);
  const [restTime, setrestTime] = useState<any>(null);
  const [questions, setquestions] = useState<CommonObject[]>([]);
  const [loading, setloading] = useState(false);
  const [totalScore, settotalScore] = useState<number>(0);
  const [_message, setmessage] = useState("");
  const [examExactStartTimeId, setexamExactStartTimeId] = useState(null);
  const [timer, settimer] = useState<any>(null); // 定时提交答题结果
  const [studentInfo, setstudentInfo] = useState<any>({}); // 学生的个人信息
  const [studentInfoVis, setstudentInfoVis] = useState(false); // 确认学生个人信息页面是否显示
  const [countTimer, setcountTimer] = useState<any>(null); // 学生阅读考试须知 15s 的倒计时的定时器
  const [countValue, setcountValue] = useState<number>(15); // 学生阅读考试须知 15s 的倒计时 显示的值

  const [countVis, setcountVis] = useState(false); // 学生阅读考试须知 15s 的 页面是否显示
  const [examCategory, seexamCategory] = useState(undefined); // 考试类型, 1 普通考试, 2   1+x 考试

  const questionTypeList = {
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

  const tempSaveAnswers = () => {
    const interval = 15 * 60; // 15分钟
    const randomTime = Math.round(Math.random() * 299 + 1); // 1-300
    // const interval = 10; // 15分钟
    // const randomTime = 1; // 1-300
    // 逻辑说明: 在一个 1-300s 的随机时间之后启动 setTimeout, 然后setTimeout中的逻辑执行后, 会每间隔 15 分钟提交一次答案
    setTimeout(() => {
      let _timer = setInterval(() => {
        // 构造 提交时的数据
        const data = (questions || []).reduce((prev, cur) => {
          //总的逻辑, 只传那些用户做过的题,
          //技能题
          if (cur?.type === 5) {
            // 如果没有文件,就不传参数
            if (!cur.files?.length) {
              return prev;
            }
          } else {
            // 对于不是技能题的题目,如果没有答案,就不传
            if (!cur.answer) {
              return prev;
            }
          }
          let answerInfo = {
            answer: cur?.answer, //考试结果
            resultId: examExactStartTimeId, // examStart 接口 返回值中的 examResultId
            paperQuestionId: cur.id, // examStart 返回值中的 list 的id
            files: cur.files ?? [],
          };

          prev.push(answerInfo);
          return prev;
        }, []);

        tempSaveStudentExamAnswers(data)
          .then((res) => {
            //这个接口正常情况返回值是空字符串,
          })
          .catch((err) => {});
      }, interval * 1000);
      settimer(_timer);
    }, randomTime * 1000);
  };

  const getArrRandomly = (arr) => {
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

  const showStudentInfo = () => {
    getCurrentUser().then((res) => {
      setstudentInfo(res?.data ?? {});
      setstudentInfoVis(true);
    });
  };

  const getExamData = () => {
    if (type === "answer") {
      // get(`/newexam/exam/examStart?id=${id}`)
      examStart({
        id,
      }).then((res) => {
        // console.log(2222222222222, res);
        seexamCategory(res.data?.category ?? undefined);
        // 如果是1+x 考试, 显示个人信息确认 modal
        if (res.data.category === 2) {
          // todo 暂时隐藏
          // showStudentInfo();
        }
        let a: any[] = [];
        let b: any[] = [];
        let c: any[] = [];
        let d: any[] = [];
        let e: any[] = [];
        let questionList: any[] = res.data.list;
        let questions = [];
        questionList.sort((x, y) => {
          return x.type - y.type;
        });
        questionList.map((val) => {
          // 如果学生做过这道题了, 就记录他的答案,不用再做了
          if (val?.examPaperAnswerVO) {
            val.answer = val?.examPaperAnswerVO?.answer;
            val.answerId = val?.examPaperAnswerVO?.id;
            val.answerFiles = val?.examPaperAnswerVO?.files ?? [];
            val.files = val?.examPaperAnswerVO?.files ?? []; // 初始化
          }
          if (val.type == 1) {
            a.push(val);
          } else if (val.type == 2) {
            b.push(val);
          } else if (val.type == 3) {
            c.push(val);
          } else if (val.type == 4) {
            d.push(val);
          } else if (val.type == 5) {
            e.push(val);
          }
        });
        getArrRandomly(a);
        getArrRandomly(b);
        getArrRandomly(c);
        getArrRandomly(d);
        getArrRandomly(e);
        a.length > 0 && questions.push(...a);
        b.length > 0 && questions.push(...b);
        c.length > 0 && questions.push(...c);
        d.length > 0 && questions.push(...d);
        e.length > 0 && questions.push(...e);
        //计算倒计时时间
        let serverTime = moment(res.data && res.data.beginAnswerTime).valueOf();
        let endTime = moment(res.data && res.data.endTime).valueOf();
        let restTime = endTime - serverTime;
        if (res.data.type == "1") {
          restTime = res.data.duration * 60 * 1000;
        }

        setrestTime(restTime);
        setExamData(res.data);
        setquestions(res.data.type == "Y" ? questions : questionList);
        setexamExactStartTimeId(res.data.examResultId);
      });
    }
  };
  useEffect(() => {
    getExamData();
    // 当答题时增加 此判断
    tempSaveAnswers();
    // document.body.onbeforeunload = function (e) {
    //   e = e || window.event;
    //   // 兼容IE8和Firefox 4之前的版本
    //   if (e) {
    //     e.returnValue = "如果离开,考试数据将不会被保存!";
    //   }
    //   // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //   return "如果离开,考试数据将不会被保存!";
    // };
    return () => {
      clearInterval(timer); // 清除暂存数据的定时器
    };
  }, []);

  const onIndexChange = (index) => {
    setqueIndex(index);
    const target = document.querySelector(`#id${queIndex}`);
    target
      ? target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      : false;
  };

  const setUpChoose = (_type, id, val: any) => {
    console.log("ccccccc", _type, id, val);

    const questionWithAnswer = [...(ExamData?.list ?? [])];
    if (type !== "answer") {
      questionWithAnswer.map((item) => {
        item.id === id ? (item.examPaperAnswerVO[_type] = val) : false;
      });
      let totalScore = 0;
      questionWithAnswer.map((item) => {
        //console.log(totalScore)
        totalScore += parseFloat(!!item.examPaperAnswerVO.score ? item.examPaperAnswerVO.score : 0);
      });

      settotalScore(totalScore);
    }
    if (_type === 1 || _type === 3 || _type === 4) {
      questionWithAnswer.map((item) => {
        item.id === id ? (item.answer = val) : false;
      });
    } else if (_type === 2) {
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
    } else if (_type === 5) {
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
        deleteAnsFile(id).then((res) => {
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
    setquestions(questionWithAnswer);
  };

  const handleCancel = () => {
    setconfirmVis(false);
  };
  const handleOk = () => {
    setconfirmVis(false);
    submitAnswer();
  };
  const confirmAnswer = () => {
    setconfirmVis(true);
  };

  const handleStudentInfoOk = () => {
    const _timer = setInterval(() => {
      const value = countValue;
      if (value > 1) {
        setcountValue(value - 1);
      } else {
        clearInterval(countTimer);
        setcountTimer(null);
      }
    }, 1000);
    setstudentInfoVis(false);
    setcountVis(true);
    setcountTimer(_timer);
  };

  const formatIdCard = (value) => {
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

  const handleCountVisOk = () => {
    setcountVis(false);
    setcountTimer(null);
  };

  // 当倒计时结束时, 调用本方法,  haveNoTime 为 true , 用户手动提交时 haveNoTime 为 false
  const submitAnswer = (haveNoTime = false) => {
    let list: any[] = [];
    let achieve = true;

    // 对于用户手动点击  提交的,需要检测其是否 在最早交卷时间 之前,   对于考试结束,自动提交的, 不做检测
    if (!haveNoTime) {
      let {
        startTime, // 考试开始时间
        minitime = 0, // 最小交卷时间,  单位: 分钟 ,  例如 10  ,
      } = ExamData;

      let miniSubmitTime = moment(new Date(startTime)).add(minitime, "minutes"); // 考试开始时间 + 最小交卷时间 => 最早交卷时间  , 是一个具体的时间, 例如 10 点
      // console.log("miniSubmitTime,", miniSubmitTime, moment(), moment().isBefore(miniSubmitTime));
      // 现在还没到 最早交卷时间,那就不能提交
      if (moment().isBefore(miniSubmitTime)) {
        message.warning(`请于 ${miniSubmitTime.format("HH:mm")} 后提交`);
        return;
      }
    }

    // 处理学生答题的逻辑
    questions.map((item) => {
      let obj = {};
      if (item.type !== 5) {
        if (item.answer === null || item.answer === "") {
          achieve = false;
        }
        obj.answer = item.answer;
        obj.paperQuestionId = item.id;
        list.push(obj);
      } else {
        if (item.files && item.files.length === 0) {
          achieve = false;
        }
        obj.paperQuestionId = item.id;
        obj.files = item.files ? item.files : null;
        list.push(obj);
      }
    });
    if (haveNoTime) {
      achieve = true;
    }
    if (achieve) {
      clearInterval(timer); // 清除暂存数据的定时器
      let examNewResult = {
        beginTime: ExamData.beginAnswerTime,
        examId: ExamData.id,
        id: examExactStartTimeId + "",
      };
      setloading(true);

      submitExam({ examNewResult, list }).then((res) => {
        if (res.data === "") {
          Modal.success({
            content: "提交成功！",
            onOk: () => {
              props.history.push(`/student/examList`);
            },
          });
          setloading(false);
        }
      });
    } else {
      Modal.warning({
        content: "还有题目没有作答，不能提交哦！",
        onOk: () => {
          return false;
        },
      });
    }
  };
  let isMob = false,
    isPad = false;
  const role = localStorage.getItem("role");
  // let { isMob, isPad } = props;
  // // pad 与 手机样式相同
  // isMob = isPad || isMob;
  //
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
  const shouldInput = true;

  return (
    <div id="Exam-view" className={"role-" + role}>
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
                    {shouldInput && restTime ? (
                      <CountDownCom
                        onFinish={() => () => submitAnswer(true)}
                        // onFinish={() => {}}
                        duration={restTime}
                        style={{
                          fontSize: isMob ? 20 : 40,
                          lineHeight: isMob ? "30px" : "80px",
                          width: 184,
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      />
                    ) : (
                      <h3 style={{ textAlign: "center" }}>考试得分: {totalScore}</h3>
                    )}
                    <div className={"count-and-slider"}>
                      <div
                        className={"slider-container" + (isPad ? " pad" : "")}
                        onClick={(e) => {
                          onIndexChange(e.target.dataset.id);
                        }}
                      >
                        <Slider {...settings}>
                          {questions.map((item, index) => {
                            const score = (item.examPaperAnswerVO && item.examPaperAnswerVO.score) || 0;
                            return (
                              <div
                                className={`slider-item ${type === "answer" ? (item.answer ? "is-answered" : "") : ""}  `}
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
                        <div id={`id${index}`} key={item.id} className={`question ${queIndex === index ? "selectedQue" : ""}`}>
                          <span className={`question_number ${queIndex === index ? "selected" : ""}`}>{index + 1}.</span>
                          <Question
                            previewType={type}
                            props={item}
                            isMob={isMob}
                            setUpChoose={setUpChoose}
                            role={role}
                            shouldInput={shouldInput}
                            downloadUrlState={1}
                            examCategory={examCategory}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {!isMob && (
                    <div>
                      <QuestionCard
                        onIndexChange={(e, index) => onIndexChange(index)}
                        questions={questions}
                        endTime={restTime}
                        // endTime={ExamData.endTime}
                        duration={ExamData.duration}
                        totalScore={totalScore}
                        submitAnswer={confirmAnswer}
                        previewType={type}
                        loading={loading}
                        type={type}
                        {...props}
                      >
                        {type === "preview" && (
                          <div>
                            <span>寄语：</span>
                            <Input.TextArea
                              placeholder="写下您想对学生说的话。。。"
                              autosize={{ minRows: 2, maxRows: 4 }}
                              value={message}
                              disabled={type === "preview"}
                              onChange={(e) => setmessage(e.target.value)}
                            />
                          </div>
                        )}
                      </QuestionCard>
                    </div>
                  )}

                  {isMob && type === "answer" && (
                    <div className={"submit-button"} onClick={confirmAnswer}>
                      提交
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </main>
      </div>

      <Modal title="确认提交" visible={confirmVis} onOk={() => handleOk} onCancel={ handleCancel}>
        <p>确认提交答案?</p>
      </Modal>

      <Modal
        wrapClassName={"exam-student-info-modal"}
        title="信息确认"
        closable={false}
        visible={studentInfoVis}
        onOk={() => handleStudentInfoOk}
        footer={[
          <Button key="back" onClick={() => handleStudentInfoOk}>
            已确认该信息
          </Button>,
        ]}
      >
        <div className={"info-items"}>
          <div className={"info-item"}>
            <div className={"info-k"}>账号:</div>
            <div className={"info-v"}>{studentInfo.email ?? "-"}</div>
          </div>
          <div className={"info-item"}>
            <div className={"info-k"}>姓名:</div>
            <div className={"info-v"}>{studentInfo.userName ?? "-"}</div>
          </div>
          <div className={"info-item"}>
            <div className={"info-k"}>性别:</div>
            <div className={"info-v"}>{studentInfo.sex ?? "-"}</div>
          </div>
          <div className={"info-item"}>
            <div className={"info-k"}>手机:</div>
            <div className={"info-v"}>{studentInfo.mobile ?? "-"}</div>
          </div>

          <div className={"info-item"}>
            <div className={"info-k"}>身份证号:</div>
            <div className={"info-v"}>{formatIdCard(studentInfo.idCard)}</div>
          </div>
        </div>{" "}
      </Modal>

      <Modal
        wrapClassName={"exam-count-vis-modal"}
        title="请阅读考试须知"
        visible={countVis}
        closable={false}
        footer={[
          <Button key="back" onClick={handleCountVisOk} disabled={countTimer}>
            {countTimer ? countValue : "确定"}
          </Button>,
        ]}
      >
        <div className={"info-items"}>1.考试后60分钟方可提交试卷；</div>
        <div className={"info-items"}>2.每道实操题需要按照步骤提交不低于3张图片；</div>
        <div className={"info-items"}>3.考试过程不得中途离开考场；</div>
      </Modal>
    </div>
  );
};

export default Exam;
