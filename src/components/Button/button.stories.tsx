import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import Button from './button'
import '../../styles/index.scss'

// 😀 😎 👍 💯

const defaultBtn = () => (
  <Button onClick={action('default clicked')}>default button</Button>
)
const sizeBtn = () => (
  <>
    <Button size="sm" onClick={action('sm clicked')}>
      small Button
    </Button>
    <Button>default Button</Button>
    <Button size="lg" onClick={action('sm clicked')}>
      large Button
    </Button>
  </>
)
const typeBtn = () => (
  <>
    <Button btnType="default" onClick={action('default btn')}>
      default
    </Button>
    <Button btnType="primary" onClick={action('primary btn')}>
      primary
    </Button>
    <Button btnType="danger" onClick={action('danger btn')}>
      danger
    </Button>
    <Button btnType="link" onClick={action('link btn')}>
      link
    </Button>
  </>
)
storiesOf('Button component', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      // text:支持markdown格式 # ~~~js
      text: 'This is a very nice component',
      inline: true,
      header: false,
    },
  })
  .add('Button', defaultBtn)
  .add('size Button', sizeBtn)
  .add('type Button', typeBtn)
