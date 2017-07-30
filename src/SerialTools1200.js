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

  endsInNumerls(serial) {
    let format = this.getFormat(serial);
    if(format){
      let strlen = format.split("").length;
      let stringToTest = serial.substr(strlen);
      if(!stringToTest.match(/[^0-9]+/)){
        return true;
      }
    }
    return false;
  }

  isValid(serial) {
    let format = this.getFormat(serial);
    if(!this.endsInNumerls(serial)){
      return false;
    }
    switch(format) {
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

  authors() {
    let authors = ['Chris "2pha" Brown (2pha.com)'];
    return authors;
  }

  copyright() {
    return `
    Copyright 2017 Chris Brown http://2pha.com

    Licensed under the Apache License, Version 2.0 (the 'License');
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an 'AS IS' BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    `;
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