import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Landing.module.css";
const LandingPage = () => {
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  const [second, setSecond] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(s);
    }, 1000);
    return () => clearInterval(interval);
  }, [s]);

  const Clock = `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${
    s < 10 ? "0" : ""
  }${s}`;
  console.log("render");
  return (
    <div
      className={h >= 20 || h <= 5 ? styles.moonContainer : styles.sunContainer}
    >
      <div>
        <div className={styles.navbarContainer}>
          <Link to="/*">
            <div
              className={
                (window.location.pathname === "/*" ||
                  window.location.pathname === "/") &&
                styles.navbarClockItem
              }
            >
              Clock
            </div>
          </Link>
          <Link to="/chronometer">
            <div>Chronometer</div>
          </Link>
          <Link to="/timer">
            <div>Timer</div>
          </Link>
        </div>
        <h1 className={styles.clockText}>{Clock}</h1>
      </div>
    </div>
  );
};

export default LandingPage;
