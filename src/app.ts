import React, { Component } from 'react'
import { checkAppInfo } from './info';
import './styles/index.scss';

class App extends Component {

  componentDidMount () {
    checkAppInfo();
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
