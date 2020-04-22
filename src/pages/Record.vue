<template>
  <div class="record_page">
    <div v-if="step != 3" class="choose_back_btn" @click="backHome"></div>
    <div v-if="step == 1" class="step1_container">
      <div class="swiper_tip">可左右选取你想朗读的文章</div>
      <div class="swiper_part" >
        <div class="swiper-prev-btn" @click="swiperPrev">
          <img src="../assets/img/swiper_prev.png" alt="">
        </div>
        <div class="out_swiper_container" @click="playMyAudio">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide>
              <img src="../assets/img/cars/1.jpg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img src="../assets/img/cars/2.jpg" alt=""
            /></swiper-slide>
            <swiper-slide>
              <img src="../assets/img/cars/3.jpg" alt=""
            /></swiper-slide>
            <swiper-slide>
              <img src="../assets/img/cars/4.jpg" alt=""
            /></swiper-slide>
            <swiper-slide>
              <img src="../assets/img/cars/5.jpg" alt=""
            /></swiper-slide>
            <!-- Optional controls -->
            
            
          </swiper>
          <p class="scroll_text">滑动可显示更多文字</p>
        </div>
        <div class="swiper-next-btn" @click="swiperNext">
          <img src="../assets/img/swiper_next.png" alt="">
        </div>
      </div>
      <p  class="record_time">
        <span v-show="timeLong > 0 && recording">00:{{ timeLongShow }}/01:00</span>
      </p>

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



      <div v-if="recordComplete" class="btns">
        
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
            v-model="trueName"
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
          <select class="input province_select" name="" id="" v-model="userProvince">
            <option v-for="(item,index) in provinceList" :key="index" :value="item">{{item}}</option>
          </select>
        </div>
        <div class="param_item">
          <p class="param_label">参赛组别(必填)</p>
          <div class="input type_choose adults_choose " :class="userType == 1 ? ' checked' : ''" @click="userType = 1" >成人组</div>
          <div class="input type_choose" :class="userType == 2 ? ' checked' : ''" @click="userType = 2">少儿组(18周岁以下)</div>
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
console.log("NewReord", NewReord);
export default {
  name: "home",
  components: { MaskC,swiper,swiperSlide,Privacy },
  data: function() {
    return {
      provinceList:['河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','四川','贵州','云南','陕西','甘肃','青海','台湾','内蒙古','广西','西藏','宁夏','新疆','北京','天津','上海','重庆','香港','澳门'],
      step: 1,
      headURL: "",
      phone: "",
      title: "爱暖童心,声声不息",
      userProvince: '',
      userType: '',
      trueName: '',
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
        // if (UA.wx) {
        //   if (this.timeLong >= this.allTime) {
        //     this.stop();
        //   }
        // }

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
      if (!this.trueName) {
        this.$toast.center("请输入真实姓名");
        return;
      }
      if (!this.userProvince) {
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
      // let headURLObj = UA.wx ? { headURL: this.wechatUserInfo.headimgurl } : {};
      let headURLObj = {};
      if (!state.userId) {
        let newId = uuid.create(1);
        this.$store.commit("setUser", {
          prop: "userId",
          val: newId.hex,
          ...headURLObj
        });
      }
      // 将用户上传的音频参数传到数据库中去,包括音频地址,用户id,用户名称等等
      this.axios
        .post(api.saveAudio, {
          userId: this.$store.state.userId,
          phone: this.phone,
          title: this.title,
          url: this.url,
          userName: this.$store.state.userName,
        })
        .then(res => {
          console.log("res,,,,,,,,,", res);
          this.step = 3;
          // 上传完成，去成功页面
        })
        .catch(err => {
          this.$toast.center("提交失败");
          console.log("提交失败", err);
        });
    },
    // 更新用户信息
    updateUserAudio() {
      this.axios
        .post(`${api.getMyVoice}/${this.$store.state.userId}`, {})
        .then(res => {
          let data = res.data.data || {};

          this.$store.commit("setUser", { prop: "phone", val: data.phone });
          this.$store.commit("setUser", { prop: "url", val: data.url });
          this.$store.commit("setUser", { prop: "title", val: data.title });
          this.$store.commit("setUser", {
            prop: "userName",
            val: data.userName
          });
          this.$store.commit("setUser", { prop: "qty", val: data.qty || 0 });
          this.$store.commit("setUser", {
            prop: "hasReward",
            val: data.rewardFlag
          });
          this.$store.commit("setUser", {
            prop: "ranking",
            val: data.ranking
          });
        });
    },
    downPage() {
      window.scroll(0, 0);
    },
    playMyAudio() {
      // if (!this.$store.state.url) {
      //   console.log("没有地址");
      //   this.$toast.center("暂无音频");
      //   return false;
      // }
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
    stopAudio() {
      let audio = this.$refs.myRadio;
      if (!audio) {
        audio.pause(); // 这个就是暂停
        this.$store.commit("setUser", { prop: "playStatus", val: 2 });
      }
    },
    showPrivacy(){
      this.$refs.privacy.show();
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper ? this.$refs.mySwiper.swiper : "";
    },
    timeLongShow(){
      return this.timeLong > 9 ? String(this.timeLong) : `0${this.timeLong}`
    }
  },
  created() {
    let type = UA.lz ? "lizhi" : UA.wx ? "wechat" : "chrome";
    this.NewReord = NewReord(type);
    if (UA.wx && "wx" in window) {
      if(!(navigator.userAgent.indexOf('iPhone') > -1)){
        // 非苹果系统,那么重新进行微信配置
        jsConfig(location.href);
      }

    }
    if (type == "wechat") {

      // 如果是微信
      this.allTime = 59;
    }
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
  margin-top: 22px;
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
  margin-bottom: 12px;
}

.swiper_part {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 320px;
  .swiper-prev-btn {
    margin-right: -20px;
  }
  .swiper-next-btn {
    margin-left: -20px;
  }
}
.out_swiper_container {
  position: relative;
  flex-shrink: 0;
  width: 300px;
  height: 320px;
  padding-top: 50px;
  background: url('../assets/img/swiper_bg.png') center no-repeat;
  background-size: contain;
  .scroll_text {
    position: absolute;
    right: -0px;
    top: 62px;
    width: 14px;
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

</style>