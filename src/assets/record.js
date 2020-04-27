// import WechatVoice from "./wechat";
// import LizhiVoice from "./lizhi";
// const WechatVoice = require('./wechat');
const {
  changeMediaToMp3
} = require('./changeMediaToMp3')
const axios = require('axios')

const et = require('./emiter').Emiter


let STATUS = {
  "recording": 0,
  "nothing": 1
}

let WechatVoice = {
  startTime: 0,
  status: STATUS.nothing,
  ready: (cb) => {
    console.log('wx录音已经开始掉ready方法')
    wx.ready(cb);
  },
  start: (cb) => {
    if (WechatVoice.status == STATUS.recording) {
      cb("正在录音中", null);
      return;
    }
    console.log('wx录音点击了start,开始寻求用户录音权限')
    wx.startRecord({
      success: () => {
        WechatVoice.status = STATUS.recording;
        WechatVoice.startTime = new Date().valueOf();
        console.log('微信获取到用户录音权限')
        cb(null, "start");
      },
      cancel: () => {
        WechatVoice.status = STATUS.nothing;
        console.log('weixin用户拒绝录音')
        cb && cb("用户拒绝录音", null);
      },
      complete:(res)=>{
        console.log('掉起微信录音',res)
      }
    });
  },
  stop(upload, cb) {
    let that = this;
    console.log('微信点击停止录音')
    if (WechatVoice.status == STATUS.nothing) {
      console.log('尚未开始录音?????')
      cb("尚未开始录音", null);
      return;
    }
    console.log('微信点击停止录音,继续下面的')
    let endTime = new Date().valueOf();
    let duration = endTime - WechatVoice.startTime;
    if (duration < 500 || !upload) {
      WechatVoice.status = STATUS.nothing;
      wx.stopRecord();
      cb("录音时间太短", null);
      return;
    }
    console.log('微信停止录音,调用wx.stopRecord')
    wx.stopRecord({
      success: function (res) {
        that.status = STATUS.nothing;
        console.log('微信停止录音成功,开始转换音频',res)
        that.upLocalIdToMediaId(res.localId, (err, data) => {
          if (err) {
            cb(err, null);
            return;
          }
          console.log('微信将录音转换为MP3',data)
          changeMediaToMp3(data)
            .then((mp3Link) => {
              console.log('微信将录音转换为MP3成功,结果是',mp3Link)
              cb(null, mp3Link);
            })
            .catch(err => {
              console.log('微信将录音转换为MP3失败了',err)
              cb(err, null);
            });
        });
      },
      fail: function (res) {
        console.log('微信停止录音失败',res)
        cb(res, null);
      }
    });
  },
  upLocalIdToMediaId(localId, cb) {
    console.log('upLocalIdToMediaId,然后调取wx.uploadVoice,localId是本地id',localId)
    
    wx.uploadVoice({
      localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 0, // 默认为1，显示进度提示
      success: function (res) {
        console.log('wx.uploadVoice成功了',res.serverId)
        cb(null, res.serverId);
      },
      fail: function () {
        console.log('超时了')
        cb("timeout");
      }
    });
  }
}

document.addEventListener("LizhiJSBridgeReady", () => {
  console.log('添加LizhiJSBridgeReady事件,这里是handler')
  window["LizhiJSBridge"] &&
    LizhiJSBridge.on("recordStateChange", ret => {
      console.log('recordStateChange事件,得到结果',ret)
      if (ret.uploadId) {
        et.emit("upload", ret.uploadId);
      }
    });
});


let LizhiVoice = {
  startTime: 0,
  status: STATUS.nothing,
  ready: (cb) => {
    console.log('lz,voice的ready事件')
    lz.ready(() => {
      console.log('lz,voice的ready事件,返回回调')
      cb && cb();
    });
  },
  start: (cb) => {
    console.log('荔枝录音点击了start')
    if (LizhiVoice.status == STATUS.recording) {
      cb("正在录音中", null);
      return;
    }
    window["LizhiJSBridge"] &&
      LizhiJSBridge.call(
        "startRecordVoice", {
          type: 2
        },
        ret => {
          console.log('window["LizhiJSBridge"]调取了startRecordVoice')
          LizhiVoice.status = STATUS.recording;
          LizhiVoice.startTime = new Date().valueOf();
          console.log('lz回调start事件')
          cb(null, "start");
        }
      );
  },
  upload: (uploadId, cb) => {
    console.log('lz录音调取上传事件')
    let count = 0;
    let pullMp3 = () => {
      // .get("//oauthbiz.lizhi.fm/checkAppTrans?upload_id=" + uploadId)
      // .get("//www.qmlid.top/oauthbiz/checkAppTrans?upload_id=" + uploadId)
      axios
        .get("//oauthbiz.lizhi.fm/checkAppTrans?upload_id=" + uploadId)
        .then(function (resp) {
          console.log('lz录音调取上传,结果',resp)
          if (count > 5) {
            cb && cb("上传失败", resp.data.msg);
            return;
          }
          if (resp.data.status != 0) {
            count++;
            setTimeout(() => {
              pullMp3();
            }, 500);
          } else {
            cb && cb(null, resp.data.data.highBand);
          }
        }).catch(err=>{
          console.log('lz录音调取上传,走到了catch',err)
          cb && cb(err);
        });
    };
    pullMp3();
  },
  stop: (upload, cb) => {
    console.log('lz点击了stop录音')
    if (LizhiVoice.status == STATUS.nothing) {
      cb("尚未开始录音", null);
      return;
    }
    console.log('荔枝window有没有挂载')
    window["LizhiJSBridge"] &&
      LizhiJSBridge.call(
        "stopRecordVoice", {
          isNeedUpload: upload //是否上传录音
        },
        ret => {
          console.log('lz点击了stop录音,结束成功了')
          let endTime = new Date().valueOf();
          let duration = endTime - LizhiVoice.startTime;
          if (duration < 500 || !upload) {
            LizhiVoice.status = STATUS.nothing;
            cb("录音时间太短", null);
            return;
          }
          LizhiVoice.status = STATUS.nothing;
          console.log('lzstop录音,开始上传')
          et.on("upload", vid => {
            LizhiVoice.upload(vid, (err, data) => {
              console.log('荔枝上传失败了??',err,data)
              if (err) {
                cb(err, null);
                return;
              }
              cb(null, data);
            });
            et.off("upload");
          });
        }
      );
  }
}






let Record = {
  coreIns: null,
  timer: null,
  list: {},
  setEngine: (key) => {
    Record.coreIns = Record.list[key];
  },
  register: (key, instant) => {
    Record.list[key] = instant;
  },
  start: (cb, progressCb = null) => {
    console.log('没有调起来为什么',Record.coreIns)
    Record.coreIns.ready(err => {
      console.log('封装的Record,ready',err)
      if (err) {
        cb(err, null);
        return;
      }
      console.log('封装的Record,已经ready')
      Record.coreIns.start((err2, data) => {
        console.log('封装的Record,start',err2,data)
        if (err2) {
          return cb(err2);

        }
        cb && cb(null, data);
        let count = 0;
        Record.timer && clearInterval(Record.timer);
        Record.timer = setInterval(() => {
          ++count;
          progressCb && progressCb(count * 500);
        }, 500);
      });
    });
    Record.coreIns.start((err2, data) => {
      console.log('封装的Record,start',err2,data)
      if (err2) {
        return cb(err2);

      }
      cb && cb(null, data);
      let count = 0;
      Record.timer && clearInterval(Record.timer);
      Record.timer = setInterval(() => {
        ++count;
        progressCb && progressCb(count * 500);
      }, 500);
    });
  },
  stop: (upload, cb) => {
    console.log('封装的Record, stop',upload)
    Record.timer && clearInterval(Record.timer);
    Record.coreIns.stop(upload, cb);
  }
}
Record.register('wechat', WechatVoice)

Record.register('lizhi', LizhiVoice)
export default function (type = 'wechat') {
  Record.setEngine(type);

  return Record
}