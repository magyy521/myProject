<template>
  <div class="index_bg" >
    <div @click.stop="showRules" class="attintion_btn">
      <img src="../assets/img/attiontion_btn.png" alt />
    </div>
    <div class="rule_btn" @click.stop="showIntro">
      <img src="../assets/img/watch_detail_btn.png" alt />
    </div>
    <div class="stars_container">
      <div class="star_item" @click.stop="playAudioSingle('audioStar1')">
        <div class="star_head"></div>
        <div class="star_name">李小萌</div>
        <div class="star_play_btn" >
          <img
            v-show="audioObj['audioStar1'].playStatus == 3 "
            src="../assets/img/star_pause_btn.png"
          />
          <img
            v-show="audioObj['audioStar1'].playStatus == 2 || audioObj['audioStar1'].playStatus == 1"
            src="../assets/img/star_play_btn.png"
          />
        </div>
      </div>
      <div class="star_item" @click.stop="playAudioSingle('audioStar2')">
        <div class="star_head"></div>
        <div class="star_name">王静文</div>
        <div class="star_play_btn" >
          <img
            v-show="audioObj['audioStar2'].playStatus == 3 "
            src="../assets/img/star_pause_btn.png"
          />
          <img
            v-show="audioObj['audioStar2'].playStatus == 2 || audioObj['audioStar2'].playStatus == 1"
            src="../assets/img/star_play_btn.png"
          />
        </div>
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
          <div class="lz_read_head_name">
            <img src="../assets/img/lz_reader_name1.png" alt="">
          </div>
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
          <div class="lz_read_head_name">
            <img src="../assets/img/lz_reader_name2.png" alt="">
          </div>
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
          <div class="lz_read_head_name">
            <img src="../assets/img/lz_reader_name3.png" alt="">
          </div>
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
          <div class="lz_read_head_name">
            <img src="../assets/img/lz_reader_name4.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="voice_list_title">作品排行榜</div>

    <!-- 音频列表 -->
    <div class="voice_list">
      <div class="listen_more">滑动可收听更多作品哦</div>
      <!-- tab -->
      <div class="tab_container">
        <div class="tab_item" :class="tabIndex == 1 ? '  checked': ''" @click="changeTabIndex(1)"></div>
        <div class="tab_item" :class=" tabIndex == 2 ? ' checked': ''" @click="changeTabIndex(2)"></div>
        <div class="tab_item" :class="tabIndex == 3 ? ' checked': ''" @click="changeTabIndex(3)"></div>
      </div>
      <div class="voice_info">
        <span>排行榜</span>
        <span>每日可投10票,当日剩余{{ $store.state.voteQty }}票</span>
      </div>
      <div class="voice_container">
        <div class="voice_list_item_container" v-show="tabIndex == 1">
          <div class="voice_item_container" v-for="(voice, index) in adultsVoiceList" :key="index">
            <div class="voice_index">
              <img v-if="index == 0" src="../assets/img/first.png" alt />
              <img v-else-if="index == 1" src="../assets/img/second.png" alt />
              <img v-else-if="index == 2" src="../assets/img/third.png" alt />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="head_img_container" @click="playAudioList('audioAdults' + index)">
              <img v-if="voice.headUrl" class="head_img" :src="voice.headUrl" alt />
              <div v-else :class="index == 0 ? 'head_img_default_first' :'head_img_default'" ></div>
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

              <audio :ref="'audioAdults' + index" :src="voice.url"  @ended="endAudioList('adultsVoiceList',index)" controls="controls">您的手机不支持此格式</audio>
            </div>
            <div class="audio_detail" @click="toMy(voice)">
              <p class="audio_userName">{{ voice.userName }}</p>
              <p class="audio_title">{{ voice.title }}</p>
              <p class="audio_qty">{{ voice.votesNum }}票</p>
            </div>
            <div class="vote_btns">
              <img
                @click="voteHandler(voice.id,'adultsVoiceList')"
                class="vote_btn"
                src="../assets/img/vote_btn.png"
                alt
              />
              <img
                @click="shareHandler(voice.id)"
                class="vote_btn"
                src="../assets/img/share_btn.png"
                alt
              />
            </div>
          </div>

          <infinite-loading @infinite="infiniteHandlerAdults">
            <span class="no_more_text" slot="no-more">没有更多数据了</span>
          </infinite-loading>
        </div>
        <div class="voice_list_item_container" v-show="tabIndex == 2">
          <div class="voice_item_container" v-for="(voice, index) in kidsVoiceList" :key="index">
            <div class="voice_index">
              <img v-if="index == 0" src="../assets/img/first.png" alt />
              <img v-else-if="index == 1" src="../assets/img/second.png" alt />
              <img v-else-if="index == 2" src="../assets/img/third.png" alt />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="head_img_container" @click="playAudioList('audioKids' + index)">
              <img v-if="voice.headUrl" class="head_img" :src="voice.headUrl" alt />
              <div v-else :class="index == 0 ? 'head_img_default_first' :'head_img_default'" ></div>
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

              <audio :ref="'audioKids' + index" :src="voice.url" @ended="endAudioList('kidsVoiceList',index)" controls="controls">您的手机不支持此格式</audio>
            </div>
            <div class="audio_detail" @click="toMy(voice)">
              <p class="audio_userName">{{ voice.userName }}</p>
              <p class="audio_title">{{ voice.title }}</p>
              <p class="audio_qty">{{ voice.votesNum }}票</p>
            </div>
            <div class="vote_btns">
              <img
                @click="voteHandler(voice.id,'kidsVoiceList')"
                class="vote_btn"
                src="../assets/img/vote_btn.png"
                alt
              />
              <img
                @click="shareHandler(voice.id)"
                class="vote_btn"
                src="../assets/img/share_btn.png"
                alt
              />
              <!-- <button @click="vote">投票</button>
              <button @click="share">拉票</button>-->
            </div>
          </div>

          <infinite-loading @infinite="infiniteHandlerKids">
            <span class="no_more_text" slot="no-more">没有更多数据了</span>
          </infinite-loading>
        </div>
        <div v-show="tabIndex == 3">
          <div class="my_content">
            <div class="header_part">
              <div class="head_content" @click="playMyAudio">
                <img v-if="$store.state.headUrl" class="head_img" :src="$store.state.headUrl" alt />
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
                <p class="info_line">用户名称 {{ $store.state.userName }}</p>
                <p class="info_line">当前的票数 {{ $store.state.qty }}</p>
                <p class="info_line">排名 {{ $store.state.rank }}</p>
              </div>
            </div>

            <p class="info_line_title">标题名称  {{ $store.state.title }}</p>
            <div class="my_btns">
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

import lixiaomengAudio from '../assets/audio/lixiaomeng_audio.mp3'
import wangjingwenAudio from '../assets/audio/wangjingwen_audio.mp3'
import kfcAudio from '../assets/audio/kfc_audio.mp3'
import littleBirdAudio from '../assets/audio/little_bird_audio.mp3'
import nanxiaodianAudio from '../assets/audio/nanxiaodian_audio.mp3'
import yingyingAudio from '../assets/audio/yingying_audio.mp3'
import xiayiAudio from '../assets/audio/xiayi_audio.mp3'
import renxiaojunAudio from '../assets/audio/renxiaojun_audio.mp3'

export default {
  name: "home",
  components: { MaskC, Rules, Intro, Reward, InfiniteLoading },
  props: ["userId"],
  data: function() {
    return {
      tabIndex: 1,
      adultsVoiceList: [],
      kidsVoiceList: [],
      pageNumAdults: 0,
      pageNumKids: 0,
      pageSize: 10,
      canLoadMoreAdults: true,
      canLoadMoreKids: true,
      audioObj: {
        audioStar1: {
          url: lixiaomengAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioStar2: {
          url: wangjingwenAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioStar3: {
          url: kfcAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioStar4: {
          url: littleBirdAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioStar5: {
          url: nanxiaodianAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioStar6: {
          url: yingyingAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioStar7: {
          url: xiayiAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioStar8: {
          url: renxiaojunAudio,
          playStatus: 1 // 3播放 2暂停
        },
        audioMy: {
          url: '',
          playStatus: 1 // 3播放 2暂停
        }
      }
    };
  },
  methods: {

    // 停止所有的音频播放
    pauseAllAudio() {
      let audioList = document.querySelectorAll("audio");
      audioList.forEach(audio => {
        audio.pause();
      });
      this.adultsVoiceList.forEach(audio=>{
        audio.playStatus = 1;
      })
      this.kidsVoiceList.forEach(audio=>{
        audio.playStatus = 1;
      })
      for(let key in this.audioObj){
        this.audioObj[key].playStatus = 1
      }
    },
    // 播放单个的音频
    playAudioSingle(refName) {
      let audio = this.$refs[refName];
      audio = audio[0];
      console.log('audio',audio)
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        let paused = audio.paused;
        this.pauseAllAudio();
        let voiceItem = this.audioObj[refName];

        if (paused) {
          audio.play(); //audio.play();// 这个就是播放
          voiceItem.playStatus = 3;
        } else {
          audio.pause(); // 这个就是暂停
          voiceItem.playStatus = 2;
        }
      }
    },
    playMyAudio(){
      if(this.audioObj.audioMy.url){
        this.playAudioSingle('audioMy')
      }else {
        this.$toast.center("暂无音频");
      }
      
    },
    // 播放列表音频
    playAudioList(refName) {
      let audio = this.$refs[refName];
      console.log('audio',audio)
      audio = audio[0];
      let index = refName.match(/[0-9]+/g)[0];
      console.log('index',index)
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        let audioList=this.tabIndex == 1? this.adultsVoiceList : this.kidsVoiceList;

        audioList.map(voice => {
          voice.playStatus = 1;
        });
        let paused = audio.paused;
        this.pauseAllAudio();

        let voiceItem = audioList[index];

        if (paused) {
          audio.play(); //audio.play();// 这个就是播放
          voiceItem.playStatus = 3;
        } else {
          audio.pause(); // 这个就是暂停
          voiceItem.playStatus = 2;
        }
        this.$set(audioList, index, voiceItem);
      }
    },
    // 单个音频播放完之后
    endAudio(voiceItem, refName) {
      let audio = this.$refs[refName];
      audio = audio[0];
      if (audio != null) {
        this.audioObj[refName].playStatus = 1;
      }
    },
    // 列表的某个音频播放完之后
    endAudioList(list,index){
      let item = this[list][index];
      item.playStatus = 1;
      this.$set(this[list],index,item)
    },
    // 获取成人音频列表
    getAdultsList(clear, $state) {
      if (clear) {
        this.adultsVoiceList = [];
        this.pageNumAdults = 1;
      }
      // audioType 1少儿 2成人
      this.axios({
        method:'get',
        url:`${api.loadPageList}?pageSize=10&pageNum=${this.pageNumAdults}&audioType=2`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then(res => {
          let list = res.data.data.data.map(voice => {
            voice.playStatus = 1;
            voice.headUrl = voice.headUrl ? voice.headUrl : "";
            return voice;
          });

          this.adultsVoiceList = this.adultsVoiceList.concat(list);
          if ($state) {
            $state.loaded();
          }
          if (this.adultsVoiceList.length >= res.data.data.total) {
            this.canLoadMoreAdults = false;
            if ($state) {
              $state.complete();
            }
            
          }
        });
    },

    // 获取儿童音频列表
    getKidsList(clear, $state) {
      if (clear) {
        this.kidsVoiceList = [];
        this.pageNumKids = 1;
      }
      // audioType 1少儿 2成人
      this.axios({
        method:'get',
        url:`${api.loadPageList}?pageSize=10&pageNum=${this.pageNumKids}&audioType=1`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then(res => {
          let list = res.data.data.data.map(voice => {
            voice.playStatus = 1;
            voice.headUrl = voice.headUrl ? voice.headUrl : "";
            return voice;
          });

          this.kidsVoiceList = this.kidsVoiceList.concat(list);
          if ($state) {
            $state.loaded();
          }
          if (this.kidsVoiceList.length >= res.data.data.total) {
            this.canLoadMoreKids = false;
            if($state) {
              $state.complete();
            }
            
          }
        });
    },

    // 获取我的音频
    getMyVoice() {
      this.axios
        .get(`${api.getUserDetail}?userId=${this.$store.state.userId}&userName=${this.$store.state.userName}`)
        .then(res => {
          let data = res.data.data || {};

          this.audioObj.audioMy.url = data.url || ''

          this.$store.commit("setUser", { prop: "phone", val: data.phone });
          this.$store.commit("setUser", { prop: "url", val: data.url });
          this.$store.commit("setUser", { prop: "title", val: data.title });
          // id是我的音频的id
          this.$store.commit("setUser", { prop: "id", val: data.id });
          data.userName
            ? this.$store.commit("setUser", {
                prop: "userName",
                val: data.userName
              })
            : "";
          this.$store.commit("setUser", { prop: "voteQty", val: data.voteQty || 0 });
          this.$store.commit("setUser", {
            prop: "rank",
            val: data.rank
          });
        });
    },

    // 投票
    voteHandler(voteId, listType) {
      if (this.$store.getters.activityOver) {
        this.$toast.center("活动已结束");
        return;
      }
      if (this.$store.state.voteQty <= 0) {
        this.$toast.center("今日票数已经用完");
        return;
      }
      if(!voteId) {
        this.$toast.center("暂无音频");
        return;
      }
      this.axios({
        method:'get',
        url:`${api.submitVote}?audioId=${voteId}&userId=${this.$store.state.userId}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then(res => {
          console.log('res',res)
          if (res.data.data == 'ok') {
            this.$toast.center("投票成功");
            this.$store.commit("setUser", {
              prop: "voteQty",
              val:
                this.$store.state.voteQty >= 1
                  ? this.$store.state.voteQty - 1
                  : 0
            });

            if(listType == 'kidsVoiceList') {
              this.getKidsList(true);
            }else if(listType ==  'adultsVoiceList'){
              this.getAdultsList(true);
            }
            
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
    },

    // 成人列表无限加载
    infiniteHandlerAdults($state) {
      if (this.canLoadMoreAdults) {
        this.pageNumAdults = this.pageNumAdults + 1;
        this.getAdultsList(false, $state);
      }
    },

    // 儿童列表无限加载
    infiniteHandlerKids($state) {
      if (this.canLoadMoreAdults) {
        this.pageNumKids = this.pageNumKids + 1;
        this.getKidsList(false, $state);
      }
    },
    
    // 展示中奖信息
    showReward(){
      this.axios({
        method:'get',
        url: api.getReward,
      }).then(res=>{
        console.log('获取中奖信息',res)
        if (res.data.data && res.data.data.adultList.length) {
          this.$refs.reward.initData(res.data.data);
        }
      })
    },
    
    changeTabIndex(tab){
      this.tabIndex = tab;
      if(tab == 2 && this.kidsVoiceList.length == 0){
        this.getKidsList(true);
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
  },
  created() {
    console.log("this.wechatUserInfo", this.wechatUserInfo);
  },
  mounted(){
    this.showReward()
    // if(this.$store.state.userId){
    //   this.getMyVoice();
    // }
  },
  watch: {
    userId: {
      immediate: true, // 这句重要
      handler(val) {
        if (val) {
          // 这里应该不需要了,在这里写上获取用户音频就可以了
          // this.getAdultsList(true);
          // @todo 这个记得打开
          this.getMyVoice();
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
  padding: 20px 7px 0;
  width: 320px;
  height: 412px;
  background-color: rgba(243, 138, 158, 0.85);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 25px;

  .voice_container {
    height: 320px;
    overflow-y: scroll;
  }
  .listen_more {
    position: absolute;
    top: 40px;
    right: -20px;
    width: 16px;
    color: #c70025;
    font-size: 12px;
    line-height: 1.3;
  }
}
.voice_list_item_container {
  padding-top: 6px;
}
.voice_item_container {
  display: flex;
  width: 100%;
  margin-bottom: 6px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .audio_detail {
    flex: 1;
    max-width: 70px;
    .audio_userName,
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
  width: 290px;
  margin: 0 auto ;
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
  width: 290px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  color: #c70025;
  line-height: 1.5;
  font-size: 14px;
  padding: 3px 0;
}
.head_img_container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 0 5px;
  padding: 0;
  
  .head_img_default {
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    border: 1px solid #c70025;
    background-color: #fff;
  }
  .head_img_default ,.head_img_default_first,.head_img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    overflow: hidden;
    border-radius: 50%;
    max-width: 100%;
    max-height: 100%;
    padding: 0;
    
  }
  .head_img_default_first {
    width: 66px;
    height: 72px;
    box-sizing: border-box;
    background: url('../assets/img/list_first.png') center bottom no-repeat;
    background-size: contain;
    border-radius: 0;
    overflow: auto;
    margin-top: -6px;
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


.voice_index {
  display: flex;
  align-items: center;
  align-items: center;
  width: 16px;
  font-size: 20px;
  text-align: center;
  span {
    flex: 1;
  }
}
.vote_btns {
  display: flex;
  align-items: flex-end;
  .vote_btn {
    width: 60px;
    height: 20px;
    margin-left: 10px;
  }
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
    background-color: #fff;
    .head_img {
      width: 100%;
    }
  }
  .user_info {
    overflow: hidden;
  }
  .my_btns {
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
  .info_line_title {
    .info_line;
    margin: 30px 10px ;
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
  img {
    width: 100%;
  }
}

.pause_img,
.play_img {
  position: absolute;
  height: 24px;
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
        background: url("../assets/img/star_head1.png") center no-repeat;
        background-size: contain;
      }
    }
    &:nth-of-type(2) {
      .star_head {
        background: url("../assets/img/star_head2.png") center no-repeat;
        background-size: contain;
      }
    }
  }
  .star_play_btn {
    width: 110px;
    height: 40px;
    // background: url("../assets/img/star_play_btn.png") center no-repeat;
    // background-size: contain;
    img {
      width: 100%;
    }
  }
}

.break_line_container {
  width: 100%;
  margin: 24px 0;
  img {
    width: 100%;
  }
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
      
      .lz_read_head_img {
        position: relative;
        width: 66px;
        height: 66px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
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
      line-height: 23px;
      text-align: center;
      // background: #fff;
      // border-radius: 5px;
      // box-shadow: -2px 2px 0 2px  #b22e44;
      img {
        width: 100%;
      }
    }
  }
}
.no_more_text {
  color: #fff;
}

</style>


