import { 
  GET_CAPTCHA,
  RESET_CAPTCHA,
} from '../../actions/login';

const initState = {
  random: Math.random().toString().slice(-6),
  captcha: '',
}

export default function captcha(state=initState, actions) {
  switch (actions.type) {
    case GET_CAPTCHA:
      return {
        ...state,
        captcha: actions.captcha
      }
    case RESET_CAPTCHA:
      return {
        ...state,
        random: Math.random().toString().slice(-6)
      }
    default:
      return state;
  }
}
