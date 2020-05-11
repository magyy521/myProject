<template>
  <div id="app">
    <router-view :userId="$store.state.userId"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { UA } from "./assets/common";
import { jsConfig } from "./assets/wechat_outh";
import axios from "axios";
import { lzLogin } from "./assets/lzlogin";
import { api } from "./api";
import { fetchLizhiUserInfo } from "./utils";
import uuid from "uuid-js";
export default {
  name: "app",
  methods: {
    appInit() {

      // let userId = localStorage.getItem("userId");
      // if (userId) {
      //   this.$store.commit("setUser", { prop: "userId", val: userId });
      // } else {
      //   let newId = uuid.create(1);
      //   this.$store.commit("setUser", { prop: "userId", val: newId.hex });
      // }
      // this.$store.commit("setUser", {
      //     prop: "headUrl",
      //     val: 'https://s.cn.bing.net/th?id=OJ.YYiBymhdI7904A&w=75&h=75&dpr=1.5&pid=MSNJVFeeds'
      //   });
      // this.initUser('https://s.cn.bing.net/th?id=OJ.YYiBymhdI7904A&w=75&h=75&dpr=1.5&pid=MSNJVFeeds');


      if (UA.wx && "wx" in window) {
        jsConfig(location.href);

        let userId = localStorage.getItem("userId");
        if (userId) {
          this.$store.commit("setUser", { prop: "userId", val: userId });
        } else {
          let newId = uuid.create(1);
          this.$store.commit("setUser", { prop: "userId", val: newId.hex });
        }

        this.$store.commit("setUser", {
          prop: "headUrl",
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
      }
    },
    asyncScript() {
      let that = this;
      fetchLizhiUserInfo().then(res => {
        console.log("lizhi_userInfo...........", res);
        that.$store.commit("setUser", { prop: "userId", val: res.id });
        that.$store.commit("setUser", { prop: "headUrl", val: res.headImg  });
        that.$store.commit("setUser", { prop: "userName", val: res.nickname });
        that.initUser(res.headImg);
        // 荔枝登录的话,本地不需要存userid,因为进来的用户一定有userId,把这个userid存到服务器上就行了
      }).catch(err=>{
        console.log('fetchLizhiUserInfo err',err)
      })
    },
    initUser(img) {
      this.axios({
          method: 'get',
          url: `${api.getUserDetail}?userId=${this.$store.state.userId}&userName=${this.$store.state.userName}&headUrl=${UA.wx ? this.wechatUserInfo.headimgurl : img}`,
        })
        .then(res => {
          let data = res.data.data;
          data.headUrl? this.$store.commit("setUser", {prop: "headUrl",val: data.headUrl}): "";
          this.$store.commit("setUser", { prop: "qty", val: data.qty });
          this.$store.commit("setUser", { prop: "url", val: data.url });
          this.$store.commit("setUser", { prop: "title", val: data.title });
          this.$store.commit("setUser", { prop: "phone", val: data.phone });
          this.$store.commit("setUser", { prop: "voteQty", val: data.voteQty });
          this.$store.commit("setUser", { prop: "rank", val: data.rank });
        });
    }
  },
  created() {
    this.appInit();
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

audio {
  position: fixed;
  z-index: -100;
  left: -200%;
  bottom: 0;
  width: 0;
  height: 0;

}
</style>
