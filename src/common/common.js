//设置localStorage
function setStorage (name, content) {
    if (!name) return;
    if (typeof content != 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

//获取localStorage
function getStorage (name) {
    if (!name) return;
    return window.localStorage.getItem(name);
}

//删除localStorage
function removeStorage (name) {
    if (!name) return;
    window.localStorage.removeItem(name);
}

// 跳转登录页
function jumpToLogin () {
    _this.$router.push({
        path: '/login',
        query: {
            redirect: _this.$route.fullPath
        }
    })
}

function errorToShow (msg = '出错了，请重试', time = 1000) { 
    _this.$dialog.toast({
        msg: msg,
        timeout: time
    })
}

export default {
    setStorage: setStorage,
    getStorage: getStorage,
    removeStorage: removeStorage,
    jumpToLogin: jumpToLogin,
    errorToShow: errorToShow
}