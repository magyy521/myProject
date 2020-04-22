<template>
  <div class="intro" v-if='introShow' @click="close">
    <!-- <span class="intro_close_btn" @click="close">
    <img  src="../assets/img/close_btn.png" alt="">

    </span> -->
    <img class="intro_img" src="../assets/img/intro.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Rule',
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
    background-color: #131726;
    z-index: 100;
    display: flex;
    align-items: center;
    // .intro_close_btn {
    //   position: fixed;
    //   right: 0;
    //   top: 0;
    //   width: 20px;
    //   height: 20px;
    //   z-index: 100;
    //   padding: 20px;
    //   img {
    //     width: 100%;
    //   }
    // }
    .intro_img {
      // position: fixed;
      // left: 0;
      // top: 0;
      width: 100%;
      
    }
  }
</style>