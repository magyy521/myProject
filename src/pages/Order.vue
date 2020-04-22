<template>
  <div class="order_page">
    <div class="part_tab_container">
      <div
        class="tab_item"
        v-for="(tab, index) in tabList"
        :key="index"
        @click="tabIndex = index"
        :class="tabIndex == index ? 'actived' : ''"
      ></div>
    </div>
    <div class="order_detail">
      <div class="submit_form" v-show="tabIndex == 0">
        <div class="form_item">
          <span class="form_label">您的姓名</span>
          <input type="text" v-model="name" />
        </div>
        <div class="form_item">
          <span class="form_label">联系方式</span>
          <input type="text" v-model="phone" />
        </div>
        <div class="form_item">
          <span class="form_label">所在地区</span>
          <select class="province_input" v-model="provinceId" @change="getCity">
            <option
              v-for="(province, index) in provinceList"
              :key="index"
              :value="province.cid"
              >{{ province.name }}</option
            >
          </select>
          <span>省</span>
          <select class="city_input" v-model="cityId" @change="getDealer">
            <option
              v-for="(city, index) in cityList"
              :key="index"
              :value="city.cid"
              >{{ city.name }}</option
            >
          </select>
          <span>市</span>
        </div>
        <div class="form_item">
          <span class="form_label">经销商</span>
          <select class="dealer_input" name="" id="select" v-model="dealerId">
            <option
              v-for="(dealer, index) in dealerList"
              :key="index"
              :value="dealer.code"
              >{{ dealer.name }}</option
            >
          </select>
        </div>
        <div>
          <label class="input_label" for="check">
            <input
              type="checkbox"
              id="check"
              :checked="agree"
              v-model="agree"
            />
            我已阅读并同意
          </label>
          <span class="agree_span" @click="showAgreement">
            《保密声明》
          </span>
        </div>
        <button class="confirm_btn" @click="submit">
          <img src="../assets/img/confirm_submit_btn.png" alt="" />
        </button>
      </div>
      <div class="video_container" v-show="tabIndex == 1">
        <video
          id="video"
          class="video_file"
          src="https://qmlid.oss-cn-beijing.aliyuncs.com/car/video.mp4"
          poster="../assets/audio/video_cover.jpg"
          x-webkit-airplay="true"
          webkit-playsinline="true"
          playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          preload="auto"
          controls
        ></video>
      </div>
      <div class="part3" v-show="tabIndex == 2">
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
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <Agreement ref="agreement"></Agreement>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { api } from "../api";
import Agreement from "../components/Agreement";
export default {
  name: "home",
  components: {
    swiper,
    swiperSlide,
    Agreement
  },
  data: function() {
    return {
      mediaId: "97D9740ECE6FBD73F2F84DD16B6DBBB7", //正式
      // mediaId: "161C09E54CA90DC1B6AAE7A90105CB3B",//测试
      Token: "E983A6CCE83A6E325BB23857DBCAA040", //正式
      // Token: "D195B8BB0EBE6441E70F4A1A02E8F129",//测试
      randomNumber: "",
      timestamp: "",
      signatureVal: "",
      provinceId: "",
      cityId: "",
      dealerId: "",
      tabIndex: 0,
      tabList: ["预约试驾", "精彩视频", "精美车图"],
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
      agree: true,
      name: "",
      phone: "",
      provinceList: [],
      cityList: [],
      dealerList: []
    };
  },
  methods: {
    init() {
      this.randomNumber = "1" + this.RndNum(4);
      this.timestamp = this.$moment(new Date()).format("YYYY-DD-MM HH:mm:ss");
      this.signatureVal = this.signature(
        this.Token,
        this.randomNumber,
        this.timestamp
      );
      console.log(
        "this.this.mediaId",
        this.mediaId,
        this.randomNumber,
        this.signatureVal
      );
    },
    showAgreement() {
      this.$refs.agreement.show();
    },
    getProvince() {
      this.axios({
        method: "get",
        url: api.getProvince,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        params: { cid: 0 },
        xhrFields: {
          withCredentials: true
        },
        crossDomian: true
      })
        .then(msg => {
          console.log("getProvince", msg);
          this.provinceList = msg.data;
        })
        .catch(err => {});
      // this.provinceList = provinceList;
    },
    getCity() {
      this.cityList = [];
      this.cityId = "";
      this.dealerList = [];
      this.dealerId = "";
      if (this.provinceId == "0") {
        return;
      }
      this.axios({
        method: "get",
        url: api.getCity,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        params: { cid: this.provinceId },
        xhrFields: {
          withCredentials: true
        },
        crossDomian: true
      }).then(msg => {
        console.log("getCity", msg);
        this.cityList = msg.data;
      });
    },
    // 获取经销商

    getDealer() {
      this.dealerList = [];
      this.dealerId = "";
      if (this.cityId == "0") {
        return;
      }
      this.axios({
        method: "post",
        url: api.getDealer,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        data: {
          authentication: {
            mediaId: this.mediaId,
            timestamp: this.timestamp,
            randomNumber: this.randomNumber,
            signature: this.signatureVal
          },
          param: JSON.stringify({key:"cityid",value: this.cityId})
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomian: true
      }).then(msg => {
        console.log("getDealer", msg);
        this.dealerList = msg.data.data;
      });
    },
    submit() {
      if (!this.name) {
        this.$toast.center("请输入姓名");
        return;
      }
      if (!/^1[0-9]{10}$/.test(this.phone)) {
        this.$toast.center("请输入正确的手机号码");
        return;
      }
      if (!this.provinceId || this.provinceId == "0") {
        this.$toast.center("请选择省份");
        return;
      }
      if (!this.cityId || this.cityId == "0") {
        this.$toast.center("请选择城市");
        return;
      }
      if (!this.dealerId || this.dealerId == "0") {
        this.$toast.center("请选择经销商");
        return;
      }
      if (!this.agree) {
        this.$toast.center("请阅读并同意保密声明");
        return;
      }
      let params = {
        mediaLeadId: this.RndNum(4),
        mediaLeadType: "预约试驾", //2019年3-5月普拉多APP
        channelKeyId: 269,
        // channelKeyId: '',
        channelId: 269,
        // channelId: '',
        // activity: 606,//测试
        activity: 774,
        name: this.name,
        phone: this.phone,
        provinceId: this.provinceId,
        cityId: this.cityId,
        dealerId: this.dealerId,
        // seriesId: 11,
        seriesId: 38,
        // seriesName: "普拉多",//测试
        seriesName: "全新RAV4荣放"
      };
      this.axios({
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        url: api.submitOrder,
        data: {
          authentication: {
            mediaId: this.mediaId,
            timestamp: this.timestamp,
            randomNumber: this.randomNumber,
            signature: this.signatureVal
          },
          datas: [params]
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomian: true
      }).then(res => {
        console.log("submitOrder", res);
        this.$toast.center(res.data.message);
        this.saveRequest(params);
      });
    },
    // 数据保存到自己的服务器
    saveRequest(params) {
      this.axios.post(api.saveOrder, {
        phone: params.phone,
        dealer: params.dealerId,
        province: params.provinceId,
        userId: this.$store.state.userId,
        userName: params.name,
        city: params.cityId,
      });
    },
    //生成签名
    signature(Token, randomNumber, timestamp) {
      var ar = [];
      ar.push(Token);
      ar.push(randomNumber.toString());
      ar.push(timestamp.toString());
      var sign = ar.sort().join("");

      return this.sha1(sign);
    },
    //随机数 - start
    RndNum(n) {
      var rnd = "";
      for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
      return rnd;
    },
    encodeUTF8(s) {
      var i,
        r = [],
        c,
        x;
      for (let i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xc0 + ((c >> 6) & 0x1f), 0x80 + (c & 0x3f));
        else {
          if ((x = c ^ 0xd800) >> 10 == 0)
            //对四字节UTF-16转换为Unicode
            (c = (x << 10) + (s.charCodeAt(++i) ^ 0xdc00) + 0x10000),
              r.push(0xf0 + ((c >> 18) & 0x7), 0x80 + ((c >> 12) & 0x3f));
          else r.push(0xe0 + ((c >> 12) & 0xf));
          r.push(0x80 + ((c >> 6) & 0x3f), 0x80 + (c & 0x3f));
        }
      return r;
    },
    // 字符串加密成 hex 字符串
    sha1(s) {
      var data = new Uint8Array(this.encodeUTF8(s));
      var i, j, t;
      var l = (((data.length + 8) >>> 6) << 4) + 16,
        s = new Uint8Array(l << 2);
      s.set(new Uint8Array(data.buffer)), (s = new Uint32Array(s.buffer));
      for (t = new DataView(s.buffer), i = 0; i < l; i++)
        s[i] = t.getUint32(i << 2);
      s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
      s[l - 1] = data.length << 3;
      var w = [],
        f = [
          function() {
            return (m[1] & m[2]) | (~m[1] & m[3]);
          },
          function() {
            return m[1] ^ m[2] ^ m[3];
          },
          function() {
            return (m[1] & m[2]) | (m[1] & m[3]) | (m[2] & m[3]);
          },
          function() {
            return m[1] ^ m[2] ^ m[3];
          }
        ],
        rol = function(n, c) {
          return (n << c) | (n >>> (32 - c));
        },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
      (m[2] = ~m[0]), (m[3] = ~m[1]);
      for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++)
          (w[j] =
            j < 16
              ? s[i + j]
              : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)),
            (t =
              (rol(m[0], 5) +
                f[(j / 20) | 0]() +
                m[4] +
                w[j] +
                k[(j / 20) | 0]) |
              0),
            (m[1] = rol(m[1], 30)),
            m.pop(),
            m.unshift(t);
        for (j = 0; j < 5; j++) m[j] = (m[j] + o[j]) | 0;
      }
      t = new DataView(new Uint32Array(m).buffer);
      for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

      var hex = Array.prototype.map
        .call(new Uint8Array(new Uint32Array(m).buffer), function(e) {
          return (e < 16 ? "0" : "") + e.toString(16);
        })
        .join("");
      return hex;
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper ? this.$refs.mySwiper.swiper : "";
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    if (this.swiper) {
      this.swiper.slideTo(0, 1000, false);
    }
    this.init();
    this.getProvince();
  }
};
</script>
<style lang="less">
.order_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 20px;
  color: #fff;
  background-color: #090b12;
  background-image: url("../assets/img/order_bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.part_tab_container {
  display: flex;
  width: 100%;
  height: 34px;
  justify-content: space-around;
  margin-bottom: 10px;
  .tab_item {
    flex: 1;
    text-align: center;
    height: 28px;
    background-repeat: no-repeat;
    background-size: cover;
    &:first-of-type {
      background-image: url("../assets/img/tab1_light.png");
      &.actived {
        background-image: url("../assets/img/tab1_dark.png");
      }
    }
    &:nth-of-type(2) {
      background-image: url("../assets/img/tab2_light.png");
      &.actived {
        background-image: url("../assets/img/tab2_dark.png");
      }
    }
    &:nth-of-type(3) {
      background-image: url("../assets/img/tab3_light.png");
      &.actived {
        background-image: url("../assets/img/tab3_dark.png");
      }
    }
  }
}

.order_detail {
  height: 280px;
  box-sizing: border-box;
  width: 355px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;

  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(56, 70, 112, 0.7);
  .part3 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 260px;
    img {
      width: 100%;
    }
  }
}
.submit_form {
  .form_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: serif;
    margin-bottom: 15px;
    color: #fff;
    .form_label {
      letter-spacing: 3px;
      margin-right: 3px;
      font-size: 12px;
    }
    input[type="text"],
    select {
      font-size: 12px;
      background: transparent;
      border: 1px solid #fff;
      width: 260px;
      height: 26px;
      border-radius: 4px;
      overflow: hidden;
      color: #fff;
      background-color: rgba(56, 70, 112, 0.7);
    }
    .province_input,
    .city_input {
      width: 100px;
    }
  }
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
}
.confirm_btn {
  display: block;
  width: 280px;
  margin: 10px auto 0;
  img {
    max-width: 100%;
    max-height: 30px;
  }
}
.input_label {
  display: inline-block;
  padding: 10px 0;
  vertical-align: middle;
  input {
    vertical-align: middle;
  }
}
.video_container {
  display: flex;
  align-items: center;
  height: 280px;
  video {
    width: 100%;
  }
}
.agree_span {
  display: inline-block;
  padding: 15px 5px;
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
  width: 334px;
  min-height: 240px;
}
</style>
