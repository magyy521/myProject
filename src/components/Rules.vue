<template>
  <div class="rules" v-if='rulesShow' @click="close">
    <!-- <span class="rules_close_btn" @click="close">
    <img  src="../assets/img/close_btn.png" alt="">

    </span> -->
    <img class="rules_img" src="../assets/img/rules.png" alt="">
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
    background-color: #131726;
    z-index: 100;
    display: flex;
    align-items: center;
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
        // position: fixed;
        // left: 0;
        // top: 0;
      width: 100%;
      
    }
  }
</style>