const assert = require('assert');
const serialTools1200 = require('../js/SerialTools1200');

const GE0XX00000R = ['GE0GF01082R', 'GE8AD01111R', 'GE7LC01168R', 'GE6HB01016R', 'GE6SD01051R'];

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
  'NH1bH41849',
];

const XX0X00X000 = [
  'MJ3K29D142',
  'AG7L11F204',
  'CG9830F159',
  'MJ6515F183',
  'AG8307F292',
  'AG7928F375',
  'AB7701F094',
];

const LA0XX000000 = [
  'LA6DA001164',
  'LA6DA001099',
  'LA6GA001042',
  'LA6DA001166',
  'LA7KA001024',
  'LA6SA001167',
  'LA7CA001121',
  'LA7EA001087',
  'LA7JA001072',
  'LA7JA001070',
];

const GM0XX000000 = [
  'GM0SC001065',
  'GM0HC001219',
  'GM0GC001131',
  'GM0FB001007',
  'GM9EA001173',
  'GM9HA001255',
  'GM9JB001373',
  'GM0FA700012',
];

const inValid = [
  'GEGIA001117',
  'GE3IA00111Y',
  'MHTBF26656',
  'MH2ZF266i6',
  'MH2BFPPP',
  'MH2BF2MS56',
  'GE7KA108zz',
];

const dateTests = {
  GE5HS60790: {
    type: 'mk2',
    dateData: {
      day: 0,
      month: 8,
      years: [1985, 1995, 2005],
    },
  },
  MJ6109F047: {
    type: 'mk2',
    dateData: {
      day: 9,
      month: 1,
      years: [1986, 1996, 2006],
    },
  },
  LA6DA001164: {
    type: 'gae',
    dateData: {
      day: 0,
      month: 4,
      years: [2016],
    },
  },
};

const serials = [GE0XX00000R, GE0XX000000, XX0XX00000, XX0X00X000, LA0XX000000];

const st = new serialTools1200.SerialTools1200();

function isFullyValid(serial) {
  const check = st.check(serial);
  return check.fullyValid;
}

function isPartiallyValid(serial) {
  const check = st.check(serial);
  return check.partiallyValid;
}

function isValid(serial) {
  const check = st.check(serial);
  return check.partiallyValid + check.fullyValid;
}

function getFormat(serial) {
  const check = st.check(serial);
  return check.format;
}

function getDateData(serial, mk = false) {
  const check = st.check(serial, mk);
  return check.dateData;
}

describe('get Format', () => {
  describe('GE0XX00000R', () => {
    serials[0].forEach((serial) => {
      it(`GE0XX00000R format ${serial}`, () => {
        assert.equal(getFormat(serial), 'GE0XX00000R');
      });
    });
  });

  describe('GE0XX000000', () => {
    serials[1].forEach((serial) => {
      it(`GE0XX000000 format ${serial}`, () => {
        assert.equal(getFormat(serial), 'GE0XX000000');
      });
    });
  });

  describe('XX0XX00000', () => {
    serials[2].forEach((serial) => {
      it(`XX0XX00000 format ${serial}`, () => {
        assert.equal(getFormat(serial), 'XX0XX00000');
      });
    });
  });

  describe('XX0X00X000', () => {
    serials[3].forEach((serial) => {
      it(`XX0X00X000 format ${serial}`, () => {
        assert.equal(getFormat(serial), 'XX0X00X000');
      });
    });
  });

  describe('LA0XX000000', () => {
    serials[4].forEach((serial) => {
      it(`LA0XX000000 format ${serial}`, () => {
        assert.equal(getFormat(serial), 'LA0XX000000');
      });
    });
  });
});

describe('Is fully valid', () => {
  serials.forEach((serialitems) => {
    serialitems.forEach((serial) => {
      it(`${serial} is fully valid`, () => {
        assert.equal(isFullyValid(serial), true);
      });
    });
  });
});

describe('Partially Valid', () => {
  serials.forEach((serialItems) => {
    serialItems.forEach((serial) => {
      // remove a couple of digits from serial.
      const s = serial.slice(0, -3);
      it(`${s} partially valid`, () => {
        assert.equal(isPartiallyValid(s), true);
      });
    });
  });
});

describe('Partially Valid check full', () => {
  serials.forEach((serialItems) => {
    serialItems.forEach((serial) => {
      // remove a couple of digits from serial.
      const s = serial.slice(0, -3);
      it(`${s} partial but check full`, () => {
        assert.equal(isFullyValid(s, true), false);
      });
    });
  });
});

describe('Too long', () => {
  serials.forEach((serialItems) => {
    serialItems.forEach((serial) => {
      // add a couple of digits from serial.
      const s = `${serial}01`;
      it(`${s} Too Long`, () => {
        assert.equal(isValid(s), false);
      });
    });
  });
});

describe('is not valid', () => {
  inValid.forEach((serial) => {
    it(`${serial} is not valid`, () => {
      assert.equal(isValid(serial), false);
    });
  });
});

describe('date test', () => {
  for (serial in dateTests) {
    it(`${serial} date test`, () => {
      assert.deepEqual(getDateData(serial, dateTests[serial].type), dateTests[serial].dateData);
    });
  }
});
