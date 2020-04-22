import { h, Component } from "preact";
import { connect, ConnectOptions } from "preact-redux";

import NewReord from "./record"; //这个才是真正需要的record
import { UA } from "./common"; //这个是配置环境之类的
// import Tip from "@/component/tip"; //这个是提示框之类的

interface IProps extends ConnectOptions {
  chosedNum: any;
  dispatch: any;
}

enum STATUS {
  "defalut" = 0,
  "recording" = 1,
  "end" = 2,
  "upload" = 3
}

const DURATION = 25;

class Record extends Component<IProps, any> {
  private vrp: any = null;
  constructor(props) {
    super(props);
  }
  state = {
    status: STATUS.defalut,
    count: 0
  };
  private timer: any = null;

  componentDidMount() {
    let type = UA.lz ? "lizhi" : UA.wx ? "wechat" : "chrome";
    this.vrp = NewReord(type);
  }
  startRecord = () => {
    this.vrp.start(
      (err, data) => {
        if (err) {
          return Tip.success(err, 2000);
        }
        console.log(data);
        this.setState({
          status: STATUS.recording
        });
      },
      progress => {
        console.log("progress", progress);
        if (progress / 1000 > 5) {
          this.endRecord();
        }
        this.setState({
          count: progress
        });
      }
    );
  };
  endRecord = () => {
    this.setState({
      status: STATUS.end,
      count: "end"
    });

    this.vrp.stop(true, (err, data) => {
      if (err) {
        return Tip.success(err, 2000);
      }
      console.log(data);
    });
  };
  render({}, { status, count }) {
    return (
      <div>
        <h3> {status}</h3>
        <h3> {count}</h3>
        <button onClick={this.startRecord}>开始录音</button>
        <button onClick={this.endRecord}>结束录音</button>
      </div>
    );
  }
}
export default connect(state => {
  return {
    chosedNum: state.app.chosedNum
  };
})(Record);
