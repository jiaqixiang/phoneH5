<template>
  <div id="indexslider">
      <yd-slider autoplay="3000">
          <yd-slider-item v-for="(item, i) in sliderList" :key="i">
              <img :src="item.img" @click="showDetail(item.type, item.val)">
          </yd-slider-item>
      </yd-slider>
  </div>
</template>

<script>
export default {
    name: 'Indexslider',
    data () {
        return {
            sliderList: []
        }
    },
    mounted () {
        this.$api.slider({code: 'tpl1_slider'}, res => {
            this.sliderList = res.data.list;
            console.log(this.sliderList);
        })
    },
    method: {
        showDetail: function (type, val) {
            if (type === 1) {
                window.location.href = val;
            } else if (type === 2) {
                this.$router.push({path: '/goodsdetail', query: {goods_id: val}});
            } else if (type === 3) {
                this.$router.push({path: '/article', query: {article_id: val}});
            } else if (type === 4) {
                this.$router.push({path: '/articlelist', query: {type_id: val}});
            }
        }
    }
} 
</script>

<style scoped lang="scss">

</style>