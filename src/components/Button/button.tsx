// 1. 不同的类型 primary default danger linkbtn
// 2. 不同size: normal small large
// 3. 状态: live disabled
import React from 'react'
import classNames from 'classnames'

// btn大小
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}
// btn类型
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}
// props类型
interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}
// 获取button的所有原生属性ButtonHTMLAttributes
// 交叉类型'&'：合并多个类型
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  BaseButtonProps
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps
// Partial<T>: 将属性设置为可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

// React.FC是一个interface，可用于描述函数，并且可以添加泛型
// const Button: React.FC<BaseButtonProps> = (props) => {
const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href,
    className, // 获取用户自定义的class
    ...restProps // 获取剩余props
  } = props
  // btn btn-lg btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  })
  if (btnType === ButtonType.Link && href) {
    return (
      // {...restProps} 添加剩余属性
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}
export default Button
