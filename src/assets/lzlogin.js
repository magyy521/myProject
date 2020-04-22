export const lzLogin = () => {
  console.log("登录事件开始进行");
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("lzUser")) {
      console.log(localStorage.getItem("lzUser"));
      resolve(localStorage.getItem("lzUser"));
      return;
    }
    console.log("登录ready");
    lz.ready(() => {
      console.log("登录ready事件");
      LizhiJSBridge.call("getSessionUser", {}, function(ret) {
        console.log("ret.id就是用户的id,ret.name就是用户名称", ret);
        if (!ret.id) {
          console.log("去登陆");
          LizhiJSBridge.call("gotoLogin", function(ret) {});
          return;
        }

        resolve(ret);
        localStorage.setItem("lzUser", JSON.stringify(ret));
      });
    });
  });
};
