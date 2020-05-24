import React from 'react'
import classNames from 'classnames'

interface ITabItem {
  index?: number
  label: any
  disabled?: boolean
  // className?: string
}

const TabItem: React.FC<ITabItem> = (props) => {
  const { label, disabled, children, index } = props

  const classes = classNames('tabitem-title', {
    'is-disabled': disabled,
  })
  const classesContent = classNames('tabitem-content', {
    'tabitem-content-none': index !== 0,
  })

  return (
    <div className="tab-item">
      <div className={classes}>{label}</div>
      <div className={classesContent}>{children}</div>
    </div>
  )
}

TabItem.defaultProps = {}
TabItem.displayName = 'TabItem'

export default TabItem
