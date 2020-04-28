<template>
  <div class="reward" v-if='rewardShow' >
    <span class="reward_close_btn" @click="close">
      <img  src="../assets/img/reward_close.png" alt="">
    </span>
    <div class="reward_content_container">
      <div class="reward_type">
        <h3 class="reward_type_title">"人气好声音"成人组</h3>
        <div class="reward_content">
          <div v-for="(item,index) in adultsList" :key="index" class="reward_item">
            <div class="reward_head">
              <img v-if="item.url" class="user_head" :src="item.url" alt="">
              <img class="reward_head_img" v-if="index == 0" src="../assets/img/reward_head1.png" alt="">
              <img class="reward_head_img"  v-if="index == 1" src="../assets/img/reward_head2.png" alt="">
              <img class="reward_head_img"  v-if="index == 2" src="../assets/img/reward_head3.png" alt="">
            </div>
            <p class="reward_name"></p>
          </div>
        </div>
      </div>
      <div class="reward_type">
        <h3 class="reward_type_title">"人气好声音"少儿组</h3>
        <div class="reward_content">
          <div v-for="(item,index) in adultsList" :key="index" class="reward_item">
            <div class="reward_head">
              <img v-if="item.url" class="user_head" :src="item.url" alt="">
              <img class="reward_head_img"  v-if="index == 0" src="../assets/img/reward_head1.png" alt="">
              <img class="reward_head_img"  v-if="index == 1" src="../assets/img/reward_head2.png" alt="">
              <img class="reward_head_img"  v-if="index == 2" src="../assets/img/reward_head3.png" alt="">
            </div>
            <p class="reward_name"></p>
          </div>
        </div>
      </div>
      <div class="reward_type reward_other_type">
        <h3 class="reward_type_title">"暖心好声音"获奖者</h3>
        <div class="reward_content">
          <div v-for="(item,index) in adultsList" :key="index" class="reward_item">
            <div class="reward_head">
              <img v-if="item.url" class="user_head" :src="item.url" alt="">
              <img class="reward_head_img" src="../assets/img/reward_other.png" alt="">
            </div>
            <p class="reward_name"></p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Reward',
  data(){
    return {
      rewardShow: false,
      adultsList:[
        {
          username:'ppppp',
          src: ''
        },
        {
          username:'ppppp',
          src: ''
        },
        {
          username:'ppppp',
          src: ''
        },
        
      ]
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
    .reward_type {
      width: 100%;
      margin-top: -10px;
    }


    .reward_content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 136px;
      align-items: flex-end;
    }
    .reward_type_title {
        padding: 6px 0;
        color: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: normal;
      }
    .reward_item {
      &:nth-of-type(1){
        order: 2;
        align-self: flex-start;
        .reward_head {
          width: 100px;
          .reward_head_img {
            width: 100px;
          }
        }
        .user_head {
          width: 76px;
        }
      }
      &:nth-of-type(2){
        order: 1;
        
      }
      &:nth-of-type(3){
        order: 3;
      }

      .user_head {
        width: 90px;
        overflow: hidden;
      }
      .reward_head {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 86px;
        height: 110px;
        background: center no-repeat;
        background-size: contain;
        overflow: hidden;
        .reward_head_img {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 86px;
          transform: translate(-50%,-50%);
          max-width: 100%;
          max-height: 100%;
        }

      }
    }
    .reward_other_type {
      
      .reward_content {
        height: auto;
      }
      .reward_item {
        .reward_head {
          height: 83px;
        }
         &:nth-of-type(1){
            align-self: flex-end;
            .reward_head {
              width: 86px;
            }
            .user_head {
              width: 76px;
            }
          }
      }
    }

  }
</style>