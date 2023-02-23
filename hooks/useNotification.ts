'use client'

import { useEffect, useState } from "react"

const useNotification = () => {

  const [perm, setPerm] = useState(true)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
    Notification.requestPermission()
      .then((res: NotificationPermission) => {
        if (res != 'granted') setPerm(false)
      })
  }, [])

  const handleStage = (msg: string) => {
    if(perm) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(msg, {
          body: 'pomodoro'
        })
      })
    }
  }

  return {
    perm,
    handleStage
  }
} 

export default useNotification