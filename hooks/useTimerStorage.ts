'use client'

import { ISotrage, ITimer } from "@/interfaces/ISotrage"

const useTimeStorage = () => {
  const initStorage = (timer: ITimer) => {
    const storage: ISotrage = {
      defaults: {productive: timer.productive * 60, rest: timer.rest * 60},
      current: {productive: timer.productive * 60, rest: timer.rest * 60},
      total: {productive: 0, rest: 0}
    }
    setStorage(storage)
  }

  function getStorage(): ISotrage {
    if (localStorage.getItem('timerStorage') != null) {
      return JSON.parse(localStorage.getItem('timerStorage')!)
    } else {
      initStorage({productive: 25, rest: 5})
      return getStorage()
    }
  }

  const setCurrent = (timer: ITimer) => {
    const storage: ISotrage = {
      ...getStorage(),
      current: timer
    }
    setStorage(storage)
  }

  const addTotal = (timer: ITimer) => {
    const prev = getStorage()
    const storage: ISotrage = {
      ...prev,
      total : {
        productive: prev.total.productive + timer.productive,
        rest: prev.total.rest + timer.rest
      }
    }
    setStorage(storage)
  }

  function setStorage(storage: ISotrage) {
    localStorage.setItem('timerStorage', JSON.stringify(storage))
  }

  return {
    initStorage,
    setCurrent,
    addTotal,
    getStorage
  }

}

export default useTimeStorage