(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SerialTools1200 = factory());
}(this, (function () { 'use strict';

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

  //@ts-check

  var _class = function () {
    function _class() {
      classCallCheck(this, _class);
    }

    createClass(_class, [{
      key: 'getFormat',
      value: function getFormat(serial) {
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
      }
    }, {
      key: 'endsInNumerls',
      value: function endsInNumerls(serial) {
        var format = this.getFormat(serial);
        if (format) {
          var strlen = format.split('').length;
          var stringToTest = serial.substr(strlen);
          if (!stringToTest.match(/[^0-9]+/)) {
            return true;
          }
        }
        return false;
      }
    }, {
      key: 'isValid',
      value: function isValid(serial) {
        var format = this.getFormat(serial);
        if (!this.endsInNumerls(serial)) {
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

    }, {
      key: 'authors',
      value: function authors() {
        var authors = ['Chris "2pha" Brown (2pha.com)'];
        return authors;
      }
    }, {
      key: 'copyright',
      value: function copyright() {
        return '\n    Copyright 2017 Chris Brown http://2pha.com\n\n    Licensed under the Apache License, Version 2.0 (the \'License\');\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n        http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \'AS IS\' BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n    ';
      }
    }]);
    return _class;
  }();

  return _class;

})));
