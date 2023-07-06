import React, { useEffect, useState } from "react";
import "./QuestionCard.less";
import { Button, Statistic } from "antd";
import moment from "moment";
import CountDownCom from "@/components/CountDown/index";

const QuestionCard: React.FC<{
  questions: any[];
  endTime: any;
  type: any;
  previewType: any;
  children: any;
  duration: any;
  totalScore: any;
  loading: any;
  onIndexChange: (e: any, index: any) => void;
  submitAnswer: () => void;
}> = (props) => {
  const [length, setlength] = useState<any[]>(props.questions.map((v, i) => i));
  const [endTime, setendtime] = useState<any>(props.endTime);
  const [type, settype] = useState<any>(props.type);
  const [questions, setquestions] = useState<any[]>([]);
  const [previewType, setpreviewType] = useState<any>(props.previewType);
  const [isFixed, setisFixed] = useState<any>(false);
  const [activIndex, setactivindex] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll.bind(this)); //监听滚动
    console.log(document.getElementById("QuestionCard").offsetTop);
  }, []);

  const handleScroll = (e) => {
    setisFixed(e.srcElement.scrollingElement.scrollTop > 90);
  };

  // todo componentWillReceiveProps
  // const  componentWillReceiveProps(nextProps, nextContext) {
  //   if (this.props !== nextProps) {
  //     this.setState({
  //       length: Array.from({ length: nextProps.questions.length }, (item, index) => index),
  //       questions: nextProps.questions,
  //     });
  //   }
  // }

  const showBackground = (item) => {
    if (type === "answer") {
      if (item.type === 5) {
        return item.files ? "#0f9982" : "#888A90";
      } else {
        return item.answer === "" || item.answer === null ? "#888A90" : "#0f9982";
      }
    } else if (previewType === "view") {
      //查看新创建的试卷只显示绿色
      return "#0f9982";
    } else {
      return item.examPaperAnswerVO.score === null ? "#888A90" : item.examPaperAnswerVO.score > 0 ? "#0f9982" : "#fc5055";
    }
  };
  const CountDown = () => {
    props.submitAnswer(true);
    // console.log('时间到了，提交作业')
  };

  const viewPortWidth = (document.documentElement.clientWidth - 1200) / 2 + 820;
  const FixedStyle = {
    position: "fixed",
    height: "96%",
    top: "0px",
    left: `${viewPortWidth}px`,
  };
  const { Countdown } = Statistic;
  const deadline = moment(moment(props.endTime).valueOf());
  return (
    <div id="QuestionCard" style={isFixed ? { ...FixedStyle } : {}} className={`${isFixed ? "show" : "visible"}`}>
      <div className="content-wrap">
        {type === "answer" ? (
          <div className="time-left-wrap">
            <h3 className="title">倒计时</h3>
            {props.endTime && (
              <CountDownCom
                onFinish={() => CountDown()}
                duration={props.endTime}
                style={{
                  fontSize: 60,
                  lineHeight: "80px",
                  width: 250,
                  margin: "0 auto",
                }}
              />
            )}
            {/*<Countdown*/}
            {/*	value={deadline}*/}
            {/*	onFinish={() => this.CountDown()}*/}
            {/*	valueStyle={{*/}
            {/*		fontSize: 60,*/}
            {/*		lineHeight: "80px",*/}
            {/*		width: 250,*/}
            {/*		margin: "0 auto"*/}
            {/*	}}*/}
            {/*/>*/}
            <h3 className="totalTime">考试时长：{props.duration}分钟</h3>
          </div>
        ) : (
          <div className="time-left-wrap">
            <h3 className="title">{previewType !== "view" ? "考试得分" : "试卷总分"}</h3>
            <div
              style={{
                fontSize: 60,
                lineHeight: "80px",
                width: 250,
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              {previewType !== "view" ? props.totalScore : "100"}
            </div>

            {/*<h3 className="totalTime">*/}
            {/*  总分：120分钟*/}
            {/*</h3>*/}
          </div>
        )}
        <ul className="que-block-wrap">
          {questions.length > 0
            ? questions.map((item, index) => {
                return (
                  <li
                    className={`item ${activIndex === index ? "selected" : ""}`}
                    style={{
                      backgroundColor: showBackground(item),
                    }}
                    key={index}
                    onClick={(e) => {
                      // this.setState({ index });
                      // setindex(index)
                      setactivindex(index);
                      props.onIndexChange(e, index);
                    }}
                  >
                    {index + 1}
                  </li>
                );
              })
            : null}
        </ul>
        {previewType !== "view" && (
          <div className="tags">
            <span className="tag achieve">{type === "answer" ? "已答" : "正确"}</span>
            {type !== "answer" && <span className="tag wrong">错误</span>}
            <span className="tag ">{type === "answer" ? "未答" : "待评分"}</span>
          </div>
        )}
        {props.children}
        <div className="toolbar">
          {previewType === "view" ? (
            <div
              className="submit-btn"
              onClick={() => {
                window.close();
              }}
            >
              {type === "preview" || previewType === "view" ? "不看了" : "提交"}
            </div>
          ) : (
            <Button
              loading={props.loading}
              className={`submit-btn ${props.loading ? "disabled" : ""}`}
              onClick={() => (type === "preview" ? window.close() : props.submitAnswer())}
            >
              {type === "preview" || previewType === "view" ? "不看了" : "提交"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
