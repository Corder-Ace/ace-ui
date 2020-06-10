import React, {Fragment} from 'react';
import {ITouchEvent} from "@tarojs/components";
import classNames from 'classnames';
import Dialog from '../Dialog';
import Button, {ButtonType, BaseButtonProps} from '../Button';
import './index.scss';


export interface ModalProps {
  /** 对话框是否可见 */
  visible?: boolean;
  /** 确定按钮 loading */
  confirmLoading?: boolean;
  /** 标题 */
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 点击确定回调 */
  onOk?: (e: ITouchEvent) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层的回调 */
  onCancel?: (e: ITouchEvent) => void;
  /** 宽度 */
  width?: string | number;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 确认按钮文字 */
  okText?: React.ReactNode;
  /** 确认按钮类型 */
  okType?: ButtonType;
  /** 取消按钮文字 */
  cancelText?: React.ReactNode;
  /** 是否展示Ok按钮 */
  showOkButton?: boolean;
  /** 是否展示Cancel按钮 */
  showCancelButton?: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 强制渲染 Modal */
  forceRender?: boolean;
  /** 弹窗种类 text: 文本类 tip: 纯提示弹窗*/
  model?: 'default' | 'tip';
  okButtonProps?: BaseButtonProps;
  cancelButtonProps?: BaseButtonProps;
  style?: React.CSSProperties;
  wrapClassName?: string;
  className?: string;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
}

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  onOk?: (...args) => any;
  onCancel?: (...args) => any;
  okButtonProps?: BaseButtonProps;
  cancelButtonProps?: BaseButtonProps;
  width?: string | number;
  okText?: React.ReactNode;
  okType?: ButtonType;
  cancelText?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = props => {
  const {
    prefixCls,
    footer,
    visible,
    wrapClassName,
    model,
    ...restProps
  } = props;

  const handleCancel = (e: ITouchEvent) => {
    const {onCancel} = props;
    onCancel && onCancel(e);
  }

  const handleOk = (e: ITouchEvent) => {
    const {onOk} = props;
    onOk && onOk(e)
  }

  const renderFooter = (locale = {cancelText: '取消', okText: '知道了'}) => {
    const {okText, okType, cancelText, showOkButton, showCancelButton} = props;
    const cancelButtonProps = props.cancelButtonProps || {};
    const okButtonProps = props.okButtonProps || {};

    if (props.model === 'tip') {
      cancelButtonProps.size = 'large';
      okButtonProps.size = 'large';
    }

    return (
      <Fragment>
        {showCancelButton && <Button
          onClick={handleCancel}
          {...cancelButtonProps}
        >
          {cancelText || locale.cancelText}
        </Button>}
        {showOkButton && <Button
          onClick={handleOk}
          type={okType}
          {...okButtonProps}
        >
          {okText || locale.okText}
        </Button>}
      </Fragment>
    )
  }

  const wrapClasses = classNames(wrapClassName, {
    [`${prefixCls}--tip__wrap`]: model === 'tip'
  })

  return <Dialog
    {...restProps}
    prefixCls={prefixCls}
    wrapClassName={wrapClasses}
    footer={footer === undefined ? renderFooter() : footer}
    visible={visible}
    onClose={handleCancel}
  />
}

Modal.defaultProps = {
  prefixCls: 'ace-modal',
  showOkButton: true,
  showCancelButton: true,
  model: "default",
  okButtonProps: {
    type: "primary"
  },
  cancelButtonProps: {
    type: "disabled"
  }
}

export default Modal;
