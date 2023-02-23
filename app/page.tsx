"use client";

import { joinClasses } from "@/utils/joinClasses";
import s from "./page.module.scss";
import useTimer from "@/hooks/useTimer";
import useNotification from "@/hooks/useNotification";
import Alert from "./components/Alert";
import formatTime from "@/utils/formatTime";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { counter, paused, togglePause } = useTimer();
  const { perm: notifyPerm } = useNotification();
  const { formatedStr, secs } = formatTime(counter);
  const [timeLeft, setTimeLeft] = useState(90)
  const intervalRef = useRef<NodeJS.Timer | null>(null)
  const [p, setP] = useState(true)

  // useEffect(() => {
  //   if(!p) {
  //     intervalRef.current = setInterval(() => {
  //       setTimeLeft(prev => prev - 1)
  //     }, 1000)
  //   } else if (intervalRef.current) {
  //     clearInterval(intervalRef.current)
  //   }
  // }, [p])

  return (
    <>
      <div className={joinClasses("wrapper")}>
        <div className={joinClasses("fs")}>
          {!notifyPerm && (
            <Alert msg="Notifications is blocked, to have more good expoerience plase turn it on" />
          )}
          <div className={joinClasses("fs__body container")}>
            <h1 style={{ fontSize: "8rem" }}>
              {formatedStr}
            </h1>
            <progress max={60} value={secs}></progress>
            <br />
            <button onClick={() => togglePause()}>Pause / Play</button>
          </div>
        </div>
      </div>
    </>
  );
}
