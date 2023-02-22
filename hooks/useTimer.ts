"use client";

import { ITimer } from "@/interfaces/ISotrage";
import { IStage } from "@/interfaces/IStage";
import { useEffect, useRef, useState } from "react";
import useNotification from "./useNotification";
import useTimeStorage from "./useTimerStorage";

const useTimer = () => {
  const { handleStage } = useNotification();
  const { data, setCurrent, addTotal } = useTimeStorage();
  const [paused, setPaused] = useState(true);
  const [stage, setStage] = useState<IStage>({ current: "default" });
  const [counter, setCounter] = useState(0);
  const intevalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    determineStage(data.current);
    // console.log(data.current.productive)
  }, [data]);

  useEffect(() => {
    if (!paused && stage.current != "finished") {
      intevalRef.current = setInterval(() => {
        setCounter(prev => prev - 1)
      }, 10);
    } else if (intevalRef.current) {
      clearInterval(intevalRef.current);
    }
  }, [paused]);

  useEffect(() => {
    switch (stage.current) {
      case "finished":
        setCounter(0);
        // console.log("counter setted as 0");
        break;
      case "productive":
        setCounter(data.current.productive);
        // console.log("counter setted as productive");
        break;
      case "rest":
        setCounter(data.current.rest);
        // console.log("counter setted as rest");
        break;
    }
  }, [stage]);

  function determineStage(timer: ITimer) {
    if (timer.productive <= 0 && timer.rest <= 0) {
      setStage({ current: "finished" });
      handleStage("Your rest finished");
      pauseTimer();
    } else if (timer.productive <= 0) {
      setStage((prev) => {
        if (prev.current != "rest") {
          handleStage("Productive time ended");
          pauseTimer();
        }
        return { current: "rest" };
      });
    } else {
      setStage((prev) => {
        if (prev.current != "productive") {
          handleStage("Sessin setted");
          pauseTimer();
        }
        return { current: "productive" };
      });
    }
  }

  const togglePaused = () => {
    setPaused((prev) => !prev);
  };

  function pauseTimer() {
    if (!paused) togglePaused();
  }

  function saveCounter() {
    switch (stage.current) {
      case "productive":
        setCurrent({ ...data.current, productive: counter - 1 });
        break;
      case "rest":
        setCurrent({ ...data.current, rest: counter - 1 });
        break;
      case "finished":
        togglePaused();
    }
  }

  const startNewSession = () => {
    setCurrent(data.defaults);
    // addTotal(data.defaults);
  };

  return {
    stage,
    counter,
    togglePaused,
    startNewSession,
    paused,
  };
};

export default useTimer;
