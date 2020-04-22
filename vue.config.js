const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  lintOnSave: false,
  // publicPath: "//mkactivity.lizhifm.com/static/2019_12_car_vote/",
  publicPath: "./",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      // '/Openapi': {
      //   target: 'https://api.ftms.com.cn//Openapi', //对应自己的接口
      //   // target: 'https://homesite.ftms.devbmsoft.cn//Openapi', //对应自己的接口
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/Openapi': ''
      //   }
      // },
      "/Openapi": {
        target: "http://activity.qmlid.top/ftms", //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          "^/Openapi": ""
        }
      },
      "/qmlid": {
        target: "http://kfc.octlr.com", //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          "^/qmlid": ""
        }
      },

    }
  }
};
