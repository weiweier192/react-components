import React, { ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type inputType = 'lg' | 'sm'
// omit 忽略某一属性 'size'
interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  className?: string
  disabled?: boolean
  size?: inputType
  icon?: IconProp
  prepend?: string | React.ReactElement
  append?: string | React.ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    ...restProps
  } = props

  const classes = classNames('input-wrapper', className, {
    'is-disabled': disabled,
    [`input-size-${size}`]: size,
    'input-group': append || prepend,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  return (
    <div className={classes}>
      {prepend && <div className="input-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper" onClick={() => {console.log('search')}}>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input disabled={disabled} {...restProps} className="input-inner" />
      {append && <div className="input-append">{append}</div>}
    </div>
  )
}
Input.defaultProps = {
  disabled: false,
}

export default Input
