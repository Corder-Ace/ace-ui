import React from "react";
import {View} from '@tarojs/components';
import {Modal, Button} from '@/components';
import {login} from '@/api';
import classNames from 'classnames';


export default class Site extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      tip: false,
    }
  }

  componentDidMount() {
    login()
      .then(res => {
        console.log(res);
      })
  }

  static prefixCls = 'plum-site';
  handleModal = (visible: boolean) => {
    this.setState({visible})
  }
  handleTipModal = (visible) => {
    this.setState({tip: visible});
  }
  render() {
    const {prefixCls} = Site;
    const {visible, tip} = this.state;
    return (
      <View
        style={{padding: 30}}
        className={classNames(`${prefixCls}`, `${prefixCls}__container`)}
      >
        <Button block
          type='primary'
          style={{marginBottom: '15px'}}
          onClick={() => this.handleModal(true)}
        >开弹窗(primary)</Button>

        <Button block
          type='cancel'
          style={{marginBottom: '15px'}}
          onClick={() => this.handleModal(false)}
        >cancel</Button>

        <Button block
          type='primary'
          style={{marginBottom: '15px'}}
          ghost
          hairline
        >透明背景 + 细边框</Button>

        <Button block
          style={{marginBottom: '15px'}}
        >default</Button>

        <Button
          block
          type='disabled'
          style={{marginBottom: '15px'}}
        >disabled</Button>

        <Button block
          type='success'
          style={{marginBottom: '15px'}}
        >success</Button>

        <Button block
          type='primary'
          shape='circle'
          style={{marginBottom: '15px'}}
        >已下架</Button>

        <Button block
          type='primary'
          style={{marginBottom: '15px'}}
          size='large'
        >large</Button>

        <Button
          size='small'
          block
          type='primary'
          style={{marginBottom: '15px'}}
        >small</Button>
        <Modal
          visible={visible}
          title='活动规则'
          onOk={() => this.handleModal(false)}
          onCancel={() => this.handleModal(false)}
          showCancelButton={false}
        >
          内内容内内容重要内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容
        </Modal>
        <Modal
          visible={tip}
          title='活动规则'
          onOk={() => this.handleModal(false)}
          onCancel={() => this.handleModal(false)}
          showCancelButton={false}
          model='tip'
        >
          内内容内内容重要内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容
        </Modal>
      </View>
    )
  }
}
