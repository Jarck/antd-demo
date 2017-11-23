import { 
  GET_CAPTCHA,
  RESET_CAPTCHA,
} from '../../actions/login';

const initState = {
  random_color: getRandomColor(),
  random_font: getRandomFont(),
  random_string: Math.random().toString(36).slice(-6),
  captcha: '',
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function getRandomFont() {
  let fontType = [ 'Arial', 'Verdana', 'Helvetica' ];

  let font = fontType[Math.floor(Math.random() * 3)];

  return font;
}

export default function captcha(state=initState, actions) {
  switch (actions.type) {
    case GET_CAPTCHA:
      return {
        ...state,
        captcha: actions.captcha,
      }
    case RESET_CAPTCHA:
      return {
        ...state,
        random_color: getRandomColor(),
        random_font: getRandomFont(),
        random_string: Math.random().toString(36).slice(-6),
      }
    default:
      return state;
  }
}
