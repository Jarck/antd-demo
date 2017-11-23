import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Captcha from './Captcha';
import Validate from '../tools/validate/Regu';
import * as LoginAction from '../actions/login';
import '../stylesheets/login/Login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) { return };

      const { mobile, captcha } = this.props.login;
      const params = {
        phone: mobile,
        verify_code: captcha,
      }

      this.props.actions.login(params);
    });
  }

  // 修改手机号码
  changeMobile = (e) => {
    var self = this;
    let mobile = e.target.value;

    if (mobile.length === 11) {
      if (Validate.isMobile(mobile)) {
        self.props.actions.changeMobileSucc(mobile);
      } else {
        self.props.actions.changeMobileFail();
      }
    } else {
      self.props.actions.changeMobileFail();
    }
  }

  // 设置图片验证码
  setCaptchaImg = () => {
    this.props.actions.showCaptchaModal();
  }

  cancelCaptchaModal = () => {
    this.props.actions.cancelCaptchaModal()
  }

  // 发送短信验证码
  sendCode = () => {
    let mobile = this.props.login.mobile;
    this.props.actions.sendAuthCode(this, mobile);
  }

  // 修改短信验证码
  changeCaptcha = (e) => {
    var self = this;
    let auth_code = e.target.value;

    if (auth_code.length === 6) {
      self.props.actions.changeAuthCodeSucc(auth_code);
    } else {
      self.props.actions.changeAuthCodeFail();
    }
  }

  render(){
    const { captcha_modalable, auth_code_state, loginable, count } = this.props.login;
    const { getFieldDecorator } = this.props.form;

    let text = '获取验证码';
    let disabled = true;

    // 1、手机号验证通过, 未点击"获取验证码"按钮
    // 2、手机号验证通过, 已点击"获取验证码"按钮
    // 3、手机号未验证通过, default
    if (auth_code_state === 'waiting') {
      disabled = true;
    } else if (auth_code_state === 'to_send') {
      disabled = false;
    } else if (auth_code_state === 'sent') {
      disabled = true;
      text = `${count}秒后重发`;
    } else if (auth_code_state === 'failed') {
      disabled = true;
    } else {
      disabled = true;
    }

    const captcha_modal = captcha_modalable ? <Captcha sendCode={this.sendCode} showable={captcha_modalable} cancel={this.cancelCaptchaModal} /> : null

    return (
      <div className="login">
        { captcha_modal }
        <Form onSubmit={ this.handleSubmit } className="login-form">
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号！' }],
            })(
              <Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />}
                placeholder="已验证手机号"
                onChange={ this.changeMobile }
                maxLength={ 11 }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请输入短信验证码！' }]
            })(
              <Input prefix={ <Icon type="lock" style={{ fontSize: 13 }} />}
                suffix={ <Button onClick={ this.setCaptchaImg } disabled={ disabled }>{ text }</Button> }
                placeholder="短信验证码"
                onChange={ this.changeCaptcha }
                maxLength={ 6 }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button" disabled={ loginable }>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappendNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => ({
  login: state.session.login,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, LoginAction), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappendNormalLoginForm);
