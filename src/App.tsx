import React, { useState, useRef } from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'

const App: React.FC = () => {
  const alertRef = useRef<any>()
  const alertRefDanger = useRef<any>()

  const handleShowAlert = (ref: any) => {
    ref.current.show()
  }

  return (
    <div className="App">
      <Alert
        ref={alertRef}
        closable
        title="alert"
        description="first: alert45131313435131313513131313"
      />
      <Alert
        ref={alertRefDanger}
        type={AlertType.danger}
        title="alert"
        description="first: danger"
      />
      {/* <Alert type={AlertType.success} title="alert" description="first: alert45131313435131313513131313"/> */}
      {/* <Alert
          ref={alertRef}
          duration={2}
          description="first: alert451313134331313513131313"
        /> */}
      {/* <Alert type={AlertType.warning} title="alert" description="first: alert45131313435131313513131313"/> */}

      <Button
        className="default"
        onClick={() => {
          handleShowAlert(alertRef)
        }}
      >
        ShowAlert
      </Button>
      <Button disabled>disabled</Button>
      <Button disabled btnType={ButtonType.Primary}>
        disabled
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        Small
      </Button>
      <Button
        btnType={ButtonType.Danger}
        size={ButtonSize.Small}
        onClick={() => {
          handleShowAlert(alertRefDanger)
        }}
      >
        Small
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        Large
      </Button>
      <Button disabled btnType={ButtonType.Link} href={'http://www.baidu.com'}>
        Hell0
      </Button>
      <Button btnType={ButtonType.Link} href={'http://www.baidu.com'}>
        Hell0
      </Button>
    </div>
  )
}

export default App
