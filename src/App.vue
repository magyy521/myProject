<template>
  <div id="app">
    <router-view :userId="$store.state.userId"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { UA } from "./assets/common";
import { jsConfig, wechatShare } from "./assets/wechat_outh";
import wx from "weixin-jsapi";
import axios from "axios";
import { lzLogin } from "./assets/lzlogin";
import { api } from "./api";
import { fetchLizhiUserInfo } from "./utils";
import uuid from "uuid-js";
export default {
  name: "app",
  methods: {
    appInit() {
      if (UA.wx && "wx" in window) {
        jsConfig(location.href);
        wechatShare({
          desc: '',
          imgUrl: "https://mkactivity.lizhifm.com/static/2019_12_car_vote/share_img.jpg",
        });
        this.$store.commit("setNavi", "wx");
        let userId = localStorage.getItem("userId");
        if (userId) {
          this.$store.commit("setUser", { prop: "userId", val: userId });
        } else {
          let newId = uuid.create(1);
          this.$store.commit("setUser", { prop: "userId", val: newId.hex });
        }

        this.$store.commit("setUser", {
          prop: "headURL",
          val: UA.wx ? this.wechatUserInfo.headimgurl : ""
        });
        this.$store.commit("setUser", {
          prop: "userName",
          val: UA.wx ? this.wechatUserInfo.nickname : ""
        });
        this.initUser(this.wechatUserInfo.headimgurl);
        localStorage.setItem("userId", this.$store.state.userId);
      }
      if (UA.lz) {
        this.asyncScript();
        this.$store.commit("setNavi", "lz");
      }
      let mapShow = localStorage.getItem("mapShow");

      if (mapShow) {
        mapShow = JSON.parse(mapShow);
        for (let key in mapShow) {
          this.$store.commit("setMap", { prop: key, val: mapShow[key] });
        }
      }
    },
    asyncScript() {
      let that = this;
      fetchLizhiUserInfo().then(res => {
        console.log("lizhi_userInfo", res);
        that.$store.commit("setUser", { prop: "userId", val: res.id });
        that.$store.commit("setUser", { prop: "headURL", val: res.headImg });
        that.$store.commit("setUser", { prop: "userName", val: res.nickname });
        that.initUser(res.headImg);
      });
    },
    initUser(img) {
      this.axios
        .post(api.getUserDetail, {
          userId: this.$store.state.userId,
          userName: this.$store.state.userName,
          headURL: UA.wx ? this.wechatUserInfo.headimgurl : img
        })
        .then(res => {
          let data = res.data.data;
          data.headURL
            ? this.$store.commit("setUser", {
                prop: "headURL",
                val: data.headURL
              })
            : "";
          this.$store.commit("setUser", { prop: "qty", val: data.qty });
          this.$store.commit("setUser", { prop: "url", val: data.url });
          this.$store.commit("setUser", { prop: "title", val: data.title });
          this.$store.commit("setUser", { prop: "phone", val: data.phone });
          this.$store.commit("setUser", {
            prop: "hasReward",
            val: data.rewardFlag
          });
          
          this.$store.commit("setUser", { prop: "voteQty", val: data.voteQty });
          this.$store.commit("setUser", { prop: "ranking", val: data.ranking });
        });
    }
  },
  created() {
    // this.appInit();
    // this.initUser()
  }
};
</script>

<style lang="less">
@import "./assets/reset.css";
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
button {
  background: transparent;
  outline: none;
  border: none;
}
</style>
