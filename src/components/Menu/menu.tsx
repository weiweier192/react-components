import React, { useState, createContext } from 'react'
import classNames from 'classnames'

type modeType = 'horizental' | 'vertical'
type onSelectType = (index: string) => void
interface IMenuProps {
  mode?: modeType
  defaultIndex?: '0'
  onSelect?: onSelectType
  className?: string
}
interface IMenuContext {
  index: string
  onSelect?: onSelectType
}
// 通过context给children传递参数
export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<IMenuProps> = (props) => {
  const { children, mode, defaultIndex, className } = props
  const { onSelect } = props
  let index = defaultIndex ? defaultIndex : '0'
  const [active, setActive] = useState<string>(index)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelect) onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: active ? active : '0',
    onSelect: handleSelect,
  }
  return (
    <ul className={classes}>
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizental',
}

export default Menu
