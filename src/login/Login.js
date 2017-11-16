import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Validate from '../tools/validate/Regu';
import * as ActionFactory from '../actions/login/index';
import '../stylesheets/login/Login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(`Received values of from: ${values}`);
      }
    });
  }

  // 修改手机号码
  changeMobile = (e) => {
    let mobile = e.target.value;

    if (mobile.length === 11) {
      if (Validate.isMobile(mobile)) {
        this.props.actions.changeMobileSucc(mobile);
      } else {
        this.props.actions.changeMobileFail();
      }
    } else {
      this.props.actions.changeMobileFail();
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
    const { getFieldDecorator } = this.props.form;

    return (
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
    );
  }
}

const WrappendNormalLoginForm = Form.create()(NormalLoginForm);


const mapStateToProps = state => ({
  mobile: state.login
})

const mapDispatchToProps = dispatch => ({
    Actions: bindActionCreators(ActionFactory, dispatch)

})


// export default WrappendNormalLoginForm;
export default connect(mapStateToProps, mapDispatchToProps)(WrappendNormalLoginForm);
// export default connect(({ NormalLoginForm }) => ({
//   NormalLoginForm
// }))(WrappendNormalLoginForm);
