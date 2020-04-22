import axios from "axios";
import Emiter from "./emiter";
interface AdaptRecord {
  start(cb: any): void;
  stop(upload: boolean, cb: any): void;
  ready(cb: any): void;
}
enum STATUS {
  "recording" = 0,
  "nothing" = 1
}

let et = new Emiter();
document.addEventListener("LizhiJSBridgeReady", () => {
  window["LizhiJSBridge"] &&
    LizhiJSBridge.on("recordStateChange", ret => {
      et.emit("upload", ret.uploadId);
    });
});
class LizhiRecord implements AdaptRecord {
  private startTime: number = 0;
  private status: number = STATUS.nothing;

  ready(cb) {
    lz.ready(() => {
      console.log("lizhi sdk ready");
      cb && cb();
    });
  }
  start(cb: any) {
    if (this.status == STATUS.recording) {
      cb("正在录音中", null);
      return;
    }

    window["LizhiJSBridge"] &&
      LizhiJSBridge.call(
        "startRecordVoice",
        {
          type: 2
        },
        ret => {
          console.log("lizhirecord", ret);
          this.status = STATUS.recording;
          this.startTime = new Date().valueOf();
          cb(null, "start");
        }
      );
  }

  upload(uploadId, cb) {
    let count = 0;
    let pullMp3 = () => {
      axios
        .get("//oauthbiz.lizhi.fm/checkAppTrans?upload_id=" + uploadId)
        .then(function(resp) {
          if (count > 5) {
            cb && cb("upload failed", resp.data.msg);
            return;
          }
          if (resp.data.status != 0) {
            count++;
            setTimeout(() => {
              pullMp3();
            }, 500);
          } else {
            console.log(resp.data.data.highBand);
            cb && cb(null, resp.data.data.highBand);
          }
        });
    };
    pullMp3();
  }
  stop(upload: boolean, cb: any) {
    if (this.status == STATUS.nothing) {
      cb("尚未开始录音", null);
      return;
    }

    window["LizhiJSBridge"] &&
      LizhiJSBridge.call(
        "stopRecordVoice",
        {
          isNeedUpload: upload //是否上传录音
        },
        ret => {
          console.log("lizhi stopRecordVoice", ret);
          let endTime = new Date().valueOf();
          let duration: number = endTime - this.startTime;
          if (duration < 500 || !upload) {
            this.status = STATUS.nothing;
            cb("录音时间太短", null);
            return;
          }
          this.status = STATUS.nothing;
          et.on("upload", vid => {
            this.upload(vid, (err, data) => {
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

export default LizhiRecord;
