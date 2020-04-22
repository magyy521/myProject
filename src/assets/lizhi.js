
let STATUS = {
    "recording": 0,
    "nothing": 1
}
let LizhiRecord = {
    startTime: 0,
    status: STATUS.nothing,
    ready: (cb) => {
        lz.ready(() => {
            console.log("lizhi sdk ready");
            cb && cb();
        });
    },
    start: () => {
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
    },
    upload: (uploadId, cb) => {
        let count = 0;
        let pullMp3 = () => {
            axios
                .get("//oauthbiz.lizhi.fm/checkAppTrans?upload_id=" + uploadId)
                .then(function (resp) {
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
    },
    stop: (upload, cb) => {
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
                    let duration = endTime - this.startTime;
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
document.addEventListener("LizhiJSBridgeReady", () => {
    window["LizhiJSBridge"] &&
        LizhiJSBridge.on("recordStateChange", ret => {
            et.emit("upload", ret.uploadId);
        });
});


export default { LizhiRecord }