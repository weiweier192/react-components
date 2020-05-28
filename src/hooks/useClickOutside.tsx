import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
  console.log(!!ref.current, ref.current)
  useEffect(() => {
    const checker = (e: MouseEvent) => {
      // contains: 判断e.target组件是否为ref.current的子组件或本组件
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return
      }
      // 回调
      handler(e)
    }
    document.addEventListener('click', checker)
    return () => {
      document.removeEventListener('click', checker)
    }
  }, [ref, handler])
}

export default useClickOutside
