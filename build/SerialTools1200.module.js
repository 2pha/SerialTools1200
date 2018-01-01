// Copyright 2017 Chris Brown https://2pha.com
// http://www.apache.org/licenses/LICENSE-2.0
//@ts-check

class SerialTools1200  {

  getFormat(serial) {
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

  endsInNumerls(serial) {
    let format = this.getFormat(serial);
    if (format) {
      let strlen = format.split('').length;
      let stringToTest = serial.substr(strlen);
      if (!stringToTest.match(/[^0-9]+/)) {
        return true;
      }
    }
    return false;
  }

  isValid(serial) {
    let format = this.getFormat(serial);
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

}

export { SerialTools1200 };
