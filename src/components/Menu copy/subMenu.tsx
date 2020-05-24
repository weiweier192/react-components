import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { IMenuItemProps } from './menuItem'

export interface ISubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as string[]
  const { index, title, className, children } = props
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpened, setMenuOpened] = useState<boolean>(isOpened)

  const classes = classNames('menu-item', 'submenu-item', className, {
    'is-active': context.index === index,
  })
  const handleClickSubMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpened(!menuOpened)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpened(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClickSubMenu
  }: {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  }: {}

  const renderChildren = () => {
    const subClasses = classNames('viking-submenu', {
      'menu-opened': menuOpened,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        // return childElement
        return React.cloneElement(childElement, {index: `${index}-${i}`})
      } else {
        console.error(
          "Warning: Menu has a child which is not a 'MenuItem' component"
        )
      }
    })
    return <ul className={subClasses}>{childrenComponent}</ul>
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
