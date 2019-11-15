<template>
    <!-- <yd-tabbar slot="tabbar">
        <yd-tabbar-item title="首页" link="#" active>
            <yd-icon name="home" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="全部分类" link="#">
            <yd-icon name="shopcart-outline" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="#">
            <yd-icon name="ucenter-outline" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="#">
            <yd-icon name="ucenter-outline" slot="icon"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar> -->
    <div class="tabbar" ref="tabbar">
        <router-link tag="div" class="tabbar-item" v-for="(item, i) in tab" :to="item.link" :key="i">
            <i :class="item.type"></i>
            <span>{{item.title}}</span>
        </router-link>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tab: [
                {title: '首页', link: '/index', type: 'iconfont iconshouye'},
                {title: '全部分类', link: '/classify', type: 'iconfont iconchangyongtubiao-mianxing-'},
                {title: '购物车', link: '/cart', type: 'iconfont icongouwucheman'},
                {title: '个人中心', link: '/user', type: 'iconfont icondanseshixintubiao-'}
            ]
        }
    },
    mounted () {
        if(this.$route.meta.title){   //这是干嘛的
            document.title = this.$route.meta.title;
        }
    }
}
</script>

<style lang='scss'>
    .tabbar{
        background-color: #fff;
        border-top: 1px solid #e1e1e1;
        z-index: 1000;
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: 750px;
        display: flex;
        align-items: center;
    }
    .tabbar-item{
        display: inline-block;
        width: 25%;
        box-sizing: border-box;
        padding: .15rem 0 .05rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        >i{
            font-size: .5rem;
            color: #999;
        }
        >span{
            display: block;
            color: #999;
        }
    }
    .router-link-active>i, .router-link-active>span{
        color: #FF3B44;
    }
</style>