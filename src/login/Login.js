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

      const { mobile, captcha } = this.props.session;
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
console.log(">>>>>>")
      if (Validate.isMobile(mobile)) {
        self.props.actions.changeMobileSucc(mobile);
      } else {
        self.props.actions.changeMobileFail();
      }
    } else {
      self.props.actions.changeMobileFail();
    }
  }

  // 修改短信验证码
  changeCaptcha = (e) => {
    let captcha = e.target.value;
    const { mobile } = this.props.login;

    if (captcha.length === 6) {
      this.props.actions.changeCaptchaSucc(captcha);
    } else {
      this.props.actions.changeCaptchaFail();
    }
  }

  render(){
    const { mobile, captcha_modalable, captcha_state, loginable, count } = this.props.login;
    const { getFieldDecorator } = this.props.form;

    let text = '获取验证码';
    let disabled = false;

    // 1、手机号验证通过, 未点击"获取验证码"按钮
    // 2、手机号验证通过, 未点击"获取验证码"按钮
    // 3、手机号未验证通过, default
    if (captcha_state === 'toSend') {
      disabled = true;
    } else if (captcha_state === 'Sending') {
      disabled = true;
      text = `${count}秒后重发`;
    }

    const captcha_modal = captcha_modalable ? <Captcha sendCode={this.sendCode} showable={this.state.modal} cancel={this.cancel} /> : null

    return (
      <div>
        { captcha_modal }
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号！' }],
            })(
              <Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />}
                placeholder="已验证手机号"
                onChange={this.changeMobile}
                maxLength={11}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请输入短信验证码！' }]
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                suffix={<Button onClick={this.setCaptchaImg} disabled={disabled}>{text}</Button>}
                placeholder="短信验证码"
                onChange={this.changeCaptcha}
                maxLength={6}
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
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
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
  // actions: bindActionCreators(LoginAction, dispatch)
  actions: bindActionCreators(Object.assign({}, LoginAction), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappendNormalLoginForm);
