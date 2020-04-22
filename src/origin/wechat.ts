import { changeMediaToMp3 } from "./upload";
import Emiter from "../emiter";
enum STATUS {
  "recording" = 0,
  "nothing" = 1
}

interface AdaptRecord {
  start(cb: any): void;
  stop(upload: boolean, cb: any): void;
  ready(cb: any): void;
}
class WechatVoice extends Emiter implements AdaptRecord {
  private startTime: number = 0;
  private status: number = STATUS.nothing;

  ready(cb) {
    wx.ready(cb);
  }
  start(cb: any) {
    if (this.status == STATUS.recording) {
      cb("正在录音中", null);
      return;
    }
    wx.startRecord({
      success: () => {
        this.status = STATUS.recording;
        this.startTime = new Date().valueOf();
        cb(null, "start");
      },
      cancel: () => {
        this.status = STATUS.nothing;
        cb && cb("user reject record", null);
      }
    });
  }

  stop(upload, cb: any) {
    let that = this;
    if (this.status == STATUS.nothing) {
      cb("尚未开始录音", null);
      return;
    }
    let endTime = new Date().valueOf();
    let duration: number = endTime - this.startTime;
    if (duration < 500 || !upload) {
      this.status = STATUS.nothing;
      wx.stopRecord();
      cb("录音时间太短", null);
      return;
    }
    wx.stopRecord({
      success: function(res: any) {
        that.status = STATUS.nothing;
        that.upLocalIdToMediaId(res.localId, (err, data) => {
          if (err) {
            cb(err, null);
            return;
          }
          changeMediaToMp3(data)
            .then((mp3Link: string) => {
              cb(null, mp3Link);
            })
            .catch(err => {
              cb(err, null);
            });
        });
      },
      fail: function(res) {
        cb(res, null);
      }
    });
  }
  upLocalIdToMediaId(localId: string | any, cb: any) {
    wx.uploadVoice({
      localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 0, // 默认为1，显示进度提示
      success: function(res) {
        cb(null, res.serverId);
      },
      fail: function() {
        cb("timeout");
      }
    });
  }
}

export default WechatVoice;
