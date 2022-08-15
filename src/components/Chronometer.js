import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Landing.module.css";

import pause from "./image/pause-svgrepo-com.svg";
import play from "./image/play-svgrepo-com.svg";
import flag from "./image/flag-svgrepo-com.svg";
import reset from "./image/stop-svgrepo-com.svg";

let lapList = [];

const Chronometer = () => {
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [second, setSecond] = useState(0);
  const [mSecond, setMSecond] = useState(0);
  const [stop, setStop] = useState(true);


  useEffect(() => {
    let interval = null;
    if (!stop) {
      interval = setInterval(() => {
        if (min > 59) {
          setHours(hours + 1);
          setMin(0);
          clearInterval(interval);
        }
        if (second > 59) {
          setMin(min + 1);
          setSecond(0);
          clearInterval(interval);
        }
        if (mSecond > 999) {
          setSecond(second + 1);
          setMSecond(0);
          clearInterval(interval);
        }
        if (mSecond <= 999) {
          setMSecond(mSecond + 1);
        }
      }, 1);
    }
    return () => clearInterval(interval);
  }, [stop, mSecond]);
  console.log(lapList);
  return (
    <div className={styles.chronometerContainer}>
      <div className={styles.navbarContainer}>
        <Link to="/*">
          <div>Clock</div>
        </Link>
        <Link to="/chronometer">
          <div
            className={
              window.location.pathname === "/chronometer" &&
              styles.navbarClockItem
            }
          >
            Chronometer
          </div>
        </Link>
        <Link to="/timer">
          <div>Timer</div>
        </Link>
      </div>
      <div className={styles.Chronometer}>
        <h1>
          {hours}:{min}:{second}.{mSecond}
        </h1>
        <div className={styles.ButtonContainer}>
          {stop && mSecond === 0 && (
            <button
            name="start"
            className="btn w-50 shadow"
              onClick={() => {
                setStop(false);
              }}
            >
              start
            </button>
          )}
          {!stop && mSecond > 0 && (
            <div>
              <button
              className="btn "
                onMouseDown={() => {
                  lapList.push({
                    h: hours,
                    m: min,
                    s: second,
                    ms: mSecond,
                  });
                }}
              >
                <img src={flag} alt="logoButton"/>
              </button>
              <button
              className="btn "
                onClick={() => {
                  setStop(true);
                }}
              >
               <img src={pause} alt="logoButton"/>
              </button>
            </div>
          )}
          {stop && mSecond > 0 && (
            <div>
              <button
              className="btn "
                onClick={() => {
                  setHours(0);
                  setMin(0);
                  setSecond(0);
                  setMSecond(0);
                  lapList = [];
                }}
              >
              <img src={reset} alt="logoButton"/>

              </button>
              <button
              className="btn "
                onClick={() => {
                  setStop(false);
                }}
              >
             <img src={play} alt="logoButton"/>

              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        {lapList.map((item) => (
          <p>{item.ms}</p>
        ))}
      </div>
    </div>
  );
};

export default Chronometer;

