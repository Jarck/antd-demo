var validate = {
  isMobile(phone) {
    let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;

    if(reg.exec(phone)){
      return true;
    }

    return false;
  },
}

export default validate;
