import React, { useEffect, useState } from "react";
import TimeSettings from "./timeSettings/TimeSettings";
import Timer from "./timer/Timer";
import "./styles.css";
import tomatoImg from "../img/tomato.png";
import { useTranslation } from "./language/LanguageContext";

function App() {
  const [isRunning, setIsRunning] = useState(false); // включен или отключен таймер

  const defaultTimeWorking = 25;
  const defaultRestTime = 5;

  const [timeWorking, setTimeWorking] = useState(() => {
    const storageTimeWorking = localStorage.getItem("timeWorking");
    return storageTimeWorking || defaultTimeWorking;
  });

  const [restTime, setRestTime] = useState(() => {
    const storageRestTime = localStorage.getItem("restTime");
    return storageRestTime || defaultRestTime;
  });

  useEffect(() => {
    localStorage.setItem("timeWorking", timeWorking);
    localStorage.setItem("restTime", restTime);
  }, [timeWorking, restTime]);

  const { lang, setLanguage, language } = useTranslation();

  useEffect(() => {
    document.title = lang("title") || "Метод помидорки онлайн";
  }, [lang]);

  return (
    <>
      <div className="container">
        <div className="header-box">
          <div className="logo-box">
            <img className="logo-img" src={tomatoImg} alt="Помидорка" />
            <p className="lodo-desc">pomodoro.prx.by</p>
          </div>
          <div className="header">
            <h1>{lang("header")}</h1>
          </div>
          <div className="lang">
            <div className="lang-box">
              <button
                className={
                  language === "ru" ? "lang-btn lang-btn-focus" : "lang-btn"
                }
                onClick={() => setLanguage("ru")}
              >
                ru
              </button>{" "}
              <button
                className={
                  language === "en" ? "lang-btn lang-btn-focus" : "lang-btn"
                }
                onClick={() => setLanguage("en")}
              >
                en
              </button>
            </div>
          </div>
          <p className="advice">{lang("advice")}</p>
        </div>
        <div className="content">
          <TimeSettings
            isRunning={isRunning}
            timeWorking={timeWorking}
            setTimeWorking={setTimeWorking}
            restTime={restTime}
            setRestTime={setRestTime}
          />
          <Timer
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            timeWorking={timeWorking}
            restTime={restTime}
          />
        </div>
        <hr />
        <div className="footer">
          <a
            href="https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0"
            target="_blank"
          >
            {lang("pomodopoTechnique")}
          </a>
          <p>{lang("name")} © 2024</p>
        </div>
      </div>
    </>
  );
}

export default App;
