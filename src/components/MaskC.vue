<template>
  <div class="mask" v-if="maskShow" @click="close">
    <div class="share_img_container">
      <img src="../assets/img/share_img.png" alt="">
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'MaskC',
  data(){
    return {
      maskShow: false,
    }
  },
  methods: {
    show(){
      this.maskShow = true;
    },
    close(){
      this.maskShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    background: rgba(0,0,0,.8);
    .share_img_container {
      position: absolute;
      right: 17px;
      top: 13px;
      img {
        width: 160px;
      }
    }
    
  }
</style>