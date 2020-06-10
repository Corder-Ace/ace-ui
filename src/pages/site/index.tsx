import React from "react";
import {View} from '@tarojs/components';
import {Modal, Button} from '@/components';
import {login} from '@/api';
import classNames from 'classnames';


export default class Site extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
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
  render() {
    const {prefixCls} = Site;
    const { visible } = this.state;
    return (
      <View
        style={{padding: 30}}
        className={classNames(`${prefixCls}`, `${prefixCls}__container`)}
      >
        <Button type='primary' onClick={() => this.handleModal(true)}>开弹窗</Button>
        <Button type='disabled' onClick={() => this.handleModal(false)}>关弹窗</Button>
        <Button type='primary' ghost hairline>确认收货</Button>
        <Button type='primary'>确认收货</Button>
        <Button type='primary'>确认收货</Button>
        <Modal
          visible={visible}
          title='活动规则'
          onOk={() => this.handleModal(false)}
          onCancel={() => this.handleModal(false)}
          showCancelButton={false}
          model="tip"
        >
          内内容内内容重要内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容
        </Modal>
      </View>
    )
  }
}
