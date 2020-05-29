import React from 'react'
// import classNames from 'classnames'

interface IProgress {
  percent: number
  showPercentage?: boolean
}

const Progress: React.FC<IProgress> = (props) => {
  const { percent, showPercentage } = props

  //   const classes = classNames('progress-wrapper', {})
  return (
    <div className="progress-wrapper" style={{height: '1rem'}}>
      <div className="progress">
        <div className="progress-inner" style={{ width: `${percent}%`, height: '1rem' }}>
          {showPercentage ? (
            <span className="progress-percent">{percent}%</span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
Progress.defaultProps = {
  percent: 0,
  showPercentage: true,
}
export default Progress
