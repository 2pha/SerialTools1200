class SerialTools1200 {

  getFormat(serial) {

    if(serial.match(/^(GE[0-9][a-z]{2}[0-9])+/i)){
      return 'GE0XX';
    }
    else if(serial.match(/^([a-z]{2}[0-9][a-z]{2}[0-9])+/i)){
      return 'XX0XX';
    }
    else if(serial.match(/^([a-z]{2}[0-9]{4}[a-z])+/i)){
      return 'XX0000X';
    }
    else if(serial.match(/^([a-z]{2}[0-9][a-z][0-9]{2}[a-z])+/i)){
      return 'XX0X00X';
    }
    else {
      return false;
    }

  }

  isValid(serial) {
    return true;
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

  authors() {
    let authors = ['Chris "2pha" Brown (2pha.com)'];
    return authors;
  }

}

// if (module && module.exports) {
//     module.exports = SerialTools1200;
// }

// This is now applie to the output wrapper in closure compiler.
// so the class can be output to PHP without the module stuff but still allow
// for testing with mocha of the compiled JS class.
// See: https://medium.com/reflecting-on-bits/how-to-publish-npm-module-with-code-produced-by-closure-compiler-in-it-f8d766205f6f
// Old version (withing this file):
//if (typeof module !== 'undefined' && module.exports != null) {module.exports = SerialTools1200;}
// New version (as closuer compiler wrapper, implemented in the build script):
// ;(function (root, factory) {
//     if (typeof define === /function/ && define.amd) {
//         define([], factory);
//     } else if (typeof module === /object/ && module.exports) {
//         module.exports = factory();
//     } else {
//         root.SerialTools1200 = factory();
//   }
// }(this, function () {
//   %output%
//   return SerialTools1200;
// }));

// //"buildclosure": "./node_modules/.bin/google-closure-compiler-js --outputWrapper=%output%' if (typeof module === 'object' && module.exports) {module.exports = SerialTools1200;}' --warningLevel=VERBOSE ./src/SerialTools1200.js > ./build/SerialTools1200.min.js",