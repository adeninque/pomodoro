'use client'

import { useEffect, useState } from "react"

const useNotification = () => {

  const [perm, setPerm] = useState(true)

  useEffect(() => {
    Notification.requestPermission()
      .then((res: NotificationPermission) => {
        if (res != 'granted') setPerm(false)
      })
  }, [])

  const handleStage = (msg: string) => {
    const n = new Notification(msg, {
      body: 'pomodoro'
    })
  }

  return {
    perm,
    handleStage
  }
} 

export default useNotification