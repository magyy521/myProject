// import axios from "axios";
const axios = require('axios')
const wx = require('weixin-jsapi').default

// interface WechatConfig {
//   title: string;
//   link: string;
//   imgUrl: string;
//   desc: string;
// }


export const wechatShare = (param) => {
  let { title, link, imgUrl, desc } = param;
  console.log('vvvvvvvvvvv')
  return new Promise((resolve) => {
    if ("wx" in window) {
      wx.ready(() => {
        console.log('wx.ready事件')
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function() {
            resolve("timeline");
          }
        });
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function() {
            resolve("friend");
          }
        });
      });
    }
  });
};

export const jsConfig = (link) => {
  return new Promise((resolve) => {
    axios
      .get("//oauthbiz.lizhi.fm/weixin/jsconfig", {
        params: { tag: "brand", currentURL: link }
      })
      .then(response => {
        let data = response.data.data;

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: [
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "hideMenuItems",
            "showMenuItems",
            "hideAllNonBaseMenuItem",
            "showAllNonBaseMenuItem",
            "translateVoice",
            "startRecord",
            "stopRecord",
            "onRecordEnd",
            "playVoice",
            "pauseVoice",
            "stopVoice",
            "uploadVoice",
            "downloadVoice",
            "chooseImage",
            "previewImage",
            "uploadImage",
            "downloadImage",
            "getNetworkType",
            "openLocation",
            "getLocation",
            "hideOptionMenu",
            "showOptionMenu",
            "closeWindow",
            "scanQRCode",
            "chooseWXPay",
            "openProductSpecificView",
            "addCard",
            "chooseCard",
            "openCard"
          ]
        });
        resolve();
      });
  });
};
