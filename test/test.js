const SerialTools1200 = require('../src/SerialTools1200');
const assert = require('assert');

const oldValid = [
  'MH2BF26656',
  'NH2BL66897',
  'NH0EF23168',
  'CG9830F159',
  'MJ6515F183',
  'AG8307F292',
  'NH2AE24884',
  'NC2CF27088',
  'AG7928F375',
  'MJ3K29D142',
  'LA7CA001029',
  'AG7L11F204',
  'NH1bH41849'
];

const newValid = [
  'GE3IA001117',
  'GE6DD01053',
  'GE3IA001120',
  'GE5GK95625',
  'GE1JC001587',
  'GE9JC001076',
  'GE9JC001060',
  'GE2LA001246',
  'GE2LA001114',
  'GE7JG01497',
  'GE6EK21577'
];

const inValid = [
  'GEGIA001117',
  'GE3IA00111Y',
  'MHTBF26656',
  'MH2ZF26656',
  'MH2BFPPP',
  'MH2BF2MS56'
];

const st = new SerialTools1200();

// Check determining old or new format.
describe('isNewSerialFormat', function(){
  describe('old', function(){
    oldValid.forEach(function(serial){
      it('is old format '+serial, function(){
        assert.equal(st._isNewSerialFormat(serial), false);
      });
    });
  });
  describe('new', function(){
    newValid.forEach(function(serial){
      it('is new format '+serial, function(){
        assert.equal(st._isNewSerialFormat(serial), true);
      });
    });
  });
});

// Check validity
describe('Check valid', function(){
  describe('old', function(){
    oldValid.forEach(function(serial){
      it(serial+' is valid old', function(){
        assert.equal(st.isValid(serial), true);
      })
    });
  });
  describe('new', function(){
    newValid.forEach(function(serial){
      it(serial+' is valid new', function(){
        assert.equal(st.isValid(serial), true);
      })
    });
  });
});

// Check invalid
describe('Check valid', function(){
  describe('invalid', function(){
    inValid.forEach(function(serial){
      it(serial+' is invalid', function(){
        assert.equal(st.isValid(serial), false);
      })
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
