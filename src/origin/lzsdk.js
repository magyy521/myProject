(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.lz = factory());
}(this, (function () { 'use strict';

var ua = window.navigator.userAgent;
var bridge = window.LizhiJSBridge;

var state$1 = {
  bridge: bridge,
  isApp: !!(ua.indexOf('LizhiFM') >= 0 || bridge)
};

function update$1(key, val) {
  state$1[key] = val;
}

var store = {
  state: state$1, update: update$1
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var handlerMap = {};
var id = 0;

var Bus = function () {
  function Bus() {
    classCallCheck(this, Bus);
  }

  createClass(Bus, [{
    key: "on",
    value: function on(type, handler) {
      if (!(type in handlerMap)) {
        handlerMap[type] = {};
      }

      handlerMap[type][++id] = handler;

      return id;
    }
  }, {
    key: "off",
    value: function off(type, id) {
      if (type in handlerMap && id in handlerMap[type]) {
        delete handlerMap[type][id];
      }
    }
  }, {
    key: "emit",
    value: function emit(type) {
      if (type in handlerMap) {
        var handlers = handlerMap[type];

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        for (var key in handlers) {
          handlers[key].apply(null, args);
        }
      }
    }
  }, {
    key: "once",
    value: function once(type, handler) {
      var on = this.on,
          off = this.off;

      var id = on(type, function (ret) {
        handler(ret);
        off(type, id);
      });

      return id;
    }
  }]);
  return Bus;
}();

var safeApi = function safeApi(lz) {
  return function (call) {
    return function (api, args, cb) {
      if (lz.isApp) {
        call(api, args, cb);
      }
    };
  };
};

var apiDebugger = function apiDebugger(lz) {
  return function (call) {
    return function (api, args, cb) {
      call(api, args, function (ret) {
        if (lz.option.debug) {
          lz.alt({
            api: api, ret: ret
          });
        }

        cb(ret);
      });
    };
  };
};

var eventDebugger = function eventDebugger(lz) {
  return function (on) {
    return function (event, cb) {
      on(event, function (ret) {
        if (lz.option.debug) {
          lz.alt({
            event: event, ret: ret
          });
        }

        cb(ret);
      });
    };
  };
};

var promisify = function promisify(lz) {
  return function (call) {
    return function (api, args, cb) {
      if (cb) {
        return call(api, args, cb);
      }

      return new Promise(function (res, rej) {
        call(api, args, function (ret) {
          return res(ret);
        });
      });
    };
  };
};

function applyApiMiddleware(lz, call, middlewares) {
  var next = call;

  middlewares.map(function (mw) {
    next = mw(lz)(next);
  });

  return next;
}

function applyEventMiddleware(lz, on, middlewares) {
  var next = on;

  middlewares.map(function (mw) {
    next = mw(lz)(next);
  });

  return next;
}

var state = store.state;
var update = store.update;


var proxy = {
  call: function call(api, args, cb) {
    state.bridge.call(api, args, cb);
  },
  on: function on(event, cb) {
    state.bridge.on(event, cb);
  }
};

var Lz = function (_Bus) {
  inherits(Lz, _Bus);

  function Lz() {
    classCallCheck(this, Lz);

    var _this = possibleConstructorReturn(this, (Lz.__proto__ || Object.getPrototypeOf(Lz)).call(this));

    _this.isReady = false;
    _this.isApp = store.state.isApp;

    return _this;
  }

  createClass(Lz, [{
    key: 'config',
    value: function config(_ref) {
      var _ref$debug = _ref.debug,
          debug = _ref$debug === undefined ? false : _ref$debug,
          _ref$url = _ref.url,
          url = _ref$url === undefined ? '' : _ref$url,
          _ref$apiList = _ref.apiList,
          apiList = _ref$apiList === undefined ? [] : _ref$apiList,
          _ref$eventList = _ref.eventList,
          eventList = _ref$eventList === undefined ? [] : _ref$eventList,
          _ref$apiMiddlewares = _ref.apiMiddlewares,
          apiMiddlewares = _ref$apiMiddlewares === undefined ? [] : _ref$apiMiddlewares,
          _ref$eventMiddlewares = _ref.eventMiddlewares,
          eventMiddlewares = _ref$eventMiddlewares === undefined ? [] : _ref$eventMiddlewares,
          _ref$other = _ref.other,
          other = _ref$other === undefined ? {} : _ref$other;

      var _t = this;

      _t.option = {
        debug: debug, url: url,
        apiList: apiList, eventList: eventList,
        apiMiddlewares: apiMiddlewares, eventMiddlewares: eventMiddlewares,
        other: other
      };

      if (url) {
        ![false].concat(eventList).reduce(function (a, b) {
          return a || b === 'verifySignFinish';
        }) && eventList.push('verifySignFinish');
      }

      var apiMiddlewaresF = [safeApi, apiDebugger].concat(apiMiddlewares, [promisify]);

      var eventMiddlewaresF = [eventDebugger].concat(eventMiddlewares);

      proxy.call = applyApiMiddleware(_t, proxy.call, apiMiddlewaresF);
      proxy.on = applyEventMiddleware(_t, proxy.on, eventMiddlewaresF);

      apiList.map(function (api) {
        _t[api] = function (args, cb) {
          return proxy.call(api, args, cb);
        };
      });
      _init.call(_t);
    }
  }, {
    key: 'ready',
    value: function ready(cb) {
      var _t = this;

      if (_t.isReady) {
        cb();
      } else {
        _t.on('ready', function () {
          cb();
        });
      }
    }
  }, {
    key: 'alt',
    value: function alt(json) {
      window.alert(JSON.stringify(json));
    }
  }, {
    key: 'log',
    value: function log() {
      var _state$bridge;

      state.isApp && state.bridge && (_state$bridge = state.bridge).log.apply(_state$bridge, arguments);
    }
  }]);
  return Lz;
}(Bus);

function _ajax() {
  var _window$_LIZHIJS;

  return (_window$_LIZHIJS = window._LIZHIJS).ajax.apply(_window$_LIZHIJS, arguments);
}

function _init() {
  var _t = this;

  if (state.bridge) {
    _onBridgeReady.call(_t);
  } else {
    document.addEventListener('LizhiJSBridgeReady', function () {
      update('bridge', window.LizhiJSBridge);
      _onBridgeReady.call(_t);
    }, false);
  }
}

function _onBridgeReady() {
  var _t = this;
  var _t$option = _t.option,
      url = _t$option.url,
      eventList = _t$option.eventList;


  _t.emit('bridge:ready', state.bridge);

  eventList.map(function (event) {
    proxy.on(event, function (ret) {
      _t.emit(event, ret);
    });
  });

  if (url) {
    _sign.call(_t, url, function (ret) {
      _t.isReady = true;
      _t.emit('signed', ret);
      _t.emit('ready');
    });
  } else {
    _t.isReady = true;
    _t.emit('ready');
  }
}

function _sign(url, done) {
  var _t = this;
  var rets = [];

  proxy.call('getUdid', {}, function (r1) {
    rets.push(r1);

    if (r1.status === 'success') {
      var udid = r1.udid;

      _t.emit('sign', {
        status: 'success',
        data: {
          step: 'getUdid',
          ret: r1,
          rets: rets
        },
        msg: 'success'
      });

      _ajax({
        url: url,
        data: {
          udid: udid
        },
        dataType: 'json',
        success: function success(r2) {
          rets.push(r2);

          if (r2.rCode === 0) {
            _t.emit('sign', {
              status: 'success',
              data: {
                step: 'getSign',
                ret: r2,
                rets: rets
              },
              msg: 'success'
            });

            proxy.call('requestVerifySign', r2.data, function (r3) {
              rets.push(r3);

              if (r3.status === 'success') {
                _t.emit('sign', {
                  status: 'success',
                  data: {
                    step: 'requestVerifySign',
                    ret: r3,
                    rets: rets
                  },
                  msg: 'success'
                });

                _t.once('verifySignFinish', function (r4) {
                  rets.push(r4);

                  if (r4.status === 'success') {
                    _t.emit('sign', {
                      status: 'success',
                      data: {
                        step: 'verifySignFinish',
                        ret: r4,
                        rets: rets
                      },
                      msg: 'success'
                    });

                    done(rets);
                  } else {
                    _t.emit('sign', {
                      status: 'failed',
                      data: {
                        step: 'verifySignFinish',
                        ret: r4,
                        rets: rets
                      },
                      msg: 'failed'
                    });
                  }
                });
              } else {
                _t.emit('sign', {
                  status: 'failed',
                  data: {
                    step: 'requestVerifySign',
                    ret: r3,
                    rets: rets
                  },
                  msg: 'failed'
                });
              }
            });
          } else {
            _t.emit('sign', {
              status: 'failed',
              data: {
                step: 'getSign',
                ret: r2,
                rets: rets
              },
              msg: 'failed'
            });
          }
        },
        error: function error(r2) {
          rets.push(r2);

          _t.emit('sign', {
            status: 'failed',
            data: {
              step: 'getSign',
              ret: r2,
              rets: rets
            },
            msg: 'failed'
          });
        }
      });
    } else {
      _t.emit('sign', {
        status: 'failed',
        data: {
          step: 'getUdid',
          ret: r1,
          rets: rets
        },
        msg: 'failed'
      });
    }
  });
}

var index = new Lz();

return index;

})));
//# sourceMappingURL=index.js.map
