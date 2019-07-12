/* //@ts-check */

export class SerialTools1200 {
  constructor() {
    // js2php doesn't work with dates, add this so it can be set.
    this.currentYear = 2018;
    this.mks = {
      mk2: {
        start_year: 1979,
        end_year: 2010,
      },
      mk3: {
        start_year: 1989,
        end_year: 1998,
      },
      mk4: {
        start_year: 1996,
        end_year: 2005,
      },
      mk3d: {
        start_year: 1997,
        end_year: 2002,
      },
      m3d: {
        start_year: 1997,
        end_year: 2002,
      },
      ltd: {
        start_year: 1995,
        end_year: 2002,
      },
      mk5: {
        start_year: 2002,
        end_year: 2010,
      },
      mk5g: {
        start_year: 2002,
        end_year: 2010,
      },
      m5g: {
        start_year: 2002,
        end_year: 2010,
      },
      gld: {
        start_year: 2004,
        end_year: 2004,
      },
      mk6: {
        start_year: 2007,
        end_year: 2010,
      },
      gae: {
        start_year: 2016,
        end_year: 0,
      },
      g: {
        start_year: 2016,
        end_year: 0,
      },
      gr: {
        start_year: 2017,
        end_year: 0,
      },
    };

    this.monthMap = {
      1: 1,
      A: 1,
      2: 2,
      B: 2,
      3: 3,
      C: 3,
      4: 4,
      D: 4,
      5: 5,
      E: 5,
      6: 6,
      F: 6,
      7: 7,
      G: 7,
      8: 8,
      H: 8,
      S: 8,
      9: 9,
      I: 9,
      J: 10,
      K: 11,
      L: 12,
    };

    this.formats = {
      GE0XX00000R: {
        regex: [
          '[GE]{2}',
          '[0-9]',
          '[A-LS]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[R]',
        ],
        maxlength: 11,
      },
      GE0XX000000: {
        regex: [
          '[GE]{2}',
          '[0-9]',
          '[A-LS]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
        ],
        maxlength: 11,
      },
      XX0XX00000: {
        regex: [
          '[GE|NH]{2}',
          '[0-9]',
          '[A-LS]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
        ],
        maxlength: 10,
      },
      XX0X00X000: {
        regex: [
          '[CG|AB|AG|MJ|MU|DA]{2}',
          '[0-9]',
          '[(1-9)|(JKLS)]',
          '[0-3]', // maybe these should be (0[1-9]|[12]\d|3[01])
          '[0-9]', //
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
        ],
        maxlength: 10,
      },
      LA0XX000000: {
        regex: [
          '[LA]{2}',
          '[0-9]',
          '[A-LS]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
        ],
        maxlength: 11,
      },
    };
  }

  check(string, mk = false) {
    const results = {
      partiallyValid: false,
      fullyValid: false,
      format: '',
      dateData: {
        day: 0,
        month: 0,
        years: [],
      },
    };


    // Make sure it is uppercase.
    string = string.toUpperCase();

    // Loop over the formats checking validity.
    const regexAddCount = string.length - 1;
    for (const format in this.formats) {
      // Check partial.
      if (!results['partiallyValid'] && string.length <= this.formats[format]['maxlength']) {
        // Put it into an array, because php conversion does not work well concatinating strings.
        const regex = ['^'];
        for (let i = 0; i < regexAddCount; i += 1) {
          // Access format object like an array so converts to php.
          regex.push(this.formats[format]['regex'][i]);
        }
        regex.push('$');
        const regexString = regex.join('');
        if (string.match(regexString)) {
          results['partiallyValid'] = true;
        }
      }

      // Check full
      if (!results['fullyValid']) {
        const regex = ['^'];
        for (let i = 0; i < this.formats[format]['regex'].length; i++) {
          regex.push(this.formats[format]['regex'][i]);
        }
        regex.push('$');
        const regexString = regex.join('');
        if (string.match(regexString)) {
          results['fullyValid'] = true;
          results['format'] = format;
        }
      }

      // Add the date data if fully valid.
      if (results['fullyValid']) {
        if (results['format'] == 'XX0X00X000') {
          // Day.
          const dayval = string.substr(4, 2);
          const daynum = parseInt(dayval);
          if (daynum > 0 && daynum <= 31) {
            results['dateData']['day'] = parseInt(dayval);
          }
        }

        // Month.
        results['dateData']['month'] = this.monthMap[string.substr(3, 1)];

        // Years.
        let yearval = string.substr(2, 1);
        yearval = parseInt(yearval);

        let startyear = 1979;
        if (yearval < 9) {
          startyear += yearval + 1;
        }
        for (let i = startyear; i < this.currentYear; i += 10) {
          if (mk) {
            // js2php can't combine if statements well, so do 2.
            if (i >= this.mks[mk]['start_year'] && i <= this.mks[mk]['end_year']) {
              results['dateData']['years'].push(i);
            } else if (i >= this.mks[mk]['start_year'] && this.mks[mk]['end_year'] == 0) {
              results['dateData']['years'].push(i);
            }
          } else {
            results['dateData']['years'].push(i);
          }
        }
        return results;
      }
    }
    return results;
  }
}
