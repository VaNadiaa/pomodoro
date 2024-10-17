import React, { useEffect, useState, useRef } from "react";
import audioStart from "../../workingBeep.mp3";
import audioReset from "../../resetBeep.mp3";
import { useTranslation } from "../language/LanguageContext";

function Timer({ timeWorking, restTime, isRunning, setIsRunning }) {
  const [isBreak, setIsBreak] = useState(false); // отдых или работа
  const [focusedButton, setFocusedButton] = useState(null);
  const [minute, setMinute] = useState(timeWorking);
  const [second, setSecond] = useState(0);
  const { lang } = useTranslation();

  const audioRefStart = useRef(new Audio(audioStart));
  const audioRefReset = useRef(new Audio(audioReset));

  const playWorking = () => {
    audioRefStart.current.play();
  };

  const playReset = () => {
    audioRefReset.current.play();
  };

  const addZero = (num) => {
    if (num >= 0 && num <= 9) {
      return "0" + num;
    } else {
      return num;
    }
  };

  // начальные значения только при первом запуске
  useEffect(() => {
    setMinute(timeWorking);
    setSecond(0);
  }, [timeWorking]);

  useEffect(() => {
    if (isRunning && (minute >= 0 || second >= 0)) {
      const res = setInterval(() => {
        if (minute === 0 && second === 0) {
          // конец отдыха
          if (isBreak && focusedButton !== null) {
            playWorking();
            setMinute(timeWorking);
            setSecond(0);
            setIsBreak(false);
            setIsRunning(true);
          } else {
            // начало отдыха
            playReset();
            setIsBreak(true);
            setMinute(restTime);
            setSecond(0);
          }
        } else if (second === 0) {
          setMinute((min) => min - 1);
          setSecond(59);
        } else {
          setSecond((sec) => sec - 1);
        }
      }, 1000);
      return () => clearInterval(res);
    }
  }, [isRunning, minute, second, isBreak, restTime]);

  const timerStart = () => {
    if (timeWorking > 0 && restTime > 0) {
      if (
        focusedButton === null ||
        focusedButton === "pause" ||
        focusedButton === "reset"
      ) {
        playWorking();
      }
      setFocusedButton("start");
      setIsRunning(true);
      setIsBreak(false);
    } else {
      alert("Заполните данные");
    }
  };

  const timerPause = () => {
    setFocusedButton("pause");
    setIsRunning(false);
  };

  const timerReset = () => {
    setFocusedButton("reset");
    setIsRunning(false);
    setMinute(timeWorking);
    setSecond(0);
    setIsBreak(false);
  };

  return (
    <div className="timer-box">
      <div className="btn-box">
        <button
          className={focusedButton === "start" ? "btn focus" : "btn"}
          onClick={timerStart}
        >
          {lang("start")}
        </button>
        <button
          className={focusedButton === "pause" ? "btn focus" : "btn"}
          onClick={timerPause}
        >
          {lang("pause")}
        </button>
        <button
          className={focusedButton === "reset" ? "btn focus" : "btn"}
          onClick={timerReset}
        >
          {lang("reset")}
        </button>
      </div>
      <p className="timer-type">
        {isBreak ? `${lang("remainsRest")}` : `${lang("remainsWork")}`}:
      </p>
      <div className="timer">
        <span>{addZero(minute)}</span>:<span>{addZero(second)}</span>
      </div>
    </div>
  );
}

export default Timer;
