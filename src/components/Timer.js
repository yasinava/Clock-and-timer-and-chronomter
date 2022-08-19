import React, { useState } from "react";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import styles from "./styles/Landing.module.css";
import settingLogo from "./image/setting-svgrepo-com.svg";
import playLogo from "./image/play-svgrepo-com.svg"
import pauseLogo from "./image/pause-svgrepo-com.svg"
import resetLogo from "./image/stop-svgrepo-com.svg"

const Timer = () => {
  const [clock, setClock] = useState({
    m: 0,
    s: 0,
  });
  const [click, setClick] = useState({
    setting: false,
    buttons: 0,
    end: false,
  });
  const [inter, setInter] = useState();
  const [maxValue, setMaxValue] = useState({
    m: 60,
    s: 60,
  });
  const changeHandler = (event) => {
    setClock({ ...clock, [event.target.name]: event.target.value });
      setMaxValue({ ...clock, [event.target.name]: event.target.value });
    
  };
  console.log(maxValue);
  var upS = clock.s,
    upM = clock.m;
  const start = () => {
    setInter(setInterval(run, 1000));
    setClick({ ...click, buttons: 1 });
  };
  const pause = () => {
    clearInterval(inter);
    setClick({ ...click, buttons: 2 });
  };
  const reset = () => {
    setClock({ m: 0, s: 0 });
    setClick({ ...click, buttons: 0 });
  };
  const end = () => {
    setClock({ m: 0, s: 0 });
    setClick({ ...click, buttons: 0, end: true });
  };
  const run = () => {
    if (upM === 0 && upS === 0) {
      return;
    }
    if (upS === 0 && upM > 0) {
      upM--;
      upS = 59;
    }
    upS--;
    return upM === 0 && upS === 0 ? clear() : setClock({ m: upM, s: upS });
  };
  const clear = () => {
    clearInterval(inter);
    end();
  };
  console.log(click);
  const showTime = `${clock.m < 10 ? "0" : ""}${clock.m}:${
    clock.s < 10 ? "0" : ""
  }${clock.s}`;
  return (
    <div className={!click.end ? styles.timerContainer : styles.endContainer}>
      <div className={styles.navbarContainer}>
        <Link to="/*">
          <div>Clock</div>
        </Link>
        <Link to="/chronometer">
          <div>Chronometer</div>
        </Link>
        <Link to="/timer">
          <div
            className={
              window.location.pathname === "/timer" && styles.navbarClockItem
            }
          >
            Timer
          </div>
        </Link>
      </div>
      <div className={styles.circular}>
      <div className="w-50 mt-5">
        <CircularProgressbar
          value={clock.m === 0 ? clock.s : clock.m * 60 + clock.s}
          minValue={0}
          maxValue={maxValue.m === 0 ? 60 : maxValue.m * 60}
          text={`${showTime}`}
          strokeWidth={3}
          circleRatio={1}
          styles={buildStyles({
            strokeLinecap: 'round',
            textSize: '23px',
            pathTransitionDuration: 0.5,
            pathColor: `#fff`,
            textColor: '#fff',
            trailColor: '#00000079',
            backgroundColor: '#00000079',
          })}
        />
        </div>
      </div>
      {click.end ? (
        <div className={styles.timerEndTime}>
          <h5 className="my-4 font-weight-bold text-danger">End Your Time</h5>
          <button className="btn btn-info w-75 font-weight-bold " onClick={() => setClick({ ...click, end: false })}>ok</button>
        </div>
      ) : (
        <div>
          <div className={styles.timerButtons}>
            {click.buttons === 0 && (
              <button name="start" className="btn text-light w-50 mt-5" onClick={upS > 0 || upM > 0 ? start : null}>start</button>
            )}
            {click.buttons === 2 && (
              <div>
                <button onClick={start}><img src={playLogo} alt="start"/></button>
                <button onClick={reset}><img src={resetLogo} alt="reset"/></button>
              </div>
            )}
            {click.buttons === 1 && clock.s > 0 && (
              <button onClick={pause}><img src={pauseLogo} alt="pause"/></button>
            )}
          </div>
          <div>
            <button
            name="setting"
              onClick={
                click.setting
                  ? () => setClick({ ...click, setting: false })
                  : () => setClick({ ...click, setting: true })
              }
            >
              <img style={{width:"50px"}} src={settingLogo} alt="setting"/>
            </button>
          </div>
        </div>
      )}
      {click.setting && (
        <div className={styles.timerSettingContainer}>
          <h2 className="mt-3">settings</h2>
          <input
            name="m"
            type="number"
            value={clock.m}
            onChange={changeHandler}
          />
          <input
            name="s"
            type="number"
            value={clock.s}
            onChange={changeHandler}
          />
          <button
          className="btn btn-danger w-50 my-4"
            onClick={
              clock.m >= 0 && clock.m <= 59 && clock.s >= 0 && clock.s <= 59
                ? () => setClick({ ...click, setting: false })
                : alert("please check your time")
            }
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
