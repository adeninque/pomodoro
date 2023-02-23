"use client";

import { ITimer } from "@/interfaces/ISotrage";
import StatusType from "@/types/StatusType";
import { useEffect, useRef, useState } from "react";
import useNotification from "./useNotification";
import useTimeStorage from "./useTimerStorage";

const DEFAULT_TIME = 0

const useTimer = () => {
  const { getStorage, setCurrent } = useTimeStorage()
  const { handleStage } = useNotification() 
  const [counter, setCounter] = useState(DEFAULT_TIME)
  const [status, setStatus] = useState<StatusType>(undefined)
  const [paused, setPaused] = useState(true)
  const [fetchingCounter, setFetchingCounter] = useState(false)
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    determineStatus(getStorage().current)
  }, [])

  useEffect(() => {
    if (counter >= 0 && !fetchingCounter){
      switch(status) {
        case 'productive':
          setCurrent({...getStorage().current, productive: counter})
          break
        case 'rest':
          setCurrent({...getStorage().current, rest: counter})
          break
      }
    } else determineStatus(getStorage().current)
  }, [counter])

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCounter(prev => prev - 1)
      }, 1000)
    }
  }, [paused])

  function determineStatus(timer: ITimer) {
    setFetchingCounter(true)
    pauseTimer()
    if (timer.productive <= 0 && timer.rest <=0) {
      setStatus('finished')
      setCounter(DEFAULT_TIME)
      handleStage('You finished your session!')
    } else if (timer.productive <= 0) {
      setStatus('rest')
      setCounter(timer.rest)
      handleStage('Great job! You productive time ended')
    } else {
      setStatus('productive')
      setCounter(timer.productive)
      handleStage('Have a nice work')
    }
    setFetchingCounter(false)
  }

  function pauseTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (!paused) setPaused(true)
  }

  function startTimer() {
    if (paused) setPaused(false)
  }

  function startNewSession() {
    setCurrent(getStorage().defaults)
    determineStatus(getStorage().current)
  }

  return {
    counter,
    paused,
    status,
    pauseTimer,
    startTimer,
    startNewSession
  };
};

export default useTimer;
