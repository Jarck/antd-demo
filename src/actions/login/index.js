// 手机号
export const CHANGE_MOBILE_SUCC = 'CHANGE_MOBILE_SUCC';
export const CHANGE_MOBILE_FAIL = 'CHANGE_MOBILE_FAIL';

// 图形验证码
export const SHOW_CAPTCHA_MODAL = 'SHOW_CAPTCHA_MODAL';
export const CANCEL_CAPTCHA_MODAL = 'CANCEL_CAPTCHA_MODAL';

export const GET_CAPTCHA = 'GET_CAPTCHA';
export const RESET_CAPTCHA = 'RESET_CAPTCHA';

// 短信验证码
export const CHANGE_CAPTCHA_SUCC = 'CHANGE_CAPTCHA_SUCC';
export const CHANGE_CAPTCHA_FAIL = 'CHANGE_CAPTCHA_FAIL';

// 登录
export const LOGIN = 'LOGIN';

export const changeMobileSucc = ({ mobile }) => ({ type: CHANGE_MOBILE_SUCC, mobile });
export const changeMobileFail = () => ({ type: CHANGE_MOBILE_FAIL });

export const showCaptchaModal = () => ({ type: SHOW_CAPTCHA_MODAL });
export const cancelCaptchaModal = () => ({ type: CANCEL_CAPTCHA_MODAL });

// 获取图像验证码
export const getCaptcha = ({ captcha }) => ({ type: GET_CAPTCHA, captcha });

// 重置图像验证码
export const resetRandom = () => ({ type: RESET_CAPTCHA });

export const changeCaptchaSucc = ({ captcha }) => ({ type: CHANGE_CAPTCHA_SUCC, captcha });
export const changeCaptchaFail = () => ({ type: CHANGE_CAPTCHA_FAIL });

export const login = ({ values }) => ({ type: LOGIN, values });
