///@ts-check

export class SerialTools1200 {

  constructor() {
    this.formats = {
      'GE0XX00000X': {
        regex: [
          '[GE]{2}',
          '[0-9]',
          '[A-L]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[A-Z]'
        ]
      },
      'GE0XX000000': {
        regex: [
          '[GE]{2}',
          '[0-9]',
          '[A-L]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]'
        ]
      },
      'XX0XX00000': {
        regex: [
          '[GE|NH]{2}',
          '[0-9]',
          '[A-L]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          ''
        ]
      },
      'XX0X00X000': {
        regex: [
          '[CG|AG|MJ|MU|DA]{2}',
          '[0-9]',
          '[(1-9)|(JKL)]',
          '[0-3]',
          '[0-9]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          ''
        ]
      }
    };
  }

  getFormat(string) {

    let length = string.length;
    if (length < 2) {
      return false;
    }

    // Use a for loop so can convert to PHP.
    for(let format in this.formats) {
      // Put it into an array, because php conversion does not work well with string cancatination.
      let regex = ['/^'];
      for(let i = 0; i < length; i++) {
        // Access format object like an array so converts to php.
        if (i < this.formats[format]['regex'].length) {
          //regex = regex + this.formats[format]['regex'][i];
          regex.push(this.formats[format]['regex'][i]);
        }
      }
      regex.push('$/');
      let regexString = regex.join('');
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

  endsInNumerls(string) {
    let format = this.getFormat(string);
    if (format) {
      let strlen = format.split('').length;
      let stringToTest = string.substr(strlen);
      if (!stringToTest.match(/[^0-9]+/)) {
        return true;
      }
    }
    return false;
  }

  isValid(string) {
    let format = this.getFormat(string);
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

}

//export default {SerialTools1200}