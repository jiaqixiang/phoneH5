<template>
  <yd-layout id="app">
    <Navbar slot="navbar" :title="$route.meta.title" v-show="$route.meta.navShow"></Navbar>
    <transition name="fade">
      <router-view/>
    </transition>
    <Tabbar slot="tabbar" v-show="$route.meta.tabShow"></Tabbar>
  </yd-layout>
</template>

<script>
import Navbar from './components/Navbar';
import Tabbar from './components/Tabbar';

export default {
  name: 'App',
  data () {
    return {

    }
  },
  components:{
    Navbar, Tabbar
  }
}
</script>

<style lang="scss">
  .fade-enter-active{
    transition: all .3s ease;
  }
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
