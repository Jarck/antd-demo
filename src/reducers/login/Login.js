import { 
  CHANGE_MOBILE_SUCC,
  CHANGE_MOBILE_FAIL,
  CHANGE_CAPTCHA_SUCC,
  CHANGE_CAPTCHA_FAIL,
} from '../../actions/login';

const initState = {
  mobile: '',
  captcha: '',
  count: 60,
  captcha_modalable: false,
  captcha_state: 'waiting',
  loginable: false,
}

export default function login(state=initState, action) {
  switch (action.type) {
    // 手机号验证通过
    case CHANGE_MOBILE_SUCC:
      return {
        ...state,
        mobile: action.mobile,
        captcha_modal: true,
        captcha_state: 'tobe_send',
      }
    // 手机号验证失败
    case CHANGE_MOBILE_FAIL:
      return {
        ...state,
        captcha_modal: false,
        captcha_state: 'waiting',
      };
    // 验证码校验成功
    case CHANGE_CAPTCHA_SUCC:
      return {
        ...state,
        captcha: action.captcha,
        loginable: true,
      }
    // 校验码校验失败
    case CHANGE_CAPTCHA_FAIL:
      return {
        ...state,
        loginable: false,
      }
    default:
      return state;
  }
}
