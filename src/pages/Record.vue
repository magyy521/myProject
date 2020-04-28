<template>
  <div class="record_page">
    <div v-if="step != 3" class="choose_back_btn" @click="backHome"></div>

    <div v-if="step == 1" class="step1_container">
      <div  class="swiper_tip">
        <span v-if="audioType == 1">可左右选取你想朗读的文章</span>
      </div>
      <div class="swiper_part" >
        <div v-if="audioType == 1" class="swiper-prev-btn" @click="swiperPrev">
          <img src="../assets/img/swiper_prev.png" alt="">
        </div>
        <div class="out_swiper_container">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
          </swiper>
          <p  class="scroll_text">滑动可显示更多</p>
        </div>
        <div v-show="audioType == 1" class="swiper-next-btn" @click="swiperNext">
          <img src="../assets/img/swiper_next.png" alt="">
        </div>
      </div>
      <div  class="record_time">
        <span v-show="timeLong > 0 && recording">00:{{ timeLongShow }}/01:00</span>
        <div class="play_my_audio_btn_container" v-show="recordComplete && timeLong >5" @click="playMyAudio" >
          <img class="control_play_img" v-show="$store.state.playStatus == 1 || $store.state.playStatus == 2 " src="../assets/img/local_play_audio.png" alt="" />
          <img class="control_play_img" v-show="$store.state.playStatus == 3" src="../assets/img/local_pause_audio.png" alt="" />
        </div>

        <audio
        ref="myRadio"
        :src="$store.state.url"
        controls="controls"
        @ended="endAudio()"
        class="star_head_audio"
      >您的手机不支持此格式</audio>

        
      </div>

      <div class="record_btns_container">
        <button v-if="!recording && !recordComplete" @click="start" class="record_btn start_btn ">
          <img src="../assets/img/start_btn.png" alt="开始录音" />
          <p class="btn_text">开始录音</p>
        </button>

        <button  v-if="recording" @click="stop" class="record_btn complete_btn ">
          <img src="../assets/img/complete_btn.png" alt="完成" />
          <p class="btn_text">正在录音...</p>
        </button>

        <button v-if="recordComplete" class="record_btn restart_btn" @click="start">
          <img src="../assets/img/re_record.png" alt="重录" />
          <p class="btn_text">重录</p>
        </button>

        <button v-if="recordComplete && timeLong >5" class="record_btn record_next_btn"  @click="next">
          <img src="../assets/img/next_btn.png" alt="下一步" />
          <p class="btn_text">完成</p>
        </button>
      </div>
    </div>
    

    <div class="submit_form_container" v-else-if="step == 2">
      <img src="../assets/img/submit_bg.png" class="submit_bg" alt="">
      <div class="upload_params">
        <div class="param_item">
          <p class="param_label">标题(选填)</p>
          <input class="input" type="text" v-model="title" />
        </div>
        <div class="param_item">
          <p class="param_label">真实姓名(必填)</p>
          <input
            @blur="downPage"
            v-model="realName"
            class="input"
            type="text"
            placeholder=""
          />
        </div>
        <div class="param_item">
          <p class="param_label">手机号(必填)</p>
          <input
            @blur="downPage"
            v-model="phone"
            class="input"
            maxlength="11"
            type="tel"
            placeholder=""
          />
        </div>
        <div class="param_item">
          <p class="param_label">所在地区(必填)</p>
          <select class="input province_select" name="" id="" v-model="area">
            <option v-for="(item,index) in provinceList" :key="index" :value="item">{{item}}</option>
          </select>
        </div>
        <div class="param_item">
          <p class="param_label">参赛组别(必填)</p>
          <div class="input type_choose adults_choose " :class="userType == 2 ? ' checked' : ''" @click="userType = 2" >成人组</div>
          <div class="input type_choose" :class="userType == 1 ? ' checked' : ''" @click="userType = 1">少儿组(18周岁以下)</div>
        </div>
        <div class="privacy_item">
          <label class="input_label" for="check">
            <div class="pravicy_checkbox" :class="agree ? ' checked' : ''">
              <input
              type="checkbox"
              id="check"
              :checked="agree"
              v-model="agree"
            />
            </div>
            我已阅读并同意
          </label>
          <span class="agree_span" @click="showPrivacy">隐私政策</span>
        </div>
        <button class="submit_btn" @click="upload">
          <img src="../assets/img/submit_btn.png" alt="提交" />
        </button>
      </div>
    </div>
    <template v-else-if="step == 3">
      <div class="success_modal">
        <p class="success_tip">上传成功!</p>
        <div class="success_content">
          <p class="success_p">立刻分享为自己拉票</p>
          <p class="success_p">有机会赢取精美奖品!</p>
          <p class="success_p">同时帮助小候鸟募集更多童书哦!</p>
        </div>
        <div class="success_btns">
          <img @click="share" class="success_share_btn" src="../assets/img/success_share_btn.png" alt="分享" />
          <img  @click="backHome" class="success_back_home" src="../assets/img/success_back_home.png" alt="返回首页" />
        </div>
      </div>
    </template>

    <MaskC ref="mask"></MaskC>
    <Privacy ref="privacy"></Privacy>
  </div>
</template>
<script>
import MaskC from "../components/MaskC";
import Privacy from "../components/Privacy";
import { UA } from "../assets/common";
import NewReord from "../assets/record";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import uuid from "uuid-js";
import { api } from "../api";
import { jsConfig } from "../assets/wechat_outh";
import articleList from "../assets/articles"
import areas from '../assets/areas'
console.log('articleList',articleList)
export default {
  name: "home",
  components: { MaskC,swiper,swiperSlide,Privacy },
  data: function() {
    return {
      audioType: 1,//上传的类型,1是阅读 ,2是故事
      provinceList: areas,
      step: 1,
      headUrl: "",
      phone: "",
      title: "爱暖童心,声声不息",
      area: '',
      userType: '', // 1少儿 2成人
      realName: '',
      nickname: "",
      url: "",
      id: "",
      recording: false,
      recordComplete: false,
      timeLong: 0, //录音录了多久
      allTime: 60, //录音总计时长
      timer: null,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
          // renderBullet(index, className) {
          //   return `<span class="${className} swiper-pagination-bullet-custom">${index +
          //     1}</span>`;
          // }
        }
      },
      agree: true
    };
  },
  methods: {
    swiperPrev(){
      this.swiper.slidePrev()
    },
    swiperNext(){
      this.swiper.slideNext()
    },
    share() {
      this.$refs.mask.show();
    },
    backHome() {
      this.$router.replace("/");
    },
    // 真正开始录音
    startRecord() {
      console.log("record内部开始录音啦");
      console.log(this.NewReord);
      this.NewReord.start(err => {
        if (err) {
          this.$toast.center(err);
        }
      });
    },
    endRecord() {
      this.NewReord.stop(true, (msg, data) => {
        this.url = data;

        if (msg) {
          this.$toast.center("网络繁忙，请刷新重试");
          return;
        }
        console.log("录音上传的地址", data);
        // 录音上传的地址
        this.$store.state.url = data;
        
      });
    },
    // 点击开始录音的按钮,初始化一些数据
    start() {
      this.timer = null;
      this.timeLong = 0;
      this.recording = true;
      this.recordComplete = false;
      this.$store.commit("setUser", { prop: "playStatus", val: 1 });
      this.startTime();
      this.startRecord();
    },
    startTime() {
      this.timer = setInterval(() => {
        this.timeLong++;
        if (this.timeLong >= this.allTime) {
            this.stop();
          }
      }, 1000);
    },
    stop() {
      window.clearInterval(this.timer);
      this.timer = null;

      this.recording = false;
      this.recordComplete = true;
      this.endRecord();
    },
    next() {
      console.log("下一步");
      this.stopAudio();
      this.step = 2;
    },
    upload() {
      if (!this.agree) {
        this.$toast.center("请同意隐私协议");
        return;
      }
      if (!this.realName) {
        this.$toast.center("请输入真实姓名");
        return;
      }
      if (!this.area) {
        this.$toast.center("请选择地区");
        return;
      }
      if (!this.userType) {
        this.$toast.center("请选择参赛类型");
        return;
      }
      if (!/^1[0-9]{10}$/.test(this.phone)) {
        this.$toast.center("请输入正确的手机号码");
        return;
      }

      let state = this.$store.state;
      // let headUrlObj = UA.wx ? { headUrl: this.wechatUserInfo.headimgurl } : {};
      let headUrlObj = {};
      if (!state.userId) {
        let newId = uuid.create(1);
        this.$store.commit("setUser", {
          prop: "userId",
          val: newId.hex,
          ...headUrlObj
        });
      }
      console.log('state.userId',state.userId)
      // return
      // 将用户上传的音频参数传到数据库中去,包括音频地址,用户id,用户名称等等
      this.axios
        .post(api.addAudio, {
          userId: this.$store.state.userId,
          phone: this.phone,
          title: this.title,
          url: this.url,
          realName: this.realName,
          audioType: this.audioType,
          userType: this.userType,
          area: this.area,
        })
        .then(res => {
          this.step = 3;
          // 上传完成，去成功页面
        })
        .catch(err => {
          this.$toast.center("提交失败");
          console.log("提交失败", err);
        });
    },

    downPage() {
      window.scroll(0, 0);
    },
    playMyAudio() {
      console.log('this.$store.state.url',this.$store.state.url)
      if (!this.$store.state.url) {
        console.log("没有地址");
        this.$toast.center("暂无音频");
        return false;
      }
      let audio = this.$refs.myRadio;
      if (audio !== null) {
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if (audio.paused) {
          audio.play(); //audio.play();// 这个就是播放
          this.$store.commit("setUser", { prop: "playStatus", val: 3 });
        } else {
          audio.pause(); // 这个就是暂停
          this.$store.commit("setUser", { prop: "playStatus", val: 2 });
        }
      }
    },
    // 音频播放到结束
    endAudio(){
      this.$store.commit("setUser", { prop: "playStatus", val: 1 });
    },
    stopAudio() {
      let audio = this.$refs.myRadio;
      if (audio !== null) {
        let paused = audio.paused;
        if (paused) {

        } else {
          audio.pause(); // 这个就是暂停
          this.$store.commit("setUser", { prop: "playStatus", val: 2 });
        }

      }
    },
    showPrivacy(){
      this.$refs.privacy.show();
    },
    initSwiperContent(){
      let list = [];
      let dom='';
      if(this.audioType == 1){
        list = articleList;
        list.forEach(item=>{
          dom += `<div class="swiper-slide"><div class="text-content">
            <div class='artIndex'>${item.artIndex}</div>
            <div class='artCommon'>我是XXX，“爱暖童心，声声不息”。</div>
            <div class='artIntro'>${item.artIntro}</div>
            ${item.artTitle ?  "<div class='artTitle'>" + item.artTitle + "</div>": ''}
            <div class='artContent'>${item.artContent}</div>
          </div></div></div>`
        })
      }else {
        let type2Dom = `
        <div class="swiper-slide"><div class="text-content">
        <p class="type2_title">话题方向参考：</p>
        <p class="type2_p">1、、突如其来的疫情给你的生活带来改变了吗？你是如何调节心适应这种变化的？分享你的故事，帮助“小候鸟”提升情绪管理能力</p>
        <p class="type2_p">2、你会有“拖延症“的困扰吗？分享你让自己更自律的好方法，帮助”小候鸟“提升自我管理能力</p>
        <p class="type2_p">3、你是否也曾经是一个“小候鸟”？曾有过父母长时间不在身边，或者随父母离开家乡漂泊在外的经历。分享你的故事，帮助小候鸟理解父母，更好与身边人相处</p>
        <p class="type2_p">4、关于保持心理健康，成为更好的自己，你想对“小候鸟”们说些什么……</p>
        </div></div></div>
        `
        dom = type2Dom
      }
      
      
      
      this.swiper.appendSlide(dom)
    },
    initShareConfig(type){
      if(type == "lizhi"){
        lz && lz.shareUrl({
          "url": "https://vodactivity.lizhifm.com/static/kfc/#/home", //分享的url
          "title": "为XXX拉票", //分享标题
          "desc": "我正在为XXX拉票，大家帮帮我吧", // 分享的描述
          "image-url": "https://mkactivity.lizhifm.com/static/2019_12_car_vote/share_img.jpg", //分享的图片
        //   "platforms": [22, 23] // 分享的平台（可选，若不指定则由客户端显示全部可分享的平台）
        })

        lz && lz.configShareUrl({
          "url": "https://vodactivity.lizhifm.com/static/kfc/#/home", //分享的url
          "title": "为XXX拉票", //分享标题
          "desc": "我正在为XXX拉票，大家帮帮我吧", // 分享的描述
          "image-url": "https://mkactivity.lizhifm.com/static/2019_12_car_vote/share_img.jpg", //分享的图片
        })
        console.log('lz && lz.configShareUrl',lz && lz.configShareUrl)

      }

      if(type == "wechat") {
        wechatShare({
          title: '为我拉票',
          link: 'https://vodactivity.lizhifm.com/static/kfc/#/home',
          desc: '描述内容',
          imgUrl: "https://mkactivity.lizhifm.com/static/2019_12_car_vote/share_img.jpg",
        });
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper ? this.$refs.mySwiper.swiper : "";
    },
    timeLongShow(){
      return this.timeLong > 9 ? String(this.timeLong) : `0${this.timeLong}`
    },
    
  },
  created() {
    console.log('录音界面created')
    let audioType = this.$route.query.type
    if(this.$route.query.type) {
      this.audioType = audioType
    }
    let type = UA.lz ? "lizhi" : UA.wx ? "wechat" : "chrome";
    this.NewReord = NewReord(type);
    if (UA.wx && "wx" in window) {
      if(!(navigator.userAgent.indexOf('iPhone') > -1)){
        // 非苹果系统,那么重新进行微信配置
        jsConfig(location.href).then(()=>{
          console.log('录音界面准备分享信息')
          this.initShareConfig(type)
        })
        
      }

    }
    if (type == "wechat") {
      // 如果是微信
      this.allTime = 59;
    }else {

    }
    this.initShareConfig(type)
  },
  mounted(){
    this.initSwiperContent()
  },
  beforeDestroy() {
    this.$store.commit("setUser", { prop: "playStatus", val: 1 });
  }
};
</script>
<style lang="less" scoped>
.record_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  background-size: cover;
  background-image: url("../assets/img/record_bg.png");
  .choose_back_btn {
    width: 90px;
    height: 40px;
    align-self: flex-start;
    background: url('../assets/img/back_home_btn.png') center no-repeat;
    background-size: contain;
  }
}
.step1_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head_container {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  text-align: center;
  .head_img {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .pause_img,
  .play_img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
  }
  audio {
    opacity: 0;
    position: absolute;
    left: -900px;
  }
}
.record_time {
  width: 100%;
  margin: 11px 0;
  font-size: 16px;
  height: 35px;
  text-align: center;
}

.submit_form_container {
  width: 350px;
  margin-top: 14px;
  display: flex;
  justify-content: center;
  position: relative;
  .submit_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
.upload_params {
  
  box-sizing: border-box;
  padding: 18px 35px 50px;
  width: 310px;
  border-radius: 3px;
  background: rgba(255,255,255,.6) ;
  background-size: contain;
  font-family: serif;

  
  .param_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 14px;
    font-size: 16px;
    .param_label {
      width: 100%;
      text-align: left;
      margin-bottom: 7px;
    }
    &:first-of-type {
      margin-top: 24px;
    }
    .input {
      width: 240px;
      height: 28px;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 14px;
      border-radius: 3px;
      border: 1px solid #e6748b;
      background: transparent;
    }
    .province_select {
      -webkit-appearance:none;
      -moz-appearance:none;
      appearance:none; /*去掉下拉箭头*/
      
      background: url('../assets/img/select_arrow.png') 96% center no-repeat;
      background-size: auto;
      background-clip: content-box;
    }
    .type_choose {
      line-height: 28px;
      &.checked {
        background: #e6748b;
        color: #fff;
      }
    }
    .adults_choose {
      margin-bottom: 3px;
    }
  }

  .privacy_item {
    text-align: center;
    color: #000;
  }
  .input_label {
    display: inline-block;
    padding: 13px 0;
    font-size: 12px;
    vertical-align: middle;
    
    .pravicy_checkbox {
      display: inline-block;
      background: url('../assets/img/pravice_nocheck.png') center no-repeat;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
      &.checked {
        background: url('../assets/img/pravice_check.png') center no-repeat;
        background-size: contain;
      }
      
    }
    input {
      width: 20px;
      height: 20px;
      opacity: 0;
    }
  }
  .submit_btn {
    display: block;
    width: 160px;
    height: 44px;
    margin: 0 auto ;
    img {
      width: 100%;
    }
  }
}



.success_modal {
  padding-top: 170px;
  text-align: center;
  .success_tip {
    margin-bottom: 37px;
    font-size: 32px;
  }
  .success_content {
    font-size: 18px;
    line-height: 1.5;
  }
  .success_btns {
    width: 310px;
    margin-top: 37px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .success_share_btn {
      width: 145px;
    }
    .success_back_home {
      width: 142px;
    }
    
  }
}


.record_btns_container {
  width: 320px;
  display: flex;
  justify-content: space-around;
  .record_btn {
    width: 70px;
    img {
      width: 100%;
    }
  }
  .start_btn,
  .complete_btn {
    width: 100px;
    font-size: 16px;
    img {
      width: 100%;
    }
  }
  .btn_text {
    margin-top: 7px;
    font-size: 16px;
  }
}


.swiper_tip {
  width: 100%;
  text-align: right;
}

.swiper_part {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .swiper-prev-btn {
    margin-right: -20px;
    img {
      width: 100%;
    }
  }
  .swiper-next-btn {
    margin-left: -20px;
    img {
      width: 100%;
    }
  }
  .swiper-prev-btn,.swiper-next-btn {
    position: relative;
    z-index: 5;
  }
}
.out_swiper_container {
  position: relative;
  flex-shrink: 0;
  width: 300px;
  height: 320px;
  padding-top: 54px;
  background: url('../assets/img/swiper_bg.png') center no-repeat;
  background-size: contain;
  .scroll_text {
    position: absolute;
    right: -0px;
    top: 62px;
    width: 14px;
    line-height: 1.2;
  }
}

.play_my_audio_btn_container {
  width: 148px;
  margin: 0 auto;
  .control_play_img {
    width: 100%;
  }
}
</style>
<style lang="less">
.swiper-pagination-bullet-custom {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}
.swiper-container {
  width: 220px;
  height: 260px;

}
.text-content {
  font-size: 14px;
  line-height: 1.5;
  height: 100%;
  overflow-y: auto;
  text-align: justify;
  .artIndex {
    font-size: 16px;
  }
  .artIntro {

  }
  .artCommon {}
  .artTitle {
    margin: 18px 0 8px ;
    text-align: center;
    font-weight: bolder;
  }
  .artContent {

  }
  .detail_container {

  }
  .detail_p {
    margin-top: 10px;
  }
}

.type2_title {
  padding: 28px 0;
  font-size: 18px;
}
.type2_p {
  font-size: 16px;
  line-height: 1.3;
  margin-bottom: 12px;
  text-align: left;
  text-indent: -26px;
  margin-left: 26px;
}


</style>