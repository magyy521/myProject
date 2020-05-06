import axios from "axios";
const ua = window.navigator.userAgent.toLowerCase();

export const UA = {
  iPhone: !!ua.match("iphone") || !!ua.match("ipad"),
  iPod: !!ua.match("ipod"),
  iPad: !!ua.match("ipad"),
  weibo: !!ua.match("weibo"),
  android: ua.indexOf("android") > -1 || ua.indexOf("linux") > -1,
  wx: /micromessenger/i.test(ua),
  qq: /qq/i.test(ua),
  uc: !!ua.match(/ucbrowser/i),
  lz: /lizhifm/i.test(ua),
  qqBrowser: ua.indexOf("mqqbrowser") > -1,
  quarkBrowser: ua.indexOf("quark") > -1,
  ie: ua.indexOf("trident") > -1,
  safari: ua.indexOf("safari") > -1,
  webview: ""
};
export const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
export const wechatOauth = (link, cb) => {
  if (localStorage.getItem("userInfo")) {
    console.log('localStorage.getItem("userInfo")',localStorage.getItem("userInfo"))
    cb(localStorage.getItem("userInfo"));
    return localStorage.getItem("userInfo");
  }
  if (!getQueryString("openid")) {
    if (location.href.split("?")[1]) {
      localStorage.setItem("origin_url", location.href.split("#")[1]);
    }
    location.replace(
      "//oauthbiz.lizhi.fm/weixin/wechatAuth2?tag=brand&redirectURL=" +
        encodeURIComponent(link)
    );
  } else {
    let default_params = localStorage.getItem("origin_url");
    let openid = getQueryString("openid");
    axios
      .get(`https://oauthbiz.lizhi.fm/weixin/loadUser?tag=brand&openid=${openid}`)
      .then(resp => {
        localStorage.setItem("userInfo", JSON.stringify(resp.data.data));
        if (default_params) {
          localStorage.removeItem("origin_url");
          location.assign(
            `${location.protocol +
              "//" +
              location.hostname +
              location.pathname +
              "#" +
              default_params}`
          );
        }
        cb(resp.data.data);
      });
    return "redirect";
  }
};

export const fetchLizhiUserInfo = () => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("lzUser")) {
      resolve(JSON.parse(localStorage.getItem("lzUser")));
      return;
    }
    console.log('调取lz.ready',lz)
    lz.ready(() => {
      LizhiJSBridge.call("getSessionUser", {}, function(ret) {
        if (!ret.id) {
          LizhiJSBridge.call("gotoLogin", function(ret) {});
          return;
        }
        LizhiJSBridge.call(
          "getToken",
          {
            needRefresh: "true"
          },
          function(tokenRet) {
            let token = tokenRet.token;
            axios({
              method:'get',
              url: `https://oauthbiz.lizhi.fm/mapi/getLizhiUserInfo?token=${token}`,
              headers: {
              }
            })
              // .get(
              //   `https://mkactivity.lizhifm.com/soundfestvote/fest/get_man_head_out?token=${token}`
              // )
              .then(resp => {
                console.log('获取用户信息',resp)
                if (resp.data.data) {
                  let userInfo = {
                    id: resp.data.data.lizhiUserId,
                    nickname: resp.data.data.nickName,
                    // headImg: resp.data.data.head,
                    headImg: resp.data.data.portrait
                  };
                  localStorage.removeItem("lzUser");
                  localStorage.setItem("lzUser", JSON.stringify(userInfo));
                  resolve(userInfo);
                }
              }).catch(err=>{
                console.log('获取lz用户信息失败',err)
              })
          }
        );
      });
    });
  });
};
