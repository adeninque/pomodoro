'use client'
import s from '@/styles/alert.module.scss'

interface PageProps {
  msg: string
}

const Alert = ({msg}:PageProps) => {
  return(
    <>
    <div className={s.alert}>
      <div className="container">
        <h1 className={s.alert__msg}>{msg}</h1>
      </div>
    </div>
    </>
  )
}

export default Alert;