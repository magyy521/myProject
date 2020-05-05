<template>
  <div class="my_page">
    
    <div class="my_content">
      <div class="head_content" @click="playMyAudio">
        <img v-if="headUrl" class="head_img" :src="headUrl" alt="" />
        <img
          v-show="playStatus == 3"
          class="pause_img"
          src="../assets/img/pause.png"
          alt=""
        />
        <img
          v-show="playStatus == 2 || playStatus == 1"
          class="play_img"
          src="../assets/img/play.png"
          alt=""
        />
        <audio
          ref="myRadio"
          :src="url"
          controls="controls"
          @ended="myVideoEnded"
        >
          您的手机不支持此格式
        </audio>
      </div>
      <div class="user_info">
        <p class="info_line">用户名称 {{userName}}</p>
        <p class="info_line">目前的票数 {{ qty }}</p>
        <p class="info_line">排名 {{ rank }}</p>
      </div>
      <p class="info_line audio_title">标题名称 {{ title }}</p>
      <div class="btns">
        <button  @click="shareHandler">
          <!-- 拉票 -->
        </button>
        <button @click="voteHandler">
          <!-- 投票{{ this.$store.state.voteQty }} -->
        </button>
      </div>
    </div>
    <span class="back_home_btn">
      <img @click="backHome" src="../assets/img/my_to_home.png" alt="" />
    </span>
    <MaskC ref="mask"></MaskC>
  </div>
</template>
<script>
import MaskC from "../components/MaskC";
import { api } from "../api.js";
import { UA } from "../assets/common";
export default {
  name: "my",
  components: { MaskC },
  data: function() {
    return {
      id: "",
      qty: "",
      rank: "",
      title: "",
      url: "",
      userName: "",
      playStatus: 1,
      headUrl: ""
    };
  },
  methods: {
    init() {
      this.id = this.$route.query.voiceId;
      this.getDetail();
    },
    // 投票
    voteHandler() {
      if(this.$store.getters.activityOver) {
        this.$toast.center("活动已结束");
        return;
      }
      if (this.$store.state.voteQty <= 0) {
        this.$toast.center("今日票数已经用完");
        return;
      }
      this.axios
        .get(`${api.submitVote}?audioId=${this.id}&userId=${this.$store.state.userId}`)
        .then(res => {
          this.$toast.center("投票成功");
          this.$store.commit("setUser", {
            prop: "voteQty",
            val: this.$store.state.voteQty >= 1 ? this.$store.state.voteQty -1 : 0
          });
          this.getDetail();
        });
    },
    // 分享
    shareHandler() {
      this.$refs.mask.show();
    },
    backHome() {
      this.$router.replace("/");
    },
    // 根据id获取某个音频详情
    getDetail() {
      this.axios.get(`${api.getAudioDetail}?id=${this.id}`).then(res => {
        let data = res.data.data;
        this.rank = data.rank;
        this.qty = data.qty;
        this.title = data.title;
        this.userName = data.userName;
        this.url = data.url;
        this.headUrl = data.headUrl;
      });
    },
    playMyAudio() {
      let audio = this.$refs.myRadio;
      if (audio !== null && this.url) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if (audio.paused) {
          audio.play(); //audio.play();// 这个就是播放
          this.playStatus = 3;
        } else {
          audio.pause(); // 这个就是暂停
          this.playStatus = 2;
        }
      }else {
        this.$toast.center("暂无音频");
      }
    },
    myVideoEnded() {
      this.playStatus = 1;
    },
    initShareConfig(){
      let type = UA.lz ? "lizhi" : UA.wx ? "wechat" : "chrome";
      if(type == "lizhi"){
        lz && lz.configShareUrl({
          "url": `https://vodactivity.lizhifm.com/static/kfc/#/my?voiceId=${this.id}`, //分享的url
          "title": "为我拉票", //分享标题
          "desc": "描述内容", // 分享的描述
          "image-url": "https://mkactivity.lizhifm.com/static/2019_12_car_vote/share_img.jpg", //分享的图片
        })
      }

      if(type == "wechat") {
        wechatShare({
          title: '为我拉票',
          link:  `https://vodactivity.lizhifm.com/static/kfc/#/my?voiceId=${this.id}`,
          desc: '描述内容',
          imgUrl: "https://mkactivity.lizhifm.com/static/2019_12_car_vote/share_img.jpg",
        });
      }
    }
  },
  created() {
    this.init();
    this.initShareConfig()
  }
};
</script>

<style lang="less">
.my_page {
  position: relative;
  height: 100vh;
  width: 100%;
  padding-top: 240px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: url("../assets/img/my_bg.png") top center no-repeat;
  background-size: contain;

  .my_content {
    width: 335px;
    padding: 30px;
    box-sizing: border-box;
    height: 250px;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 14px;

    .head_content {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      margin-right: 20px;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #fff;
      border: 1px solid #c70025;
      .head_img {
        width: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
      .pause_img,
      .play_img {
        position: absolute;
        width: 20px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      audio {
        opacity: 0;
        position: relative;
        left: -900px;
      }
    }
    .user_info {
      display: inline-block;
      vertical-align: middle;
    }
    .btns {
      display: flex;
      justify-content: space-between;
      button {
        width: 110px;
        height: 32px;
        background-size: contain;
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        outline: none;
        box-shadow: none;
        &:first-of-type {
          background-image: url("../assets/img/my_share_btn.png");
        }
        &:nth-of-type(2){
          background-image: url("../assets/img/my_vote_btn.png");
        }
      }
    }
    .info_line {
      height: 18px;
      line-height: 1.5;
      max-height: 50px;
      overflow: hidden;
    }
    .audio_title {
      padding: 13px 0;
    }
  }
  
}
.back_home_btn {
  display: block;
  margin: 20px auto 0;
  width: 120px;
  height: 40px;
  img {
    width: 100%;
  }
}
</style>
