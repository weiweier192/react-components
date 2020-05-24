import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './menuItem'

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
    'menu-horizental': mode !== 'vertical'
  })
  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelect) onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: active ? active : '0',
    onSelect: handleSelect,
  }

  // 1. 解决menu组件中子组件必须都是menuItem组件: React.Children.map()
  // 2. 给组件添加属性: React.cloneElement()
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // 使用断言将child转成FCE实例,为其添加属性
      const childElement = child as React.FunctionComponentElement<
        IMenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      }else {
        console.error(
          "Warning: Menu has a child which is not a 'MenuItem' component"
        )
      }
    })
  }
  return (
    <ul className={classes}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizental',
}

export default Menu
