import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);


import "vue2-toast/lib/toast.css";
import Toast from "vue2-toast";
Vue.use(Toast, {
  type: "center",
  duration: 3000,
  wordWrap: true,
  width: "50vw"
});
import "lib-flexible";
import axios from "axios";
import { UA, wechatOauth } from "./utils";

import VC from "vconsole";

new VC();

Vue.prototype.axios = axios;

if (UA.wx) {
  wechatOauth(location.href, userInfo => {
    Vue.prototype.wechatUserInfo = JSON.parse(userInfo);
    bootStrap();
  });
} else {
  if (UA.lz) {
    console.log('window,',window)
    // window["lz"] && window["lz"].config({
    //   debug: false,
    //   url: "https://h5security.lizhi.fm/jsBridgeConfig/get",
    //   apiList: ["getToken", "shareImage", "saveImage"],
    //   eventList: ["user:login"]
    // });
  }
  bootStrap();
}
function bootStrap() {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount("#app");
}
