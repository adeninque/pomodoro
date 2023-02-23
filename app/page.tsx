"use client";

import { joinClasses } from "@/utils/joinClasses";
import s from "./page.module.scss";
import useTimer from "@/hooks/useTimer";
import useNotification from "@/hooks/useNotification";
import Alert from "./components/Alert";
import formatTime from "@/utils/formatTime";
import { useState, useRef, useEffect } from "react";
import StatusType from "@/types/StatusType";
import Defautls from "./components/Defaults";

export default function Home() {
  const { counter, paused, startTimer, pauseTimer, status, startNewSession } = useTimer();
  const { perm: notifyPerm } = useNotification();
  const { formatedStr, secs } = formatTime(counter);
  // }, [p])

  const renderButton = (status: StatusType) => {
    if (status == 'finished') return 
    if (paused) return 
  }

  return (
    <>
      <div className={joinClasses("wrapper")}>
        <div className={joinClasses("fs")}>
          {!notifyPerm && (
            <Alert msg="Notifications is blocked, to have more good expoerience plase turn it on" />
          )}
          <div className={joinClasses("container", s.home)}>
            <Defautls />
            <h1 className={s.home__time}>{formatedStr}</h1>
            <div className={joinClasses(s.home__progress, s.progress)}>
              <div className={s.progress__value} style={{width: (secs * 10 / 6) + '%'}}></div>
            </div>
            <div className={joinClasses(s.home__btn, s.btn)}>
              {(status == 'finished') ?
                <button className={s.btn__primary} onClick={startNewSession}>Start New Session</button>
              :
                paused ? 
                  <>
                    <button className={s.btn__primary} onClick={startTimer}>Start</button>
                    <button className={s.btn__secondary} onClick={startNewSession}>Reset</button>
                  </>
                :
                  <>
                    <button className={s.btn__primary} onClick={pauseTimer}>Pause</button>
                    <button className={s.btn__secondary} onClick={startNewSession}>Reset</button>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
