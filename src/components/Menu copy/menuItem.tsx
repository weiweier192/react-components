import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface IMenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props

  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  })
  const handleSelect = () => {
    // index 添加判断
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleSelect}>
      {children}
    </li>
  )
}
MenuItem.defaultProps = {
  disabled: false,
}
// displayName标明组件的类型
MenuItem.displayName = 'MenuItem'
export default MenuItem
