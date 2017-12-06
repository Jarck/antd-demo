import { message } from 'antd';

// const API_URL = process.env.REACT_API_URL;
const API_URL = 'http://noah.hizuche.cn';

var Fetch = {
  // GET请求
  get(path) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/${path}`, {
        headers: new Headers({
          'skio-token': localStorage.getItem('skio-token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        })
      }).then(res => {
        return checkReturnStatus(res);
      }).then(json => {
        resolve(json);
      }).catch(error => {
        reject(error);
      })
    });
  },

  // PATCH/PUT/POST请求
  http_method(path, values, method) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/${path}`, {
        method: `${method}`,
        body: JSON.stringify(values),
        headers: new Headers({
          'skio-token': localStorage.getItem('skio-token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        })
      }).then(res => {
        return checkReturnStatus(res);
      }).then(json => {
        resolve(json);
      }).catch(error => {
        reject(error);
      })
    });
  },

  // DELETE请求
  del(path) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/${path}`, {
        method: 'DELETE',
        headers: new Headers({
          'skio-token': localStorage.getItem('skio-token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        })
      }).then(res => {
        return checkReturnStatus(res);
      }).then(json => {
        resolve(json);
      }).catch(error => {
        reject(error);
      })
    });
  },
}

function checkReturnStatus(res) {
  let errors;

  switch (res.status) {
    case 200:
      return res.json();
    case 401:
      message.error('登录会话过期,请重新登录', 3);
      errors = `${res.status}, ${res.statusText}`;
      throw errors;
    case 403:
      message.error('无权限访问', 3);
      errors = `${res.status}, ${res.statusText}`;
      throw errors;
    case 404:
      message.error('资源不存在', 3);
      errors = `${res.status}, ${res.statusText}`;
      throw errors;
    case 500:
      message.error('服务器内部错误', 3);
      errors = `${res.status}, ${res.statusText}`;
      throw errors;
    default:
  }
}

export default Fetch;
