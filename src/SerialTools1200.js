class SerialTools1200 {

  isValid(serial) {

  }

  hmm() {
    return 1;
  }

  isNewSerialFormat(serial) {
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