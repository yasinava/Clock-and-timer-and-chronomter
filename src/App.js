import React from "react";
import LandingPage from "./components/LandingPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Chronometer from "./components/Chronometer";
import Timer from "./components/Timer";

const App = () => {
  return (
    <div className="App">
      <div className="appContainer">
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="chronometer" element={<Chronometer />} />
          <Route path="timer" element={<Timer />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
