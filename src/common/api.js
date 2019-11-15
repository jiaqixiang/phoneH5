import axios from 'axios';
import common from './common';
import qs from 'qs';
import _this from '../main';
import {
  apiUrl
} from './serviceUrl';

let methodToken = [
  'user.sms'
];

// token验证
const post = (method, data, callback) => {
  if (methodToken.indexOf(method) >= 0) {
    let userToken = common.getStorage('user_token');
    if (!userToken) {
      common.jumpToLogin();
      return;
    } else {
      data.token = userToken;
    }
  }
  data.method = method;
  sendPost(apiUrl, qs.stringify(data), {}, callback);
};

// axios统一处理
const sendPost = (url, data, config = {}, callback) => {
  if (Object.keys(config).length) {
    _this.$dialog.loading.open('上传中...');
  }
  axios.post(url, data, config).then(response => {
    if (Object.keys(config).length) {
      _this.$dialog.loading.close();
    }
    if (!response.data.status) {
      common.errorToShow(response.data.msg);
      if (response.data.data === 14007 || response.data.data === 14006) {
        // 未登录或token过期，删除token
        common.removeStorage('user_token');
        common.jumpToLogin();
      }
    }
    callback(response.data);
  }).catch(err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求参数错误';
          break;
        case 401:
          err.message = '未授权，请登录';
          break;
        case 403:
          err.message = '跨域拒绝访问';
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务未实现';
          break;
        case 502:
          err.message = '网关错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网关超时';
          break;
        case 505:
          err.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
      _this.$dialog.loading.close();
      common.errorToShow(err.message);
    }
  });
};

export const sms = (data, callback) => post('user.sms', data, callback);
