export const CHANGE_MOBILE_SUCC = 'CHANGE_MOBILE_SUCC';
export const CHANGE_MOBILE_FAIL = 'CHANGE_MOBILE_FAIL';

export const CHANGE_CAPTCHA_SUCC = 'CHANGE_CAPTCHA_SUCC';
export const CHANGE_CAPTCHA_FAIL = 'CHANGE_CAPTCHA_FAIL';

export const changeMobileSucc = ({ mobile }) => ({ type: CHANGE_MOBILE_SUCC, mobile });
export const changeMobileFail = () => ({ type: CHANGE_CAPTCHA_FAIL });

export const changeCaptchaSucc = ({ captcha }) => ({ type: CHANGE_CAPTCHA_SUCC, captcha });
export const changeCaptchaFail = () => ({ type: CHANGE_CAPTCHA_FAIL });
