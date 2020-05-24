import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import {IMenuItemProps} from './menuItem'

type onSelectType = (selectedIndex: string) => void

// 字符串字面量，多选一
type MenuMode = 'horizental' | 'vertical'
export interface IMenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties // 内置的CSS类型
  onSelect?: onSelectType // 函数
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: onSelectType
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, defaultOpenSubMenus } = props
  const { onSelect } = props

  const [active, setActive] = useState(defaultIndex)

  const classes = classNames('mu', className, {
    'mu-vertical': mode === 'vertical',
    'mu-horizental': mode !== 'vertical'
  })
  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelect) onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: active ? active : '0',
    onSelect: handleSelect,
    mode: mode,
    defaultOpenSubMenus
  }

  /**
   * 1. 解决menu中的组件必须都是menuItem组件
   * 2. 每个menuItem组件不用添加index属性
   */
  const renderChildren = () => {
      // 用于循环 children的方法 map
      return React.Children.map(children, (child, index) => {
        // 使用断言转成FCE实例
        const childElement = child as React.FunctionComponentElement<IMenuItemProps>
        const {displayName} = childElement.type
        if(displayName === 'MenuItem' || displayName === 'SubMenu') {
            // 使用cloneElement更改child, 不必每个MenuItem都写index={}
            // return child
            return React.cloneElement(childElement, {index: index.toString()})
        }else {
            console.error("Warning: Menu has a child which is not a 'MenuItem' component")
        }
      })
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizental',
  defaultOpenSubMenus: []
}
export default Menu
