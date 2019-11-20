<template>
  <div class="index">
    <indexslider></indexslider> <!--轮播-->
  </div>
</template>

<script>
import indexslider from '../components/Indexslider';
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    indexslider
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
