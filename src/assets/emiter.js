let Emiter = {
  calls: [],
  on(evt, fn) {
    let handle = { name: evt, fn: fn };
    console.log('加上事件',Emiter)
    Emiter.calls.push(handle);
  },
  destroy() {
    Emiter.calls = [];
  },
  emit(evt, data) {
    let args = [].slice.call(arguments, 1);
    let match = Emiter.calls.filter(v => v.name == evt);
    match.forEach(v => {
      v["fn"].apply(this, args);
    });
  },
  off(evt) {
    Emiter.calls = Emiter.calls.filter(v => v.name != evt);
  },
  once(evt, fn) {
    Emiter.on(
      evt,
      (data) => {
        Emiter.off(evt);
        fn && fn(data);
      }
    );
  }
}

export {Emiter}