const SerialTools1200 = require('../build/SerialTools1200.min');
const assert = require('assert');

//import { SerialTools1200 } from '../src/SerialTools1200';
//import { assert } from 'assert';
//const assert = require('assert');

/*
const GE0XX = [
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

const XX0XX = [
  'MH2BF26656',
  'NH2BL66897',
  'NH0EF23168',
  'NH2AE24884',
  'NC2CF27088',
  'LA7CA001029',
  'NH1bH41849'
];

const XX0000X = [
  'CG9830F159',
  'MJ6515F183',
  'AG8307F292',
  'AG7928F375'
];

const XX0X00X = [
  'MJ3K29D142',
  'AG7L11F204'
];

const serials = [
  GE0XX,
  XX0XX,
  XX0000X,
  XX0X00X
];
*/

const GE0XX00000X = [
  'GE0GF01082R',
  'GE8AD01111R',
  'GE7LC01168R',
  'GE6HB01016R'
];

const GE0XX000000 = [
  'GE5GA001629',
  'GE4BZ001112',
  'GE3IA001117',
  'GE3IA001120',
  'GE9JC001076',
  'GE2LA001114',
];

const XX0XX00000 = [
  'GE6DD01053',
  'GE5GK95625',
  'GE7JG01497',
  'GE6EK21577',
  'NH2BL66897',
  'NH0EF23168',
  'NH2AE24884',
  'NH1bH41849'
];

const XX0X00X000 = [
  'MJ3K29D142',
  'AG7L11F204',
  'CG9830F159',
  'MJ6515F183',
  'AG8307F292',
  'AG7928F375'
];

const inValid = [
  'GEGIA001117',
  'GE3IA00111Y',
  'MHTBF26656',
  'MH2ZF266i6',
  'MH2BFPPP',
  'MH2BF2MS56'
];

const serials = [
  GE0XX00000X,
  GE0XX000000,
  XX0XX00000,
  XX0X00X000
];
console.log(SerialTools1200);
const st = new SerialTools1200.SerialTools1200();

describe('get Format', function(){

  describe('GE0XX00000X', function(){
    serials[0].forEach(function(serial){
      it('GE0XX00000X format '+serial, function(){
        assert.equal(st.getFormat(serial), 'GE0XX00000X');
      });
    });
  });

  describe('GE0XX000000', function(){
    serials[1].forEach(function(serial){
      it('GE0XX000000 format '+serial, function(){
        assert.equal(st.getFormat(serial), 'GE0XX000000');
      });
    });
  });

  describe('XX0XX00000', function(){
    serials[2].forEach(function(serial){
      it('XX0XX00000 format '+serial, function(){
        assert.equal(st.getFormat(serial), 'XX0XX00000');
      });
    });
  });

  describe('XX0X00X000', function(){
    serials[3].forEach(function(serial){
      it('XX0X00X000 format '+serial, function(){
        assert.equal(st.getFormat(serial), 'XX0X00X000');
      });
    });
  });

});

/*
// test return value of getFormat.
describe('get Format', function(){

  describe('GE0XX', function(){
    serials[0].forEach(function(serial){
      it('GE0XX format '+serial, function(){
        assert.equal(st.getFormat(serial), 'GE0XX');
      });
    });
  });

  describe('XX0XX', function(){
    serials[1].forEach(function(serial){
      it('XX0XX format '+serial, function(){
        assert.equal(st.getFormat(serial), 'XX0XX');
      });
    });
  });

  describe('XX0000X', function(){
    serials[2].forEach(function(serial){
      it('XX0000X format '+serial, function(){
        assert.equal(st.getFormat(serial), 'XX0000X');
      });
    });
  });

  describe('XX0X00X', function(){
    serials[3].forEach(function(serial){
      it('XX0X00X format '+serial, function(){
        assert.equal(st.getFormat(serial), 'XX0X00X');
      });
    });
  });

});

// test for validity
describe('is valid', function(){

  describe('GE0XX', function(){
    serials[0].forEach(function(serial){
      it('GE0XX valid '+serial, function(){
        assert.equal(st.isValid(serial), true);
      });
    });
  });

  describe('XX0XX', function(){
    serials[1].forEach(function(serial){
      it('XX0XX valid '+serial, function(){
        assert.equal(st.isValid(serial), true);
      });
    });
  });

  describe('XX0000X', function(){
    serials[2].forEach(function(serial){
      it('XX0000X valid '+serial, function(){
        assert.equal(st.isValid(serial), true);
      });
    });
  });

  describe('XX0X00X', function(){
    serials[3].forEach(function(serial){
      it('XX0X00X valid '+serial, function(){
        assert.equal(st.isValid(serial), true);
      });
    });
  });

  describe('invalid', function(){
    inValid.forEach(function(serial){
      it('invalid '+serial, function(){
        assert.equal(st.isValid(serial), false);
      });
    });
  });


});
*/
