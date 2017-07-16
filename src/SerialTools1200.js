class SerialTools1200 {

  isValid(serial) {

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