<template>
  <div class="index_bg" @click="hideModel">
    <div @click.stop="showRules" class="attintion_btn">
      <img src="../assets/img/attiontion_btn.png" alt />
    </div>
    <div class="rule_btn" @click.stop="showIntro">
      <img src="../assets/img/watch_detail_btn.png" alt />
    </div>
    <div class="stars_container">
      <div class="star_item">
        <div class="star_head">
          <img
            v-show="audioObj['audioStar1'].playStatus == 3 "
            class="pause_img"
            src="../assets/img/pause.png"
          />
          <img
            v-show="audioObj['audioStar1'].playStatus == 2 || audioObj['audioStar1'].playStatus == 1"
            class="play_img"
            src="../assets/img/play.png"
          />
        </div>
        <div class="star_name">李小萌</div>
        <div class="star_play_btn" @click.stop="playAudioSingle('audioStar1')"></div>
      </div>
      <div class="star_item">
        <div class="star_head">
          <img
            v-show="audioObj['audioStar2'].playStatus == 3 "
            class="pause_img"
            src="../assets/img/pause.png"
          />
          <img
            v-show="audioObj['audioStar2'].playStatus == 2 || audioObj['audioStar2'].playStatus == 1"
            class="play_img"
            src="../assets/img/play.png"
          />
        </div>
        <div class="star_name">李小萌</div>
        <div class="star_play_btn" @click.stop="playAudioSingle('audioStar2')"></div>
      </div>
    </div>

    <div class="break_line_container">
      <img src="../assets/img/break_line.png" alt />
    </div>

    <div class="kfc_header_container">
      <div class="header_item kfc_header" @click.stop="playAudioSingle('audioStar3')">
        <img
          v-show="audioObj['audioStar3'].playStatus == 3 "
          class="pause_img"
          src="../assets/img/pause.png"
        />
        <img
          v-show="audioObj['audioStar3'].playStatus == 2 || audioObj['audioStar3'].playStatus == 1"
          class="play_img"
          src="../assets/img/play.png"
        />
      </div>
      <div class="header_item act_header" @click.stop="playAudioSingle('audioStar4')">
        <img
          v-show="audioObj['audioStar4'].playStatus == 3 "
          class="pause_img"
          src="../assets/img/pause.png"
        />
        <img
          v-show="audioObj['audioStar4'].playStatus == 2 || audioObj['audioStar4'].playStatus == 1"
          class="play_img"
          src="../assets/img/play.png"
        />
      </div>
    </div>

    <div class="lz_reader_container">
      <div class="lz_read_title_container">
        <img src="../assets/img/lz_read_img.png" alt />
      </div>
      <div class="lz_read_header_container">
        <div class="lz_read_item">
          <div class="lz_read_head_img"  @click.stop="playAudioSingle('audioStar5')">
            <img
              v-show="audioObj['audioStar5'].playStatus == 3 "
              class="pause_img"
              src="../assets/img/pause.png"
            />
            <img
              v-show="audioObj['audioStar5'].playStatus == 2 || audioObj['audioStar5'].playStatus == 1"
              class="play_img"
              src="../assets/img/play.png"
            />
          </div>
          <div class="lz_read_head_name">ii</div>
        </div>
        <div class="lz_read_item">
          <div class="lz_read_head_img"  @click.stop="playAudioSingle('audioStar6')">
            <img
              v-show="audioObj['audioStar6'].playStatus == 3 "
              class="pause_img"
              src="../assets/img/pause.png"
            />
            <img
              v-show="audioObj['audioStar6'].playStatus == 2 || audioObj['audioStar6'].playStatus == 1"
              class="play_img"
              src="../assets/img/play.png"
            />
          </div>
          <div class="lz_read_head_name"></div>
        </div>
        <div class="lz_read_item">
          <div class="lz_read_head_img"  @click.stop="playAudioSingle('audioStar7')">
            <img
              v-show="audioObj['audioStar7'].playStatus == 3 "
              class="pause_img"
              src="../assets/img/pause.png"
            />
            <img
              v-show="audioObj['audioStar7'].playStatus == 2 || audioObj['audioStar7'].playStatus == 1"
              class="play_img"
              src="../assets/img/play.png"
            />
          </div>
          <div class="lz_read_head_name"></div>
        </div>
        <div class="lz_read_item">
          <div class="lz_read_head_img"  @click.stop="playAudioSingle('audioStar8')">
            <img
              v-show="audioObj['audioStar8'].playStatus == 3 "
              class="pause_img"
              src="../assets/img/pause.png"
            />
            <img
              v-show="audioObj['audioStar8'].playStatus == 2 || audioObj['audioStar8'].playStatus == 1"
              class="play_img"
              src="../assets/img/play.png"
            />
          </div>
          <div class="lz_read_head_name"></div>
        </div>
      </div>
    </div>

    <div class="voice_list_title">作品排行榜</div>

    <!-- 音频列表 -->
    <div class="voice_list">
      <!-- tab -->
      <div class="tab_container">
        <div class="tab_item" :class="tabIndex == 1 ? '  checked': ''" @click="tabIndex = 1"></div>
        <div class="tab_item" :class=" tabIndex == 2 ? ' checked': ''" @click="tabIndex = 2"></div>
        <div class="tab_item" :class="tabIndex == 3 ? ' checked': ''" @click="tabIndex = 3"></div>
      </div>
      <div class="voice_info">
        <span>排行榜</span>
        <span>可用票数 {{ $store.state.voteQty }}</span>
      </div>
      <div class="voice_container">
        <template v-if="tabIndex == 1">
          tab = 1
          <div class="voice_item_container" v-for="(voice, index) in voiceList" :key="index">
            <div class="voice_index">
              <img v-if="index == 0" src="../assets/img/first.png" alt />
              <img v-else-if="index == 1" src="../assets/img/second.png" alt />
              <img v-else-if="index == 2" src="../assets/img/third.png" alt />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="head_img_container" @click="playAudio('audio' + index)">
              <img v-if="voice.headURL" class="head_img" :src="voice.headURL" alt />
              <img v-else class="head_img" src="../assets/img/head.png" alt />
              <img
                v-show="voice.playStatus == 3 "
                class="pause_img"
                src="../assets/img/pause.png"
                alt
              />
              <img
                v-show="voice.playStatus == 2 || voice.playStatus == 1"
                class="play_img"
                src="../assets/img/play.png"
                alt
              />

              <audio :ref="'audio' + index" :src="voice.url" controls="controls">您的手机不支持此格式</audio>
            </div>
            <div class="audio_detail" @click="toMy(voice)">
              <p class="audio_title">{{ voice.title }}</p>
              <p class="audio_qty">{{ voice.qty }}</p>
            </div>
            <div class="vote_btns">
              <img
                @click="voteHandler(voice.id,index)"
                class="vote_btn"
                src="../assets/img/vote_btn.png"
                alt
              />
              <img
                @click="shareHandler(voice.id)"
                class="vote_btn"
                src="../assets/img/share.png"
                alt
              />
            </div>
          </div>

          <infinite-loading @infinite="infiniteHandler">
            <span slot="no-more">没有更多数据了</span>
          </infinite-loading>
        </template>
        <template v-else-if="tabIndex == 2">
          tab = 2
          <div class="voice_item_container" v-for="(voice, index) in voiceList" :key="index">
            <div class="voice_index">
              <img v-if="index == 0" src="../assets/img/first.png" alt />
              <img v-else-if="index == 1" src="../assets/img/second.png" alt />
              <img v-else-if="index == 2" src="../assets/img/third.png" alt />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="head_img_container" @click="playAudio('audio' + index)">
              <img v-if="voice.headURL" class="head_img" :src="voice.headURL" alt />
              <img v-else class="head_img" src="../assets/img/head.png" alt />
              <img
                v-show="voice.playStatus == 3 "
                class="pause_img"
                src="../assets/img/pause.png"
                alt
              />
              <img
                v-show="voice.playStatus == 2 || voice.playStatus == 1"
                class="play_img"
                src="../assets/img/play.png"
                alt
              />

              <audio :ref="'audio' + index" :src="voice.url" controls="controls">您的手机不支持此格式</audio>
            </div>
            <div class="audio_detail" @click="toMy(voice)">
              <p class="audio_title">{{ voice.title }}</p>
              <p class="audio_qty">{{ voice.qty }}</p>
            </div>
            <div class="vote_btns">
              <img
                @click="voteHandler(voice.id,index)"
                class="vote_btn"
                src="../assets/img/vote_btn.png"
                alt
              />
              <img
                @click="shareHandler(voice.id)"
                class="vote_btn"
                src="../assets/img/share.png"
                alt
              />
              <!-- <button @click="vote">投票</button>
              <button @click="share">拉票</button>-->
            </div>
          </div>

          <infinite-loading @infinite="infiniteHandler">
            <span slot="no-more">没有更多数据了</span>
          </infinite-loading>
        </template>
        <div v-else-if="tabIndex == 3">
          <div class="my_content">
            <div class="header_part">
              <div class="head_content" @click="playAudioSingle('audioMy')">
                <img v-if="$store.state.headURL" class="head_img" :src="$store.state.headURL" alt />
                <img v-else class="head_img" src="../assets/img/head.png" alt />
                <img
                  v-show="audioObj['audioMy'].playStatus == 3"
                  class="pause_img"
                  src="../assets/img/pause.png"
                />
                <img
                  v-show="audioObj['audioMy'].playStatus == 2 || audioObj['audioMy'].playStatus == 1"
                  class="play_img"
                  src="../assets/img/play.png"
                />
              </div>
              <div class="user_info">
                <p class="info_line">{{ $store.state.userName }}</p>
                <p class="info_line">目前的票数 {{ $store.state.qty }}</p>
                <p class="info_line">排名 {{ $store.state.ranking }}</p>
              </div>
            </div>

            <p class="info_line">作品标题 {{ $store.state.title }}</p>
            <div class="btns">
              <img
                @click="shareHandler($store.state.id)"
                class="vote_btn"
                src="../assets/img/share_btn.png"
                alt
              />
              <img
                @click="voteHandler($store.state.id)"
                class="vote_btn"
                src="../assets/img/vote_btn.png"
                alt
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div @click="toJoin" class="order_btn_container">
      <img src="../assets/img/to_order.png" alt />
    </div>

    <div class="audio_part">
      <audio
        v-for="(audioItem,key) of audioObj"
        :key="key"
        :ref="key"
        :src="audioItem.url"
        controls="controls"
        @ended="endAudio(audioItem,key)"
        class="star_head_audio"
      >您的手机不支持此格式</audio>
    </div>
    <MaskC ref="mask"></MaskC>
    <Rules ref="rules"></Rules>
    <Intro ref="intro"></Intro>
    <Reward ref="reward"></Reward>
  </div>
</template>
<script>
import MaskC from "../components/MaskC";
import Rules from "../components/Rules";
import Intro from "../components/Intro";
import Reward from "../components/Reward";
import InfiniteLoading from "vue-infinite-loading";
import { api } from "../api";
import { goUser } from "../assets/toFt";
export default {
  name: "home",
  components: { MaskC, Rules, Intro, Reward,InfiniteLoading },
  props: ["userId"],
  data: function() {
    return {
      tabIndex: 1,
      voiceList: [],
      currentPage: 0,
      pageSize: 10,
      canLoadMore: true,
      audioObj: {
        audioStar1: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioStar2: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioStar3: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioStar4: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioStar5: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioStar6: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioStar7: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioStar8: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        },
        audioMy: {
          url:
            "https://cdn.lizhi.fm/city_public/2019/06/07/2741676016051009582.mp3",
          playStatus: 1 // 3播放 2暂停
        }
      }
    };
  },
  methods: {
    hideModel() {
      for (let key in this.videoShow) {
        this.videoShow[key] = false;
      }
    },

    showRules() {
      this.$refs.rules.show();
    },
    showIntro() {
      this.$refs.intro.show();
    },
    toMy(voice) {
      this.$router.push(`/my?voiceId=${voice.id}`);
    },
    toJoin() {
      this.$router.push("/choosetype");
    },
    // 停止所有的音频播放
    pauseAllAudio() {
      let audioList = document.querySelectorAll("audio");
      audioList.forEach(audio => {
        audio.pause();
      });
    },
    playAudioSingle(refName) {
      let audio = this.$refs[refName];
      audio = audio[0];
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        let paused = audio.paused;
        this.pauseAllAudio();
        let voiceItem = this.audioObj[refName];
        console.log(voiceItem);

        if (paused) {
          audio.play(); //audio.play();// 这个就是播放
          voiceItem.playStatus = 3;
        } else {
          audio.pause(); // 这个就是暂停
          voiceItem.playStatus = 2;
        }
      }
    },
    // 播放音频
    playAudio(refName) {
      let audio = this.$refs[refName];
      audio = audio[0];
      let index = refName.match(/[0-9]+/g)[0];
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        // alert(audio.paused);
        this.voiceList.map(voice => {
          voice.playStatus = 1;
        });
        let paused = audio.paused;
        this.pauseAllAudio();
        let voiceItem = this.voiceList[index];

        if (paused) {
          audio.play(); //audio.play();// 这个就是播放
          voiceItem.playStatus = 3;
        } else {
          audio.pause(); // 这个就是暂停
          voiceItem.playStatus = 2;
        }
        this.$set(this.voiceList, index, voiceItem);
      }
    },
    // 播放我的音频
    playMyAudio() {
      let audio = this.$refs.myRadio;
      if (!this.$store.state.url) {
        this.$toast.center("暂无音频");
        this.pauseAllAudio();
        return false;
      }
      if (audio !== null) {
        let paused = audio.paused;
        this.pauseAllAudio();
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if (paused) {
          audio.play(); //audio.play();// 这个就是播放
          this.$store.commit("setUser", { prop: "playStatus", val: 3 });
        } else {
          audio.pause(); // 这个就是暂停
          this.$store.commit("setUser", { prop: "playStatus", val: 2 });
        }
      }
    },
    // 我的音频播放结束
    myVideoEnded() {
      this.$store.commit("setUser", { prop: "playStatus", val: 1 });
    },
    // 音频播放完之后
    endAudio(voiceItem, refName) {
      let audio = this.$refs[refName];
      audio = audio[0];
      if (audio != null) {
        this.audioObj[refName].playStatus = 1;
      }
    },
    // 获取最热音频列表
    getHotVoiceList(clear, $state) {
      if (clear) {
        this.voiceList = [];
        this.currentPage = 1;
      }
      this.axios
        .post(api.getHotVoiceList, {
          pageSize: 10,
          currentPage: this.currentPage
        })
        .then(res => {
          let list = res.data.data.list.map(voice => {
            voice.playStatus = 1;
            voice.headURL = voice.headURL ? voice.headURL : "";
            return voice;
          });

          this.voiceList = this.voiceList.concat(list);
          if ($state) {
            $state.loaded();
          }
          if (this.voiceList.length >= res.data.data.pagination.total) {
            this.canLoadMore = false;
            $state.complete();
          }
        });
      // this.voiceList= [{url: 'https://cdn.lizhi.fm/city_public/2019/12/02/2774705375708425262.mp3',title:'', playStatus: 1}];
    },
    // 获取我的音频
    getMyVoice() {
      this.axios
        .post(`${api.getMyVoice}/${this.$store.state.userId}`, {})
        .then(res => {
          let data = res.data.data || {};

          this.$store.commit("setUser", { prop: "phone", val: data.phone });
          this.$store.commit("setUser", { prop: "url", val: data.url });
          this.$store.commit("setUser", { prop: "title", val: data.title });
          this.$store.commit("setUser", { prop: "id", val: data.id });
          data.userName
            ? this.$store.commit("setUser", {
                prop: "userName",
                val: data.userName
              })
            : "";
          this.$store.commit("setUser", { prop: "qty", val: data.qty || 0 });
          this.$store.commit("setUser", {
            prop: "rewardFlag",
            val: data.rewardFlag
          });
          this.$store.commit("setUser", {
            prop: "ranking",
            val: data.ranking
          });

          //  "phone": "string",
          //   "qty": 0,
          //   "rewardFlag": true,
          //   "userName": "string"
          // 我的音频详情
        });
    },
    // 投票
    voteHandler(voteId, index) {
      if (this.$store.getters.activityOver) {
        this.$toast.center("活动已结束");
        return;
      }
      if (this.$store.state.voteQty <= 0) {
        this.$toast.center("今日票数已经用完");
        return;
      }
      this.axios
        .post(api.submitVote, {
          soundId: voteId,
          userId: this.$store.state.userId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.center("投票成功");
            this.$store.commit("setUser", {
              prop: "voteQty",
              val:
                this.$store.state.voteQty >= 1
                  ? this.$store.state.voteQty - 1
                  : 0
            });

            this.getHotVoiceList(true);
            this.getMyVoice();
          }
        });
    },
    // 分享按钮
    shareHandler(id) {
      if (!id) {
        this.$toast.center("暂无音频");
      } else {
        this.$router.push(`/my?voiceId=${id}`);
      }

      // this.$refs.mask.show();
    },
    // 无限加载
    infiniteHandler($state) {
      if (this.canLoadMore) {
        this.currentPage = this.currentPage + 1;
        this.getHotVoiceList(false, $state);
      }
    },
    // 丰田电台
    toFt() {
      if (this.$store.state.isLz) {
        goUser("5038192103596952620");
      } else {
        window.location.href = "//m.lizhi.fm/vod/user/5038192103596952620";
      }
    },
    showReward(){
      this.$refs.reward.show();
    }
  },
  created() {
    console.log("this.wechatUserInfo", this.wechatUserInfo);
    
  },
  mounted(){
    this.showReward()
  },
  watch: {
    userId: {
      immediate: true, // 这句重要
      handler(val) {
        if (val) {
          // this.getHotVoiceList(true);
          // @todo 这个记得打开
          // this.getMyVoice();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.index_bg {
  position: relative;
  padding-top: 260px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 1100px;
  background: url("../assets/img/index_bg.png") top center no-repeat;
  background-size: 100% auto;
}
.attintion_btn {
  display: block;
  position: absolute;
  top: 9px;
  right: 9px;
  width: 80px;
  height: 30px;
  z-index: 100;
  img {
    width: 100%;
  }
}

.voice_list_title {
  margin-top: 13px;
  font-size: 24px;
}
.voice_list {
  margin-top: 13px;
  position: relative;
  box-sizing: border-box;
  padding: 20px 25px 0;
  width: 320px;
  height: 412px;
  background-color: rgba(243, 138, 158, 0.85);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 25px;
  background-color: rgba(243, 138, 158, 0.8509803921568627);

  .voice_container {
    height: 250px;
    overflow-y: scroll;
  }
}
.voice_item_container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .audio_detail {
    flex: 1;
    max-width: 70px;
    .audio_title,
    .audio_qty {
      height: 15px;
      max-width: 70px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.tab_container {
  width: 100%;
  height: 28px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .tab_item {
    display: block;
    width: 86px;
    height: 28px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &:nth-of-type(1) {
      background-image: url("../assets/img/tab_item1.png");
      &.checked {
        background-image: url("../assets/img/tab_item1_checked.png");
      }
    }
    &:nth-of-type(2) {
      background-image: url("../assets/img/tab_item2.png");
      &.checked {
        background-image: url("../assets/img/tab_item2_checked.png");
      }
    }
    &:nth-of-type(3) {
      background-image: url("../assets/img/tab_item3.png");
      &.checked {
        background-image: url("../assets/img/tab_item3_checked.png");
      }
    }
  }
}
.voice_info {
  display: flex;
  justify-content: space-between;
  color: #c70025;
  line-height: 1.5;
  font-size: 14px;
  padding: 0;
}
.head_img_container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 5px;
  padding: 0;
  .head_img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    overflow: hidden;
    border-radius: 50%;
    max-width: 100%;
    max-height: 100%;
    padding: 0;
  }

}
.rule_btn {
  display: block;
  width: 109px;
  height: 30px;
  img {
    width: 100%;
  }
}

img {
  width: 100%;
}
.voice_index {
  display: flex;
  align-items: center;
  align-items: center;
  width: 30px;
  font-size: 20px;
  text-align: center;
  span {
    flex: 1;
  }
}
.vote_btns {
  display: flex;
  align-items: flex-end;
}
.vote_btn {
  width: 106px;
  height: 40px;
  padding: 8px 0;
}
.my_content {
  padding: 16px;
  box-sizing: border-box;
  margin: 0 auto;
  color: #fff;
  font-size: 14px;
  .header_part {
    display: flex;
    overflow: hidden;
    width: 100%;
  }
  .head_content {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    margin-bottom: 10px;
    border: 1px solid #c70025;
  }
  .user_info {
    overflow: hidden;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    img {
      width: 106px;
      height: 40px;
    }
  }
  .info_line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    margin-bottom: 5px;
  }
}
video {
  width: 0;
}
.order_btn_container {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
}

.pause_img,
.play_img {
  position: absolute;
  width: 20px;
  left: 54%;
  top: 50%;
  transform: translate(-50%, -50%);
}
audio {
  opacity: 0;
  position: relative;
  left: -900px;
}
.stars_container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
  .star_head {
    position: relative;
    width: 110px;
    height: 110px;
  }
  .star_name {
    text-align: center;
  }
  .star_item {
    &:nth-of-type(1) {
      margin-right: 60px;
      .star_head {
        background: url("../assets/img/lz_read1.png") center no-repeat;
        background-size: contain;
      }
    }
    &:nth-of-type(2) {
      .star_head {
        background: url("../assets/img/lz_read1.png") center no-repeat;
        background-size: contain;
      }
    }
  }
  .star_play_btn {
    width: 110px;
    height: 40px;
    background: url("../assets/img/star_play_btn.png") center no-repeat;
    background-size: contain;
  }
}

.break_line_container {
  width: 100%;
  margin: 24px 0;
}

.kfc_header_container {
  width: 100%;
  display: flex;
  justify-content: center;
  .header_item {
    position: relative;
    width: 120px;
    height: 120px;
    &.kfc_header {
      background: url("../assets/img/kfc_header.png") center no-repeat;
      background-size: contain;
      margin-right: 60px;
    }
    &.act_header {
      background: url("../assets/img/act_header.png") center no-repeat;
      background-size: contain;
    }
  }
}

.lz_reader_container {
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
  margin-top: 60px;
  display: flex;
  align-items: center;
  .lz_read_title_container {
    width: 102px;
    flex-shrink: 0;
    img {
      width: 80px;
    }
  }

  .lz_read_header_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .lz_read_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 104px;
      height: 104px;
      flex-shrink: 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      .lz_read_head_img {
        position: relative;
        width: 66px;
        height: 66px;
      }
      &:first-of-type {
        .lz_read_head_img {
          background-image: url("../assets/img/lz_read1.png");
        }
      }
      &:nth-of-type(2) {
        .lz_read_head_img {
          background-image: url("../assets/img/lz_read2.png");
        }
      }
      &:nth-of-type(3) {
        .lz_read_head_img {
          background-image: url("../assets/img/lz_read3.png");
        }
      }
      &:nth-of-type(4) {
        .lz_read_head_img {
          background-image: url("../assets/img/lz_read4.png");
        }
      }
    }
    .lz_read_head_name {
      width: 103px;
      height: 23px;
      text-align: center;
      background: #fff;
    }
  }
}
</style>


