'use client'

import { ChangeEvent, useEffect, useState } from "react"

const useInput = (initValue: string) => {
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    if (Number(value) > 1439) {
      setValue('1439')
    } else if (Number(value) < 0) {
      setValue('1')
    }
  }, [value])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const increase = () => {
    setValue(prev => String(Number(prev) + 1))
  }
  const decrease = () => {
    setValue(prev => String(Number(prev) - 1))
  }

  return { 
    bind: {
      value,
      onChange
    },
    value,
    increase,
    decrease
   }
}

export default useInput