"use client";

import { ITimer } from "@/interfaces/ISotrage";
import StatusType from "@/types/StatusType";
import { useEffect, useRef, useState } from "react";
import useNotification from "./useNotification";
import useTimeStorage from "./useTimerStorage";

const DEFAULT_TIME = 0

const useTimer = () => {
  const { getStorage, setCurrent } = useTimeStorage()
  const [counter, setCounter] = useState(DEFAULT_TIME)
  const [status, setStatus] = useState<StatusType>(undefined)
  const [paused, setPaused] = useState(true)
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    determineStatus(getStorage().current)
  }, [])

  useEffect(() => {
    console.log(status)
  }, [status])

  useEffect(() => {
    switch(status) {
      case 'productive':
        setCurrent({...getStorage().current, productive: counter})
        break
      case 'rest':
        setCurrent({...getStorage().current, productive: counter})
        break
    }
  }, [counter])

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCounter(prev => prev - 1)
      }, 1000)
    }
  }, [paused])

  function determineStatus(timer: ITimer) {
    if (timer.productive <= 0 && timer.rest <=0) {
      setStatus('finished')
      setCounter(DEFAULT_TIME)
    } else if (timer.productive <= 0) {
      setStatus('rest')
      setCounter(timer.rest)
    } else {
      setStatus('productive')
      setCounter(timer.productive)
    }
  }

  const togglePause = () => setPaused(prev => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return !prev
  })

  return {
    counter,
    paused,
    togglePause
  };
};

export default useTimer;
