<template>
  <div class="privacy" v-if='privacyShow' >
    
    <div class="privacy_img_container">
        <span class="privacy_close_btn" @click="close">
            <img  src="../assets/img/close_btn.png" alt="">
        </span>
        <img class="privacy_img" src="../assets/img/privacy.png" alt="">
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Privacy',
  data(){
    return {
      privacyShow: false,
    }
  },
  methods: {
    show(){
      this.privacyShow = true;
    },
    close(){
      this.privacyShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .privacy {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-top: 165px;
    z-index: 100;
    .privacy_img_container {
        position: relative;
        display: block;
        width: 303px;
        margin: 0 auto;
        height: auto;
    }
    .privacy_close_btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      z-index: 100;
      padding: 6px 6px 40px 40px;
      img {
        width: 100%;
      }
    }
    .privacy_img {
        width: 100%;
    }
  }
</style>