import React, { Component } from 'react';
import { Modal, Input, message } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LoginAction from '../actions/login';

class Captcha extends Component {
  handleOk = () => {
    let { captcha, random } = this.props.captcha;
    if (random === captcha) {
      this.props.sendCode();
    } else {
      message.error('请输入正确的图形验证码');
    }
  }

  handleCancel = () => {
    this.props.cancel();
  }

  inputCaptcha = (e) => {
    let value = e.target.value;
    this.props.actions.getCaptcha(value);
  }

  resetCaptcha = (e) => {
    this.props.actions.resetRandom();
  }

  handleOnEnterDown = (e) => {
    if (e.keyCode === 13) {
      this.handleOk();
    }
  }

  render() {
    const { random } = this.props.captcha;
    return (
      <div>
        <Modal
          visible={this.props.visible}
          title="请输入图形验证码"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="captcha" onClick={this.resetCaptcha} title="点击刷新图形验证码">
            { random }
          </div>
          <Input className="captcha-input"
            placeholder="请输入图形验证码"
            onChange={this.inputCaptcha}
            onKeyDown={this.handleOnEnterDown}
            maxLength={6}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  captcha: state.session.captcha,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, LoginAction), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Captcha);
