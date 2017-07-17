class SerialTools1200 {

  isValid(serial) {
    if(this._isNewSerialFormat(serial)){
      // New serial format.
      return this._isValidNew(serial);
    }else{
      // Old serial format.
      return this._isValidOld(serial);
    }
  }

  _isValidNew(serial) {
    let s = serial.toLowerCase();
    return true;
  }

  _isValidOld(serial) {
    let s = serial.toLowerCase();
    return true;
  }

  _isNewSerialFormat(serial) {
    return serial.toLowerCase().substr(0,2) === 'ge';
  }

  authors() {
    let authors = ['Chris "2pha" Brown (2pha.com)'];
    authors.forEach(function(value){
      console.log(value);
    });
    return authors;
  }

}

if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = SerialTools1200;
}