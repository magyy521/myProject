interface Handle {
  (data?: any): void;
}

interface Quen {
  fn: Handle;
  name: string;
}

class Emiter {
  private calls: Quen[] = [];
  constructor() {}
  on(evt: string, fn: Handle) {
    let handle: Quen = { name: evt, fn: fn };
    this.calls.push(handle);
  }
  destroy() {
    this.calls = [];
  }
  emit(evt: string, data?: any) {
    let args = [].slice.call(arguments, 1);
    let match = this.calls.filter(v => v.name == evt);
    match.forEach(v => {
      v["fn"].apply(this, args);
    });
  }
  off(evt: string) {
    this.calls = this.calls.filter(v => v.name != evt);
  }
  once(evt: string, fn: any) {
    this.on(
      evt,
      (data: any): void => {
        this.off(evt);
        fn && fn(data);
      }
    );
  }
}
export default Emiter;
