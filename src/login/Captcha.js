import React, { Component } from 'react';
import { Modal, Input, message } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LoginAction from '../actions/login';
import '../stylesheets/login/Captcha.css';

class Captcha extends Component {
  handleOk = () => {
    var self = this;
    let { captcha, random_string } = self.props.captcha;
    if (random_string === captcha) {
      self.props.sendCode();
    } else {
      message.error('请输入正确的图形验证码');
    }
  }

  handleCancel = () => {
    var self = this;
    // 重置图片验证码
    self.props.actions.resetRandom();
    self.props.cancel();
  }

  // 验证码输入
  inputCaptcha = (e) => {
    var self = this;
    let value = e.target.value;
    self.props.actions.getCaptcha(value);
  }

  // 重置图片验证码
  resetCaptcha = (e) => {
    var self = this;
    self.props.actions.resetRandom();
  }

  handleOnEnterDown = (e) => {
    var self = this;
    if (e.keyCode === 13) {
      self.handleOk();
    }
  }

  render() {
    const { random_color, random_font, random_string } = this.props.captcha;

    var captcha_style = {
      'color': `${random_color}`,
      'fontFamily': random_font,
      'fontStyle': 'italic',
    }

    return (
      <div>
        <Modal visible={ this.props.showable }
               title="请输入图形验证码"
               onOk={ this.handleOk }
               onCancel={ this.handleCancel } >
          <div className="captcha" onClick={ this.resetCaptcha } title="点击刷新图形验证码">
            <div style={captcha_style}> { random_string } </div>
          </div>
          <Input className="captcha-input"
            placeholder="请输入图形验证码"
            onChange={ this.inputCaptcha }
            onKeyDown={ this.handleOnEnterDown }
            maxLength={ 6 } />
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
