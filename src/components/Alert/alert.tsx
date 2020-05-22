import React, { useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'

export enum AlertType {
  default = 'default',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
}
interface IOnClick {
  (value: boolean): void
}
interface IAlertProps {
  className?: string
  title?: string
  description?: string
  type?: AlertType
  closable?: boolean
  duration?: number
  ref?: any
}

const Alert: React.FC<IAlertProps> = forwardRef((props, ref) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  
  const { title, description, type, className, closable, duration } = props

  const classes = classNames('alt', className, {
    [`alt-${type}`]: type,
  })
  // 供外界调用的方法
  useImperativeHandle(ref, () => ({
    show() {
      setIsShow(true)
    },
    close() {
        setIsShow(false)
    }
  }))

  const time: number = typeof duration === 'number' ? duration : 2

  if (!closable) {
    setTimeout(() => {
      setIsShow(false)
    }, time * 1000)
  }

  return (
    <>
      {isShow ? (
        <div className={classes}>
          <div className="alt-content">
            {title ? <h5>{title}</h5> : null}
            <span>{description}</span>
          </div>
          {closable ? (
            <div className="alt-close">
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  setIsShow(false)
                }}
              >
                +
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
})
Alert.defaultProps = {
  type: AlertType.default,
  duration: 2,
  closable: false,
}
export default Alert
