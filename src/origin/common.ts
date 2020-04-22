export const setRaf = () => {
  if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
};

export const loadAsyncPlugin = (url: string, id: string) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    let pluginScript = document.createElement("script");
    pluginScript.setAttribute("id", id);
    pluginScript.onload = function(e: any) {
      if (
        !this["readyState"] ||
        this["readyState"] == "complete" ||
        this["readyState"] == "loaded"
      ) {
        resolve(e);
      }
    };
    pluginScript.onerror = function(e) {
      reject(e);
    };

    pluginScript.src = url;
    document
      .getElementsByTagName("script")[0]
      .parentNode.appendChild(pluginScript);
  });
};
interface ScriptMap {
  id: string;
  path: string;
  isLoad?: boolean;
}

export const Raf = cb => {
  let animate = () => {
    cb && cb();
    requestAnimationFrame(animate);
  };
  console.log("requestAnimationFrame start");
  let reqIns = requestAnimationFrame(animate);
  return () => {
    console.log("requestAnimationFrame cancel");
    cancelAnimationFrame(reqIns);
  };
};

export const loadScript = async (scriptArr: Array<ScriptMap>): Promise<any> => {
  if (scriptArr.length == 0) {
    return Promise.resolve();
  }

  scriptArr = scriptArr.filter(v => v.isLoad);
  let promiseList = [];
  let load = (id, path) => {
    return new Promise(resolve => {
      if (document.getElementById(id)) {
        resolve(id);
        return;
      }
      let scriptTag = document.createElement("script");
      scriptTag.setAttribute("id", id);
      scriptTag.onload = function(e: any) {
        resolve(e);
      };
      scriptTag.src = path;
      document
        .getElementsByTagName("script")[0]
        .parentNode.appendChild(scriptTag);
    });
  };
  for (let item of scriptArr) {
    promiseList.push(load(item.id, item.path));
  }
  await Promise.all(promiseList);
  return;
};

export const LazyImg = () => {
  let handleScroller = () => {
    let imgs = document.querySelectorAll("img[data-lazy]");
    var scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    var winTop = window.innerHeight;

    console.log("imgs");
    console.log(imgs);

    for (let i = 0; i < imgs.length; i++) {
      let img = imgs[i] as HTMLImageElement;
      if (img.getBoundingClientRect().top < scrollTop + winTop) {
        img.src = img.getAttribute("data-lazy");
        img.removeAttribute("data-lazy");
        console.log(img.classList.remove("lazy"));
      } else {
        img.classList.add("lazy");
      }
    }
  };

  setTimeout(() => {
    handleScroller();
  }, 1002);
  window.addEventListener("scroll", handleScroller, false);
  return () => {
    window.removeEventListener("scroll", handleScroller, false);
  };
};

export const toTop = (): void => {
  (function smoothscroll() {
    var currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - currentScroll / 5);
    }
  })();
};

let ua = window.navigator.userAgent.toLowerCase();
export const UA = {
  iPhone: !!ua.match("iphone") || !!ua.match("ipad"),
  iPod: !!ua.match("ipod"),
  iPad: !!ua.match("ipad"),
  android: ua.indexOf("android") > -1 || ua.indexOf("linux") > -1,
  wx: /micromessenger/i.test(ua),
  qq: /qq/i.test(ua),
  uc: !!ua.match(/ucbrowser/i),
  lz: /lizhifm/i.test(ua),
  qqBrowser: ua.indexOf("mqqbrowser") > -1,
  quarkBrowser: ua.indexOf("quark") > -1,
  ie: ua.indexOf("trident") > -1,
  webview: "",
  weibo: ua.indexOf("weibo") > -1
};
// 时间戳转持续时间
export const adaptToTime = (time): string => {
  let min = Math.floor(time / 60);
  let second = time % 60;
  let min2: string = min > 9 ? min + "" : "0" + min;
  let second2: string = second > 9 ? second + "" : "0" + second;
  return `${min2}'${second2}''`;
};

//数字转换
export const adaptToNum = num => {
  if (num > 9999) {
    return (num / 10000).toFixed(1) + "万";
  } else {
    return num;
  }
};
// cdn图片裁剪
export const changeImageSize: (url: string, size: string) => string = (
  url: string,
  size: string
): string => {
  let index = url.lastIndexOf(".");
  size = size.replace("_", "x");
  return url.slice(0, index) + "_" + size + url.slice(index);
};

// 获取参数
export const getQueryString = (name: string) => {
  // console.log(location);
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

// 格式化post请求参数
export const formatPostData = data => {
  return Object.keys(data)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    })
    .join("&");
};
export const HmtStore = (page: string, label: string): void => {
  console.log("_hmt", [page, label]);
  if ("_hmt" in window) {
    _hmt.push(["_trackEvent", page, UA.iPhone ? "iphone" : "andriod", label]);
    _hmt.push(["_trackEvent", page, "全部", label]);
  }
};

export const shuffle = v => {
  for (
    var j, x, i = v.length;
    i;
    j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x
  );
  return v;
};
