import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    name: "",
    userId: "",
    // nickname: '',
    phone: "",
    url: "", //录音上传的地址
    title: "", //录音的名字
    vote: 0,
    id: '',//我的音频id
    headUrl: "", // 用户头像地址
    voteQty: 10, //每天可以投多少票 默认每天是10 需要从获取用户详情的接口中获取
    playStatus: 1 ,//我的音频播放状态
    votesNum: 0, // 我的音频得到多少票
  },
  getters: {
    activityOver: state =>{
      let nowTime = new Date().getTime();
      return nowTime >= 1591070399000; // 6-2号的时间戳
    }
  },
  mutations: {
    setUser(state, params) {
      // console.log("setUser", params);
      // 为什么不用这个...
      // Object.keys(params).forEach(v=>{
      //   state[v] = params[v]
      // })
      state[params.prop] = params.val;
    },
  },
  actions: {}
});
