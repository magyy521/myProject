export const lzLogin = () => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("lzUser")) {
      resolve(JSON.parse(localStorage.getItem("lzUser")));
      return;
    }
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
            axios
              .get(
                `//mkactivity.lizhifm.com/soundfestvote/fest/get_man_head_out?token=${token}`
              )
              .then(resp => {
                if (resp.data.rCode == 0) {
                  let userInfo = {
                    id: ret.id,
                    nickname: ret.name,
                    headImg: resp.data.data.head
                  };
                  console.log('userInfoqqqqq',userInfo)
                  localStorage.setItem("lzUser", JSON.stringify(userInfo));
                  resolve(userInfo);
                }
              });
          }
        );
      });
    });
  });
};

export const wechatWebOuth = (link) => {
  if (!UA.wx) {
    return false;
  }
  if (!link) {
    return false;
  }
  if (localStorage.getItem("userInfo")) {
    return "success";
  }
  if (!getQueryString("openid")) {
    localStorage.setItem("origin_url", location.href.split("?")[1]);
    location.replace(
      "//oauthbiz.lizhi.fm/weixin/wechatAuth2?tag=brand&redirectURL=" +
        encodeURIComponent(link)
    );
  } else {
    let default_params = localStorage.getItem("origin_url");
    let openid = getQueryString("openid");
    axios
      .get(`//oauthbiz.lizhi.fm/weixin/loadUser?tag=brand&openid=${openid}`)
      .then(resp => {
        localStorage.setItem("userInfo", JSON.stringify(resp.data.data));
        localStorage.removeItem("origin_url");
        location.replace(`${location.href.split("?")[0]}?${default_params}`);
      });
    return "redirect";
  }
};
