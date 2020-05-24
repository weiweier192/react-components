import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { IMenuItemProps } from './menuItem'

interface ISubMenu {
  title: string
  index?: string
  className?: string
}

const SubMenu: React.FC<ISubMenu> = (props) => {
  const { title, index, className, children } = props

  const context = useContext(MenuContext)

  const classes = classNames('menu-item', 'sub-menu', className, {
    'is-active': context.index === index,
  })

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault()
    if (context.onSelect && typeof index === 'string') {
      context.onSelect(index)
    }
  }
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        IMenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error(
          "Warning: Menu has a child which is not a 'MenuItem' component"
        )
      }
    })
    return <ul className="submenu-content">{childrenComponent}</ul>
  }
  return (
    <li className={classes} key={index}>
      <div className="submenu-title" onClick={handleSelect}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.defaultProps = {
  title: 'SubMenu',
}
SubMenu.displayName = 'SubMenu'

export default SubMenu
