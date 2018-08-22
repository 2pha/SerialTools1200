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

      this.formats = {
        'GE0XX00000R': {
          regex: ['[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[R]']
        },
        'GE0XX000000': {
          regex: ['[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]']
        },
        'XX0XX00000': {
          regex: ['[GE|NH]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '']
        },
        'XX0X00X000': {
          regex: ['[CG|AG|MJ|MU|DA]{2}', '[0-9]', '[(1-9)|(JKL)]', '[0-3]', '[0-9]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '']
        }
      };
    }

    _createClass(SerialTools1200, [{
      key: 'getFormat',
      value: function getFormat(string) {

        var length = string.length;
        if (length < 2) {
          return false;
        }

        // Use a for loop so can convert to PHP.
        for (var format in this.formats) {
          // Put it into an array, because php conversion does not work well with string cancatination.
          var regex = ['^'];
          for (var i = 0; i < length; i++) {
            // Access format object like an array so converts to php.
            if (i < this.formats[format]['regex'].length) {
              //regex = regex + this.formats[format]['regex'][i];
              regex.push(this.formats[format]['regex'][i]);
            }
          }
          regex.push('$');
          var regexString = regex.join('');
          if (string.toUpperCase().match(regexString)) {
            return format;
          }
        }

        /*
        this.formats.forEach((element, index) => {
          let regex = '';
          for (let i = 0; i < length; i++) {
            if (i < element.regex.length) {
              regex += element.regex[i];
            }
          }
          regex = '^' + regex + '$';
          if (string.toUpperCase().match(regex)) {
            return index;
          }
        });
        */

        /*
            for (const key in this.formats) {
              let regex = '';
              for (let i = 0; i < length; i++) {
                if (i < this.formats[key].regex.length) {
                  regex += this.formats[key].regex[i];
                }
              }
              regex = '^'+regex+'$';
              //console.log(regex);
              //console.log(serial.match(regex));
              if(serial.toUpperCase().match(regex)){
                return key;
              }
            }
        */
        return '';

        /*
        if (serial.match(/^(GE[0-9][a-z]{2}[0-9])+/i)) {
          return 'GE0XX';
        } else if (serial.match(/^([a-z]{2}[0-9][a-z]{2}[0-9])+/i)) {
          return 'XX0XX';
        } else if (serial.match(/^([a-z]{2}[0-9]{4}[a-z])+/i)) {
          return 'XX0000X';
        } else if (serial.match(/^([a-z]{2}[0-9][a-z][0-9]{2}[a-z])+/i)) {
          return 'XX0X00X';
        } else {
          return false;
        }
        */
      }
    }, {
      key: 'endsInNumerls',
      value: function endsInNumerls(string) {
        var format = this.getFormat(string);
        if (format) {
          var strlen = format.split('').length;
          var stringToTest = string.substr(strlen);
          if (!stringToTest.match(/[^0-9]+/)) {
            return true;
          }
        }
        return false;
      }
    }, {
      key: 'isValid',
      value: function isValid(string) {
        var format = this.getFormat(string);
        if (!this.endsInNumerls(string)) {
          return false;
        }
        switch (format) {
          case 'GE0XX':
            return true;
          case 'XX0XX':
            return true;
          case 'XX0000X':
            return true;
          case 'XX0X00X':
            return true;
        }
        return false;
        // if(this._isNewSerialFormat(serial)){
        //   // New serial format.
        //   return this._isValidNew(serial);
        // }else{
        //   // Old serial format.
        //   return this._isValidOld(serial);
        // }
      }

      // _isValidNew(serial) {
      //   let s = serial.toLowerCase();
      //   return true;
      // }

      // _isValidOld(serial) {
      //   let s = serial.toLowerCase();
      //   return true;
      // }

      // _isNewSerialFormat(serial) {
      //   return serial.toLowerCase().substr(0,2) === 'ge';
      // }

    }]);

    return SerialTools1200;
  }();
});