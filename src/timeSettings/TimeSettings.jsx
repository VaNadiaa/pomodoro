import React from "react";
import { useTranslation } from "../language/LanguageContext";

function TimeSettings({
  timeWorking,
  setTimeWorking,
  restTime,
  setRestTime,
  isRunning,
}) {
  const { lang } = useTranslation();

  const checkingTime = (event, min, max, setTime) => {
    const regex = /^\d?\.?\d+?$/; // все цифры один и более раз
    const value = event.target.value;
    if (!isRunning) {
      setTime("");
    }
    if (regex.test(value) && value >= min && value <= max) {
      setTime(value);
    }
  };

  const handleInputWorkingTime = (event) =>
    checkingTime(event, 1, 240, setTimeWorking);

  const handleInputRestTime = (event) =>
    checkingTime(event, 1, 120, setRestTime);

  return (
    <div className="input-box">
      <label>
        {lang("workTime")}
        <br />
        <input
          className="input"
          type="text"
          value={timeWorking}
          onChange={handleInputWorkingTime}
          placeholder="От 1 до 240"
        />
      </label>
      <label>
        {lang("restTime")}
        <br />
        <input
          className="input"
          type="text"
          value={restTime}
          onChange={handleInputRestTime}
          placeholder="От 1 до 120"
        />
      </label>
    </div>
  );
}

export default TimeSettings;
