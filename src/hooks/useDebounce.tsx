import React, { useState, useEffect } from 'react'

const useDebounce = (value: any, delay = 300) => {
  const [item, setItem] = useState(value)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItem(value)
    }, delay)
    // 清除上一次的timer
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return item
}

export default useDebounce
