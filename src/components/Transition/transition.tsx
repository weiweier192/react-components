import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right'

interface ITransition {
  animation?: AnimationName
  // 当children存在transition时使用wrapper在children外面包裹一层元素，避免transition被覆盖
  wrapper?: boolean 
}

const Transition: React.FC<ITransition & CSSTransitionProps> = (props) => {
  const { animation, children, classNames, wrapper, ...restProps } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
}

export default Transition
