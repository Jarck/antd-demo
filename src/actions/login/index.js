import { message } from 'antd';
import FeatchData from '../../tools/fetch/FetchData';

// 手机号
export const CHANGE_MOBILE_SUCC = 'CHANGE_MOBILE_SUCC';
export const CHANGE_MOBILE_FAIL = 'CHANGE_MOBILE_FAIL';

// 图形验证码
export const SHOW_CAPTCHA_MODAL = 'SHOW_CAPTCHA_MODAL';
export const CANCEL_CAPTCHA_MODAL = 'CANCEL_CAPTCHA_MODAL';

export const GET_CAPTCHA = 'GET_CAPTCHA';
export const RESET_CAPTCHA = 'RESET_CAPTCHA';

// 短信验证码
export const SEND_AUTH_CODE = 'SEND_AUTH_CODE';
export const SEND_AUTH_CODE_SUCC = 'SEND_AUTH_CODE_SUCC';
export const SEND_AUTH_CODE_FAIL = 'SEND_AUTH_CODE_FAIL';
export const CHANGE_AUTH_CODE_SUCC = 'CHANGE_AUTH_CODE_SUCC';
export const CHANGE_AUTH_CODE_FAIL = 'CHANGE_AUTH_CODE_FAIL';

// 短信验证码倒计时
export const TIMER_COUNTING = 'TIMER_COUNTING';
export const TIMER_STOP = 'TIMER_STOP';

// 登录
export const LOGIN_SUCC = 'LOGIN_SUCC';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const changeMobileSucc = (mobile) => ({ type: CHANGE_MOBILE_SUCC, mobile });
export const changeMobileFail = () => ({ type: CHANGE_MOBILE_FAIL });

// 图形验证码
export const showCaptchaModal = () => ({ type: SHOW_CAPTCHA_MODAL });
export const cancelCaptchaModal = () => ({ type: CANCEL_CAPTCHA_MODAL });

// 获取图像验证码
export const getCaptcha = (captcha) => ({ type: GET_CAPTCHA, captcha });

// 重置图像验证码
export const resetRandom = () => ({ type: RESET_CAPTCHA });

// 发送短信验证码
// export const sendAuthCode = (self, mobile) => ({ type: SEND_AUTH_CODE, self, mobile });
export const sendAuthCode = (self, mobile) => {
  return dispatch => {
    FeatchData.http_method(`v1/verification_code`, { phone: mobile }, 'POST').then(data => {
      if (data.status === 200) {
        dispatch(sendAuthCodeSuss());
        self.timer = setInterval(() => {
          dispatch(tick(self));
        }, 1000);
      } else {
        dispatch(sendAuthCodeFail());
        message.error(data.message)
      }

      dispatch(resetRandom());
    })
  }
}

const tick = (self) => {
  return dispatch => {
    let count = self.props.login.count;
    if (count < 1) {
      clearInterval(self.timer);
      dispatch(timerStop());
    } else {
      dispatch(timerCounting(count));
    }
  }
}

export const sendAuthCodeSuss = () => ({ type: SEND_AUTH_CODE_SUCC });
export const sendAuthCodeFail = () => ({ type: SEND_AUTH_CODE_FAIL });

export const timerCounting = (count) => ({ type: TIMER_COUNTING, count });
export const timerStop = () => ({ type: TIMER_STOP });

export const changeAuthCodeSucc = (auth_code) => ({ type: CHANGE_AUTH_CODE_SUCC, auth_code });
export const changeAuthCodeFail = () => ({ type: CHANGE_AUTH_CODE_FAIL });

// 登录
// export const login = (values) => ({ type: LOGIN, values });
export const login = (values) => {
  return dispatch => {
    FeatchData.http_method(`v1/authentication`, values, 'POST').then(data => {
      if (data.status === 200) {
        localStorage.setItem('skio-token', data.token);
        dispatch(loginSucc());
      } else {
        dispatch(loginFail());
        message.error(data.message);
      }
    })
  }
}

export const loginSucc = () => ({ type: LOGIN_SUCC });
export const loginFail = () => ({ type: LOGIN_FAIL });
