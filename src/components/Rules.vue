<template>
  <div class="rules" v-if='rulesShow' @click="close">
    <!-- <span class="rules_close_btn" @click="close">
    <img  src="../assets/img/close_btn.png" alt="">

    </span> -->
    <div class="rules_content">
      <img class="rules_bg" src="../assets/img/rules_bg.png" alt="">
      <div class="rules_img_container">
        <img class="rules_img" src="../assets/img/rules_text.png" alt="">
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Rule',
  data(){
    return {
      rulesShow: false,
    }
  },
  methods: {
    show(){
      this.rulesShow = true;
    },
    close(){
      console.log('xxx')
      this.rulesShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .rules {
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
    .rules_content {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      height: 620px;
      margin: 0 auto;
      overflow: hidden;
      .rules_bg {
        width: 100%;
        height: 620px;
      }
      .rules_img_container {
        
        height: 480px;
        overflow: auto;
        position: absolute;
        left: 50%;
        top: 90px;
        width: 280px;
        transform: translateX(-50%);
      }
    }
    .rules_close_btn {
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
    .rules_img {
      width: 100%;
    }
  }
</style>