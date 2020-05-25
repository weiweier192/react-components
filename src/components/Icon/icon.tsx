import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome' // 图标容器

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

// 继承FontIcon的属性
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps // 添加自己的属性 
}

const Icon: React.FC<IconProps> = (props) => {
    const {theme, children, className, ...restProps} = props

    const classes = classNames('font-icon', className, {
        [`icon-${theme}`]: theme
    })

    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

Icon.defaultProps = {}

export default Icon