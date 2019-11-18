<template>
  <div id="login">
    <div class="login-img">
        <img src="../../static/image/group14.png" alt="aaa">
    </div>
    <yd-tab v-model="tab" :item-click="itemClick">
      <yd-tab-panel label="账号登陆">
        <yd-cell-group>
          <yd-cell-item>
              <span slot="left">手机号：</span>
              <yd-input slot="right" v-model="phone" regex="mobile" placeholder="请输入手机号码"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
              <span slot="left">登陆密码：</span>
              <yd-input slot="right" type="password" v-model="password" placeholder="请输入密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item v-if="isShowCaptcha">
              <span slot="left">验证码：</span>
              <yd-input slot="right" type="text" v-model="captcha" placeholder="请输入验证码"></yd-input>
              <img slot="right" :src="localCaptcha" alt="" @click="reloadCaptcha" width="150">
          </yd-cell-item>
        </yd-cell-group>
      </yd-tab-panel>
      <yd-tab-panel label="手机号登陆">
        <yd-cell-group>
          <yd-cell-item>
              <span slot="left">手机号：</span>
              <yd-input slot="right" v-model="phone" regex="mobile" placeholder="请输入手机号码"></yd-input>
              <yd-sendcode slot="right" 
                v-model="start1" 
                init-str="获取验证码"
                @click.native="sendCode1" 
                type="warning"
              ></yd-sendcode>
          </yd-cell-item>
          <yd-cell-item>
              <span slot="left">验证码：</span>
              <yd-input slot="right" type="number" v-model="code" placeholder="请输入密码"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
      </yd-tab-panel>
    </yd-tab>
    <yd-button size="large" type="danger" @click.native="loginFn" style="width:90%;margin-left:5%;margin-top:.1rem">登陆</yd-button>
    <p style="text-align:center;margin-top:.3rem">没有账号？<a href="#" style="color:blue;">立即注册</a></p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      tab: Number(this.GLOBAL.getStorage('loginType')) || 0,
      invitecode: this.GLOBAL.getStorage('invitecode') || '', // 邀请码
      phone: '',
      password: '',
      code: '',
      start1: false,  // 短信倒计时
      captcha: '', // 验证码
      localCaptcha: '', //验证码图片
      isShowCaptcha: false // 是否需要验证码
    }
  },
  created () {
    if (this.GLOBAL.getStorage('user_token')) {
      this.$dialog.toast({
        mes: '你已经登陆！',
        timeout: 2000,
        callback: () => {
          this.$router.go(-1);
        }
      })
    }
  },
  computed: {
    rightMobile: function () {
      var obj = {};
      if(this.phone == '') {
        obj.status = false;
        obj.msg = '请输入手机号';
      } else if (!/^1[345678]{1}\d{9}$/gi.test(this.phone)) {
        obj.status = false;
        obj.msg = '手机号格式不正确';
      } else {
        obj.status = true;
      }
      return obj;
    }
  },
  methods: {
    itemClick: function (key) {
      this.tab = key;
      this.GLOBAL.setStorage('loginType', key);
    },
    sendCode1() {
      var _this = this;
      if (!this.rightMobile.status) {
        this.$dialog.toast({ mes: this.rightMobile.msg, timeout: 1000 });
        return;
      }
      this.$dialog.loading.open('发送中...');
      // setTimeout(() => {
      //   _this.$dialog.loading.close();
      //   _this.$api.sms({mobile: this.phone, code: 'login'}, (res) => {
      //   if (res.status) {
      //     _this.start1 = true;
      //     _this.$dialog.toast({
      //       mes: res.msg,
      //       icon: 'success',
      //       timeout: 1000
      //     })
      //   }
      // })
      // }, 1000);
      setTimeout(() => {
        _this.$dialog.loading.close();
        _this.start1 = true;
        _this.$dialog.toast({
          mes: '发送成功',
          icon: 'success',
          timeout: 1000
        })
      }, 1000);
    },
    loginFn: function() {
      var _this = this;
      if (!this.rightMobile.status) {
        _this.$dialog.toast({ mes: this.rightMobile.msg, timeout: 1000});
      } else {
        if (!this.tab) {
          // 账号密码登陆
          if (!this.password) {
            _this.$dialog.toast({ mes: '请输入密码！', timeout: 1000});
          } else {
            let data = {
              mobile: this.phone,
              password: this.password
            };
            if (this.isShowCaptcha) {
              data.captcha = this.captcha;
            }
            this.$api.login(data, res => {
              if (res.status) {
                this.GLOBAL.setStorage('user_token', res.data);
                this.redirectHandler();
              } else {
                // 需输入验证码或验证码错误刷新
                if (res.data === 10013 || res.data === 10012) {
                  this.isShowCaptcha = true;
                  this.localCaptcha = this.GLOBAL.getCapcha();
                }
              }
            })
          }
        } else {
          // 短信验证登陆
          if (!this.code) {
            _this.$dialog.toast({ mes: '请输入短信验证码！', timeout: 1000});
          } else {
            let data = {
              mobile: this.mobile,
              code: this.code,
              invitecode: this.invitecode
            };
            this.$api.smsLogin(data, res => {
              if (res.status) {
                this.GLOBAL.setStorage('user_token', res.data);
                this.redirectHandler();
              }
            })
          }
        }
      }
    },
    reloadCaptcha: function () {

    },
    // 重定向跳转，或返回上一个页面
    redirectHandler: function () {
      this.$router.replace(
        this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '/'
      )
    }
  }
}
</script>

<style scoped lang="scss">
    #login .login-img {
        background: #cecece;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>