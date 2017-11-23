import { 
  CHANGE_MOBILE_SUCC,
  CHANGE_MOBILE_FAIL,
  SHOW_CAPTCHA_MODAL,
  CANCEL_CAPTCHA_MODAL,
  SEND_AUTH_CODE,
  SEND_AUTH_CODE_SUCC,
  SEND_AUTH_CODE_FAIL,
  TIMER_COUNTING,
  TIMER_STOP,
  CHANGE_AUTH_CODE_SUCC,
  CHANGE_AUTH_CODE_FAIL,
  LOGIN_SUCC,
  LOGIN_FAIL,
} from '../../actions/login';

const initState = {
  mobile: '',
  captcha: '',
  count: 60,
  captcha_modalable: false,
  auth_code_state: 'waiting',
  loginable: true,
  loading: false,
}

export default function login(state=initState, action) {
  switch (action.type) {
    // 验证手机号
    case CHANGE_MOBILE_SUCC:
      return {
        ...state,
        mobile: action.mobile,
        auth_code_state: 'to_send',
      }
    case CHANGE_MOBILE_FAIL:
      return {
        ...state,
        captcha_modalable: false,
        auth_code_state: 'waiting',
      };
    // 图形校验码
    case SHOW_CAPTCHA_MODAL:
      return {
        ...state,
        captcha_modalable: true,
      }
    case CANCEL_CAPTCHA_MODAL:
      return {
        ...state,
        captcha_modalable: false,
      }
    // 发送短信验证码
    case SEND_AUTH_CODE:
      return {
        ...state,
        captcha_modalable: true,
      }
    case SEND_AUTH_CODE_SUCC:
      return {
        ...state,
        captcha_modalable: false,
        auth_code_state: 'sent',
        count: 60,
      }
    case SEND_AUTH_CODE_FAIL:
      return {
        ...state,
        auth_code_state: 'failed',
        loginable: true,
      }
    // 倒计时
    case TIMER_COUNTING:
      return {
        ...state,
        count: action.count -1,
      }
    case TIMER_STOP:
      return {
        ...state,
        auth_code_state: 'to_send',
        loginable: false,
      }
    // 校验短信验证码
    case CHANGE_AUTH_CODE_SUCC:
      return {
        ...state,
        captcha: action.auth_code,
        loginable: false,
      }
    // 短信校验码校验失败
    case CHANGE_AUTH_CODE_FAIL:
      return {
        ...state,
        loginable: true,
      }
    // 登录
    case LOGIN_SUCC:
      window.location.href = '/';
      break;
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}
