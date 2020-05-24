import React from 'react'
import classNames from 'classnames'

type tabsType = 'line' | 'card'
type onSelectType = (index: number) => void

interface ITabs {
  defaultIndex?: number
  type?: tabsType
  className?: string
  onSelect: onSelectType
  style?: React.CSSProperties
}

const Tabs: React.FC<ITabs> = (props) => {
  const { defaultIndex, type, className, children, style } = props
  const { onSelect } = props

  const classes = classNames('tabs', className, {
    'tabs-line': type === 'line',
    'tabs-card': type !== 'line' 
  })

  return <div className={classes} style={style}>{children}</div>
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line',
}
Tabs.displayName = 'Tabs'

export default Tabs
