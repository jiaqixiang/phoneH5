<template>
    <yd-navbar slot="navbar" :title="title">
        <div slot="left" @click="back">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </div>
        <!-- <router-link to="#" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link> -->
    </yd-navbar>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge'
export default {
    props: ['title'],
    data () {
        return {
            
        }
    },
    methods: {
        back:function(){
            if(window.history.length <= 1){
                this.$router.push({path: '/'});
                return;
            } else {
                this.$router.go(-1);
            }
        }
    }
}
</script>

<style scope>

</style>