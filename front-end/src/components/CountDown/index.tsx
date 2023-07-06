import React, { useEffect, useRef, useState } from "react";

const CountDownCom: React.FC<{
  duration: number;
  onFinish: () => void;
}> = (props) =>
  // export default function CountDownCom({ duration, onFinish, ...props })
  {
    const { duration, onFinish } = props;
    const [interval, setIntervalVal] = useState(1000);
    const [nextTime, setNextTime] = useState(1000);
    const [restTime, setRestTime] = useState(duration > 0 ? duration : 0);
    // const [restTime,setRestTime] = useState(5000)
    const timer = useRef(null);
    const [start, setStart] = useState(new Date().getTime());
    const count = useRef<any>(0);
    useEffect(() => {
      // setInterval(function () {
      // 	var n = 0;
      // 	while(n++ < 1000000000);
      // }, 0);
      if (restTime > 0) {
        timer.current = setTimeout(setTimer, interval);
      }
      return () => {
        clearTimeout(timer.current);
      };
    }, []);
    useEffect(() => {
      if (restTime > 0) {
        timer.current = setTimeout(setTimer, nextTime);
      } else {
        onFinish();
        clearTimeout(timer.current);
      }
      return () => {
        clearTimeout(timer.current);
      };
    }, [restTime]);
    function setTimer() {
      let offset;
      count.current += 1;
      let bar = new Date().getTime() - (start + count.current * interval);
      offset = bar > 0 && bar < 1000 ? bar : 0;
      setNextTime(interval - offset < 0 ? 0 : interval - offset);
      setRestTime((x) => x - interval);
      // console.log("误差: " + offset + "ms, 下一次执行: " + nextTime + "ms后，离活动开始还有: " + restTime + "ms");
    }
    function timeFormat() {
      let h = Math.floor(restTime / 60 / 60 / 1000);
      let s = (restTime / 1000) % 60;
      let m = Math.floor((restTime / 1000 / 60) % 60);
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return <div {...props}>{timeFormat()}</div>;
  };

export default CountDownCom;
