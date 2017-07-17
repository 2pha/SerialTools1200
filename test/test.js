var SerialTools1200 = require('../src/SerialTools1200');
var assert = require('assert');

var oldValid = [
  'MH2BF26656',
  'LA6FA001016',
  'NH2BL66897',
  'NH0EF23168',
  'CG9830F159',
  'MJ6515F183',
  'AG8307F292',
  'NH2AE24884',
  'NC2CF27088',
  'AG7928F375'
];

var newValid = [
  'GE3IA001117',
  'GE6DD01053',
  'GE3IA001120',
  'GE5GK95625',
  'GE1JC001587',
  'GE9JC001076',
  'GE9JC001060',
  'GE2LA001246',
  'GE2LA001114',
  'GE7JG01497'
];

var st = new SerialTools1200();

describe('isNewSerialFormat', function(){
  describe('old', function(){
    oldValid.forEach(function(serial){
      it('testing is old '+serial, function(){
        assert.equal(st.isNewSerialFormat(serial), false);
      });
    });
  });
  describe('new', function(){
    newValid.forEach(function(serial){
      it('testing is new '+serial, function(){
        assert.equal(st.isNewSerialFormat(serial), true);
      });
    });
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
