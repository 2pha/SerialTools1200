(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.SerialTools1200 = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var SerialTools1200 = exports.SerialTools1200 = function () {
    function SerialTools1200() {
      _classCallCheck(this, SerialTools1200);

      this.mks = {
        mk2: {
          start_year: 1979,
          end_year: 2010
        },
        mk3: {
          start_year: 1989,
          end_year: 1998
        },
        mk4: {
          start_year: 1996,
          end_year: 2005
        },
        mk3d: {
          start_year: 1997,
          end_year: 2002
        },
        m3d: {
          start_year: 1997,
          end_year: 2002
        },
        ltd: {
          start_year: 1995,
          end_year: 2002
        },
        mk5: {
          start_year: 2002,
          end_year: 2010
        },
        mk5g: {
          start_year: 2002,
          end_year: 2010
        },
        m5g: {
          start_year: 2002,
          end_year: 2010
        },
        gld: {
          start_year: 2004,
          end_year: 2004
        },
        mk6: {
          start_year: 2007,
          end_year: 2010
        },
        gae: {
          start_year: 2016,
          end_year: 0
        },
        g: {
          start_year: 2016,
          end_year: 0
        },
        gl: {
          start_year: 2017,
          end_year: 0
        }
      };

      this.monthMap = {
        '1': 1,
        A: 1,
        '2': 2,
        B: 2,
        '3': 3,
        C: 3,
        '4': 4,
        D: 4,
        '5': 5,
        E: 5,
        '6': 6,
        F: 6,
        '7': 7,
        G: 7,
        '8': 8,
        H: 8,
        S: 8,
        '9': 9,
        I: 9,
        J: 10,
        K: 11,
        L: 12
      };

      this.formats = {
        GE0XX00000R: {
          regex: ['[GE]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[R]'],
          maxlength: 11
        },
        GE0XX000000: {
          regex: ['[GE]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'],
          maxlength: 11
        },
        XX0XX00000: {
          regex: ['[GE|NH]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'],
          maxlength: 10
        },
        XX0X00X000: {
          regex: ['[CG|AG|MJ|MU|DA]{2}', '[0-9]', '[(1-9)|(JKLS)]', '[0-3]', // maybe these should be (0[1-9]|[12]\d|3[01])
          '[0-9]', //
          '[A-Z]', '[0-9]', '[0-9]', '[0-9]'],
          maxlength: 10
        },
        LA0XX000000: {
          regex: ['[LA]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'],
          maxlength: 11
        }
      };
    }

    _createClass(SerialTools1200, [{
      key: 'getFormat',
      value: function getFormat(string) {
        var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var length = string.length;
        if (length < 2) {
          return false;
        }

        // Use a for loop so can convert to PHP.
        for (var format in this.formats) {
          var skip = false;
          if (length > this.formats[format]['maxlength']) {
            skip = true;
          }

          if (!skip) {
            var addCount = 0;
            if (full) {
              addCount = this.formats[format]['regex'].length;
            } else {
              string.length - 1;
            }

            // Put it into an array, because php conversion does not work well with string cancatination.
            var regex = ['^'];
            //for(let i = 0; i < length; i++) {
            for (var i = 0; i < addCount; i++) {
              // Access format object like an array so converts to php.
              regex.push(this.formats[format]['regex'][i]);
            }

            if (full) {
              regex.push('$');
            }
            var regexString = regex.join('');

            if (string.toUpperCase().match(regexString)) {
              return format;
            }
          }
        }

        return false;
      }
    }, {
      key: 'isValid',
      value: function isValid(string) {
        var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (this.getFormat(string, full)) {
          return true;
        }
        return false;
      }
    }, {
      key: 'getDateData',
      value: function getDateData(serial) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var mk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var val = {
          day: 0,
          month: 0,
          years: []
        };

        format = format ? format : this.getFormat(serial);

        if (format) {
          if (format == 'XX0X00X000') {
            // get the day.
            var dayval = serial.substr(4, 2);
            var daynum = parseInt(dayval);
            if (daynum > 0 && daynum <= 31) {
              val['day'] = parseInt(dayval);
            }
          }
          // month.

          val['month'] = this.monthMap[serial.substr(3, 1)];

          // years.
          var yearval = serial.substr(2, 1);
          yearval = parseInt(yearval);

          var startyear = 1979;
          if (yearval < 9) {
            startyear = startyear + (yearval + 1);
          }

          for (var i = startyear; i < 2018; i += 10) {
            if (mk) {
              if (i >= this.mks[mk]['start_year'] && i <= this.mks[mk]['end_year']) {
                val['years'].push(i);
              }
            } else {
              val['years'].push(i);
            }
          }
        }
        return val;
      }
    }]);

    return SerialTools1200;
  }();
});