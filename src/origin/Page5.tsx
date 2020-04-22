import * as React from 'react';
import NewReord from "./record"; //这个才是真正需要的record




enum STATUS {
  "defalut" = 0,
  "recording" = 1,
  "end" = 2,
  "upload" = 3
}

class Page5 extends React.Component {
  private vrp: any = null;
  // constructor() {
  //   super();
  //   // this.state = {isToggleOn: true};

  //   // 为了在回调中使用 `this`，这个绑定是必不可少的
  //   this.click = this.click.bind(this);
  // }
  private timer: any = null;
  componentDidMount() {
    // let type = UA.lz ? "lizhi" : UA.wx ? "wechat" : "chrome";
    let type =  "lizhi" ;
    this.vrp = NewReord(type);
  }
  startRecord = () => {
    this.vrp.start(
      (err, data) => {
        if (err) {
          console.log(err,data)
          // return Tip.success(err, 2000);
        }
        console.log(data);
        // this.setState({
        //   status: STATUS.recording
        // });
      },
      progress => {
        console.log("progress", progress);
        // if (progress / 1000 > 5) {
        //   this.endRecord();
        // }
        // this.setState({
        //   count: progress
        // });
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
        // return Tip.success(err, 2000);
      }
      console.log(data);
    });
  };
  render({}, { status, count }) {
    return (
      <div className="Page5">
        <p>hhh</p>
        <h3> {status}</h3>
        <h3> {count}</h3>
        <button onClick={this.startRecord}>开始录音</button>
        <button onClick={this.endRecord}>结束录音</button>
      </div>
    );
  }
}

export default Page5;