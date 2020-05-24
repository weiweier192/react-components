import React, { useState, useRef } from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'

const App: React.FC = () => {
  const alertRef = useRef<any>()
  const alertRefDanger = useRef<any>()

  const handleShowAlert = (ref: any) => {
    ref.current.show()
  }

  return (
    <div className="App">
      <Tabs
        defaultIndex={0}
        onSelect={(index) => {
          alert(index)
        }}
        type="line"
      >
        <TabItem index={0} label="选项一">选项一44444444444444444444444</TabItem>
        <TabItem index={1} label="选项二">选项二555555555555555555555555</TabItem>
        <TabItem index={2} label="选项三">选项三</TabItem>
      </Tabs>
      {/* <br /><br /> */}
      <Menu
        defaultIndex={'0'}
        onSelect={(index) => {
          alert(`当前${index}`)
        }}
      >
        <MenuItem>1</MenuItem>
        <MenuItem disabled>2</MenuItem>
        <SubMenu title="test">
          <MenuItem>test1</MenuItem>
          <MenuItem>test2</MenuItem>
          <MenuItem>test3</MenuItem>
        </SubMenu>
        <MenuItem>3</MenuItem>
      </Menu>
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
      <Button disabled btnType={ButtonType.Link} href={'http://www.baidu.com'}>
        Hell0
      </Button>
    </div>
  )
}

export default App
