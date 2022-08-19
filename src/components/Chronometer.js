import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Landing.module.css";

import logoPause from "./image/pause-svgrepo-com.svg";
import play from "./image/play-svgrepo-com.svg";
import flag from "./image/flag-svgrepo-com.svg";
import reset from "./image/stop-svgrepo-com.svg";

let lapList = [];

const Chronometer = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [inter, setInter] = useState();
  const [stop, setStop] = useState(true);

  const start = () => {
    setStop(false);
    run();
    setInter(setInterval(run, 10));
  };
  const pause = () => {
    setStop(true);
    clearInterval(inter);
  };

  var upMs = time.ms,
    upS = time.s,
    upM = time.m,
    upH = time.h;

  const run = () => {
    if (upM > 59) {
      upH++;
      upM = 0;
    }
    if (upS > 59) {
      upM++;
      upS = 0;
    }
    if (upMs > 99) {
      upS++;
      upMs = 0;
    }
    upMs++;

    return setTime({ ms: upMs, s: upS, m: upM, h: upH });
  };

  console.log("render");
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
          {time.h < 10 && "0"}
          {time.h}:{time.m < 10 && "0"}
         {time.m}:{time.s < 10 && "0"}
         {time.s}.{time.ms}
        </h1>
        <div className={styles.ButtonContainer}>
          {time.ms === 0 && time.s === 0 && stop && (
            <button className="btn w-50" name="start" onClick={start}>
              start
            </button>
          )}
          {!stop && (
            <div>
              <button
                className="btn "
                onClick={() => {
                  lapList.push({
                    h: time.h,
                    m: time.m,
                    s: time.s,
                    ms: time.ms,
                  });
                }}
              >
                <img src={flag} alt="logoButton" />
              </button>
              <button className="btn " onClick={pause}>
                <img src={logoPause} alt="logoButton" />
              </button>
            </div>
          )}
          {stop && (time.ms > 0 || time.s > 0) && (
            <div>
              <button
                className="btn "
                onClick={() => {
                  setTime({ ms: 0, s: 0, m: 0, h: 0 });
                  lapList = [];
                }}
              >
                <img src={reset} alt="logoButton" />
              </button>
              <button
                className="btn "
                onClick={() => {
                  start();
                  setStop(false);
                }}
              >
                <img src={play} alt="logoButton" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.table}>
        <table className="table table-striped table-borderless">
          <tbody>
            {lapList.map((item) => (
              <tr key={item.ms}>
                <td>
                  <img src={flag} alt="flag" />
                </td>
                <td className="text-light">
                  {item.h} : {item.m} : {item.s}.{item.ms}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chronometer;

// <div className={styles.ButtonContainer}>
//           {stop && mSecond === 0 && (
//             <button
//               name="start"
//               className="btn w-50 shadow"
//               onClick={() => {
//                 setStop(false);
//               }}
//             >
//               start
//             </button>
//           )}
//           {!stop && mSecond > 0 && (
//             <div>
//               <button
//                 className="btn "
//                 onMouseDown={() => {
//                   lapList.push({
//                     h: hours,
//                     m: min,
//                     s: second,
//                     ms: mSecond,
//                   });
//                 }}
//               >
//                 <img src={flag} alt="logoButton" />
//               </button>
//               <button
//                 className="btn "
//                 onClick={() => {
//                   setStop(true);
//                 }}
//               >
//                 <img src={pause} alt="logoButton" />
//               </button>
//             </div>
//           )}
//           {stop && mSecond > 0 && (

//           )}
//         </div>
