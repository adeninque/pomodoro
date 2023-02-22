"use client";

import { joinClasses } from "@/utils/joinClasses";
import s from "./page.module.scss";
import useTimer from "@/hooks/useTimer";
import useNotification from "@/hooks/useNotification";
import Alert from "./components/Alert";
import formatTime from "@/utils/formatTime";

export default function Home() {
  // const { stage, counter, togglePaused, startNewSession, paused } = useTimer();
  const { perm: notifyPerm } = useNotification();
  // const { formatedStr, secs } = formatTime(counter);

  return (
    <>
      {/* <div className={joinClasses("wrapper")}>
        <div className={joinClasses("fs")}>
          {!notifyPerm && (
            <Alert msg="Notifications is blocked, to have more good expoerience plase turn it on" />
          )}
          <div className={joinClasses("fs__body container")}>
            <h1 style={{ fontSize: "8rem" }}>
              {formatedStr}
            </h1>
            <progress max={60} value={secs}></progress>
            {stage.current == "finished" ? (
              <button onClick={startNewSession}>Start new session</button>
            ) : paused ? (
              <button onClick={togglePaused}>Continue</button>
            ) : (
              <button onClick={togglePaused}>Pause</button>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
}
