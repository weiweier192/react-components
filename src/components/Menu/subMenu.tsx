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

  const openedSubMens = context.defaultOpenSubMenus as string[]
  const isOpened = (index && context.mode === 'vertical') && openedSubMens.includes(index)
  const [submenuOpened, setSubmenuOpened] = useState(isOpened)

  const classes = classNames('menu-item', 'sub-menu', className, {
    'is-active': context.index === index,
  })

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubmenuOpened(!submenuOpened)
    // if (context.onSelect && typeof index === 'string') {
    //   context.onSelect(index)
    // }
  }
  let timer: any = null
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setSubmenuOpened(toggle)
    })
  }
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}
  const handleClick =
    context.mode === 'vertical'
      ? {
          onClick: handleSelect,
        }
      : {}
  const renderChildren = () => {
    const subClasses = classNames('submenu-content', {
      'submenu-open': submenuOpened,
    })
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
    return <ul className={subClasses}>{childrenComponent}</ul>
  }
  return (
    <li className={classes} key={index} {...hoverEvents}>
      <div className="submenu-title" {...handleClick}>
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
