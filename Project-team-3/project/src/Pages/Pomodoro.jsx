import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./Pages.module.css";
function Pomodoro() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [Id, SetId] = useState(null);
  const [mode, setMode] = useState("work");
  const [cnt, setCnt] = useState(0);
  const [Popup, setPopup] = useState(false);

  useEffect(() => {
    if (!username) navigate("/");
    const End = localStorage.getItem("endingTime");
    const Mode1 = localStorage.getItem("Mode");
    const Cnt1 = localStorage.getItem("Cnt");
    if (End) {
      const rem = Math.floor((+End - Date.now()) / 1000);
      if (rem > 0) {
        setTimeLeft(rem);
        setMode(Mode1 || "work");
        setCnt(parseInt(Cnt1) || 0);
        setRunning(true);
      } else {
        localStorage.removeItem("pomodoroEndTime");
        EndCycle();
      }
    }
  }, [username, navigate]);

  useEffect(() => {
    let id;
    if (running && timeLeft > 0) {
      id = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      SetId(id);
    } else if (timeLeft === 0) {
      setRunning(false);
      EndCycle();
    }
    return () => clearInterval(id);
  }, [running, timeLeft]);

  function EndCycle() {
    setPopup(true);
    if (mode === "work") {
      setCnt((prev) => prev + 1);
      if ((cnt + 1) % 4 === 0) {
        setMode("long");
        setTimeLeft(30 * 60);
      } else {
        setMode("short");
        setTimeLeft(5 * 60);
      }
    } else {
      setMode("work");
      setTimeLeft(25 * 60);
    }
  }

  function startTimer() {
    if (!running) {
      const endTime = Date.now() + timeLeft * 1000;
      localStorage.setItem("endingTime", endTime.toString());
      localStorage.setItem("Mode", mode);
      localStorage.setItem("Cnt", cnt.toString());
      setRunning(true);
    }
  }

  function pauseTimer() {
    clearInterval(Id);
    setRunning(false);
  }

  function resetTimer() {
    clearInterval(Id);
    setRunning(false);
    setMode("work");
    setCnt(0);
    setTimeLeft(25 * 60);
    localStorage.removeItem("endingTime");
    localStorage.removeItem("Mode");
    localStorage.removeItem("Cnt");
  }

  const r = 140;
  const cir = 2 * Math.PI * r;
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  const TimeFormat = (num) => num.toString().padStart(2, "0");
  const Total_time = mode === "work" ? 1500 : mode === "short" ? 300 : 1800;

  return (
    <div className={styles.page}>
      <div>
        <NavBar />
      </div>
      <div className={styles.contentPomo}>
        <h1 className={styles.title}>
          Pomodoro (
          {mode === "work"
            ? "Work"
            : mode === "short"
            ? "Short Break"
            : "Long Break"}
          )
        </h1>
        <div className={styles.timerWrapper}>
          <svg className={styles.progressRing} width="300" height="300">
            <circle className={styles.bg} cx="150" cy="150" r="140" />
            <circle
              className={styles.progress}
              cx="150"
              cy="150"
              r="140"
              style={{
                strokeDasharray: cir,
                strokeDashoffset: cir * (1 - timeLeft / Total_time),
              }}
            />
          </svg>
          <div className={styles.timeDisplay}>
            {TimeFormat(min)}:{TimeFormat(sec)}
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={startTimer}>Start</button>
          <button onClick={pauseTimer}>Pause</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
        <p className={styles.note}>
          focus for 25 minutes, enjoy a short break. Repeat 4 times, then take a
          long break!
        </p>
      </div>
      {Popup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Time's Up!</h2>
            <p>
              {mode === "work"
                ? "Take a break!"
                : mode === "shortBreak"
                ? "Break over! back to work!"
                : "Break over! start Working!"}
            </p>
            <button onClick={() => setPopup(false)}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
