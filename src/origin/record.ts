// import ChormeVoice from "./chrome";
import WechatVoice from "./wechat";
import LizhiVoice from "./lizhi";

interface AdaptRecord {
  start(cb: any): void;
  stop(upload: boolean, cb: any): void;
  ready(cb: any): void;
}
class Record {
  private coreIns: AdaptRecord;
  private timer: any = null;
  private list: Map<string, AdaptRecord> = new Map();
  setEngine(key) {
    this.coreIns = this.list.get(key);
  }
  register(key: string, instant: any) {
    this.list.set(key, instant);
  }

  start(cb, progressCb = null) {
    this.coreIns.ready(err => {
      if (err) {
        cb(err, null);
        return;
      }
      this.coreIns.start((err2, data) => {
        if (err2) {
          return cb(err2);
        }
        cb && cb(null, data);
        let count = 0;
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => {
          ++count;
          progressCb && progressCb(count * 500);
        }, 500);
      });
    });
  }
  stop(upload, cb) {
    this.timer && clearInterval(this.timer);
    this.coreIns.stop(upload, cb);
  }
}

let ins = new Record();
// ins.register("wechat", new WechatVoice());
ins.register("lizhi", new LizhiVoice());
// ins.register("chrome", new ChormeVoice());

export default function NewRecord(type = "wechat") {
  console.log(type);
  ins.setEngine(type);
  return ins;
}
