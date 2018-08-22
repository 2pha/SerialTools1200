var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//@ts-check

export var SerialTools1200 = function () {
  function SerialTools1200() {
    _classCallCheck(this, SerialTools1200);

    this.formats = {
      'GE0XX00000X': {
        regex: ['[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[A-Z]']
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
    value: function getFormat(serial) {

      var length = serial.length;
      if (length < 2) {
        return false;
      }

      this.formats.forEach(function (element, index) {
        var regex = '';
        for (var i = 0; i < length; i++) {
          if (i < element.regex.length) {
            regex += element.regex[i];
          }
        }
        regex = '^' + regex + '$';
        if (serial.toUpperCase().match(regex)) {
          return index;
        }
      });

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

  }]);

  return SerialTools1200;
}();

//export default {SerialTools1200}