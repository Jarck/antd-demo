var validate = {
  isMobile(phone) {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;

    if(reg.text(phone)){
      return true;
    }

    return false;
  }
}

export default validate;
