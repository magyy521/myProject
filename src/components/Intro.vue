<template>
  <div class="intro" v-if='introShow' @click="close">
    <!-- <span class="intro_close_btn" @click="close">
    <img  src="../assets/img/close_btn.png" alt="">

    </span> -->
    <div class="intro_content">
      <img class="intro_bg" src="../assets/img/intro_bg.png" alt="">
      <div class="intro_img_container">
        <img class="intro_img" src="../assets/img/intro_text.png" alt="">
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Intro',
  data(){
    return {
      introShow: false,
    }
  },
  methods: {
    show(){
      this.introShow = true;
    },
    close(){
      console.log('xxx')
      this.introShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .intro {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    // background-color: #131726;
    z-index: 100;
    display: flex;
    align-items: center;
    background: #131726;
    background-size: contain;
    .intro_content {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      height: 620px;
      overflow: hidden;
      .intro_bg {
        
        width: 100%;
        height: 620px;
      }
      .intro_img_container {
        width: 100%;
        height: 480px;
        overflow: auto;
        position: absolute;
        left: 50%;
        top: 90px;
        width: 280px;
        transform: translateX(-50%);
      }
    }
    .intro_close_btn {
      position: fixed;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      z-index: 100;
      padding: 20px;
      img {
        width: 100%;
      }
    }
    .intro_img {
      width: 100%;
    }
  }
</style>