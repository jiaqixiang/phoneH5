<template>
  <div id="register">
    <div class="register-img">
        <img src="../../static/image/group14.png" alt="">
    </div>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">手机号：</span>
            <input type="text" slot="right" v-model="mobile">
            <yd-sendcode slot="right" 
                v-model="start1" 
                @click.native="sendCode" 
                type="primary"
                init-str="获取验证码"
            ></yd-sendcode>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">验证码：</span>
            <yd-input slot="right" v-model="code"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">密码：</span>
            <yd-input slot="right" type="password" v-model="password"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="danger" @click="registerFn" class="register-btn">注册</yd-button>
    <div class="register-login">
        <span>已有账号？</span><a href="#" style="color: blue" @click="toLogin">立即登陆</a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
          invitecode: '', // 邀请码
          start1: false,
          mobile: '',
          code: '', // 验证码
          password: ''
        }
    },
    created () {
        if (this.GLOBAL.getStorage('user_token')) {
            this.$dialog.toast({
                mes: '你已经登陆',
                timeout: 2000,
                callback: () => {
                    this.$router.go(-1);
                }
            })
        }
        if (this.$route.query.invitecode) {
            this.GLOBAL.setStorage('invitecode', this.$route.query.invitecode);
        }
        this.invitecode = this.GLOBAL.getStorage('invitecode') || '';
    },
    computed: {
        rightMobile: function () {
            let obj = {};
            if (!this.mobile) {
                obj.status = false;
                obj.msg = '请输入手机号';
            } else if (!(/^1[345678]{1}\d{9}$/gi.test(this.mobile))) {
                obj.status = false;
                obj.msg = '手机号格式不正确';
            } else {
                obj.status = true;
            }
            return obj;
        }
    },
    methods: {
        sendCode: function () {
            if (!this.rightMobile.status) {
                this.$dialog.toast({mes: this.rightMobile.msg, timeout: 1000})
            } else {
                this.$dialog.loading.open('发送中...');
                setTimeout(() => {
                    this.$dialog.loading.close();
                    this.$api.sms({mobile: this.mobile, code: 'reg'}, res => {
                        if (res.status) {
                            this.start1 = true;
                            this.$dialog.toast({mes: res.msg, icon: 'success', timeout: 1300});
                        }
                    })
                }, 1000);
            }
        },
        registerFn: function () {
            if (!this.rightMobile.status) {
                this.$dialog.toast({mes: this.rightMobile.msg, timeout: 1000});
            } else if (!this.code) {
                this.$dialog.toast({mes: '请输入验证码', timeout: 1000});
            } else if (!this.password) {
                this.$dialog.toast({mes: '请输入密码', timeout: 1000});
            } else {
                let data = {mobile: this.mobile, code: this.code, password: this.password};
                if (this.invitecode) {
                    data.invitecode = this.invitecode;
                }
                this.$api.smsLogin(data, res => {
                    if (res.status) {
                        this.GLOBAL.setStorage('user_token', res.data);
                        this.$dialog.toast({
                            mes: '注册成功',
                            timeout: '1000',
                            icon: 'success',
                            callback: () => {
                                this.$router.replace('/index');
                            }
                        })
                    }
                })
            }
        },
        toLogin: function () {
            this.$router.replace({path: '/login'}); 
        }
    }
}
</script>

<style scoped lang="scss">
    .register-img {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4rem;
    }
    .register-btn {
        width: 90%;
        margin-left: 5%;
    }
    .register-login {
        margin-top: 0.2rem;
        text-align: center;
    }
</style>