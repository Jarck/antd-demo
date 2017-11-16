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
  modal: false,
  loginable: false,
}

export default function login(state=initState, action) {
  switch (action.type) {
    case CHANGE_MOBILE_SUCC:
      return {
        ...state,
        mobile: action.mobile,
      }
    case CHANGE_MOBILE_FAIL:
      return {
        ...state,
      };
    case CHANGE_CAPTCHA_SUCC:
      return {
        ...state,
        captcha: action.captcha,
        loginable: true,
      }
    case CHANGE_CAPTCHA_FAIL:
      return {
        ...state,
        loginable: false,
      }
    default:
      return state;
  }
}
