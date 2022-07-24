export class SerialTools1200 {
  constructor() {
    // js2php doesn't work with dates, this is overridden for PHP in quickfixes.
    this.currentYear = new Date().getFullYear();
    this.models = {
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
        end_year: this.currentYear,
      },
      g: {
        start_year: 2016,
        end_year: this.currentYear,
      },
      gr: {
        start_year: 2017,
        end_year: this.currentYear,
      },
      mk7: {
        start_year: 2019,
        end_year: this.currentYear,
      },
      mk7r: {
        start_year: 2020,
        end_year: this.currentYear,
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
          'GE',
          '[0-9]',
          '[A-LS]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          'R',
        ],
        maxlength: 11,
        models: [
          'mk2',
          'mk4',
          'mk5',
          'm5g',
          'mk5g',
        ],
      },
      GE0XX000000: {
        regex: [
          'GE',
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
        models: [
          'mk2',
          'm3d',
          'mk3d',
          'mk4',
          'mk5',
          'm5g',
          'mk5g',
          'gld',
          'mk6',
        ],
      },
      XX0XX00000: {
        regex: [
          '(GE|NH){1}',
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
        models: [
          'mk2',
          'mk3',
          'm3d',
          'mk3d',
          'ltd',
          'mk4',
        ],
      },
      XX0X00X000: {
        regex: [
          '(CG|AB|AG|ME|MJ|MU|MF|MK|DA|DK){1}',
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
        models: [
          'mk2',
        ],
      },
      LA0XX000000: {
        regex: [
          'LA',
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
        models: [
          'g',
          'gae',
          'gr',
        ],
      },
      GM0XX000000: {
        regex: [
          'GM',
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
        models: [
          'mk7',
          'mk7r',
          'gr',
        ],
      },
    };
  }

  check(string) {
    const results = {
      partiallyValid: false,
      fullyValid: false,
      inValid: true,
      serial: string,
      format: '',
      validModels: [],
      dateData: {
        day: 0,
        month: 0,
        years: [],
      },
    };

    // Return if no characters in string.
    if (!string.length) {
      return results;
    }

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

          // Set the validModels from the format models.
          results['validModels'] = this.formats[format]['models'];
        }
      }

      // Set invalid to false.
      if (results['fullyValid'] || results['partiallyValid']) {
        results['inValid'] = false;
      }

      // Add the date data if fully valid.
      if (results['fullyValid']) {
        if (results['format'] === 'XX0X00X000') {
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
        let modelStartYear = 0;
        let endyear = this.currentYear;
        let modelEndYear = 0;

        // Set model start and end years.
        for (let i = 0; i < results['validModels'].length; i++) {
          let modStart = this.models[results['validModels'][i]]['start_year'];
          let modEnd = this.models[results['validModels'][i]]['end_year'];

          if (modelStartYear === 0 || modStart < modelStartYear) {
            modelStartYear = modStart;
          }
          if (modelEndYear === 0 || modEnd > endyear) {
            modelEndYear = modEnd;
          }
        }

        // Set the start year from value in serial.
        if (yearval < 9) {
          startyear += yearval + 1;
        }
        // Add years, checking if within model boudary.
        for (let i = startyear; i <= endyear; i += 10) {
          if (i >= modelStartYear && i <= modelEndYear) {
            results['dateData']['years'].push(i);
          }
        }
        return results;
      }
    }
    return results;
  }
}
