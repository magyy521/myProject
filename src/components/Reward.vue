<template>
  <div class="reward" v-if='rewardShow' >
    <span class="reward_close_btn" @click="close">
      <img  src="../assets/img/reward_close.png" alt="">
    </span>
    <div class="reward_content_container">
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Reward',
  data(){
    return {
      rewardShow: false,
    }
  },
  methods: {
    show(){
      this.rewardShow = true;
    },
    close(){
      this.rewardShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .reward {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    // align-items: center;
    padding-top: 220px;
    box-sizing: border-box;
    background: #131726 url('../assets/img/reward.png') center top no-repeat;
    background-size: contain;
    z-index: 100;
    .reward_close_btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      z-index: 100;
      padding: 13px 17px 40px 40px;
      img {
        width: 100%;
      }
    }

    .reward_content_container {
      width: 290px;
      margin: 0 auto;
    }

  }
</style>