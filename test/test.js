const SerialTools1200 = require('../build/SerialTools1200.min');
const assert = require('assert');

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


const inValid = [
  'GEGIA001117',
  'GE3IA00111Y',
  'MHTBF26656',
  'MH2ZF26656',
  'MH2BFPPP',
  'MH2BF2MS56'
];

const st = new SerialTools1200();

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

  // describe('XX0XX', function(){
  //   serials[1].forEach(function(serial){
  //     it('XX0XX format '+serial, function(){
  //       assert.equal(st.getFormat(serial), 'XX0XX');
  //     });
  //   });
  // });

  // describe('XX0000X', function(){
  //   serials[2].forEach(function(serial){
  //     it('XX0000X format '+serial, function(){
  //       assert.equal(st.getFormat(serial), 'XX0000X');
  //     });
  //   });
  // });

  // describe('XX0X00X', function(){
  //   serials[3].forEach(function(serial){
  //     it('XX0X00X format '+serial, function(){
  //       assert.equal(st.getFormat(serial), 'XX0X00X');
  //     });
  //   });
  // });

});

// Check determining old or new format.
// describe('isNewSerialFormat', function(){
//   describe('old', function(){
//     oldValid.forEach(function(serial){
//       it('is old format '+serial, function(){
//         assert.equal(st._isNewSerialFormat(serial), false);
//       });
//     });
//   });
//   describe('new', function(){
//     newValid.forEach(function(serial){
//       it('is new format '+serial, function(){
//         assert.equal(st._isNewSerialFormat(serial), true);
//       });
//     });
//   });
// });

// // Check validity
// describe('Check valid', function(){
//   describe('old', function(){
//     oldValid.forEach(function(serial){
//       it(serial+' is valid old', function(){
//         assert.equal(st.isValid(serial), true);
//       })
//     });
//   });
//   describe('new', function(){
//     newValid.forEach(function(serial){
//       it(serial+' is valid new', function(){
//         assert.equal(st.isValid(serial), true);
//       })
//     });
//   });
// });

// // Check invalid
// describe('Check valid', function(){
//   describe('invalid', function(){
//     inValid.forEach(function(serial){
//       it(serial+' is invalid', function(){
//         assert.equal(st.isValid(serial), false);
//       })
//     });
//   });
// });



// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });
