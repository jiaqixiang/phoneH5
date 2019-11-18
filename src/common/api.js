import axios from 'axios';
import qs from 'qs';
import _this from '../main';
import common from './common';
import {
  host,
  apiUrl
} from './serviceUrl';

let methodToken = [
  'user.info',
  'user.editinfo',
  'user.changeavatar',
  'user.logout',
  'user.addgoodsbrowsing',
  'user.delgoodsbrowsing',
  'user.goodsbrowsing',
  'user.goodscollection',
  'user.goodscollectionlist',
  'user.saveusership',
  'user.vuesaveusership',
  'user.getshipdetail',
  'user.setdefship',
  'user.editship',
  'user.removeship',
  'user.getusership',
  'user.pay',
  'user.orderevaluate',
  'user.getuserdefaultship',
  'user.issign',
  'user.sign',
  'user.mypoint',
  'user.pointlog',
  'user.getbankcardlist',
  'user.getdefaultbankcard',
  'user.addbankcard',
  'user.removebankcard',
  'user.setdefaultbankcard',
  'user.getbankcardinfo',
  'user.editpwd',
  'user.forgotpwd',
  'user.recommend',
  'user.balancelist',
  'user.sharecode',
  'user.cash',
  'user.cashlist',
  'coupon.getcoupon',
  'coupon.usercoupon',
  'cart.add',
  'cart.del',
  'cart.getlist',
  'cart.setnums',
  'cart.getnumber',
  'order.cancel',
  'order.del',
  'order.details',
  'order.confirm',
  'order.getlist',
  'order.create',
  'order.getship',
  'order.getorderlist',
  'order.getorderstatusnum',
  'order.aftersaleslist',
  'order.aftersalesinfo',
  'order.aftersalesstatus',
  'order.addaftersales',
  'order.sendreship',
  'order.iscomment',
  'payments.getinfo',
  'user.getuserpoint',
  'coupon.getcouponkey',
  'store.isclerk',
  'store.storeladinglist',
  'store.ladinginfo',
  'store.lading',
  'store.ladingdel'
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

// 获取店铺配置
export const shopConfig = () => axios.get(host + '/api/common/jshopconf').then(response => response.data);
// 发送短信验证码
export const sms = (data, callback) => post('user.sms', data, callback);
// 用户登录
export const login = (data, callback) => post('user.login', data, callback);
// 短信验证码登录
export const smsLogin = (data, callback) => post('user.smslogin', data, callback);
