import React, { useState, useRef, ReactElement } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // 图标容器
import { library } from '@fortawesome/fontawesome-svg-core'
// fas 所有图标的集合
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'
import AutoComplete, {
  DataSourceType,
} from './components/AutoComplete/autoComplete'

// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
interface LakerProps {
  value: string
  number: number
}
interface GitUserProps {
  login: string
  url: string
  avatar_url: string
}
library.add(fas) // 拿到了所有的图标
const App: React.FC = () => {
  const [isShow, setIsShow] = useState(false)
  const alertRef = useRef<any>()
  const alertRefDanger = useRef<any>()
  let laker = ['brak', 'jams', 'green', 'hook', 'footer', 'oo']
  let lakersObj = [
    { value: 'brak', number: 0 },
    { value: 'jams', number: 1 },
    { value: 'green', number: 2 },
    { value: 'hook', number: 3 },
    { value: 'footer', number: 4 },
    { value: 'oo', number: 5 },
  ]

  const handleShowAlert = (ref: any) => {
    ref.current.show()
  }
  const handleFetch = (value: string) => {
    return laker
      .filter((item: string) => item.includes(value))
      .map((name) => ({ value: name }))
    // return lakersObj.filter((item) => item.value.includes(value))
  }
  const handleSelect = (value: DataSourceType) => {
    console.log(value)
  }
  const handleOption = (item: DataSourceType<GitUserProps>): ReactElement => {
    return (
      <div>
        <h5>name: {item.login}</h5>
        <p>url: {item.url}</p>
      </div>
    )
  }
  const handleFetchGit = (value: string) => {
    // console.log(fetch)
    return fetch(`https://api.github.com/search/users?q=${value}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }))
      })
  }
  return (
    <div className="App">
      <AutoComplete
        fetchSuggestion={handleFetch}
        onSelect={handleSelect}
        // renderOption={handleOption}
      />
      <AutoComplete
        fetchSuggestion={handleFetchGit}
        onSelect={handleSelect}
        renderOption={handleOption}
      />
      <Input
        prepend="https://"
        append=".com"
        onChange={(e) => console.log('onChange', e.target.value)}
      />
      <Input prepend="https://" append=".com" disabled size="sm" />
      <Input prepend="https://" append=".com" size="lg" />
      <Input prepend="https://" icon="search" disabled />
      <Input append=".com" placeholder="请输入内容" />
      <Input prepend="https://" size="sm" />
      <Input append=".com" size="lg" />
      <Transition in={isShow} timeout={300} animation="zoom-in-left">
        <div>
          <Icon icon="arrow-down" theme="primary" size="sm" />
          {/* <FontAwesomeIcon spin icon={faCoffee} size='10x' style={{color: 'red'}} /> */}
          <Tabs
            defaultIndex={0}
            onSelect={(index) => {
              alert(index)
            }}
            type="line"
          >
            <TabItem index={0} label="选项一">
              选项一44444444444444444444444
            </TabItem>
            <TabItem index={1} label="选项二">
              选项二555555555555555555555555
            </TabItem>
            <TabItem index={2} label="选项三">
              选项三
            </TabItem>
          </Tabs>
        </div>
      </Transition>
      <Transition in={isShow} timeout={300} animation="zoom-in-left" wrapper>
        <Button size={ButtonSize.Large}>Transition</Button>
      </Transition>
      {/* <br /><br /> */}
      <Menu
        // mode="vertical"
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
      <Button
        btnType={ButtonType.Primary}
        size={ButtonSize.Small}
        onClick={() => {
          setIsShow(!isShow)
        }}
      >
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
