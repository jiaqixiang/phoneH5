<template>
  <div id="login">
    <div class="login-img">
        <img src="../../static/image/group14.png" alt="aaa">
    </div>
    <yd-tab>
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
              <yd-input slot="right" type="number" v-model="password" placeholder="请输入密码"></yd-input>
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
      phone: '',
      password: '',
      start1: false
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
    sendCode1() {
      if (!this.rightMobile.status) {
        this.$dialog.toast({ mes: this.rightMobile.msg, timeout: 1000 });
        return;
      }
      this.$dialog.loading.open('发送中...');
      setTimeout(() => {
        this.start1 = true;
        this.$dialog.loading.close();
        this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 800
        });
      }, 500);
    },
    loginFn: function() {
      if (!this.rightMobile.status) {
        this.$dialog.toast({ msg: this.rightMobile.msg, timeout: 1000});
      } else {
      }
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