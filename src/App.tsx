import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button'

const App: React.FC = () => {
  
  return (
    <div className="App">
      <Button className="default" onClick={() => console.log('default')}>default</Button>
      <Button disabled>disabled</Button>
      <Button disabled btnType={ButtonType.Primary}>disabled</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Small</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Large</Button>
      <Button disabled btnType={ButtonType.Link} href={"http://www.baidu.com"}>Hell0</Button>
      <Button btnType={ButtonType.Link} href={"http://www.baidu.com"}>Hell0</Button>
    </div>
  );
}

export default App;
