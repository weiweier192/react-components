import React, { useCallback, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

interface IMenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { children, index, disabled, className } = props

  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  })

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault()
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }
  return (
    <li
      className={classes}
      onClick={(e) => {
        handleSelect(e)
      }}
    >
      {children}
    </li>
  )
}
MenuItem.defaultProps = {
  disabled: false,
}
MenuItem.displayName = 'MenuItem'
export default MenuItem
