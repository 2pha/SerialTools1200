class SerialTools1200 {

  isValid(serial) {

  }

  isNewSerialFormat(serial) {
    return serial.toLowerCase().substr(0,2) === 'ge';
  }

}